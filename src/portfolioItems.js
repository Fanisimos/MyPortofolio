import FarAway from "./assets/FarAway.png";
import Forkify from "./assets/Forkify.png";
import Mapty from "./assets/Mapty.png";
import PlumbingbyArmando from "./assets/PlumbingbyArmando.png";

const portfolioItems = [
  {
    id: 1,
    title: "FarAway",
    description:
      "A comprehensive travel planning application built with React. Features include itinerary management, packing lists, and destination guides to help organize your perfect trip.",
    image: FarAway,
    link: "https://tzoni-thefaraway.netlify.app/",
    category: "Web Development",
    year: "2023",
    technologies: ["React", "JavaScript", "CSS3", "Netlify"],
    github: "https://github.com/yourusername/faraway",
    featured: true,
    status: "Live",
  },
  {
    id: 2,
    title: "Forkify",
    description:
      "A modern recipe search and management application with thousands of recipes. Features include advanced search, bookmarking, and custom recipe creation with an intuitive user interface.",
    image: Forkify,
    link: "https://forkify-tzoni.netlify.app/",
    category: "Web Development",
    year: "2023",
    technologies: ["JavaScript", "HTML5", "SCSS", "Webpack", "API Integration"],
    github: "https://github.com/yourusername/forkify",
    featured: true,
    status: "Live",
  },
  {
    id: 3,
    title: "Mapty",
    description:
      "An interactive map-based workout tracking application. Log your running and cycling workouts with GPS coordinates, track your progress, and visualize your fitness journey on an interactive map.",
    image: Mapty,
    link: "https://tzoni-mapty-v2-yourworkoutapp.netlify.app/",
    category: "Web Development",
    year: "2023",
    technologies: [
      "JavaScript",
      "Leaflet.js",
      "Geolocation API",
      "Local Storage",
      "OOP",
    ],
    github: "https://github.com/yourusername/mapty",
    featured: false,
    status: "Live",
  },
  {
    id: 4,
    title: "Plumbing by Armando",
    description:
      "A professional business portfolio website for a plumbing service company. Features responsive design, service showcases, contact forms, and SEO optimization for local business visibility.",
    image: PlumbingbyArmando,
    link: "https://plumbingbyarmando.com/",
    category: "Business Website",
    year: "2023",
    technologies: ["HTML5", "CSS3", "JavaScript", "SEO", "Responsive Design"],
    github: null, // Private client project
    featured: false,
    status: "Live",
  },
];

export default portfolioItems;
