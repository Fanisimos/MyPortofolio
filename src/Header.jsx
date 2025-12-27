import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "./Button.jsx";
import { Box, useMediaQuery } from "@mui/material";
import "./Header.css";

function Header({ onNavClick, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Scroll handler with hysteresis to prevent flickering
  useEffect(() => {
    let rafId = null;
    let currentState = false;
    
    const THRESHOLD_DOWN = 150;  // Scroll down past this to collapse
    const THRESHOLD_UP = 100;     // Scroll up above this to expand

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      
      // Hysteresis logic: different thresholds based on current state
      let newState;
      if (currentState) {
        // Currently collapsed - need to scroll above THRESHOLD_UP to expand
        newState = scrollY > THRESHOLD_UP;
      } else {
        // Currently expanded - need to scroll past THRESHOLD_DOWN to collapse
        newState = scrollY > THRESHOLD_DOWN;
      }
      
      if (newState !== currentState) {
        currentState = newState;
        setIsScrolled(newState);
      }
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollState);
      }
    };

    // Initial state
    updateScrollState();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Close mobile menu when section changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeSection]);

  const navigationItems = [
    {
      id: "about",
      label: "About",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ transform: "translate(-3px, 3px)" }}
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ transform: "translate(-3px, 3px)" }}
        >
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
      ),
    },
    {
      id: "skills",
      label: "Skills",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ transform: "translate(-3px, 3px)" }}
        >
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
        </svg>
      ),
    },
    {
      id: "contact",
      label: "Contact",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ transform: "translate(-3px, 3px)" }}
        >
          <path d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6V6H20V6Z" />
        </svg>
      ),
    },
  ];

  const handleNavigation = (sectionId) => {
    onNavClick(sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__container">
        {/* Hero Section with Geometric Design */}
        <Box className="header__hero-section">
          <div className="header__geometric-bg">
            <div className="geometric-shape geometric-shape--1"></div>
            <div className="geometric-shape geometric-shape--2"></div>
            <div className="geometric-shape geometric-shape--3"></div>
            <div className="geometric-shape geometric-shape--4"></div>
            <div className="geometric-shape geometric-shape--5"></div>
          </div>
          <div className="header__title-wrapper">
            <h1 className="header__title">
              <span className="header__title-main">Welcome To My</span>
              <span className="header__title-highlight">Portfolio</span>
            </h1>
            <p className="header__subtitle">
              Full-Stack Developer & AI Enthusiast
            </p>
            <div className="header__accent-line"></div>
          </div>
        </Box>

        {/* Navigation */}
        <nav
          className="header__nav"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              className={`mobile-menu-toggle ${
                isMobileMenuOpen ? "mobile-menu-toggle--open" : ""
              }`}
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}

          {/* Navigation List */}
          <ul
            className={`header__nav-list ${
              isMobileMenuOpen ? "header__nav-list--open" : ""
            }`}
          >
            {navigationItems.map((item, index) => (
              <li key={item.id} className="header__nav-item">
                <Button
                  onClick={() => handleNavigation(item.id)}
                  className={`header__nav-button ${
                    activeSection === item.id
                      ? "header__nav-button--active"
                      : ""
                  }`}
                  isActive={activeSection === item.id}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="nav-text">{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              className="mobile-menu-overlay"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}
        </nav>

        {/* Scroll Progress Indicator */}
        <div className="scroll-progress-container">
          <div
            className="scroll-progress-bar"
            style={{
              width: `${scrollProgress}%`,
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
