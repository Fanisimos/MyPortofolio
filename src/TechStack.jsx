import techStack from "./skillsData";
import "./TechStack.css";

function TechStack() {
  return (
    <section id="skills" className="tech-stack">
      <div className="container">
        <h2 className="tech-stack__title">Tech Stack</h2>
        <p className="tech-stack__subtitle">
          Technologies and tools I use to bring ideas to life
        </p>
        <div className="tech-grid">
          {techStack.map((tech) => (
            <a
              key={tech.name}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-item"
              data-tech={tech.name.toLowerCase().replace(/\s+/g, "-")}
              aria-label={`Learn more about ${tech.name}`}
            >
              <div className="tech-item__content">
                <div className="tech-item__icon-wrapper">
                  <img
                    src={tech.icon}
                    alt={`${tech.name} logo`}
                    className="tech-item__icon"
                  />
                </div>
                <h3 className="tech-item__name">{tech.name}</h3>
                <p className="tech-item__description">{tech.description}</p>
                <div className="tech-item__link-indicator">
                  <span>Learn more</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8.636 3.5a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V4.707l3.646 3.647a.5.5 0 0 0 .708-.708L9.293 4H10.5a.5.5 0 0 0 0-1H8.636z" />
                    <path d="M2 5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zM2 8a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 2 8zm0 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;
