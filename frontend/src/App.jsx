import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import {
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchCertifications,
  fetchSocialLinks
} from "./services/api";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, projectsRes, skillsRes, experienceRes, certsRes, socialsRes] = await Promise.all([
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
          fetchExperience(),
          fetchCertifications(),
          fetchSocialLinks()
        ]);

        if (profileRes) setProfile(profileRes);
        if (projectsRes) setProjects(projectsRes);
        if (skillsRes) setSkills(skillsRes);
        if (experienceRes) setExperience(experienceRes);
        if (certsRes) setCertifications(certsRes);
        if (socialsRes) setSocialLinks(socialsRes);
      } catch (err) {
        console.error("Failed loading portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Window scroll listener to track active sections
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "certifications", "contact"];
      const scrollPos = window.scrollY + 120; // offset for nav height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="pulse-loader"></div>
        <span className="loader-text">Loading Alex Carter's Portfolio...</span>
        <style>{`
          .loader-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #030303;
            color: #ffffff;
            font-family: 'Geist Mono', monospace;
            gap: 16px;
          }
          .pulse-loader {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1 0%, #a78bfa 100%);
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
            animation: pulse 1.5s ease-in-out infinite;
          }
          .loader-text {
            font-size: 0.8rem;
            color: #a1a1aa;
            letter-spacing: 0.05em;
          }
          @keyframes pulse {
            0% { transform: scale(0.9); opacity: 0.6; }
            50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 30px rgba(99, 102, 241, 0.7); }
            100% { transform: scale(0.9); opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Navbar activeSection={activeSection} socialLinks={socialLinks} />
      <main>
        <Hero profile={profile} socialLinks={socialLinks} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Certifications certifications={certifications} />
        <Contact socialLinks={socialLinks} />
      </main>
      <Footer profile={profile} socialLinks={socialLinks} />
    </>
  );
}
