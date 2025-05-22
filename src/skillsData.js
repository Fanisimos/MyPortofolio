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
  { name: "React", icon: reactIcon, bg: "#61dafb" },
  { name: "JavaScript", icon: jsIcon, bg: "#f7df1e" },
  { name: "Node.js", icon: nodeIcon, bg: "#3c873a" },
  { name: "Express", icon: expressIcon, bg: "#ffffff" }, // White for light theme
  { name: "Tailwind CSS", icon: tailwindIcon, bg: "#38bdf8" },
  { name: "HTML5", icon: htmlIcon, bg: "#e34c26" },
  { name: "CSS3", icon: cssIcon, bg: "#264de4" },
  { name: "Git", icon: gitIcon, bg: "#f05032" },
  { name: "GitHub", icon: githubIcon, bg: "#bcc0c4" },
  { name: "MySQL", icon: MySQL, bg: "#00758f" },
  { name: "Python (basic)", icon: pythonIcon, bg: "#3776ab" },
];

console.log(techStack);

export default techStack;
