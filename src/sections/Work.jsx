import { useEffect, useMemo, useRef, useState } from "react";
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
              Live SaaS, client commerce and AI voice agents: real products used by real
              businesses, built from first commit to deploy.
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
                Visit {project.domain}
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
            <QrVisual />
          )}
        </div>
      </motion.article>
    </div>
  );
}

/** Custom animated visual for WorkshopConnect (no screenshot). */
function QrVisual() {
  const cells = useMemo(() => {
    const n = 21;
    let seed = 7;
    const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const finder = (x, y) => {
      const inBox = (ox, oy) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
      for (const [ox, oy] of [[0, 0], [n - 7, 0], [0, n - 7]]) {
        if (inBox(ox, oy)) {
          const dx = x - ox, dy = y - oy;
          const ring = dx === 0 || dy === 0 || dx === 6 || dy === 6;
          const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
          return ring || core ? 1 : 0;
        }
      }
      return null;
    };
    return Array.from({ length: n * n }, (_, k) => {
      const x = k % n, y = Math.floor(k / n);
      const f = finder(x, y);
      return f ?? (rand() > 0.52 ? 1 : 0);
    });
  }, []);

  return (
    <div className="qr" aria-label="Illustration of QR-code attendance check-in" role="img">
      <div className="qr__phone">
        <div className="qr__label mono">Scan to check in</div>
        <div className="qr__code">
          {cells.map((on, k) => (
            <span key={k} className={on ? "on" : ""} />
          ))}
          <div className="qr__scan" />
        </div>
        <div className="qr__meta">
          <span className="mono">Workshop 04</span>
          <span className="mono">14:02</span>
        </div>
      </div>
      <div className="qr__toast">
        <span className="qr__toast-icon">
          <Check size={14} />
        </span>
        <div>
          <strong>Attendance confirmed</strong>
          <span>Student journey · verified</span>
        </div>
      </div>
      <div className="qr__chip mono">E2E · organiser + student</div>
    </div>
  );
}

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
        <span className="eyebrow">Earlier experiments</span>
        <p>Where it started: projects from my first years of learning to build.</p>
      </Reveal>
      <div ref={ref} className="archive__list" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
        {archive.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <a
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className="archive__row"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
            >
              <span className="archive__title">{a.title}</span>
              <span className="archive__kind">{a.kind}</span>
              <span className="archive__year mono">{a.year}</span>
              <span className="archive__arrow">
                <ArrowUpRight size={16} />
              </span>
            </a>
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
