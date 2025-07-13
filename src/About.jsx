import { useState, useEffect, useRef } from "react";
import { Box, LinearProgress, Chip } from "@mui/material";
import "./About.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const aboutRef = useRef(null);

  // Typing animation text
  const fullText = "Transforming Ideas Into Digital Reality";

  // Stats data
  const stats = [
    { label: "Projects Completed", value: 15, suffix: "+" },
    { label: "Technologies Mastered", value: 10, suffix: "+" },
    { label: "Years Learning", value: 2, suffix: "+" },
    { label: "Coffee Cups", value: 500, suffix: "+" },
  ];

  // Skills with progress levels
  const skillsData = [
    { name: "JavaScript", level: 85, color: "#f7df1e" },
    { name: "React", level: 90, color: "#61dafb" },
    { name: "Node.js", level: 75, color: "#3c873a" },
    { name: "CSS/SCSS", level: 88, color: "#264de4" },
    { name: "Python", level: 70, color: "#3776ab" },
    { name: "Git", level: 80, color: "#f05032" },
  ];

  // Interests and hobbies
  const interests = [
    "🤖 Artificial Intelligence",
    "🌐 Web Development",
    "📱 Mobile Apps",
    "🎮 Game Development",
    "🎵 Music Production",
    "📚 Continuous Learning",
    "🏃‍♂️ Running",
    "☕ Coffee Enthusiast",
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (isVisible) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [isVisible, fullText]);

  // Animated counter hook
  const useAnimatedCounter = (targetValue, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isVisible) {
        let start = 0;
        const increment = targetValue / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= targetValue) {
            setCount(targetValue);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [isVisible, targetValue, duration]);

    return count;
  };

  return (
    <section className="about" ref={aboutRef}>
      <div className="about__container">
        {/* Hero Section */}
        <div className="about__hero">
          <div className="about__intro">
            <h2 className="about__title">
              <span className="about__greeting">Hi, I'm John! 👋</span>
              <span className="about__subtitle">{typedText}</span>
              <span className="typing-cursor">|</span>
            </h2>

            <div className="about__description">
              <p className="intro-text">
                I'm a{" "}
                <strong>
                  Computer Science and Artificial Intelligence student
                </strong>{" "}
                with a passion for turning caffeine and chaos into clean,
                functional web applications. I enjoy building fast, responsive,
                and (hopefully) delightful digital experiences.
              </p>

              <p className="vision-text">
                As I level up my skills through university and personal
                projects, my long-term goal is to dive deeper into{" "}
                <em>fullstack development</em> and explore how AI can enhance
                both the user experience and the way we build software. Whether
                it's automating the boring stuff or training models to act like
                weird little digital coworkers, I'm genuinely excited to be part
                of the AI-powered future.
              </p>
            </div>

            <div className="about__cta">
              <button
                className="cta-button primary"
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
              >
                Let's Connect
              </button>
              <button
                className="cta-button secondary"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                Download CV
              </button>
            </div>
          </div>

          <div className="about__visual">
            <div className="profile-card">
              <div className="profile-image">
                <div className="image-placeholder">👨‍💻</div>
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  Available for opportunities
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="about__stats">
          <h3 className="stats-title">By the Numbers</h3>
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const animatedValue = useAnimatedCounter(stat.value);
              return (
                <div
                  key={stat.label}
                  className="stat-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="stat-value">
                    {animatedValue}
                    {stat.suffix}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Section */}
        <div className="about__skills">
          <h3 className="section-title">Technical Skills</h3>
          <div className="skills-grid">
            {skillsData.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <Box className="skill-progress-container">
                  <LinearProgress
                    variant="determinate"
                    value={isVisible ? skill.level : 0}
                    className="skill-progress"
                    sx={{
                      backgroundColor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: skill.color,
                        transition: "transform 1.5s ease-in-out",
                        transitionDelay: `${index * 0.1}s`,
                      },
                    }}
                  />
                </Box>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="about__interests">
          <h3 className="section-title">When I'm Not Coding</h3>
          <div className="interests-grid">
            {interests.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                className="interest-chip"
                style={{ animationDelay: `${index * 0.1}s` }}
                variant="outlined"
              />
            ))}
          </div>
        </div>

        {/* Journey Section */}
        <div className="about__journey">
          <h3 className="section-title">My Journey</h3>
          <div className="journey-timeline">
            <div className="timeline-item">
              <div className="timeline-marker">🎓</div>
              <div className="timeline-content">
                <h4>Computer Science Student</h4>
                <p>
                  Currently pursuing my degree with a focus on AI and software
                  development
                </p>
                <span className="timeline-date">2022 - Present</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">💻</div>
              <div className="timeline-content">
                <h4>Self-Taught Developer</h4>
                <p>
                  Started my coding journey with web development and fell in
                  love with creating digital solutions
                </p>
                <span className="timeline-date">2021 - Present</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">🚀</div>
              <div className="timeline-content">
                <h4>First Projects</h4>
                <p>
                  Built my first web applications and discovered the joy of
                  bringing ideas to life through code
                </p>
                <span className="timeline-date">2022</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="about__fun-fact">
          <div className="fun-fact-content">
            <h4>Fun Fact 🎯</h4>
            <p>
              I measure my productivity in coffee cups and solved bugs. Current
              ratio: 3:1 (working on improving the efficiency! ☕→🐛)
            </p>
          </div>
        </div>

        {/* PS Note */}
        <div className="about__ps-note">
          <p>P.S. Thanks ChatGPT for helping me write this! 🤖✨</p>
        </div>
      </div>
    </section>
  );
};

export default About;
