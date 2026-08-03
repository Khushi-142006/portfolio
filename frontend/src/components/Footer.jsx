import React from "react";
import { ArrowUp, Terminal } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin, TwitterIcon as Twitter } from "./BrandIcons";

export default function Footer({ profile, socialLinks }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="logo" style={{ fontSize: "1.1rem" }}>
              <Terminal size={18} />
              <span>khushigadyal.dev</span>
            </a>
            <p className="footer-brand-desc">
              Designing intelligent AI/ML applications and responsive full-stack web applications.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Navigation</h4>
            <div className="footer-links">
              <a href="#home" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#skills" className="footer-link">Skills</a>
              <a href="#projects" className="footer-link">Projects</a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Resources</h4>
            <div className="footer-links">
              <a href="#experience" className="footer-link">Experience</a>
              <a href="#certifications" className="footer-link">Certifications</a>
              <a href={profile.resumeUrl || "#"} className="footer-link" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Khushi Gadyal. All rights reserved. Handcrafted in React.
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div className="footer-socials">
              <a
                href={socialLinks.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="GitHub Profile"
              >
                <Github size={16} />
              </a>
              <a
                href={socialLinks.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={socialLinks.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Twitter Profile"
              >
                <Twitter size={16} />
              </a>
            </div>
            
            <button
              onClick={scrollToTop}
              className="footer-social-icon"
              title="Scroll to Top"
              style={{ borderRadius: "8px" }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
