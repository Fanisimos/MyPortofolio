import portofolioItems from "./portofolioItems.js";

function Portofolio() {
  return (
    <section id="portofolio">
      <h2>My Projects</h2>
      <div className="portofolio">
        {portofolioItems.map((item) => (
          <div className="portofolio-item" key={item.id} onClick={item.link}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Portofolio;
