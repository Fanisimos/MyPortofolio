import { useState, useCallback, Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./Header";
import Footer from "./Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorFallback from "./components/ErrorFallback";
import "./App.css";

// Lazy load components for better performance
const About = lazy(() => import("./About"));
const Portfolio = lazy(() => import("./Portfolio"));
const Contact = lazy(() => import("./Contact"));
const TechStack = lazy(() => import("./TechStack"));

const App = () => {
  const [activeSection, setActiveSection] = useState("about");

  // Memoize the navigation handler to prevent unnecessary re-renders
  const handleNavClick = useCallback((section) => {
    setActiveSection(section);
    // Add smooth scroll to top when switching sections
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderActiveSection = () => {
    const sectionMap = {
      about: <About />,
      portfolio: <Portfolio />,
      contact: <Contact />,
      skills: <TechStack />,
    };

    return sectionMap[activeSection] || <About />;
  };

  return (
    <div className="app">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header onNavClick={handleNavClick} activeSection={activeSection} />

        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <div key={activeSection} className="section-container fade-in">
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
