// Single source of truth for all site copy & content.
// Edit this file to update anything you see on the page.

import kleinoraImg from "../assets/work/kleinora.jpg";
import inknfiberImg from "../assets/work/inknfiber.jpg";
import forkifyImg from "../assets/work/forkify.jpg";
import maptyImg from "../assets/work/mapty.jpg";
import farAwayImg from "../assets/work/faraway.jpg";

import nextIcon from "../assets/icons/nextdotjs.svg";
import reactIcon from "../assets/icons/react.svg";
import tsIcon from "../assets/icons/typescript.svg";
import jsIcon from "../assets/icons/javascript.svg";
import tailwindIcon from "../assets/icons/tailwindcss.svg";
import nodeIcon from "../assets/icons/nodedotjs.svg";
import postgresIcon from "../assets/icons/postgresql.svg";
import prismaIcon from "../assets/icons/prisma.svg";
import stripeIcon from "../assets/icons/stripe.svg";
import elevenIcon from "../assets/icons/elevenlabs.svg";
import netlifyIcon from "../assets/icons/netlify.svg";
import gitIcon from "../assets/icons/git.svg";
import githubIcon from "../assets/icons/github.svg";
import htmlIcon from "../assets/icons/html5.svg";
import cssIcon from "../assets/icons/css.svg";

export const profile = {
  name: "Tzoni Litsai",
  firstName: "Tzoni",
  initials: "TL",
  role: "Software developer",
  company: "LitsAI Technologies",
  companyHref: "https://litsaitechnologies.com/work",
  location: "London, UK",
  timezone: "Europe/London",
  email: "tzonilitsai@icloud.com",
  availability: "Taking on new projects",
  socials: [
    { label: "GitHub", href: "https://github.com/Fanisimos" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tzoni-litsai-00027a218" },
    { label: "LitsAI", href: "https://litsaitechnologies.com/work" },
  ],
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export const projects = [
  {
    id: "kleinora",
    title: "Kleinora",
    kind: "Booking SaaS · AI receptionist",
    role: "Founder & Lead Developer",
    summary:
      "A multi-tenant booking platform where service businesses run appointments, staff, services and customers on their own. It also answers the phone.",
    highlights: [
      "Greek-language AI voice receptionist (Vapi + ElevenLabs) that checks live availability and books appointments",
      "Booking workflows and business dashboards wired to real appointment data",
      "Multi-tenant architecture, deployed on Netlify",
    ],
    tags: ["Next.js", "Vapi", "ElevenLabs", "Netlify"],
    image: kleinoraImg,
    href: "https://www.kleinora.com",
    domain: "kleinora.com",
    accent: "#2dd4bf",
  },
  {
    id: "inknfiber",
    title: "inkNfiber",
    kind: "Full-stack e-commerce · US client",
    role: "Lead Developer",
    summary:
      "End-to-end commerce for a US custom-apparel brand: storefront, customer accounts, admin, inventory, orders and Stripe checkout.",
    highlights: [
      "Fabric.js product customisation editor with careful focus, hover and disabled states",
      "B2B wholesale workflows and responsive sales charts",
      "Reusable UI component system on a typed Prisma + PostgreSQL backend",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Clerk", "Fabric.js", "Tailwind"],
    image: inknfiberImg,
    href: "https://inknfiber.com",
    domain: "inknfiber.com",
    accent: "#f43f5e",
  },
  {
    id: "workshopconnect",
    title: "WorkshopConnect",
    kind: "Attendance MVP · University",
    role: "Lead Developer",
    summary:
      "Workshop attendance with separate organiser and student journeys, confirmed by scanning a QR code.",
    highlights: [
      "Led an MVP built with AI-assisted development",
      "Automated end-to-end tests plus coordinated manual checks across both roles",
      "Set test steps and readiness criteria for the team",
    ],
    tags: ["AI-assisted dev", "E2E testing", "QR flows"],
    image: null, // rendered as a custom visual
    href: null,
    domain: "University project",
    accent: "#d4ff4f",
  },
];

export const archive = [
  { title: "Forkify", kind: "Recipe search & bookmarking", year: "2024", href: "https://forkify-tzoni.netlify.app/", image: forkifyImg },
  { title: "Mapty", kind: "Map-based workout tracker", year: "2024", href: "https://tzoni-mapty-v2-yourworkoutapp.netlify.app/", image: maptyImg },
  { title: "FarAway", kind: "Trip packing list in React", year: "2023", href: "https://tzoni-thefaraway.netlify.app/", image: farAwayImg },
];

export const stats = [
  { value: "2022", label: "Shipping production code since" },
  { value: "UK + US", label: "Businesses served" },
  { value: "3", label: "Live client & SaaS products" },
  { value: "4", label: "Languages spoken" },
];

export const languages = [
  { word: "Hello", lang: "English", level: "Fluent" },
  { word: "Γεια σου", lang: "Greek", level: "Native" },
  { word: "Përshëndetje", lang: "Albanian", level: "Native" },
  { word: "Hallo", lang: "German", level: "Basic" },
];

export const principles = [
  { title: "Idea → production", body: "Requirements, build, testing and deployment, owned end to end." },
  { title: "Talk to the client", body: "Direct communication, shared previews, fast feedback loops." },
  { title: "Details compound", body: "Focus states, proportions, hierarchy. The last 5% is what people feel." },
];

export const experience = [
  {
    when: "Jan 2026 — Now",
    title: "Founder & Lead Developer",
    org: "LitsAI Technologies",
    where: "Freelance · UK & US",
    body: "I build custom software and AI-integrated systems for businesses, connecting what users need with interfaces, application logic and third-party services. Clients include inkNfiber and energV.",
    current: true,
  },
  {
    when: "2026 / 27",
    title: "CSM Teaching Support Assistant",
    org: "Kingston University",
    where: "London",
    body: "I help undergraduates through mathematics, numerical methods, MATLAB, RStudio and programming, making difficult material click.",
    current: true,
  },
  {
    when: "Jan 2024 — Jul 2025",
    title: "IT Support Technician",
    org: "Keltbray",
    where: "Greater London",
    body: "Ran support through ServiceNow, administered Active Directory and licences, and automated deployments with PowerShell and Intune.",
  },
  {
    when: "Nov 2022 — Jul 2025",
    title: "Frontend Developer",
    org: "Encodeit",
    where: "Athens · Remote",
    body: "Built web projects with the engineering team using TypeScript, WordPress and REST APIs, and helped trace and fix a checkout delivery-charge bug.",
  },
];

export const education = {
  when: "2025 — 2028",
  title: "BSc Computer Science & Artificial Intelligence",
  org: "Kingston University",
  note: "Expected completion: summer 2028",
};

export const stack = [
  { name: "Next.js", icon: nextIcon, group: "Product" },
  { name: "React", icon: reactIcon, group: "Product" },
  { name: "TypeScript", icon: tsIcon, group: "Product" },
  { name: "JavaScript", icon: jsIcon, group: "Product" },
  { name: "Tailwind CSS", icon: tailwindIcon, group: "Product" },
  { name: "HTML", icon: htmlIcon, group: "Product" },
  { name: "CSS", icon: cssIcon, group: "Product" },
  { name: "Node.js", icon: nodeIcon, group: "Data" },
  { name: "PostgreSQL", icon: postgresIcon, group: "Data" },
  { name: "Prisma", icon: prismaIcon, group: "Data" },
  { name: "Stripe", icon: stripeIcon, group: "Data" },
  { name: "Vapi", icon: null, group: "AI & voice" },
  { name: "ElevenLabs", icon: elevenIcon, group: "AI & voice" },
  { name: "Netlify", icon: netlifyIcon, group: "Delivery" },
  { name: "Git", icon: gitIcon, group: "Delivery" },
  { name: "GitHub", icon: githubIcon, group: "Delivery" },
];

export const stackGroups = [
  { id: "Product", label: "Product engineering", note: "Interfaces, components, dashboards" },
  { id: "Data", label: "Data & integrations", note: "SQL, schemas, REST APIs, payments" },
  { id: "AI & voice", label: "AI & voice", note: "Conversational agents" },
  { id: "Delivery", label: "Delivery", note: "Versioning, CI, deploys, E2E tests" },
];

// Quick answers shown in the ⌘K command menu
export const faq = [
  {
    q: "What does Tzoni do?",
    a: "Tzoni is the founder and lead developer of LitsAI Technologies, building SaaS, e-commerce and AI-integrated products for UK and US businesses.",
  },
  {
    q: "What has Tzoni shipped?",
    a: "Kleinora (a multi-tenant booking SaaS with a Greek-language AI receptionist), inkNfiber (full-stack e-commerce for a US client) and WorkshopConnect (a QR attendance MVP).",
  },
  {
    q: "What's the stack?",
    a: "Next.js, React and TypeScript with Tailwind on the front end; PostgreSQL and Prisma for data; Stripe, Vapi and ElevenLabs for payments and voice AI; deployed on Netlify.",
  },
  {
    q: "Is Tzoni studying?",
    a: "Yes. BSc Computer Science & AI at Kingston University, finishing summer 2028. Tzoni also works there as a teaching support assistant.",
  },
  {
    q: "Is Tzoni available?",
    a: "Yes, for new client projects and collaborations. Email is the fastest route.",
  },
];
