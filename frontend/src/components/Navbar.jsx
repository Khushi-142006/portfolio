import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";

export default function Navbar({ activeSection, socialLinks }) {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Sync with body class
    if (isLightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header className="header">
      <div className="container nav-container">
        <a href="#home" className="logo">
          <Terminal size={20} />
          <span>khushigadyal.dev</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
            >
              {item.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>

        {/* Mobile Navigation controls */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }} className="mobile-only">
          <button onClick={toggleTheme} className="theme-toggle-btn mobile-toggle" aria-label="Toggle Theme">
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="theme-toggle-btn"
            style={{ display: "none" }} /* Styled via media query or direct display overrides */
            id="mobile-menu-btn"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Drawer menu (simple toggle layout) */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            width: "100%",
            backgroundColor: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border-primary)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            zIndex: 99
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`nav-link ${activeSection === item.href.slice(1) ? "active" : ""}`}
              style={{ fontSize: "1rem" }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
      
      {/* Dynamic CSS injection to show button on small screens */}
      <style>{`
        @media (max-width: 768px) {
          #mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
