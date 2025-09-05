import {
  useState,
  useCallback,
  Suspense,
  lazy,
  memo,
  useEffect,
  useRef,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import ChatBot from "react-chatbotify";
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
  })
);

const Portfolio = lazy(() =>
  import("./Portfolio").catch((err) => {
    console.error("Failed to load Portfolio component:", err);
    return { default: () => <div>Failed to load Portfolio section</div> };
  })
);

const Contact = lazy(() =>
  import("./Contact").catch((err) => {
    console.error("Failed to load Contact component:", err);
    return { default: () => <div>Failed to load Contact section</div> };
  })
);

const TechStack = lazy(() =>
  import("./TechStack").catch((err) => {
    console.error("Failed to load TechStack component:", err);
    return { default: () => <div>Failed to load Skills section</div> };
  })
);

// Memoized section components to prevent unnecessary re-renders
const MemoizedAbout = memo(About);
const MemoizedPortfolio = memo(Portfolio);
const MemoizedContact = memo(Contact);
const MemoizedTechStack = memo(TechStack);

const App = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isLoading, setIsLoading] = useState(true);

  // Personalization profile for the chatbot
  const profileRef = useRef({});
  const updateProfile = (patch) => {
    Object.assign(profileRef.current, patch);
  };

  // Rich, personalized chatbot flow (inside component so it can use refs)
  const flow = {
    start: {
      message: "Hey! I'm Tzoni's assistant 🤖 — what's your first name?",
      function: (params) => {
        updateProfile({ name: params.userInput?.trim() });
        params.injectMessage(`Nice to meet you, ${params.userInput}!`);
      },
      path: "ask_role",
    },
    ask_role: {
      message: (params) =>
        `Great, ${
          profileRef.current.name || "friend"
        }! What describes you best today?`,
      options: ["Recruiter", "Client", "Developer", "Just browsing"],
      chatDisabled: true,
      function: (params) => updateProfile({ persona: params.userInput }),
      path: "ask_goal",
    },
    ask_goal: {
      message: (params) =>
        `Awesome. What's your goal right now, ${params.userInput}!`,
      options: [
        "See Projects",
        "Check Skills",
        "Contact",
        "About Tzoni",
        "AI Interests",
        "Project Deep Dive",
        "Profile Summary",
        "Availability",
      ],
      chatDisabled: true,
      path: (params) => {
        switch (params.userInput) {
          case "See Projects":
            return "projects";
          case "Check Skills":
            return "skills";
          case "Contact":
            return "contact";
          case "About Tzoni":
            return "about";
          case "AI Interests":
            return "ai_interests";
          case "Project Deep Dive":
            return "project_menu";
          case "Profile Summary":
            return "summary";
          case "Availability":
            return "availability";
          default:
            return "ask_goal";
        }
      },
    },
    // Existing informative blocks tuned to the portfolio theme
    about: {
      message:
        "Tzoni is a Computer Science & Artificial Intelligence student at Kingston University, expecting to graduate in 2029. Tzoni loves building fast, accessible UIs and smart systems. Want to see experience, education, or jump to projects?",
      options: ["Experience", "Education", "Projects", "Main Menu"],
      chatDisabled: true,
      path: (params) => {
        switch (params.userInput) {
          case "Experience":
            return "experience";
          case "Education":
            return "education";
          case "Projects":
            return "projects";
          case "Main Menu":
            return "greet_user";
          default:
            return "about";
        }
      },
    },
    education: {
      message:
        "Tzoni studies at Kingston University (expected graduation: 2029) and stays current by shipping projects and iterating fast — learning by doing. Curious about the stack Tzoni uses most?",
      options: ["Skills", "Projects", "Main Menu"],
      chatDisabled: true,
      path: (params) => {
        switch (params.userInput) {
          case "Skills":
            return "skills";
          case "Projects":
            return "projects";
          case "Main Menu":
            return "greet_user";
          default:
            return "education";
        }
      },
    },
    experience: {
      message:
        "Tzoni has hands-on experience with React, JavaScript, Node, and more — and loves crafting smooth UX with solid performance. Want to see examples?",
      options: ["Projects", "Skills", "Main Menu"],
      chatDisabled: true,
      path: (params) => {
        switch (params.userInput) {
          case "Projects":
            return "projects";
          case "Skills":
            return "skills";
          case "Main Menu":
            return "greet_user";
          default:
            return "experience";
        }
      },
    },
    projects: {
      message:
        "Tzoni's featured work includes Forkify, Mapty, PlumbingbyArmando, and FarAway. Want a quick tech rundown or contact info?",
      options: ["Skills", "Contact", "Main Menu"],
      chatDisabled: true,
      path: (params) => {
        switch (params.userInput) {
          case "Skills":
            return "skills";
          case "Contact":
            return "contact";
          case "Main Menu":
            return "greet_user";
          default:
            return "projects";
        }
      },
    },
    skills: {
      message:
        "Tzoni's toolkit includes React, JavaScript, HTML/CSS, Tailwind, Node.js, Express, MySQL, Git/GitHub, Vite, VS Code, plus some Python.",
      options: ["Projects", "Contact", "Main Menu"],
      chatDisabled: true,
      path: (params) => {
        switch (params.userInput) {
          case "Projects":
            return "projects";
          case "Contact":
            return "contact";
          case "Main Menu":
            return "greet_user";
          default:
            return "skills";
        }
      },
    },
    contact: {
      message:
        "Reach out via the Contact section — Tzoni usually replies within 24 hours. Want links to skills or projects?",
      options: ["Projects", "Skills", "Main Menu"],
      chatDisabled: true,
      path: (params) => {
        switch (params.userInput) {
          case "Projects":
            return "projects";
          case "Skills":
            return "skills";
          case "Main Menu":
            return "greet_user";
          default:
            return "contact";
        }
      },
    },
    ai_interests: {
      message:
        "Which AI areas excite you most? Pick 1–3 and I'll tailor suggestions.",
      checkboxes: {
        items: [
          "NLP",
          "Computer Vision",
          "Reinforcement Learning",
          "MLOps",
          "Data Science",
        ],
        min: 1,
        max: 3,
      },
      chatDisabled: true,
      function: (params) => updateProfile({ aiInterests: params.userInput }),
      path: "summary",
    },
    project_menu: {
      message: "Pick a project to learn more:",
      options: [
        "Forkify",
        "Mapty",
        "PlumbingbyArmando",
        "FarAway",
        "Back to Menu",
      ],
      chatDisabled: true,
      path: (params) => {
        switch (params.userInput) {
          case "Forkify":
            return "project_forkify";
          case "Mapty":
            return "project_mapty";
          case "PlumbingbyArmando":
            return "project_plumbing";
          case "FarAway":
            return "project_faraway";
          case "Back to Menu":
            return "greet_user";
          default:
            return "project_menu";
        }
      },
    },
    project_forkify: {
      message:
        "Forkify: A recipe search and bookmarking app built by Tzoni — clean UI/UX, async API usage, and state management.",
      options: [
        "View Portfolio Section",
        "Tech Skills",
        "Back to Projects",
        "Main Menu",
      ],
      chatDisabled: true,
      function: (params) => {
        if (params.userInput === "View Portfolio Section") {
          // open portfolio area
          try {
            setActiveSection && setActiveSection("portfolio");
          } catch {}
        }
      },
      path: (params) => {
        switch (params.userInput) {
          case "Tech Skills":
            return "skills";
          case "Back to Projects":
            return "project_menu";
          case "Main Menu":
            return "greet_user";
          default:
            return "project_forkify";
        }
      },
    },
    project_mapty: {
      message:
        "Mapty: A workout tracker on a map (Leaflet), created by Tzoni — geolocation, persistent data, and a snappy UI.",
      options: [
        "View Portfolio Section",
        "Tech Skills",
        "Back to Projects",
        "Main Menu",
      ],
      chatDisabled: true,
      function: (params) => {
        if (params.userInput === "View Portfolio Section") {
          try {
            setActiveSection && setActiveSection("portfolio");
          } catch {}
        }
      },
      path: (params) => {
        switch (params.userInput) {
          case "Tech Skills":
            return "skills";
          case "Back to Projects":
            return "project_menu";
          case "Main Menu":
            return "greet_user";
          default:
            return "project_mapty";
        }
      },
    },
    project_plumbing: {
      message:
        "PlumbingbyArmando: A professional business site designed and built by Tzoni — clean layout, SEO-aware, and fast-loading.",
      options: [
        "View Portfolio Section",
        "Tech Skills",
        "Back to Projects",
        "Main Menu",
      ],
      chatDisabled: true,
      function: (params) => {
        if (params.userInput === "View Portfolio Section") {
          try {
            setActiveSection && setActiveSection("portfolio");
          } catch {}
        }
      },
      path: (params) => {
        switch (params.userInput) {
          case "Tech Skills":
            return "skills";
          case "Back to Projects":
            return "project_menu";
          case "Main Menu":
            return "greet_user";
          default:
            return "project_plumbing";
        }
      },
    },
    project_faraway: {
      message:
        "FarAway: A travel packing checklist built by Tzoni — thoughtful UX, data persistence, and component composition.",
      options: [
        "View Portfolio Section",
        "Tech Skills",
        "Back to Projects",
        "Main Menu",
      ],
      chatDisabled: true,
      function: (params) => {
        if (params.userInput === "View Portfolio Section") {
          try {
            setActiveSection && setActiveSection("portfolio");
          } catch {}
        }
      },
      path: (params) => {
        switch (params.userInput) {
          case "Tech Skills":
            return "skills";
          case "Back to Projects":
            return "project_menu";
          case "Main Menu":
            return "greet_user";
          default:
            return "project_faraway";
        }
      },
    },
    availability: {
      message: "Are you currently open for any of the following?",
      options: ["Internships", "Freelance", "Open Source", "Just Exploring"],
      chatDisabled: true,
      function: (params) => updateProfile({ availability: params.userInput }),
      path: "summary",
    },
  };

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
        "(prefers-reduced-motion: reduce)"
      ).matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [activeSection]
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
    [activeSection]
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

        {/* Global ChatBot */}
        <ChatBot
          flow={flow}
          settings={{
            general: {
              primaryColor: "#667eea",
              secondaryColor: "#764ba2",
              fontSize: 17,
            },
            chatHistory: { storageKey: "tzoni_portfolio_chat" },
            chatButton: { icon: "💬" },
          }}
        />

        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
