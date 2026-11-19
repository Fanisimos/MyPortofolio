import { useCallback } from "react";

/**
 * Returns an onPointerMove handler that writes the cursor position
 * into --mx / --my CSS variables on the hovered element.
 * Pair with the `.spotlight` class.
 */
export function useSpotlight() {
  return useCallback((e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
}
