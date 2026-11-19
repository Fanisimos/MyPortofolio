import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { languages, principles, profile, stats } from "../data/site";
import { useLocalTime } from "../hooks/useLocalTime";
import { useSpotlight } from "../hooks/useSpotlight";
import { Reveal, WordReveal } from "../components/motion";
import "./About.css";

const EASE = [0.22, 1, 0.36, 1];

function Tile({ className = "", delay = 0, children }) {
  const onSpot = useSpotlight();
  return (
    <Reveal delay={delay} className={`tile card spotlight ${className}`} onPointerMove={onSpot}>
      {children}
    </Reveal>
  );
}

export default function About() {
  const time = useLocalTime(profile.timezone);
  const [lang, setLang] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLang((l) => (l + 1) % languages.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="section about">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="eyebrow">About · 02</span>
          </Reveal>
          <WordReveal className="display" text={"From napkin sketch\nto *production.*"} />
        </header>

        <div className="bento">
          <Tile className="tile--story">
            <p className="tile__label mono">Profile</p>
            <p className="story__lead">
              I&apos;m a software developer and the founder of{" "}
              <a href={profile.companyHref} target="_blank" rel="noreferrer" className="u-link">
                {profile.company}
              </a>
              , delivering custom applications for businesses in the UK and US.
            </p>
            <p className="story__body">
              I lead SaaS, e-commerce and AI-integrated products through implementation, testing
              and deployment, and I work directly with clients the whole way. I pair React,
              Next.js and TypeScript with a background in IT support and university teaching, so I
              can explain the technical side as well as I build it.
            </p>
            <p className="story__body">
              Alongside that, I&apos;m studying Computer Science &amp; Artificial Intelligence at
              Kingston University, graduating in summer 2028.
            </p>
          </Tile>

          <Tile className="tile--where" delay={0.08}>
            <div className="radar" aria-hidden="true">
              <span />
              <span />
              <span />
              <i />
            </div>
            <p className="tile__label mono">Based in</p>
            <p className="where__city">{profile.location}</p>
            <p className="where__time">
              <span className="mono">{time}</span> local time
            </p>
          </Tile>

          <Tile className="tile--lang" delay={0.16}>
            <p className="tile__label mono">Speaks</p>
            <div className="lang__word" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="serif"
                >
                  {languages[lang].word}
                </motion.span>
              </AnimatePresence>
            </div>
            <ul className="lang__list">
              {languages.map((l, i) => (
                <li key={l.lang} className={i === lang ? "is-on" : ""}>
                  <span>{l.lang}</span>
                  <span className="mono">{l.level}</span>
                </li>
              ))}
            </ul>
          </Tile>

          {stats.map((s, i) => (
            <Tile key={s.label} className="tile--stat" delay={0.05 * i}>
              <p className="stat__value">{s.value}</p>
              <p className="stat__label">{s.label}</p>
            </Tile>
          ))}

          <Tile className="tile--principles">
            <p className="tile__label mono">How I work</p>
            <ol className="principles">
              {principles.map((p, i) => (
                <li key={p.title}>
                  <span className="mono principles__n">0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
          </Tile>
        </div>
      </div>
    </section>
  );
}
