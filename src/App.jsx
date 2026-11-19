import { useState } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import Nav from "./components/Nav";
import CommandMenu from "./components/CommandMenu";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Stack from "./sections/Stack";
import Contact from "./sections/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  useSmoothScroll();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Nav onOpenCommand={() => setCmdOpen(true)} />

      <main id="main">
        <Hero />
        <Work />
        <About />
        <Experience />
        <Stack />
        <Contact />
      </main>

      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} />
    </MotionConfig>
  );
}
