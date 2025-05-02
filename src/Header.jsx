import { Button } from "./Button.jsx";

function Header({ onNavClick, activeSection }) {
  return (
    <header>
      <h1>Welcome To My Portfolio</h1>
      <nav>
        <ul>
          <Button
            onClick={() => onNavClick("about")}
            isActive={activeSection === "about"}
          >
            About
          </Button>
          <Button
            onClick={() => onNavClick("portofolio")}
            isActive={activeSection === "portofolio"}
          >
            Projects
          </Button>
          <Button
            onClick={() => onNavClick("contact")}
            isActive={activeSection === "contact"}
          >
            Contact
          </Button>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
