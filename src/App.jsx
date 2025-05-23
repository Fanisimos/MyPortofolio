import { useState } from "react";
import Portofolio from "./Portofolio";
import Header from "./Header";
import Footer from "./Footer";
import Contact from "./Contact";
import About from "./About";
import TechStack from "./TechStack";
import "./App.css";

const App = () => {
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div>
      <Header onNavClick={setActiveSection} activeSection={activeSection} />
      <div key={activeSection} className="fade-in">
        {activeSection === "about" && <About />}
        {activeSection === "portofolio" && <Portofolio />}
        {activeSection === "contact" && <Contact />}
        {activeSection === "skills" && <TechStack />}
      </div>
      <Footer />
    </div>
  );
};

export default App;
