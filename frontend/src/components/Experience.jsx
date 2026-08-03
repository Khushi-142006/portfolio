import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

export default function Experience({ experience }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="experience" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-meta">Milestones</span>
          <h2 className="section-title">Career Timeline</h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            A journey through my industry experience, academic history, and internships.
          </p>
        </div>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experience.map((item) => {
            const isEducation = item.type === "education";
            return (
              <motion.div
                key={item.id}
                className="timeline-item"
                variants={itemVariants}
              >
                {/* Visual node anchor */}
                <div className={`timeline-dot ${isEducation ? "education" : ""}`}>
                  {isEducation ? (
                    <GraduationCap size={10} style={{ color: "var(--accent-secondary)" }} />
                  ) : (
                    <Briefcase size={10} style={{ color: "var(--accent)" }} />
                  )}
                </div>

                {/* Details layout */}
                <div className="timeline-meta">
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className={`timeline-period ${isEducation ? "education" : ""}`}>
                    {item.period}
                  </span>
                </div>

                <div className="timeline-company" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <span>{item.company}</span>
                  {item.location && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      <MapPin size={12} /> {item.location}
                    </span>
                  )}
                </div>

                <div className="timeline-desc">
                  {(item.description || []).map((bullet, idx) => (
                    <p key={idx} className="timeline-bullet">
                      {bullet}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
