import techStack from "./skillsData";

function TechStack() {
  return (
    <section id="skills">
      <h2>Tech Stack</h2>
      <div className="tech-grid">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="tech-item"
            style={{ backgroundColor: tech.bg }}
          >
            <img src={tech.icon} alt={tech.name} />
            <p>{tech.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechStack;
