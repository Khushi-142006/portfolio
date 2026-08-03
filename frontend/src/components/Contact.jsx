import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin, TwitterIcon as Twitter } from "./BrandIcons";
import { submitContact } from "../services/api";

export default function Contact({ socialLinks }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await submitContact(formData);
      if (response.success) {
        setStatus({ type: "success", message: response.message });
        setFormData({ name: "", email: "", message: "" }); // reset
      } else {
        setStatus({ type: "error", message: response.error || "An error occurred." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to connect to server. Try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-meta">Get in touch</span>
          <h2 className="section-title">Contact</h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Reach out for collaborations, project inquiries, or full-time opportunities.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Let's discuss your project</h3>
            <p className="contact-info-desc">
              Feel free to fill out the form or drop me a line through email or social media. I am always open to discussing new software ideas or developer opportunities.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="contact-detail-label">Email Address</span>
                  <a href={`mailto:${socialLinks.email}`} className="contact-detail-value">
                    {socialLinks.email || "alex.carter.dev@gmail.com"}
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="contact-detail-label">Phone Number</span>
                  <span className="contact-detail-value">
                    {socialLinks.phone || "+1 (555) 019-2834"}
                  </span>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-box">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">
                    {socialLinks.location || "Austin, Texas, United States"}
                  </span>
                </div>
              </div>
            </div>

            {/* Social linkages */}
            <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
              <a
                href={socialLinks.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href={socialLinks.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={socialLinks.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Twitter Profile"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Alex, I'd love to chat about an upcoming project..."
                  className="form-input form-textarea"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {isSubmitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {status.type === "success" ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertTriangle size={16} />
                    )}
                    <span>{status.message}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
