import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Code, Cpu } from "lucide-react";

export default function Hero({ profile, socialLinks }) {
  const roles = [
    "Full Stack Developer",
    "AI/ML Engineer",
    "RAG Specialist",
    "MERN Stack Developer"
  ];
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const fullText = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setTypingSpeed(45);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        setTypingSpeed(95);
      }, typingSpeed);
    }

    // Handles pause and state flips
    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero-section">
      <div className="grid-overlay"></div>
      <div className="container hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-badge">
            <span className="status-dot"></span>
            <span>Available for new opportunities</span>
          </div>
          
          <h1 className="hero-title">
            Hi, I'm <br />
            <span className="hero-title-name">{profile.name || "Khushi Gadyal"}</span>
          </h1>

          <div className="typing-container">
            <span>I build </span>
            <span style={{ borderRight: "2px solid var(--accent-secondary)", paddingRight: "4px" }}>
              {currentText}
            </span>
          </div>

          <p className="hero-desc">
            {profile.bio || "An Aspiring AI/ML Engineer and Full-Stack Developer building intelligent scalable solutions."}
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Let's Connect <ArrowRight size={16} />
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Work
            </a>
            <a
              href={profile.resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ gap: "6px" }}
            >
              <FileText size={16} /> Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-art-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="avatar-frame">
            <img
              src={profile.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"}
              alt={profile.name}
              className="avatar-image"
            />
            
            {/* Floating Mini cards */}
            <motion.div
              className="floating-card floating-card-1"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Cpu size={14} className="achievement-icon" />
              <div>
                <p style={{ fontWeight: 700, margin: 0 }}>AI Inference</p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.65rem", margin: 0 }}>PyTorch / YOLO</p>
              </div>
            </motion.div>

            <motion.div
              className="floating-card floating-card-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2.5 }}
            >
              <Code size={14} style={{ color: "var(--accent)" }} />
              <div>
                <p style={{ fontWeight: 700, margin: 0 }}>Vite / React</p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.65rem", margin: 0 }}>REST & Websockets</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
