import React from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Layout, Database, Cloud, ShieldAlert, Sparkles, Sliders, GitBranch } from "lucide-react";

export default function Skills({ skills }) {
  // Simple helper to match icons to categories
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "programming languages":
        return <Terminal size={18} />;
      case "frontend":
        return <Layout size={18} />;
      case "backend":
        return <Sliders size={18} />;
      case "databases":
        return <Database size={18} />;
      case "ai/ml":
        return <Sparkles size={18} />;
      case "cloud":
        return <Cloud size={18} />;
      case "devops":
        return <Cpu size={18} />;
      case "testing":
        return <ShieldAlert size={18} />;
      case "version control":
        return <GitBranch size={18} />;
      default:
        return <Terminal size={18} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="skills" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-meta">Capabilities</span>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            A structured breakdown of language proficiencies, backend systems, operational toolkits, and AI libraries.
          </p>
        </div>

        <motion.div
          className="skills-categories"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skills.map((cat, idx) => (
            <motion.div
              key={idx}
              className="skills-card"
              variants={cardVariants}
              whileHover={{ borderColor: "var(--border-accent)" }}
            >
              <h3 className="skills-card-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "var(--accent)" }}>{getCategoryIcon(cat.category)}</span>
                <span>{cat.category}</span>
              </h3>
              
              <div className="skills-list">
                {cat.items.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <span className={`skill-badge ${skill.isPlanned ? "planned" : ""}`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
