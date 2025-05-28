import React, { useState, useRef, useEffect } from "react";
import "./Progress.css";

const Progress = () => {
  const [downloads, setDownloads] = useState([]);
  const downloadCounter = useRef(0);

  // Sample files to download
  const sampleFiles = [
    { name: "portfolio-resume.pdf", size: "2.5 MB" },
    { name: "project-documentation.zip", size: "15.3 MB" },
    { name: "react-tutorial-video.mp4", size: "128.7 MB" },
    { name: "design-assets.sketch", size: "45.2 MB" },
    { name: "database-backup.sql", size: "8.9 MB" },
    { name: "presentation-slides.pptx", size: "12.1 MB" },
  ];

  // Start a new download
  const startDownload = () => {
    const randomFile =
      sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
    const newDownload = {
      id: downloadCounter.current++,
      fileName: randomFile.name,
      fileSize: randomFile.size,
      progress: 0,
      status: "downloading", // 'downloading', 'completed', 'cancelled', 'error'
      speed: Math.random() * 5 + 1, // Random speed between 1-6% per interval
      startTime: Date.now(),
    };

    setDownloads((prev) => [...prev, newDownload]);
  };
  // Cancel a download
  const cancelDownload = (id) => {
    setDownloads((prev) =>
      prev.map((download) =>
        download.id === id
          ? {
              ...download,
              status: "cancelled",
              endTime: Date.now(), // Record when it was cancelled
            }
          : download
      )
    );
  };

  // Remove a download from the list
  const removeDownload = (id) => {
    setDownloads((prev) => prev.filter((download) => download.id !== id));
  };

  // Clear all downloads
  const clearAll = () => {
    setDownloads([]);
  };
  // Simulate download progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads((prev) =>
        prev.map((download) => {
          if (download.status === "downloading" && download.progress < 100) {
            const newProgress = Math.min(
              download.progress + download.speed,
              100
            );
            const status = newProgress >= 100 ? "completed" : "downloading";

            // Random chance for error (2% chance)
            if (Math.random() < 0.02 && newProgress < 100) {
              return {
                ...download,
                status: "error",
                endTime: Date.now(), // Record when it errored
              };
            }

            // If completed, record the end time
            if (status === "completed") {
              return {
                ...download,
                progress: newProgress,
                status,
                endTime: Date.now(), // Record when it completed
              };
            }

            return { ...download, progress: newProgress, status };
          }
          return download;
        })
      );
    }, 200); // Update every 200ms

    return () => clearInterval(interval);
  }, []);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "downloading":
        return "#007bff";
      case "completed":
        return "#28a745";
      case "cancelled":
        return "#6c757d";
      case "error":
        return "#dc3545";
      default:
        return "#007bff";
    }
  };

  // Get status text
  const getStatusText = (status, progress) => {
    switch (status) {
      case "downloading":
        return `${Math.round(progress)}%`;
      case "completed":
        return "Complete";
      case "cancelled":
        return "Cancelled";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };
  // Calculate elapsed time
  const getElapsedTime = (startTime, endTime) => {
    const endTimeToUse = endTime || Date.now(); // Use endTime if available, otherwise current time
    const elapsed = (endTimeToUse - startTime) / 1000;
    return elapsed < 60
      ? `${Math.round(elapsed)}s`
      : `${Math.round(elapsed / 60)}m`;
  };

  return (
    <div className="progress-container">
      <h3 className="progress-title">File Download Manager</h3>
      <p className="progress-description">
        Simulate file downloads with progress tracking, cancellation, and status
        monitoring.
      </p>

      <div className="progress-controls">
        <button
          onClick={startDownload}
          className="progress-btn progress-btn-primary"
        >
          Start Download
        </button>
        {downloads.length > 0 && (
          <button
            onClick={clearAll}
            className="progress-btn progress-btn-secondary"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="downloads-list">
        {downloads.length === 0 ? (
          <div className="no-downloads">
            <p>No downloads in progress. Click "Start Download" to begin!</p>
          </div>
        ) : (
          downloads.map((download) => (
            <div key={download.id} className="download-item">
              <div className="download-info">
                <div className="download-header">
                  <span className="file-name">{download.fileName}</span>
                  <span className="file-size">{download.fileSize}</span>
                </div>{" "}
                <div className="download-meta">
                  <div className="download-status-info">
                    <span
                      className="download-status"
                      style={{ color: getStatusColor(download.status) }}
                    >
                      {getStatusText(download.status, download.progress)}
                    </span>{" "}
                    <span className="download-time">
                      {getElapsedTime(download.startTime, download.endTime)}
                    </span>
                  </div>
                  <div className="download-actions">
                    {download.status === "downloading" && (
                      <button
                        onClick={() => cancelDownload(download.id)}
                        className="action-btn cancel-btn"
                        title="Cancel Download"
                      >
                        ✕
                      </button>
                    )}
                    {(download.status === "completed" ||
                      download.status === "cancelled" ||
                      download.status === "error") && (
                      <button
                        onClick={() => removeDownload(download.id)}
                        className="action-btn remove-btn"
                        title="Remove from List"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>{" "}
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    backgroundColor: getStatusColor(download.status),
                    width: `${download.progress}%`,
                    opacity: download.status === "cancelled" ? 0.5 : 1,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="progress-stats">
        <div className="stat">
          <span className="stat-label">Total Downloads:</span>
          <span className="stat-value">{downloads.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Active:</span>
          <span className="stat-value">
            {downloads.filter((d) => d.status === "downloading").length}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Completed:</span>
          <span className="stat-value">
            {downloads.filter((d) => d.status === "completed").length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Progress;
