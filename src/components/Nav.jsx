import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { nav, profile } from "../data/site";
import { scrollToId, setScrollLocked } from "../hooks/useSmoothScroll";
import { useActiveSection } from "../hooks/useActiveSection";
import { ArrowSwap } from "./icons";
import "./Nav.css";

const EASE = [0.22, 1, 0.36, 1];

export default function Nav({ onOpenCommand }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(nav.map((n) => n.id));

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 600 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    setScrollLocked(menuOpen);
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (id) => {
    setMenuOpen(false);
    // let the menu close (and unlock scroll) before scrolling
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "nav--scrolled" : ""}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: hidden ? 0 : 0.2 }}
      >
        <div className="nav__inner">
          <a
            href="#top"
            className="nav__brand"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
            aria-label={`${profile.name}, back to top`}
          >
            <span className="nav__mark" aria-hidden="true">
              {profile.initials}
            </span>
            <span className="nav__name">{profile.name}</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav__link ${active === item.id ? "is-active" : ""}`}
                aria-current={active === item.id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav__pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <button className="nav__cmd" onClick={onOpenCommand} aria-label="Open command menu">
              <span>Quick menu</span>
              <span className="kbd">⌘K</span>
            </button>
            <a
              href="#contact"
              className="btn btn--primary btn--sm nav__cta"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
            >
              Let&apos;s talk
              <ArrowSwap />
            </a>
            <button
              className={`nav__burger ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mmenu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav className="mmenu__links" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.id);
                  }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.05 }}
                >
                  <span className="mmenu__idx mono">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mmenu__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
