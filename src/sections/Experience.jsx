import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { education, experience } from "../data/site";
import { Reveal, WordReveal } from "../components/motion";
import "./Experience.css";

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="section exp">
      <div className="container exp__grid">
        <header className="exp__head">
          <Reveal>
            <span className="eyebrow">Experience · 03</span>
          </Reveal>
          <WordReveal className="display" text={"Built in the\n*real world.*"} />
          <Reveal delay={0.15}>
            <p className="lede">
              Client delivery, a product team, frontline IT support and university teaching. Each
              one sharpened a different part of how I build.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="edu card">
            <span className="tile__label mono">Education</span>
            <p className="edu__title">{education.title}</p>
            <p className="edu__org">
              {education.org} · <span className="mono">{education.when}</span>
            </p>
            <p className="edu__note">{education.note}</p>
          </Reveal>
        </header>

        <div ref={listRef} className="timeline">
          <div className="timeline__rail" aria-hidden="true">
            <motion.div className="timeline__fill" style={{ scaleY: fill }} />
          </div>
          <ol className="timeline__list">

          {experience.map((job, i) => (
            <motion.li
              key={job.org + job.title}
              className="timeline__item"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
            >
              <motion.span
                className="timeline__dot"
                aria-hidden="true"
                initial={{ scale: 0.4, backgroundColor: "#1a1a20" }}
                whileInView={{ scale: 1, backgroundColor: "#d4ff4f" }}
                viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                transition={{ duration: 0.5 }}
              />
              <div className="timeline__meta">
                <span className="mono">{job.when}</span>
                {job.current && <span className="timeline__badge">Current</span>}
              </div>
              <h3 className="timeline__title">{job.title}</h3>
              <p className="timeline__org">
                {job.org} <span>· {job.where}</span>
              </p>
              <p className="timeline__body">{job.body}</p>
            </motion.li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
