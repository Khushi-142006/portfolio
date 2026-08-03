import React from "react";
import { motion } from "framer-motion";
import { Award, Compass, Target, CheckCircle2 } from "lucide-react";

export default function About({ profile }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="about">
      <div className="glow-bg"></div>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-meta">Overview</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            A deep-dive into my professional background, key metrics, and architectural goals.
          </p>
        </div>

        <div className="about-grid">
          <motion.div
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h3 variants={itemVariants}>Designing High-Performance Digital Solutions</motion.h3>
            <motion.p className="about-bio" variants={itemVariants}>
              {profile.bio || "Full Stack Software Engineer specializing in scalable application architectures."}
            </motion.p>

            <motion.div className="career-objective-box" variants={itemVariants}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                <Target size={18} style={{ color: "var(--accent)" }} />
                <strong style={{ fontSize: "0.875rem", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                  Career Objective
                </strong>
              </div>
              <p style={{ margin: 0 }}>
                {profile.careerObjective || "Designing elegant architectures for product-based applications."}
              </p>
            </motion.div>

            <motion.h3 variants={itemVariants} style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
              Key Accomplishments
            </motion.h3>
            <motion.div className="achievements-list" variants={containerVariants}>
              {(profile.achievements || []).map((achievement, index) => (
                <motion.div key={index} className="achievement-item" variants={itemVariants}>
                  <CheckCircle2 size={18} className="achievement-icon" />
                  <span className="achievement-text">{achievement}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {(profile.stats || []).map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="stat-val">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
