import "./ErrorFallback.css";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-fallback">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p className="error-message">
          {error?.message || "An unexpected error occurred"}
        </p>
        <div className="error-actions">
          <button
            className="retry-button"
            onClick={resetErrorBoundary}
          >
            Try Again
          </button>
          <button
            className="refresh-button"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
        <details className="error-details">
          <summary>Technical Details</summary>
          <pre className="error-stack">
            {error?.stack || "No stack trace available"}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default ErrorFallback;
