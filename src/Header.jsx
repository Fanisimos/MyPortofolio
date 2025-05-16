import { Button } from "./Button.jsx";

function Header({ onNavClick, activeSection }) {
  return (
    <header>
      <h1>Welcome To My Portfolio</h1>
      <nav>
        <ul>
          <li>
            <Button
              onClick={() => onNavClick("portofolio")}
              isActive={activeSection === "portofolio"}
            >
              Portofolio
            </Button>
          </li>
          <li>
            <Button
              onClick={() => onNavClick("contact")}
              isActive={activeSection === "contact"}
            >
              Contact
            </Button>
          </li>
          <li>
            <Button
              onClick={() => onNavClick("about")}
              isActive={activeSection === "about"}
            >
              About
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
