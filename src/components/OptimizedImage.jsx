import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
  placeholder = "blur",
  quality = 85,
  sizes = "100vw",
  priority = false,
  onLoad,
  onError,
  fallback,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Generate WebP and fallback sources
  const generateSources = useCallback((originalSrc) => {
    if (!originalSrc) return { webp: "", fallback: originalSrc };

    const ext = originalSrc.split('.').pop().toLowerCase();
    const basePath = originalSrc.replace(`.${ext}`, '');

    // For development, we'll use the original image
    // In production, you might have a service that generates WebP versions
    const webpSrc = originalSrc; // basePath + '.webp'
    const fallbackSrc = originalSrc;

    return { webp: webpSrc, fallback: fallbackSrc };
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority, isInView]);

  // Set image source when in view
  useEffect(() => {
    if (isInView && src) {
      const { fallback: fallbackSrc } = generateSources(src);
      setCurrentSrc(fallbackSrc);
    }
  }, [isInView, src, generateSources]);

  // Handle image load
  const handleLoad = useCallback(
    (event) => {
      setIsLoaded(true);
      setHasError(false);
      if (onLoad) {
        onLoad(event);
      }
    },
    [onLoad]
  );

  // Handle image error
  const handleError = useCallback(
    (event) => {
      setHasError(true);
      setIsLoaded(false);

      if (fallback && currentSrc !== fallback) {
        setCurrentSrc(fallback);
        return;
      }

      if (onError) {
        onError(event);
      }
    },
    [onError, fallback, currentSrc]
  );

  // Generate placeholder styles
  const getPlaceholderStyle = () => {
    if (placeholder === "blur") {
      return {
        background: "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        animation: "shimmer 1.5s ease-in-out infinite",
      };
    }

    if (placeholder === "empty") {
      return {
        backgroundColor: "#f5f5f5",
      };
    }

    return {};
  };

  // Create responsive image sizes - disabled for now since we don't have multiple versions
  const createSrcSet = (originalSrc) => {
    // Just return the original src without trying to generate responsive versions
    return "";
  };

  const containerStyle = {
    position: "relative",
    overflow: "hidden",
    display: "inline-block",
    width: width || "100%",
    height: height || "auto",
    ...getPlaceholderStyle(),
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.3s ease-in-out",
    opacity: isLoaded ? 1 : 0,
    ...(hasError && { display: "none" }),
  };

  const { webp, fallback: fallbackSrc } = generateSources(src);

  return (
    <div
      ref={imgRef}
      className={`optimized-image-container ${className}`}
      style={containerStyle}
      {...props}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer" />
        </div>
      )}

      {/* Error state */}
      {hasError && !fallback && (
        <div className="image-error">
          <div className="error-icon">📷</div>
          <span className="error-text">Failed to load image</span>
        </div>
      )}

      {/* Main image with WebP support */}
      {isInView && currentSrc && !hasError && (
        <picture>
          {/* Fallback image - simplified without srcset */}
          <img
            src={currentSrc}
            alt={alt}
            style={imageStyle}
            loading={priority ? "eager" : loading}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            width={width}
            height={height}
          />
        </picture>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        .image-skeleton {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .skeleton-shimmer {
          width: 100%;
          height: 100%;
          background: inherit;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .image-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background-color: #f8f9fa;
          color: #6c757d;
          font-size: 14px;
          text-align: center;
          padding: 20px;
        }

        .error-icon {
          font-size: 2em;
          margin-bottom: 8px;
          opacity: 0.5;
        }

        .error-text {
          font-size: 0.9em;
          opacity: 0.7;
        }

        .optimized-image-container {
          background-color: #f5f5f5;
        }

        .optimized-image-container img {
          max-width: 100%;
          height: auto;
        }

        /* Responsive behavior */
        @media (max-width: 768px) {
          .image-error {
            font-size: 12px;
            padding: 15px;
          }

          .error-icon {
            font-size: 1.5em;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .image-skeleton {
            background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
          }

          .image-error {
            background-color: #1a1a1a;
            color: #a0a0a0;
          }

          .optimized-image-container {
            background-color: #2a2a2a;
          }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .skeleton-shimmer,
          .optimized-image-container img {
            animation: none;
            transition: none;
          }
        }

        /* Print styles */
        @media print {
          .image-skeleton,
          .image-error {
            display: none;
          }

          .optimized-image-container img {
            opacity: 1;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.oneOf(["lazy", "eager"]),
  placeholder: PropTypes.oneOf(["blur", "empty", "none"]),
  quality: PropTypes.number,
  sizes: PropTypes.string,
  priority: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  fallback: PropTypes.string,
};

export default OptimizedImage;
