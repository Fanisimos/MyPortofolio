import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import portfolioItems from "./portfolioItems.js";
import Timer from "./showcaseComponents/Timer.jsx";
import DarkMode from "./showcaseComponents/DarkMode.jsx";
import Progress from "./showcaseComponents/Progress.jsx";
import "./Portfolio.css";

// Enhanced Portfolio Item Component with memoization
const PortfolioItem = memo(({ item, index, onImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(
    (e) => {
      // Track interaction
      if (window.performanceTracker) {
        window.performanceTracker.track("project_click", Date.now(), {
          project: item.title,
          section: "portfolio",
        });
      }

      // Allow natural link behavior for anchor tag
      if (e.target.tagName === "A") return;

      // Open link in new tab for other clicks
      window.open(item.link, "_blank", "noopener,noreferrer");
    },
    [item.link, item.title],
  );

  const handleImageClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Track image view
      if (window.performanceTracker) {
        window.performanceTracker.track("image_view", Date.now(), {
          project: item.title,
        });
      }

      onImageClick(item.image, item.title);
    },
    [item.image, item.title, onImageClick],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);

    // Preload image on hover for better UX
    if (item.image) {
      const img = new Image();
      img.src = item.image;
    }
  }, [item.image]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <article
      className={`portfolio-item ${isHovered ? "portfolio-item--hovered" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e);
        }
      }}
      aria-label={`View ${item.title} project`}
    >
      <div className="portfolio-item__image-wrapper">
        <img
          src={item.image}
          alt={`${item.title} project screenshot`}
          className="portfolio-item__image"
          onClick={handleImageClick}
          loading={index < 2 ? "eager" : "lazy"}
          onError={(e) => {
            e.target.src = "/logo.png";
          }}
        />
        <div className="portfolio-item__overlay">
          <div className="portfolio-item__actions">
            <Tooltip title="View Full Image" arrow>
              <IconButton
                className="action-button view-image"
                onClick={handleImageClick}
                aria-label="View full size image"
              >
                🔍
              </IconButton>
            </Tooltip>
            <Tooltip title="Visit Live Site" arrow>
              <IconButton
                className="action-button visit-site"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(item.link, "_blank", "noopener,noreferrer");
                }}
                aria-label="Visit live website"
              >
                🚀
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {item.featured && (
          <Chip
            label="Featured"
            className="portfolio-item__badge"
            size="small"
            color="primary"
          />
        )}
      </div>

      <div className="portfolio-item__content">
        <header className="portfolio-item__header">
          <h3 className="portfolio-item__title">{item.title}</h3>
          {item.year && (
            <span className="portfolio-item__year">{item.year}</span>
          )}
        </header>

        <p className="portfolio-item__description">{item.description}</p>

        {item.technologies && (
          <div className="portfolio-item__technologies">
            {item.technologies.slice(0, 3).map((tech, techIndex) => (
              <Chip
                key={techIndex}
                label={tech}
                size="small"
                variant="outlined"
                className="tech-chip"
              />
            ))}
            {item.technologies.length > 3 && (
              <Chip
                label={`+${item.technologies.length - 3}`}
                size="small"
                variant="outlined"
                className="tech-chip more-tech"
              />
            )}
          </div>
        )}

        <footer className="portfolio-item__footer">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-item__link"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Visit ${item.title} live website`}
          >
            View Project
            <span className="link-arrow" aria-hidden="true">
              →
            </span>
          </a>
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-item__github"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${item.title} source code on GitHub`}
            >
              <span aria-hidden="true">⚡</span> Code
            </a>
          )}
        </footer>
      </div>
    </article>
  );
});

// Add display name for debugging
PortfolioItem.displayName = "PortfolioItem";

// Image Modal Component with performance optimizations
const ImageModal = memo(({ isOpen, imageSrc, imageAlt, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      // Track modal open
      if (window.performanceTracker) {
        window.performanceTracker.track("modal_open", Date.now(), {
          type: "image",
          image: imageAlt,
        });
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, imageAlt]);

  const handleClose = useCallback(() => {
    // Track modal close
    if (window.performanceTracker) {
      window.performanceTracker.track("modal_close", Date.now(), {
        type: "image",
      });
    }
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="image-modal"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Full size project image"
    >
      <div
        className="image-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="image-modal__close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          className="image-modal__image"
          loading="eager"
          priority={true}
          placeholder="blur"
        />
      </div>
    </div>
  );
});

// Add display name for debugging
ImageModal.displayName = "ImageModal";

// Filter Component with memoization
const ProjectFilter = memo(
  ({ categories, activeCategory, onCategoryChange }) => {
    const handleCategoryChange = useCallback(
      (category) => {
        // Track filter usage
        if (window.performanceTracker) {
          window.performanceTracker.track("filter_change", Date.now(), {
            from: activeCategory,
            to: category,
          });
        }
        onCategoryChange(category);
      },
      [activeCategory, onCategoryChange],
    );

    return (
      <div
        className="project-filter"
        role="tablist"
        aria-label="Project categories"
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              activeCategory === category ? "filter-button--active" : ""
            }`}
            onClick={() => handleCategoryChange(category)}
            role="tab"
            aria-selected={activeCategory === category}
            aria-controls="portfolio-grid"
          >
            {category}
          </button>
        ))}
      </div>
    );
  },
);

// Add display name for debugging
ProjectFilter.displayName = "ProjectFilter";

// Main Portfolio Component with performance optimizations
const Portfolio = memo(() => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalImage, setModalImage] = useState({
    isOpen: false,
    src: "",
    alt: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Track component mount
  useEffect(() => {
    if (window.performanceTracker) {
      window.performanceTracker.track("portfolio_loaded", Date.now());
    }

    // Use IntersectionObserver to only render when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("portfolio");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Enhanced portfolio items with additional metadata
  const enhancedPortfolioItems = useMemo(() => {
    return portfolioItems.map((item, index) => ({
      ...item,
      category: item.category || "Web Development",
      year: item.year || "2023",
      featured: index < 2, // Mark first two as featured
      technologies: item.technologies || ["React", "JavaScript", "CSS"],
      github: item.github || null,
    }));
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [
      "All",
      ...new Set(enhancedPortfolioItems.map((item) => item.category)),
    ];
    return cats;
  }, [enhancedPortfolioItems]);

  // Optimize search with debouncing
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleImageClick = useCallback((src, alt) => {
    setModalImage({ isOpen: true, src, alt });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalImage({ isOpen: false, src: "", alt: "" });
  }, []);

  // Memoize showcase components to prevent recreating on each render
  const showcaseComponents = useMemo(
    () => [
      {
        component: Timer,
        title: "Interactive Timer",
        description: "A customizable countdown timer",
      },
      {
        component: DarkMode,
        title: "Dark Mode Toggle",
        description: "Theme switching component",
      },
      {
        component: Progress,
        title: "Progress Tracker",
        description: "Animated progress indicators",
      },
    ],
    [],
  );

  // Filter items based on category and debounced search
  const filteredItems = useMemo(() => {
    return enhancedPortfolioItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [enhancedPortfolioItems, activeCategory, debouncedSearchTerm]);

  // Don't render until visible for better performance
  if (!isVisible) {
    return (
      <div
        id="portfolio"
        className="portfolio"
        style={{ minHeight: "100vh" }}
      />
    );
  }

  return (
    <div id="portfolio" className="portfolio">
      {/* Projects Section */}
      <section
        id="portfolio"
        className="portfolio__section"
        aria-labelledby="projects-heading"
      >
        <header className="section-header">
          <h2 id="projects-heading" className="section-title">
            Featured Projects
            <span className="section-subtitle">
              Building digital experiences that matter
            </span>
          </h2>
        </header>

        {/* Search and Filter */}
        <div className="portfolio__controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              aria-label="Search projects"
            />
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>
          </div>

          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Portfolio Grid */}
        <div
          className="portfolio__grid"
          id="portfolio-grid"
          role="region"
          aria-label="Project portfolio"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <PortfolioItem
                key={item.id}
                item={item}
                index={index}
                onImageClick={handleImageClick}
              />
            ))
          ) : (
            <div className="no-results">
              <p>No projects found matching your criteria.</p>
              <button
                className="reset-filters"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchTerm("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Components Showcase Section */}
      <section
        id="components"
        className="components-section"
        aria-labelledby="components-heading"
      >
        <header className="section-header">
          <h2 id="components-heading" className="section-title">
            Interactive Components
            <span className="section-subtitle">
              Reusable UI elements and widgets
            </span>
          </h2>
        </header>

        <div className="components-showcase">
          {showcaseComponents.map(
            ({ component: Component, title, description }, index) => (
              <article
                key={title}
                className="component-showcase-item"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <header className="component-header">
                  <h3 className="component-title">{title}</h3>
                  <p className="component-description">{description}</p>
                </header>
                <div className="component-wrapper">
                  <Component />
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalImage.isOpen}
        imageSrc={modalImage.src}
        imageAlt={modalImage.alt}
        onClose={handleCloseModal}
      />
    </div>
  );
});

// Add display name for debugging
Portfolio.displayName = "Portfolio";

export default Portfolio;
