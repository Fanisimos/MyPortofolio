import { useEffect } from "react";
import Lenis from "lenis";

let lenis = null;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Mounts Lenis smooth scrolling once for the whole app, and honours /#section deep links. */
export function useSmoothScroll() {
  useEffect(() => {
    if (!prefersReducedMotion()) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        autoRaf: true,
      });
    }

    // Deep links: jump to the section once the app has rendered
    const id = decodeURIComponent(window.location.hash.slice(1));
    const t = id ? setTimeout(() => scrollToId(id, { immediate: true }), 60) : null;

    return () => {
      clearTimeout(t);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

/** Scroll to a section by id (or to the very top with "top"). */
export function scrollToId(id, { immediate = false } = {}) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: id === "top" ? 0 : -24, immediate });
    return;
  }

  const behavior = immediate || prefersReducedMotion() ? "auto" : "smooth";
  if (target === 0) window.scrollTo({ top: 0, behavior });
  else target.scrollIntoView({ behavior });
}

/** Pause/resume page scroll (used by overlays). */
export function setScrollLocked(locked) {
  if (lenis) {
    locked ? lenis.stop() : lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
