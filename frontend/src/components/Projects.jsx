import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Activity, Network } from "lucide-react";
import { GithubIcon as Github } from "./BrandIcons";

export default function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "AI/ML", "Backend", "Frontend", "Cloud/DevOps"];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="projects">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
          <div>
            <span className="section-meta">Selected Works</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Case Studies</h2>
          </div>
          
          {/* Category Filters */}
          <div className="projects-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="project-card"
              >
                <div className="project-image-box">
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                    alt={project.title}
                    className="project-image"
                  />
                  <span className="project-status-badge">
                    {project.status || "Completed"}
                  </span>
                </div>

                <div className="project-content">
                  {/* Architecture Tags */}
                  <div className="project-arch-tags">
                    {(project.architecture || []).map((tag, idx) => (
                      <span key={idx} className="project-arch-tag" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <Network size={10} /> {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  {/* Tech Badges */}
                  <div className="project-tech-list">
                    {(project.technologies || []).map((tech, idx) => (
                      <span key={idx} className="project-tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="project-links">
                    <a
                      href={project.githubUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      <Github size={14} /> Repository
                    </a>
                    <a
                      href={project.liveUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
