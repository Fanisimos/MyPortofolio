import portofolioItems from "./portofolioItems.js";
import Timer from "./showcaseComponents/Timer.jsx";

function Portofolio() {
  return (
    <>
      <section id="portofolio">
        <h2>Projects</h2>
        <div className="portofolio">
          {portofolioItems.map((item) => (
            <div
              className="portofolio-item"
              key={item.id}
              onClick={() => item.link} // has to be a function, because of onClick
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </a>
            </div>
          ))}
        </div>
      </section>
      {/*FIXME: How to add the components?*/}
      <section id="portofolio">
        <h2>Components</h2>
        <Timer />
        <div className="portofolio"> </div>
      </section>
    </>
  );
}
export default Portofolio;
