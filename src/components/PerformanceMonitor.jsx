import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const PerformanceMonitor = ({
  enabled = true,
  reportInterval = 30000,
  onReport,
  showDebugInfo = false
}) => {
  const [metrics, setMetrics] = useState({});
  const [isSupported, setIsSupported] = useState(false);
  const metricsRef = useRef({});
  const observersRef = useRef([]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    // Check for Performance API support
    const supported = "performance" in window &&
                     "PerformanceObserver" in window &&
                     "getEntriesByType" in performance;

    setIsSupported(supported);

    if (!supported) {
      console.warn("Performance monitoring not supported in this browser");
      return;
    }

    initializePerformanceMonitoring();

    return () => {
      cleanup();
    };
  }, [enabled]);

  const initializePerformanceMonitoring = () => {
    // Core Web Vitals tracking
    trackCLS();
    trackFID();
    trackLCP();
    trackFCP();
    trackTTFB();

    // Additional performance metrics
    trackResourceTiming();
    trackNavigationTiming();
    trackMemoryUsage();
    trackLongTasks();

    // Custom metrics
    trackCustomMetrics();

    // Report metrics periodically
    const interval = setInterval(() => {
      reportMetrics();
    }, reportInterval);

    return () => clearInterval(interval);
  };

  // Cumulative Layout Shift (CLS)
  const trackCLS = () => {
    let clsValue = 0;
    let clsEntries = [];

    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      }

      updateMetric("CLS", {
        value: clsValue,
        rating: getCLSRating(clsValue),
        entries: clsEntries.length,
        timestamp: Date.now()
      });
    });

    try {
      observer.observe({ type: "layout-shift", buffered: true });
      observersRef.current.push(observer);
    } catch (e) {
      console.warn("CLS tracking not supported");
    }
  };

  // First Input Delay (FID)
  const trackFID = () => {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fid = entry.processingStart - entry.startTime;

        updateMetric("FID", {
          value: fid,
          rating: getFIDRating(fid),
          entryType: entry.name,
          timestamp: Date.now()
        });
      }
    });

    try {
      observer.observe({ type: "first-input", buffered: true });
      observersRef.current.push(observer);
    } catch (e) {
      console.warn("FID tracking not supported");
    }
  };

  // Largest Contentful Paint (LCP)
  const trackLCP = () => {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];

      if (lastEntry) {
        updateMetric("LCP", {
          value: lastEntry.startTime,
          rating: getLCPRating(lastEntry.startTime),
          element: lastEntry.element?.tagName || "unknown",
          url: lastEntry.url || "",
          timestamp: Date.now()
        });
      }
    });

    try {
      observer.observe({ type: "largest-contentful-paint", buffered: true });
      observersRef.current.push(observer);
    } catch (e) {
      console.warn("LCP tracking not supported");
    }
  };

  // First Contentful Paint (FCP)
  const trackFCP = () => {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          updateMetric("FCP", {
            value: entry.startTime,
            rating: getFCPRating(entry.startTime),
            timestamp: Date.now()
          });
        }
      }
    });

    try {
      observer.observe({ type: "paint", buffered: true });
      observersRef.current.push(observer);
    } catch (e) {
      console.warn("FCP tracking not supported");
    }
  };

  // Time to First Byte (TTFB)
  const trackTTFB = () => {
    try {
      const navEntry = performance.getEntriesByType("navigation")[0];
      if (navEntry) {
        const ttfb = navEntry.responseStart - navEntry.requestStart;

        updateMetric("TTFB", {
          value: ttfb,
          rating: getTTFBRating(ttfb),
          timestamp: Date.now()
        });
      }
    } catch (e) {
      console.warn("TTFB tracking failed");
    }
  };

  // Resource timing
  const trackResourceTiming = () => {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const resourceSummary = analyzeResources(entries);

      updateMetric("Resources", {
        ...resourceSummary,
        timestamp: Date.now()
      });
    });

    try {
      observer.observe({ type: "resource", buffered: false });
      observersRef.current.push(observer);
    } catch (e) {
      console.warn("Resource timing not supported");
    }
  };

  // Navigation timing
  const trackNavigationTiming = () => {
    try {
      const navEntry = performance.getEntriesByType("navigation")[0];
      if (navEntry) {
        updateMetric("Navigation", {
          domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
          loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
          domInteractive: navEntry.domInteractive - navEntry.fetchStart,
          totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
          timestamp: Date.now()
        });
      }
    } catch (e) {
      console.warn("Navigation timing failed");
    }
  };

  // Memory usage (Chrome only)
  const trackMemoryUsage = () => {
    if ("memory" in performance) {
      const memory = performance.memory;
      updateMetric("Memory", {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        usage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit * 100).toFixed(2),
        timestamp: Date.now()
      });
    }
  };

  // Long tasks
  const trackLongTasks = () => {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        updateMetric("LongTasks", {
          duration: entry.duration,
          startTime: entry.startTime,
          count: (metricsRef.current.LongTasks?.count || 0) + 1,
          timestamp: Date.now()
        });
      }
    });

    try {
      observer.observe({ type: "longtask", buffered: true });
      observersRef.current.push(observer);
    } catch (e) {
      console.warn("Long task tracking not supported");
    }
  };

  // Custom metrics
  const trackCustomMetrics = () => {
    // Track component render times
    if (window.React && window.React.Profiler) {
      updateMetric("React", {
        version: window.React.version || "unknown",
        timestamp: Date.now()
      });
    }

    // Track page visibility changes
    document.addEventListener("visibilitychange", () => {
      updateMetric("Visibility", {
        hidden: document.hidden,
        timestamp: Date.now()
      });
    });

    // Track connection information
    if ("connection" in navigator) {
      const connection = navigator.connection;
      updateMetric("Connection", {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
        timestamp: Date.now()
      });
    }
  };

  // Helper functions for rating metrics
  const getCLSRating = (value) => {
    if (value <= 0.1) return "good";
    if (value <= 0.25) return "needs-improvement";
    return "poor";
  };

  const getFIDRating = (value) => {
    if (value <= 100) return "good";
    if (value <= 300) return "needs-improvement";
    return "poor";
  };

  const getLCPRating = (value) => {
    if (value <= 2500) return "good";
    if (value <= 4000) return "needs-improvement";
    return "poor";
  };

  const getFCPRating = (value) => {
    if (value <= 1800) return "good";
    if (value <= 3000) return "needs-improvement";
    return "poor";
  };

  const getTTFBRating = (value) => {
    if (value <= 800) return "good";
    if (value <= 1800) return "needs-improvement";
    return "poor";
  };

  // Resource analysis
  const analyzeResources = (entries) => {
    const summary = {
      count: entries.length,
      totalSize: 0,
      totalTime: 0,
      types: {},
      slowest: null,
      largest: null
    };

    entries.forEach(entry => {
      const type = getResourceType(entry.name);
      const size = entry.transferSize || 0;
      const duration = entry.responseEnd - entry.requestStart;

      summary.totalSize += size;
      summary.totalTime += duration;
      summary.types[type] = (summary.types[type] || 0) + 1;

      if (!summary.slowest || duration > summary.slowest.duration) {
        summary.slowest = { name: entry.name, duration };
      }

      if (!summary.largest || size > summary.largest.size) {
        summary.largest = { name: entry.name, size };
      }
    });

    return summary;
  };

  const getResourceType = (url) => {
    if (url.match(/\.(js|jsx|ts|tsx)$/)) return "script";
    if (url.match(/\.(css|scss|sass)$/)) return "stylesheet";
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return "image";
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return "font";
    return "other";
  };

  // Update metrics
  const updateMetric = (key, value) => {
    metricsRef.current[key] = value;
    setMetrics(prev => ({ ...prev, [key]: value }));
  };

  // Report metrics
  const reportMetrics = () => {
    const currentMetrics = { ...metricsRef.current };

    if (onReport) {
      onReport(currentMetrics);
    }

    if (showDebugInfo) {
      console.group("🚀 Performance Metrics");
      console.table(currentMetrics);
      console.groupEnd();
    }

    // Send to analytics service (example)
    if (typeof gtag !== "undefined") {
      Object.entries(currentMetrics).forEach(([key, metric]) => {
        if (metric.value !== undefined) {
          gtag("event", "performance_metric", {
            metric_name: key,
            metric_value: metric.value,
            metric_rating: metric.rating || "unknown"
          });
        }
      });
    }
  };

  // Cleanup
  const cleanup = () => {
    observersRef.current.forEach(observer => {
      try {
        observer.disconnect();
      } catch (e) {
        console.warn("Error disconnecting observer:", e);
      }
    });
    observersRef.current = [];
  };

  // Public API for manual tracking
  const track = (name, value, details = {}) => {
    updateMetric(name, {
      value,
      ...details,
      timestamp: Date.now()
    });
  };

  // Expose tracking function globally for external use
  useEffect(() => {
    if (enabled && typeof window !== "undefined") {
      window.performanceTracker = { track, getMetrics: () => metricsRef.current };
    }
  }, [enabled]);

  // Debug component (only renders if showDebugInfo is true)
  if (showDebugInfo && isSupported) {
    return (
      <div style={{
        position: "fixed",
        top: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        zIndex: 10000,
        maxWidth: "300px",
        maxHeight: "400px",
        overflow: "auto"
      }}>
        <h4>Performance Metrics</h4>
        {Object.entries(metrics).map(([key, metric]) => (
          <div key={key} style={{ marginBottom: "5px" }}>
            <strong>{key}:</strong>
            {typeof metric.value === "number" ? ` ${metric.value.toFixed(2)}ms` : ""}
            {metric.rating && (
              <span style={{
                color: metric.rating === "good" ? "#4CAF50" :
                       metric.rating === "needs-improvement" ? "#FF9800" : "#F44336",
                marginLeft: "5px"
              }}>
                ({metric.rating})
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

PerformanceMonitor.propTypes = {
  enabled: PropTypes.bool,
  reportInterval: PropTypes.number,
  onReport: PropTypes.func,
  showDebugInfo: PropTypes.bool
};

export default PerformanceMonitor;
