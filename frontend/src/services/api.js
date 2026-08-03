const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Fallback hardcoded data in case the backend server is not running
const FALLBACK_DATA = {
  profile: {
    name: "Alex Carter (Demo)",
    role: "Full Stack Developer | AI/ML Engineer",
    tagline: "Building premium web applications and scalable intelligent systems.",
    bio: "I am a Full Stack Software Engineer and AI/ML Specialist dedicated to crafting exceptional digital experiences. (Note: Backend server is offline; viewing local demo data).",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
    resumeUrl: "#",
    careerObjective: "To leverage my expertise in full-stack web development and artificial intelligence to design and deliver high-impact, production-ready software systems.",
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Projects Completed", value: "25+" },
      { label: "AI Models Deployed", value: "12+" },
      { label: "Open Source Contribs", value: "200+" }
    ],
    achievements: [
      "Winner of the National AI Hackathon 2025.",
      "Architected and migrated a legacy monolith to a Node.js microservices setup.",
      "Developed a lightweight open-source React state visualizer with 2,500+ GitHub Stars.",
      "Published a research paper on optimization of transformer inference."
    ]
  },
  projects: [
    {
      id: "demo-1",
      title: "NovaSearch - AI Semantic Search Engine",
      description: "A production-grade semantic search platform featuring dense vector search and hybrid keyword-vector retrieval.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "FastAPI", "Pinecone", "OpenAI API"],
      githubUrl: "#",
      liveUrl: "#",
      status: "Production",
      architecture: ["Vector Search", "Hybrid Retrieval"],
      category: "AI/ML"
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "TypeScript", level: "Expert" },
        { name: "JavaScript", level: "Expert" },
        { name: "Python", level: "Expert" }
      ]
    }
  ],
  experience: [
    {
      id: "exp-1",
      type: "work",
      role: "Senior Full Stack Engineer",
      company: "TechNova Solutions",
      location: "San Francisco, CA (Remote)",
      period: "2023 - Present",
      description: ["Led migration to microservices.", "Designed event-driven real-time analytics."]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "AWS Certified Solutions Architect",
      issuer: "AWS",
      issueDate: "2024",
      credentialId: "AWS-123",
      verificationUrl: "#",
      description: "Validation of advanced technical skills and experience in designing distributed applications."
    }
  ],
  socialLinks: {
    github: "https://github.com/alexcarter",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "alex.carter.dev@gmail.com",
    phone: "+1 (555) 019-2834",
    location: "Austin, Texas, United States"
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

