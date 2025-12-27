import "./Contact.css";

function Contact() {
  return (
    <section className="contact-section">
      <h2>Contact</h2>
      <p>If you’d like to get in touch, feel free to reach out via:</p>
      <ul className="contact-list">
        <li>
          <a className="contact-link" href="mailto:tzonilitsai@icloud.com">
            📧 Email: tzonilitsai@icloud.com
          </a>
        </li>
        <li>
          <a className="contact-link" href="tel:+447983571589">
            📱 Mobile: +44 7983 571589
          </a>
        </li>
        <li>
          <a
            className="contact-link"
            href="https://github.com/Fanisimos"
            target="_blank"
            rel="noopener noreferrer"
          >
            💻 GitHub: Fanisimos
          </a>
        </li>
        <li>
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/tzoni-litsai"
            target="_blank"
            rel="noopener noreferrer"
          >
            💼 LinkedIn: Tzoni Litsai
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Contact;
