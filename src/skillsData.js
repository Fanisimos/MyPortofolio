// src/data/techStackData.js
import reactIcon from "./assets/icons/react.svg";
import jsIcon from "./assets/icons/javascript.svg";
import nodeIcon from "./assets/icons/nodedotjs.svg";
import tailwindIcon from "./assets/icons/tailwindcss.svg";
import htmlIcon from "./assets/icons/html5.svg";
import cssIcon from "./assets/icons/css.svg";
import gitIcon from "./assets/icons/git.svg";
import githubIcon from "./assets/icons/github.svg";
import MySQL from "./assets/icons/mysql.svg";
import expressIcon from "./assets/icons/express.svg";
import pythonIcon from "./assets/icons/python.svg";

const techStack = [
  {
    name: "React",
    icon: reactIcon,
    bg: "#61dafb",
    description: "A JavaScript library for building user interfaces",
    link: "https://react.dev/",
  },
  {
    name: "JavaScript",
    icon: jsIcon,
    bg: "#f7df1e",
    description: "High-level programming language for web development",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "Node.js",
    icon: nodeIcon,
    bg: "#3c873a",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    link: "https://nodejs.org/",
  },
  {
    name: "Express",
    icon: expressIcon,
    bg: "#ffffff",
    description: "Fast, unopinionated web framework for Node.js",
    link: "https://expressjs.com/",
  },
  {
    name: "Tailwind CSS",
    icon: tailwindIcon,
    bg: "#38bdf8",
    description: "Utility-first CSS framework for rapid UI development",
    link: "https://tailwindcss.com/",
  },
  {
    name: "HTML5",
    icon: htmlIcon,
    bg: "#e34c26",
    description: "Markup language for creating web pages and applications",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS3",
    icon: cssIcon,
    bg: "#264de4",
    description: "Style sheet language for describing document presentation",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "Git",
    icon: gitIcon,
    bg: "#f05032",
    description: "Distributed version control system for tracking changes",
    link: "https://git-scm.com/",
  },
  {
    name: "GitHub",
    icon: githubIcon,
    bg: "#bcc0c4",
    description: "Web-based platform for version control and collaboration",
    link: "https://github.com/",
  },
  {
    name: "MySQL",
    icon: MySQL,
    bg: "#00758f",
    description: "Open-source relational database management system",
    link: "https://dev.mysql.com/doc/",
  },
  {
    name: "Python",
    icon: pythonIcon,
    bg: "#3776ab",
    description:
      "High-level programming language for general-purpose programming",
    link: "https://docs.python.org/",
  },
];

console.log(techStack);

export default techStack;
