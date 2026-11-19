import { AnimatePresence, motion } from "motion/react";
import { profile } from "../data/site";
import { useLocalTime } from "../hooks/useLocalTime";
import { scrollToId } from "../hooks/useSmoothScroll";
import { useCopyEmail } from "../hooks/useCopyEmail";
import { Magnetic, Reveal, WordReveal } from "../components/motion";
import { ArrowSwap, ArrowUpRight, Check, Copy } from "../components/icons";
import "./Contact.css";

const EASE = [0.22, 1, 0.36, 1];

export default function Contact() {
  const [copied, copy] = useCopyEmail();
  const time = useLocalTime(profile.timezone);
  const year = new Date().getFullYear();

  return (
    <>
      <section id="contact" className="section contact">
        <div className="contact__glow" aria-hidden="true" />
        <div className="container contact__inner">
          <Reveal>
            <span className="eyebrow">Contact · 05</span>
          </Reveal>
          <WordReveal
            className="contact__title"
            text={"Have a product in mind?\nLet's make it *real.*"}
          />
          <Reveal delay={0.2}>
            <p className="lede contact__lede">
              Taking on new client projects and collaborations, especially SaaS, commerce and
              anything with AI in the loop. I usually reply within a day.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="contact__actions">
            <Magnetic>
              <a className="btn btn--primary contact__btn" href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowSwap />
              </a>
            </Magnetic>
            <button className="btn btn--ghost contact__copy" onClick={copy} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "y" : "n"}
                  className="contact__copy-inner"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {copied ? <Check /> : <Copy />}
                  {copied ? "Copied" : "Copy email"}
                </motion.span>
              </AnimatePresence>
            </button>
          </Reveal>

          <Reveal delay={0.4} className="contact__socials">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer__row">
            <span>© {year} {profile.name}</span>
            <span className="mono">
              London · {time}
            </span>
            <button className="footer__top" onClick={() => scrollToId("top")}>
              Back to top ↑
            </button>
          </div>
          <Wordmark text={profile.name} />
        </div>
      </footer>
    </>
  );
}

function Wordmark({ text }) {
  return (
    <motion.p
      className="wordmark"
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: "100%" },
            show: { y: "0%", transition: { duration: 1.2, ease: EASE, delay: i * 0.035 } },
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.p>
  );
}
