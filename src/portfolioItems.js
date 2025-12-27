import FarAway from "./assets/FarAway.png";
import Forkify from "./assets/Forkify.png";
import Mapty from "./assets/Mapty.png";
import inkNfiber from "./assets/inkNfiber.png";

const portfolioItems = [
  {
    id: 1,
    title: "inkNfiber",
    description:
      "A premium full-stack e-commerce platform for custom apparel with interactive product designer using Fabric.js. Features include custom design tools, B2B portal, secure checkout with Stripe, order management, and admin dashboard. Built with Next.js 14, TypeScript, and PostgreSQL with comprehensive Row Level Security.",
    image: inkNfiber,
    link: "https://inknfiber.com/",
    category: "Web Development",
    year: "2025",
    technologies: ["Next.js 14", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL", "Stripe", "Clerk Auth", "Fabric.js", "Zustand", "Cloudinary"],
    github: null,
    featured: true,
    status: "Live",
  },
  {
    id: 2,
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
    id: 3,
    title: "Forkify",
    description:
      "A modern recipe search and management application with thousands of recipes. Features include advanced search, bookmarking, and custom recipe creation with an intuitive user interface.",
    image: Forkify,
    link: "https://forkify-tzoni.netlify.app/",
    category: "Web Development",
    year: "2024",
    technologies: ["JavaScript", "HTML5", "SCSS", "Webpack", "API Integration"],
    github: "https://github.com/yourusername/forkify",
    featured: true,
    status: "Live",
  },
  {
    id: 4,
    title: "Mapty",
    description:
      "An interactive map-based workout tracking application. Log your running and cycling workouts with GPS coordinates, track your progress, and visualize your fitness journey on an interactive map.",
    image: Mapty,
    link: "https://tzoni-mapty-v2-yourworkoutapp.netlify.app/",
    category: "Web Development",
    year: "2024",
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
];

export default portfolioItems;
