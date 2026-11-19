import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { archive, projects } from "../data/site";
import { useSpotlight } from "../hooks/useSpotlight";
import { Reveal, WordReveal } from "../components/motion";
import { ArrowSwap, ArrowUpRight, Check } from "../components/icons";
import "./Work.css";

const EASE = [0.22, 1, 0.36, 1];

function useIsDesktop() {
  const query = "(min-width: 960px)";
  const [is, setIs] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setIs(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return is;
}

export default function Work() {
  const stackRef = useRef(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="work" className="section work">
      <div className="container">
        <header className="section-head work__head">
          <Reveal>
            <span className="eyebrow">Selected work · 01</span>
          </Reveal>
          <WordReveal className="display" text={"Products in\n*production.*"} />
          <Reveal delay={0.2}>
            <p className="lede">
              Live SaaS, white-label commerce and AI voice agents, built from first commit
              to deploy.
            </p>
          </Reveal>
        </header>

        <div ref={stackRef} className="work__stack">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              stacked={isDesktop}
            />
          ))}
        </div>

        <Archive />
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total, progress, stacked }) {
  const ref = useRef(null);
  const onSpot = useSpotlight();

  // Card shrinks & dims as the next one slides over it
  const targetScale = 1 - (total - index - 1) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, stacked ? targetScale : 1]);
  const dim = useTransform(progress, [index / total, (index + 1) / total], [0, stacked && index < total - 1 ? 0.5 : 0]);

  // Inner image parallax
  const { scrollYProgress: local } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(local, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="work__item" style={{ "--i": index }}>
      <motion.article
        className="pcard card spotlight"
        style={{ scale, "--accent-p": project.accent }}
        onPointerMove={onSpot}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <motion.div className="pcard__dim" style={{ opacity: dim }} aria-hidden="true" />
        <div className="pcard__glow" aria-hidden="true" />

        <div className="pcard__info">
          <div className="pcard__top">
            <span className="mono pcard__idx">
              {String(index + 1).padStart(2, "0")} <span>/ {String(total).padStart(2, "0")}</span>
            </span>
            <span className="pcard__kind">{project.kind}</span>
          </div>

          <h3 className="pcard__title">{project.title}</h3>
          <p className="pcard__role mono">{project.role}</p>
          <p className="pcard__summary">{project.summary}</p>

          <ul className="pcard__highlights">
            {project.highlights.map((h) => (
              <li key={h}>
                <span className="pcard__tick" aria-hidden="true">
                  <Check size={12} />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="pcard__foot">
            <ul className="pcard__tags" aria-label="Technologies">
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {project.href && (
              <a className="btn btn--ghost btn--sm" href={project.href} target="_blank" rel="noreferrer">
                {project.cta ?? `Visit ${project.domain}`}
                <ArrowSwap />
              </a>
            )}
          </div>
        </div>

        <div className="pcard__visual">
          {project.image ? (
            <a
              className="browser"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live site`}
            >
              <div className="browser__bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <div className="browser__url mono">{project.domain}</div>
              </div>
              <div className="browser__view">
                <motion.img
                  src={project.image}
                  alt={`${project.title} homepage`}
                  loading="lazy"
                  style={{ y: imgY }}
                />
              </div>
            </a>
          ) : (
            <MapVisual />
          )}
        </div>
      </motion.article>
    </div>
  );
}

/** Custom animated visual for RiskRadar (no public screenshot yet). */
function MapVisual() {
  const heat = [
    { x: 34, y: 42, s: 1.0 },
    { x: 58, y: 30, s: 0.7 },
    { x: 62, y: 62, s: 0.85 },
    { x: 22, y: 70, s: 0.5 },
    { x: 78, y: 48, s: 0.45 },
  ];
  const bars = [
    { label: "Anti-social", w: 82 },
    { label: "Vehicle", w: 54 },
    { label: "Burglary", w: 31 },
  ];

  return (
    <div className="mapv" role="img" aria-label="Illustration of a crime heatmap with area comparison">
      <svg className="mapv__roads" viewBox="0 0 400 275" preserveAspectRatio="none" aria-hidden="true">
        <path className="mapv__river" d="M-10 200 C 80 170, 120 230, 210 190 S 330 120, 420 150" />
        <path d="M0 60 L400 95" />
        <path d="M0 140 L400 120" />
        <path d="M60 0 L95 275" />
        <path d="M180 0 L165 275" />
        <path d="M290 0 L320 275" />
        <path className="mapv__minor" d="M0 30 L400 40 M0 230 L400 250 M120 0 L130 275 M235 0 L245 275 M350 0 L360 275 M0 175 L400 200" />
      </svg>

      {heat.map((h, i) => (
        <span
          key={i}
          className="mapv__heat"
          style={{ left: `${h.x}%`, top: `${h.y}%`, "--s": h.s, animationDelay: `${i * 0.7}s` }}
        />
      ))}

      <div className="mapv__search">
        <span className="mapv__dot" /> Kingston upon Thames
      </div>

      <div className="mapv__panel">
        <p className="mono">Area breakdown</p>
        {bars.map((b, i) => (
          <div key={b.label} className="mapv__bar">
            <span>{b.label}</span>
            <i>
              <motion.b
                initial={{ width: 0 }}
                whileInView={{ width: `${b.w}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.3 + i * 0.12 }}
              />
            </i>
          </div>
        ))}
      </div>

      <div className="mapv__chip mono">● Live · UK Police API</div>
    </div>
  );
}

const Row = ({ as: Tag, ...props }) => <Tag {...props} />;

function Archive() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 26 });
  const sy = useSpring(y, { stiffness: 250, damping: 26 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div className="archive">
      <Reveal className="archive__head">
        <span className="eyebrow">More projects</span>
        <p>Smaller builds and course projects from along the way.</p>
      </Reveal>
      <div ref={ref} className="archive__list" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
        {archive.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <Row
              {...(a.href ? { href: a.href, target: "_blank", rel: "noreferrer" } : {})}
              as={a.href ? "a" : "div"}
              className={`archive__row${a.href ? "" : " archive__row--static"}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(a.image ? i : null)}
            >
              <span className="archive__title">{a.title}</span>
              <span className="archive__kind">{a.kind}</span>
              <span className="archive__year mono">{a.year}</span>
              {a.href && (
                <span className="archive__arrow">
                  <ArrowUpRight size={16} />
                </span>
              )}
            </Row>
          </Reveal>
        ))}

        <motion.div className="archive__preview" style={{ x: sx, y: sy }} aria-hidden="true">
          <AnimatePresence mode="popLayout">
            {hovered !== null && (
              <motion.img
                key={hovered}
                src={archive[hovered].image}
                alt=""
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
