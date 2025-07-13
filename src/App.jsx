import { useState, useCallback, Suspense, lazy, memo, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./Header";
import Footer from "./Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorFallback from "./components/ErrorFallback";
import PerformanceMonitor from "./components/PerformanceMonitor";
import "./App.css";
import "./performance.css";

// Lazy load components for better performance with error handling
const About = lazy(() =>
  import("./About").catch((err) => {
    console.error("Failed to load About component:", err);
    return { default: () => <div>Failed to load About section</div> };
  }),
);

const Portfolio = lazy(() =>
  import("./Portfolio").catch((err) => {
    console.error("Failed to load Portfolio component:", err);
    return { default: () => <div>Failed to load Portfolio section</div> };
  }),
);

const Contact = lazy(() =>
  import("./Contact").catch((err) => {
    console.error("Failed to load Contact component:", err);
    return { default: () => <div>Failed to load Contact section</div> };
  }),
);

const TechStack = lazy(() =>
  import("./TechStack").catch((err) => {
    console.error("Failed to load TechStack component:", err);
    return { default: () => <div>Failed to load Skills section</div> };
  }),
);

// Memoized section components to prevent unnecessary re-renders
const MemoizedAbout = memo(About);
const MemoizedPortfolio = memo(Portfolio);
const MemoizedContact = memo(Contact);
const MemoizedTechStack = memo(TechStack);

const App = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isLoading, setIsLoading] = useState(true);

  // Performance monitoring setup
  useEffect(() => {
    // Mark app as loaded
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Track custom performance metric
      if (window.performanceTracker) {
        window.performanceTracker.track("app_load_complete", Date.now());
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Preload next likely sections based on current section
  useEffect(() => {
    const preloadMap = {
      about: ["portfolio"],
      portfolio: ["skills", "contact"],
      skills: ["contact", "portfolio"],
      contact: ["about"],
    };

    const sectionsToPreload = preloadMap[activeSection] || [];

    sectionsToPreload.forEach((section) => {
      switch (section) {
        case "portfolio":
          import("./Portfolio");
          break;
        case "skills":
          import("./TechStack");
          break;
        case "contact":
          import("./Contact");
          break;
        case "about":
          import("./About");
          break;
      }
    });
  }, [activeSection]);

  // Memoize the navigation handler to prevent unnecessary re-renders
  const handleNavClick = useCallback(
    (section) => {
      // Track navigation
      if (window.performanceTracker) {
        window.performanceTracker.track("navigation", Date.now(), {
          from: activeSection,
          to: section,
        });
      }

      setActiveSection(section);

      // Add smooth scroll to top when switching sections with reduced motion check
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [activeSection],
  );

  const renderActiveSection = useCallback(() => {
    const sectionMap = {
      about: <MemoizedAbout />,
      portfolio: <MemoizedPortfolio />,
      contact: <MemoizedContact />,
      skills: <MemoizedTechStack />,
    };

    return sectionMap[activeSection] || <MemoizedAbout />;
  }, [activeSection]);

  // Enhanced error handler
  const handleError = useCallback(
    (error, errorInfo) => {
      console.error("App Error:", error, errorInfo);

      // Track error
      if (window.performanceTracker) {
        window.performanceTracker.track("error", Date.now(), {
          message: error.message,
          stack: error.stack,
          section: activeSection,
        });
      }

      // Send to error tracking service
      if (typeof gtag !== "undefined") {
        gtag("event", "exception", {
          description: error.message,
          fatal: false,
        });
      }
    },
    [activeSection],
  );

  return (
    <div className="app">
      {/* Performance monitoring - only in development */}
      <PerformanceMonitor
        enabled={process.env.NODE_ENV === "development"}
        showDebugInfo={false}
        onReport={(metrics) => {
          // Log performance metrics in development
          if (process.env.NODE_ENV === "development") {
            console.log("Performance Report:", metrics);
          }
        }}
      />

      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={handleError}
        onReset={() => {
          // Reset to about section on error recovery
          setActiveSection("about");
          window.location.reload();
        }}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="skip-link"
          onFocus={(e) => (e.target.style.top = "6px")}
          onBlur={(e) => (e.target.style.top = "-40px")}
        >
          Skip to main content
        </a>

        <Header onNavClick={handleNavClick} activeSection={activeSection} />

        <main
          id="main-content"
          className="main-content"
          role="main"
          aria-label={`${activeSection} section`}
        >
          <Suspense
            fallback={
              <div className="loading-container" aria-live="polite">
                <LoadingSpinner />
                <span className="sr-only">
                  Loading {activeSection} section...
                </span>
              </div>
            }
          >
            <div
              key={activeSection}
              className="section-container fade-in"
              data-section={activeSection}
            >
              {renderActiveSection()}
            </div>
          </Suspense>
        </main>

        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
