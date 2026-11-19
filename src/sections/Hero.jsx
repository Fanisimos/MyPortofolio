import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { profile, stack } from "../data/site";
import { scrollToId } from "../hooks/useSmoothScroll";
import { useLocalTime } from "../hooks/useLocalTime";
import { Magnetic, WordReveal } from "../components/motion";
import { ArrowSwap, MaskIcon } from "../components/icons";
import "./Hero.css";

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, ease: EASE, delay },
});

export default function Hero() {
  const ref = useRef(null);
  const time = useLocalTime(profile.timezone);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const horizonY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const horizonScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  // Cursor-following light
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const light = useMotionTemplate`radial-gradient(600px circle at ${smx}% ${smy}%, rgba(212,255,79,0.08), transparent 70%)`;

  const onPointerMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section id="top" ref={ref} className="hero" onPointerMove={onPointerMove}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <motion.div className="hero__light" style={{ background: light }} />
        <motion.div className="hero__horizon-wrap" style={{ y: horizonY, scale: horizonScale }}>
          <motion.div
            className="hero__horizon"
            initial={{ opacity: 0, scale: 0.85, y: 120 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2.2, ease: EASE, delay: 0.3 }}
          />
        </motion.div>
        <div className="hero__stars" />
      </div>

      <motion.div className="hero__content container" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div className="hero__status" {...fadeUp(0.1)}>
          <span className="hero__pulse" aria-hidden="true" />
          {profile.availability}
        </motion.div>

        <WordReveal
          as="h1"
          className="hero__title"
          text={"Software that\nfeels *effortless.*"}
          immediate
          delay={0.25}
          stagger={0.08}
        />

        <motion.p className="hero__lede lede" {...fadeUp(0.75)}>
          I&apos;m {profile.firstName}, founder and lead developer at {profile.company}. I build SaaS,
          e-commerce and AI-integrated products for businesses across the UK and US, from the
          first sketch to production.
        </motion.p>

        <motion.div className="hero__ctas" {...fadeUp(0.9)}>
          <Magnetic>
            <a
              href="#work"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("work");
              }}
            >
              See selected work
              <ArrowSwap down />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="btn btn--ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div className="hero__meta container" {...fadeUp(1.2)}>
        <div>
          <span className="hero__meta-label">Based in</span>
          <span>
            {profile.location} · <span className="mono">{time}</span>
          </span>
        </div>
        <div className="hero__meta-mid">
          <span className="hero__meta-label">Currently</span>
          <span>Founder, {profile.company} · BSc CS &amp; AI</span>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </motion.div>

      <motion.div
        className="marquee"
        aria-label="Technologies I work with"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.4 }}
      >
        <div className="marquee__track">
          {[0, 1].map((dup) => (
            <ul key={dup} className="marquee__list" aria-hidden={dup === 1}>
              {stack.map((t) => (
                <li key={t.name} className="marquee__item">
                  {t.icon ? <MaskIcon src={t.icon} size={20} /> : <span className="marquee__mono">{t.name[0]}</span>}
                  {t.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
