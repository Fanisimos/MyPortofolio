import { stack, stackGroups } from "../data/site";
import { useSpotlight } from "../hooks/useSpotlight";
import { Reveal, WordReveal } from "../components/motion";
import { MaskIcon } from "../components/icons";
import "./Stack.css";

export default function Stack() {
  const onSpot = useSpotlight();

  return (
    <section id="stack" className="section stack">
      <div className="container">
        <header className="section-head stack__head">
          <Reveal>
            <span className="eyebrow">Stack · 04</span>
          </Reveal>
          <WordReveal className="display" text={"Tools I *trust*\nin production."} />
        </header>

        <div className="stack__groups">
          {stackGroups.map((g, gi) => {
            const items = stack.filter((s) => s.group === g.id);
            return (
              <Reveal key={g.id} className="stack__row" delay={gi * 0.05}>
                <div className="stack__meta">
                  <span className="mono stack__n">0{gi + 1}</span>
                  <div>
                    <h3>{g.label}</h3>
                    <p>{g.note}</p>
                  </div>
                </div>
                <ul className="stack__items">
                  {items.map((t) => (
                    <li key={t.name} className="stack__item card spotlight" onPointerMove={onSpot}>
                      {t.icon ? (
                        <MaskIcon src={t.icon} size={26} className="stack__icon" />
                      ) : (
                        <span className="stack__mono" aria-hidden="true">
                          {t.name[0]}
                        </span>
                      )}
                      <span className="stack__name">{t.name}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
