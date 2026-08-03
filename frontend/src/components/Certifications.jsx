import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

export default function Certifications({ certifications }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <section id="certifications">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-meta">Credentials</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Professional credentials verified by external authorities in cloud computing, project design and machine learning.
          </p>
        </div>

        <motion.div
          className="certs-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              className="cert-card"
              variants={cardVariants}
              whileHover={{ borderColor: "var(--border-accent)" }}
            >
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "16px" }}>
                <div className="contact-icon-box" style={{ color: "var(--accent-secondary)", width: "36px", height: "36px" }}>
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <div className="cert-issuer">{cert.issuer}</div>
                </div>
              </div>

              <p className="cert-desc">{cert.description}</p>
              
              <div className="cert-date">Issued: {cert.issueDate}</div>
              
              {cert.credentialId && (
                <div className="cert-id" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <ShieldCheck size={12} style={{ color: "#10b981" }} />
                  <span>ID: {cert.credentialId}</span>
                </div>
              )}

              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-btn"
                >
                  Verify Credential <ExternalLink size={12} />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
