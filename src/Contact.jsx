import "./Contact.css";

function Contact() {
  return (
    <section className="contact-section">
      <h2>Contact</h2>
      <p>If you’d like to get in touch, feel free to reach out via:</p>
      <ul className="contact-list">
        <li>
          <a className="contact-link" href="mailto:Xspot1995@hotmail.com">
            📧 Email: Xspot1995@hotmail.com
          </a>
        </li>
        <li>
          <a
            className="contact-link"
            href="https://instagram.com/john.litsai"
            target="_blank"
            rel="noopener noreferrer"
          >
            📸 Instagram: john.litsai
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Contact;
