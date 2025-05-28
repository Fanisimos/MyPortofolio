import portofolioItems from "./portofolioItems.js";
import Timer from "./showcaseComponents/Timer.jsx";
import DarkMode from "./showcaseComponents/DarkMode.jsx";
import Progress from "./showcaseComponents/Progress.jsx";

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
      </section>{" "}
      <section id="components">
        <h2>Components</h2>
        <div className="components-showcase">
          <div className="component-wrapper">
            <Timer />
          </div>
          <div className="component-wrapper">
            <DarkMode />
          </div>
          <div className="component-wrapper">
            <Progress />
          </div>
        </div>
      </section>
    </>
  );
}
export default Portofolio;
