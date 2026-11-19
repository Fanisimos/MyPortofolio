import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faq, nav, profile } from "../data/site";
import { scrollToId, setScrollLocked } from "../hooks/useSmoothScroll";
import { useCopyEmail } from "../hooks/useCopyEmail";
import { ArrowUpRight, Copy, Hash, Search, Sparkle } from "./icons";
import "./CommandMenu.css";

const EASE = [0.22, 1, 0.36, 1];

export default function CommandMenu({ open, onOpenChange }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [copied, copy] = useCopyEmail();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const returnFocus = useRef(null);

  const close = () => onOpenChange(false);

  const items = useMemo(
    () => [
      ...nav.map((n) => ({
        group: "Navigate",
        label: `Go to ${n.label}`,
        icon: <Hash />,
        run: () => {
          close();
          setTimeout(() => scrollToId(n.id), 120);
        },
      })),
      {
        group: "Actions",
        label: copied ? "Copied to clipboard ✓" : "Copy email address",
        hint: profile.email,
        icon: <Copy />,
        run: () => copy(),
      },
      ...profile.socials.map((s) => ({
        group: "Actions",
        label: `Open ${s.label}`,
        icon: <ArrowUpRight />,
        run: () => {
          window.open(s.href, "_blank", "noopener,noreferrer");
          close();
        },
      })),
      ...faq.map((f) => ({
        group: "Ask",
        label: f.q,
        icon: <Sparkle />,
        run: () => setAnswer(f),
      })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.group} ${i.label} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  // Global shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  // Lock scroll, reset & focus when opened
  useEffect(() => {
    setScrollLocked(open);
    if (open) {
      returnFocus.current = document.activeElement;
      setQuery("");
      setCursor(0);
      setAnswer(null);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      returnFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  // Keep active row visible
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      answer ? setAnswer(null) : close();
    } else if (answer && e.key === "Backspace" && !query) {
      setAnswer(null);
    } else if (!answer && e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (!answer && e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (!answer && e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.run();
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus in the dialog
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            className="cmdk__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: 0.96, y: -12, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: EASE }}
            onKeyDown={onKeyDown}
          >
            <div className="cmdk__search">
              <Search />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setAnswer(null);
                }}
                placeholder={answer ? "Press Esc to go back" : "Search, jump or ask about Tzoni…"}
                aria-label="Search commands"
                aria-controls="cmdk-list"
                aria-activedescendant={answer ? undefined : `cmdk-${cursor}`}
                role="combobox"
                aria-expanded="true"
              />
              <span className="kbd">esc</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {answer ? (
                <motion.div
                  key="answer"
                  className="cmdk__answer"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <button className="cmdk__back" onClick={() => setAnswer(null)}>
                    ← Back
                  </button>
                  <p className="cmdk__q">{answer.q}</p>
                  <p className="cmdk__a">{answer.a}</p>
                </motion.div>
              ) : (
                <motion.ul
                  key="list"
                  id="cmdk-list"
                  ref={listRef}
                  className="cmdk__list"
                  role="listbox"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {filtered.length === 0 && <li className="cmdk__empty">No results for “{query}”</li>}
                  {filtered.map((item, i) => {
                    const header = item.group !== lastGroup ? item.group : null;
                    lastGroup = item.group;
                    return (
                      <li key={item.group + item.label} role="presentation">
                        {header && <div className="cmdk__group mono">{header}</div>}
                        <div
                          id={`cmdk-${i}`}
                          data-idx={i}
                          role="option"
                          aria-selected={i === cursor}
                          className={`cmdk__item ${i === cursor ? "is-active" : ""}`}
                          onMouseMove={() => setCursor(i)}
                          onClick={item.run}
                        >
                          {i === cursor && (
                            <motion.span
                              layoutId="cmdk-hl"
                              className="cmdk__hl"
                              transition={{ type: "spring", stiffness: 500, damping: 40 }}
                            />
                          )}
                          <span className="cmdk__icon">{item.icon}</span>
                          <span className="cmdk__label">{item.label}</span>
                          {item.hint && <span className="cmdk__hint mono">{item.hint}</span>}
                          <span className="cmdk__enter kbd">↵</span>
                        </div>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>

            <div className="cmdk__foot">
              <span>
                <span className="kbd">↑</span>
                <span className="kbd">↓</span> navigate
              </span>
              <span>
                <span className="kbd">↵</span> select
              </span>
              <span className="cmdk__brand">
                <span className="nav__mark">{profile.initials}</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
