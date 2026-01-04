import { useState, useEffect, useRef } from "react";
import { Box, LinearProgress, Chip } from "@mui/material";
import ScrollReveal from "./components/ScrollReveal";
import "./About.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const aboutRef = useRef(null);

  // Typing animation text
  const fullText = "Transforming Ideas Into Digital Reality";

  // Stats data
  const stats = [
    { label: "Projects Completed", value: 16, suffix: "+" },
    { label: "Technologies Mastered", value: 13, suffix: "+" },
    { label: "Years Experience", value: 5, suffix: "+" },
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
    { name: "Prompt Engineering (Claude/ChatGPT)", level: 95, color: "#8b5cf6" },
    { name: "AI Integration", level: 90, color: "#10a37f" },
  ];

  // Interests and hobbies
  const interests = [
    "🤖 Artificial Intelligence",
    "💬 Prompt Engineering",
    "🌐 Web Development",
    "⚡ Automation & Workflows",
    "📱 Mobile Apps",
    "🎮 Game Development",
    "📚 Continuous Learning",
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
          <ScrollReveal direction="left" delay={0}>
            <div className="about__intro">
              <h2 className="about__title">
                <span className="about__greeting">Hi, I'm Tzoni! 👋</span>
                <span className="about__subtitle">{typedText}</span>
                <span className="typing-cursor">|</span>
              </h2>

              <div className="about__description">
                <p className="intro-text">
                  I'm a{" "}
                  <strong>
                    Computer Science & Artificial Intelligence undergraduate
                  </strong>{" "}
                  with hands-on experience supporting enterprise environments using ServiceNow,
                  delivering customer-focused solutions, and building automation-driven software products.
                  I specialize in building fast, accessible UIs and smart systems.
                </p>

                <p className="vision-text">
                  With a strong interest in digital transformation, AI-enabled workflows,
                  and customer success, I have proven ability to learn fast, collaborate globally,
                  and translate technical concepts into business value. Currently working as an{" "}
                  <em>IT Support Analyst (ServiceNow)</em> at Keltbray and{" "}
                  <em>Software Developer</em> at LitsAI Technologies.
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
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
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
          </ScrollReveal>
        </div>

        {/* Stats Section */}
        <ScrollReveal direction="up" delay={200}>
          <div className="about__stats">
            <h3 className="stats-title">By the Numbers</h3>
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const animatedValue = useAnimatedCounter(stat.value);
                return (
                  <ScrollReveal key={stat.label} direction="up" delay={300 + index * 100}>
                    <div className="stat-item">
                      <div className="stat-value">
                        {animatedValue}
                        {stat.suffix}
                      </div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Skills Section */}
        <ScrollReveal direction="up" delay={200}>
          <div className="about__skills">
            <h3 className="section-title">Technical Skills</h3>
            <div className="skills-grid">
              {skillsData.map((skill, index) => (
                <ScrollReveal key={skill.name} direction="up" delay={300 + index * 80}>
                  <div className="skill-item">
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Interests Section */}
        <ScrollReveal direction="up" delay={200}>
          <div className="about__interests">
            <h3 className="section-title">When I'm Not Coding</h3>
            <div className="interests-grid">
              {interests.map((interest, index) => (
                <ScrollReveal key={index} direction="scale" delay={300 + index * 60}>
                  <Chip
                    label={interest}
                    className="interest-chip"
                    variant="outlined"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Journey Section */}
        <ScrollReveal direction="up" delay={200}>
          <div className="about__journey">
            <h3 className="section-title">My Journey</h3>
            <div className="journey-timeline">
              <ScrollReveal direction="right" delay={300}>
                <div className="timeline-item">
                  <div className="timeline-marker">💼</div>
                  <div className="timeline-content">
                    <h4>IT Support Analyst (ServiceNow)</h4>
                    <p>
                      Delivering technical support using ServiceNow platform at Keltbray,
                      managing incidents, requests, and workflows aligned with ITIL best practices
                    </p>
                    <span className="timeline-date">January 2024 - Present</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={400}>
                <div className="timeline-item">
                  <div className="timeline-marker">💻</div>
                  <div className="timeline-content">
                    <h4>Software Developer</h4>
                    <p>
                      Building full-stack, AI-assisted web platforms at LitsAI Technologies,
                      managing requirements, development, deployment, and iteration end-to-end
                    </p>
                    <span className="timeline-date">November 2023 - Present</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={500}>
                <div className="timeline-item">
                  <div className="timeline-marker">🎓</div>
                  <div className="timeline-content">
                    <h4>BSc Computer Science & AI</h4>
                    <p>
                      Studying at Kingston University, London with expected graduation in 2028.
                      Focusing on AI, software development, and digital transformation
                    </p>
                    <span className="timeline-date">September 2025 - 2028</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={600}>
                <div className="timeline-item">
                  <div className="timeline-marker">🚀</div>
                  <div className="timeline-content">
                    <h4>Journey Begins</h4>
                    <p>
                      Started professional development journey, diving into full-stack development
                      and AI-powered solutions
                    </p>
                    <span className="timeline-date">November 2023</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* Fun Fact */}
        <ScrollReveal direction="scale" delay={200}>
          <div className="about__fun-fact">
            <div className="fun-fact-content">
              <h4>Fun Fact 🎯</h4>
              <p>
                I measure my productivity in coffee cups and solved bugs. Current
                ratio: 3:1 (working on improving the efficiency! ☕→🐛)
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* PS Note */}
        <ScrollReveal direction="fade" delay={300}>
          <div className="about__ps-note">
            <p>P.S. Thanks ChatGPT for helping me write this! 🤖✨</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
