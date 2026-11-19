import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const EASE = [0.22, 1, 0.36, 1];

/** Fades + lifts + unblurs its children when they scroll into view. */
export function Reveal({ children, delay = 0, y = 28, as = "div", className, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/**
 * Masked word-by-word headline reveal.
 * Syntax: "\n" breaks a line, *word* renders in the italic serif.
 */
export function WordReveal({ text, as = "h2", className, delay = 0, stagger = 0.06, immediate = false }) {
  const Comp = motion[as];
  const lines = text.split("\n");
  let i = 0;
  let inSerif = false; // *...* may span several words

  const trigger = immediate
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Comp className={className} {...trigger} aria-label={text.replace(/\*/g, "").replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="wr-line" aria-hidden="true">
          {line.split(" ").map((raw, wi) => {
            const opens = raw.startsWith("*");
            const closes = raw.endsWith("*") && (raw.length > 1 || inSerif);
            const serif = inSerif || opens;
            const word = raw.replace(/^\*|\*$/g, "");
            inSerif = (inSerif || opens) && !closes;
            const index = i++;
            return (
              <span key={wi}>
                <span className="wr-mask">
                  <motion.span
                    className={`wr-word${serif ? " serif" : ""}`}
                    variants={{
                      hidden: { y: "105%", rotate: 4, opacity: 0 },
                      show: {
                        y: "0%",
                        rotate: 0,
                        opacity: 1,
                        transition: { duration: 1.1, ease: EASE, delay: delay + index * stagger },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {/* space lives outside the mask so it isn't collapsed */}
                {wi < line.split(" ").length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </Comp>
  );
}

/** Pulls its child towards the cursor while hovered. */
export function Magnetic({ children, strength = 0.35, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
