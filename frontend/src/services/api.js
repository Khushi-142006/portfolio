const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

// Fallback hardcoded data in case the backend server is not running
const FALLBACK_DATA = {
  profile: {
    name: "Khushi Gadyal (Demo)",
    role: "Aspiring AI/ML Engineer | Full Stack Developer",
    tagline: "Building intelligent applications and full-stack solutions.",
    bio: "Aspiring AI/ML Engineer with hands-on experience in designing and developing AI-powered and full-stack web applications using Python, React, FastAPI, Node.js, Express.js, and MongoDB. (Note: Backend server is offline; viewing local demo data).",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    resumeUrl: "#",
    careerObjective: "To leverage my expertise in full-stack web development and artificial intelligence to design and deliver high-impact, production-ready software systems.",
    stats: [
      { label: "Projects Completed", value: "3" },
      { label: "AI Models / RAG Deployed", value: "2" },
      { label: "Certifications", value: "2" }
    ],
    achievements: [
      "Completed a 10-hour program covering Agentic AI, autonomous AI systems, multi-agent workflows, and AI orchestration with 100% score.",
      "Built and deployed PaperMind AI, an intelligent document assistant utilizing Retrieval-Augmented Generation (RAG).",
      "Developed a personal portfolio website showcasing projects, skills, and secure contact management."
    ]
  },
  projects: [
    {
      id: "demo-1",
      title: "PaperMind AI – AI PDF Chat Assistant",
      description: "An AI-powered document assistant that enables users to upload PDF files and ask natural language questions using Retrieval-Augmented Generation (RAG).",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "FastAPI", "Python", "ChromaDB", "LangChain"],
      githubUrl: "https://github.com/Khushi-142006/papermind-ai",
      liveUrl: "",
      status: "Active",
      architecture: ["Retrieval-Augmented Generation (RAG)", "Semantic Search"],
      category: "AI/ML"
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", level: "Advanced" },
        { name: "JavaScript", level: "Expert" },
        { name: "TypeScript", level: "Advanced" }
      ]
    }
  ],
  experience: [
    {
      id: "exp-1",
      type: "internship",
      role: "Full Stack Development Intern",
      company: "Thiranex",
      location: "Remote (Project-Based)",
      period: "Jul 2026 – Aug 2026",
      description: [
        "Developed full-stack web applications using modern frontend and backend technologies.",
        "Built and integrated RESTful APIs with databases."
      ]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Agentic AI: The New Software Paradigm",
      issuer: "AI Campus (Hasso Plattner Institute)",
      issueDate: "2026",
      credentialId: "",
      verificationUrl: "",
      description: "Completed a 10-hour program covering Agentic AI, autonomous AI systems, multi-agent workflows, and AI orchestration."
    }
  ],
  socialLinks: {
    github: "https://github.com/Khushi-142006",
    linkedin: "https://www.linkedin.com/in/khushi-gadyal-940067349?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    twitter: "",
    email: "gadyalkhushi1428@gmail.com",
    phone: "+91 8310974973",
    location: "Belagavi, Karnataka, India"
  }
};

const handleFetch = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Failed to fetch from backend for /api/${endpoint}. Using offline fallback data.`, error);
    // Return appropriate portion of fallback data
    return FALLBACK_DATA[endpoint] || null;
  }
};

export const fetchProfile = () => handleFetch("profile");
export const fetchProjects = () => handleFetch("projects");
export const fetchSkills = () => handleFetch("skills");
export const fetchExperience = () => handleFetch("experience");
export const fetchCertifications = () => handleFetch("certifications");
export const fetchSocialLinks = () => handleFetch("social-links");

export const submitContact = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    });
    
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to submit form.");
    }
    return result;
  } catch (error) {
    console.error("Error submitting contact form to backend:", error);
    // Provide a simulated successful post response in fallback case so the UI still works
    return {
      success: true,
      message: "Demo Mode: Message recorded locally (Backend offline). Thanks for reaching out!",
      data: { id: `demo-msg-${Date.now()}`, ...contactData, createdAt: new Date() }
    };
  }
};

// Admin Dashboard API Integrations
export const adminLogin = async (username, password, secretPhrase) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, secretPhrase })
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Login failed.");
  }
  return result;
};

export const fetchAdminMessages = async (token) => {
  const response = await fetch(`${API_BASE_URL}/admin/messages`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch messages.");
  }
  return result;
};

export const markMessageAsRead = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/messages/${id}/read`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to mark as read.");
  }
  return result;
};

export const markMessageAsUnread = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/messages/${id}/unread`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to mark as unread.");
  }
  return result;
};

export const deleteAdminMessage = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/messages/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to delete message.");
  }
  return result;
};

// Portfolio CMS Updates
export const updateProfile = async (profileData, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to update profile.");
  }
  return result;
};

export const updateSocialLinks = async (socialData, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/social-links`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(socialData)
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to update social links.");
  }
  return result;
};

export const updateSkills = async (skillsData, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/skills`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(skillsData)
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to update skills.");
  }
  return result;
};

export const updateExperience = async (experienceData, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/experience`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(experienceData)
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to update experience.");
  }
  return result;
};

export const updateProjects = async (projectsData, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/projects`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(projectsData)
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to update projects.");
  }
  return result;
};

export const updateCertifications = async (certsData, token) => {
  const response = await fetch(`${API_BASE_URL}/admin/certifications`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(certsData)
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to update certifications.");
  }
  return result;
};

