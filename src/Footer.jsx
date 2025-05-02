function Footer() {
  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} My Portofolio. All Rights Reserved.
      </p>
      <p>
        <a
          href="https://github.com/Fanisimos?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        |
        <a
          href="https://uk.linkedin.com/in/tzoni-litsai-00027a218"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
}

export default Footer;
