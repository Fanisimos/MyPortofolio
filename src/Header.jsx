import { Button } from "./Button.jsx";
import { Box } from "@mui/material";
import "./Header.css";
import logo from "./assets/logo.png";

function Header({ onNavClick, activeSection }) {
  return (
    <header>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          alt="logo"
          className="img-header"
          id="pictureReversed"
        />
        <h1>Welcome To My Portfolio</h1>
        <img src={logo} alt="logo" className="img-header" />
      </Box>
      <nav>
        <ul>
          <li>
            <Button
              onClick={() => onNavClick("about")}
              className={activeSection === "about" ? "active" : ""}
              isActive={activeSection === "about"}
            >
              About
            </Button>
          </li>
          <li>
            <Button
              onClick={() => onNavClick("portofolio")}
              className={activeSection === "portofolio" ? "active" : ""}
              isActive={activeSection === "portofolio"}
            >
              Portofolio
            </Button>
          </li>
          <li>
            <Button
              onClick={() => onNavClick("contact")}
              className={activeSection === "contact" ? "active" : ""}
              isActive={activeSection === "contact"}
            >
              Contact
            </Button>
          </li>

          <li>
            <Button
              onClick={() => onNavClick("skills")}
              className={activeSection === "skills" ? "active" : ""}
              isActive={activeSection === "skills"}
            >
              Skills
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
