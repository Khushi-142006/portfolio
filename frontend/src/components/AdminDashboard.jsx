import React, { useState, useEffect } from "react";
import { 
  LogOut, Inbox, Mail, CheckCircle2, AlertTriangle, Calendar, User, 
  Trash2, Eye, EyeOff, Plus, Save, Settings, FileText, Globe, 
  Award, Briefcase, Cpu, Image, PlusCircle, Trash, Check, X, Link as LinkIcon
} from "lucide-react";
import { 
  fetchAdminMessages, 
  markMessageAsRead, 
  markMessageAsUnread, 
  deleteAdminMessage,
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchCertifications,
  fetchSocialLinks,
  updateProfile,
  updateSocialLinks,
  updateSkills,
  updateExperience,
  updateProjects,
  updateCertifications
} from "../services/api";

export default function AdminDashboard({ token, onLogout }) {
  // Navigation & Loading states
  const [activeTab, setActiveTab] = useState("messages"); // "messages" | "cms"
  const [cmsSection, setCmsSection] = useState("profile"); // "profile" | "socials" | "skills" | "experience" | "projects" | "certifications"
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Messages state
  const [messages, setMessages] = useState([]);

  // CMS state variables
  const [profileForm, setProfileForm] = useState({
    name: "", role: "", tagline: "", bio: "", profileImage: "", resumeUrl: "", careerObjective: "", stats: [], achievements: []
  });
  const [socialForm, setSocialForm] = useState({
    github: "", linkedin: "", twitter: "", email: "", phone: "", location: ""
  });
  const [skillsForm, setSkillsForm] = useState([]);
  const [experienceForm, setExperienceForm] = useState([]);
  const [projectsForm, setProjectsForm] = useState([]);
  const [certsForm, setCertsForm] = useState([]);

  // Load message logs
  const loadMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminMessages(token);
      setMessages(data);
    } catch (err) {
      setError(err.message || "Failed to load messages.");
      if (err.message?.toLowerCase().includes("unauthorized") || err.message?.toLowerCase().includes("token")) {
        setTimeout(onLogout, 2500);
      }
    } finally {
      setLoading(false);
    }
  };

  // Load all CMS data from database
  const loadCMSData = async () => {
    setLoading(true);
    setError("");
    try {
      const [profile, projects, skills, experience, certs, socials] = await Promise.all([
        fetchProfile(),
        fetchProjects(),
        fetchSkills(),
        fetchExperience(),
        fetchCertifications(),
        fetchSocialLinks()
      ]);

      if (profile) setProfileForm(profile);
      if (socials) setSocialForm(socials);
      if (skills) setSkillsForm(skills);
      if (experience) setExperienceForm(experience);
      if (projects) setProjectsForm(projects);
      if (certs) setCertsForm(certs);
    } catch (err) {
      setError("Failed to fetch portfolio data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "messages") {
      loadMessages();
    } else {
      loadCMSData();
    }
  }, [activeTab, token]);

  // --- Message Inbox Actions ---
  const handleToggleRead = async (id, currentStatus) => {
    setError("");
    setSuccess("");
    try {
      if (currentStatus) {
        await markMessageAsUnread(id, token);
        setMessages(messages.map(m => m._id === id || m.id === id ? { ...m, isRead: false } : m));
        setSuccess("Message status updated to unread.");
      } else {
        await markMessageAsRead(id, token);
        setMessages(messages.map(m => m._id === id || m.id === id ? { ...m, isRead: true } : m));
        setSuccess("Message status updated to read.");
      }
    } catch (err) {
      setError(err.message || "Failed to update message status.");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this message?")) return;
    setError("");
    setSuccess("");
    try {
      await deleteAdminMessage(id, token);
      setMessages(messages.filter(m => m._id !== id && m.id !== id));
      setSuccess("Message deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete the message.");
    }
  };

  // --- CMS Save Submissions ---
  const handleSaveCMS = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      let res;
      switch (cmsSection) {
        case "profile":
          res = await updateProfile(profileForm, token);
          setProfileForm(res.data);
          setSuccess("Profile settings successfully updated in MongoDB.");
          break;
        case "socials":
          res = await updateSocialLinks(socialForm, token);
          setSocialForm(res.data);
          setSuccess("Contact and social profiles updated successfully.");
          break;
        case "skills":
          res = await updateSkills(skillsForm, token);
          setSkillsForm(res.data);
          setSuccess("Skills catalog updated successfully.");
          break;
        case "experience":
          res = await updateExperience(experienceForm, token);
          setExperienceForm(res.data);
          setSuccess("Experience timeline updated successfully.");
          break;
        case "projects":
          res = await updateProjects(projectsForm, token);
          setProjectsForm(res.data);
          setSuccess("Projects listing updated successfully.");
          break;
        case "certifications":
          res = await updateCertifications(certsForm, token);
          setCertsForm(res.data);
          setSuccess("Professional certifications updated successfully.");
          break;
        default:
          break;
      }
    } catch (err) {
      setError(err.message || "An error occurred while saving profile changes.");
    } finally {
      setSaving(false);
    }
  };

  // --- Dynamic State Array Editors ---
  
  // Profile Stats
  const addStat = () => {
    setProfileForm({
      ...profileForm,
      stats: [...(profileForm.stats || []), { label: "", value: "" }]
    });
  };
  const removeStat = (index) => {
    setProfileForm({
      ...profileForm,
      stats: profileForm.stats.filter((_, i) => i !== index)
    });
  };
  const handleStatChange = (index, field, val) => {
    const updated = [...profileForm.stats];
    updated[index][field] = val;
    setProfileForm({ ...profileForm, stats: updated });
  };

  // Profile Achievements
  const addAchievement = () => {
    setProfileForm({
      ...profileForm,
      achievements: [...(profileForm.achievements || []), ""]
    });
  };
  const removeAchievement = (index) => {
    setProfileForm({
      ...profileForm,
      achievements: profileForm.achievements.filter((_, i) => i !== index)
    });
  };
  const handleAchievementChange = (index, val) => {
    const updated = [...profileForm.achievements];
    updated[index] = val;
    setProfileForm({ ...profileForm, achievements: updated });
  };

  // Skills Categories & Items
  const addSkillCategory = () => {
    setSkillsForm([...skillsForm, { category: "New Category", items: [] }]);
  };
  const removeSkillCategory = (catIndex) => {
    setSkillsForm(skillsForm.filter((_, i) => i !== catIndex));
  };
  const handleSkillCategoryChange = (catIndex, val) => {
    const updated = [...skillsForm];
    updated[catIndex].category = val;
    setSkillsForm(updated);
  };
  const addSkillItem = (catIndex) => {
    const updated = [...skillsForm];
    updated[catIndex].items.push({ name: "", level: "Intermediate", isPlanned: false });
    setSkillsForm(updated);
  };
  const removeSkillItem = (catIndex, itemIndex) => {
    const updated = [...skillsForm];
    updated[catIndex].items = updated[catIndex].items.filter((_, i) => i !== itemIndex);
    setSkillsForm(updated);
  };
  const handleSkillItemChange = (catIndex, itemIndex, field, val) => {
    const updated = [...skillsForm];
    updated[catIndex].items[itemIndex][field] = val;
    setSkillsForm(updated);
  };

  // Experiences
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      type: "work",
      role: "",
      company: "",
      location: "",
      period: "",
      description: [""]
    };
    setExperienceForm([...experienceForm, newExp]);
  };
  const removeExperience = (id) => {
    setExperienceForm(experienceForm.filter(exp => exp.id !== id));
  };
  const handleExperienceChange = (index, field, val) => {
    const updated = [...experienceForm];
    updated[index][field] = val;
    setExperienceForm(updated);
  };
  const handleExperienceDescChange = (expIndex, descIndex, val) => {
    const updated = [...experienceForm];
    updated[expIndex].description[descIndex] = val;
    setExperienceForm(updated);
  };
  const addExperienceDesc = (expIndex) => {
    const updated = [...experienceForm];
    updated[expIndex].description.push("");
    setExperienceForm(updated);
  };
  const removeExperienceDesc = (expIndex, descIndex) => {
    const updated = [...experienceForm];
    updated[expIndex].description = updated[expIndex].description.filter((_, i) => i !== descIndex);
    setExperienceForm(updated);
  };

  // Projects
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "",
      description: "",
      image: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      status: "In Development",
      architecture: [],
      category: "AI/ML"
    };
    setProjectsForm([...projectsForm, newProj]);
  };
  const removeProject = (id) => {
    setProjectsForm(projectsForm.filter(proj => proj.id !== id));
  };
  const handleProjectChange = (index, field, val) => {
    const updated = [...projectsForm];
    if (field === "technologies" || field === "architecture") {
      updated[index][field] = val.split(",").map(item => item.trim());
    } else {
      updated[index][field] = val;
    }
    setProjectsForm(updated);
  };

  // Certifications
  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: "",
      issuer: "",
      issueDate: "",
      credentialId: "",
      verificationUrl: "",
      description: ""
    };
    setCertsForm([...certsForm, newCert]);
  };
  const removeCertification = (id) => {
    setCertsForm(certsForm.filter(cert => cert.id !== id));
  };
  const handleCertChange = (index, field, val) => {
    const updated = [...certsForm];
    updated[index][field] = val;
    setCertsForm(updated);
  };

  // Compute metrics
  const totalCount = messages.length;
  const unreadCount = messages.filter(m => !m.isRead).length;
  const readCount = totalCount - unreadCount;

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container header-flex">
          <div className="dashboard-title">
            <Settings size={20} className="header-icon" />
            <h2>Security Command Center</h2>
          </div>
          
          <div className="tab-navigation">
            <button 
              onClick={() => setActiveTab("messages")} 
              className={`nav-tab-btn ${activeTab === "messages" ? "active" : ""}`}
            >
              <Inbox size={14} /> Messages {unreadCount > 0 && <span className="tab-badge">{unreadCount}</span>}
            </button>
            <button 
              onClick={() => setActiveTab("cms")} 
              className={`nav-tab-btn ${activeTab === "cms" ? "active" : ""}`}
            >
              <FileText size={14} /> Profile CMS
            </button>
          </div>

          <button onClick={onLogout} className="btn btn-secondary logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container dashboard-main">
        {/* Status Alerts */}
        {error && (
          <div className="form-status error" style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          </div>
        )}
        {success && (
          <div className="form-status success" style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <CheckCircle2 size={16} />
              <span>{success}</span>
            </div>
          </div>
        )}

        {/* Tab 1: Messages */}
        {activeTab === "messages" && (
          <>
            {/* Metrics Grid */}
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-num">{totalCount}</div>
                <div className="metric-label">Total Messages</div>
              </div>
              <div className="metric-card highlight-unread">
                <div className="metric-num">{unreadCount}</div>
                <div className="metric-label">New Messages</div>
              </div>
              <div className="metric-card">
                <div className="metric-num">{readCount}</div>
                <div className="metric-label">Read Messages</div>
              </div>
            </div>

            {/* Inbox List */}
            <div className="inbox-section">
              <h3>Recent Correspondence</h3>
              {loading ? (
                <div className="inbox-loader">
                  <div className="loader-spinner"></div>
                  <p>Retrieving secure logs...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="inbox-empty">
                  <Mail size={40} className="empty-icon" />
                  <p>No correspondence logs found on record.</p>
                </div>
              ) : (
                <div className="messages-list">
                  {messages.map((msg) => (
                    <div
                      key={msg._id || msg.id}
                      className={`message-inbox-card ${!msg.isRead ? "unread-highlight" : ""}`}
                    >
                      <div className="message-header-row">
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <User size={16} className="msg-icon" />
                          <strong className="msg-name">{msg.name}</strong>
                          <span className="msg-email">&lt;{msg.email}&gt;</span>
                        </div>
                        <div className="msg-meta-info">
                          <Calendar size={12} className="msg-icon" />
                          <span>{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      <p className="msg-body-content">{msg.message}</p>

                      <div className="message-action-row">
                        <button
                          onClick={() => handleToggleRead(msg._id || msg.id, msg.isRead)}
                          className={`action-btn ${msg.isRead ? "unread-btn" : "read-btn"}`}
                          title={msg.isRead ? "Mark as Unread" : "Mark as Read"}
                        >
                          {msg.isRead ? (
                            <><EyeOff size={14} /> Mark Unread</>
                          ) : (
                            <><Eye size={14} /> Mark Read</>
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg._id || msg.id)}
                          className="action-btn delete-btn"
                          title="Delete Permanently"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Tab 2: CMS Settings */}
        {activeTab === "cms" && (
          <div className="cms-layout">
            {/* CMS Sidebar Subnavigation */}
            <aside className="cms-sidebar">
              <button 
                onClick={() => setCmsSection("profile")} 
                className={`cms-nav-btn ${cmsSection === "profile" ? "active" : ""}`}
              >
                <User size={14} /> General & Bio
              </button>
              <button 
                onClick={() => setCmsSection("socials")} 
                className={`cms-nav-btn ${cmsSection === "socials" ? "active" : ""}`}
              >
                <Globe size={14} /> Contact & Socials
              </button>
              <button 
                onClick={() => setCmsSection("skills")} 
                className={`cms-nav-btn ${cmsSection === "skills" ? "active" : ""}`}
              >
                <Cpu size={14} /> Skills Catalog
              </button>
              <button 
                onClick={() => setCmsSection("experience")} 
                className={`cms-nav-btn ${cmsSection === "experience" ? "active" : ""}`}
              >
                <Briefcase size={14} /> Work & Education
              </button>
              <button 
                onClick={() => setCmsSection("projects")} 
                className={`cms-nav-btn ${cmsSection === "projects" ? "active" : ""}`}
              >
                <FileText size={14} /> Projects List
              </button>
              <button 
                onClick={() => setCmsSection("certifications")} 
                className={`cms-nav-btn ${cmsSection === "certifications" ? "active" : ""}`}
              >
                <Award size={14} /> Certifications
              </button>
            </aside>

            {/* CMS Editor Forms */}
            <section className="cms-content">
              {loading ? (
                <div className="inbox-loader">
                  <div className="loader-spinner"></div>
                  <p>Retrieving database records...</p>
                </div>
              ) : (
                <form onSubmit={handleSaveCMS} className="cms-form-card">
                  
                  {/* --- Section 1: Profile Settings --- */}
                  {cmsSection === "profile" && (
                    <div className="form-section-fields">
                      <h3 className="section-title">General Info & Biography</h3>
                      
                      <div className="form-group-row">
                        <div className="form-input-group">
                          <label>Full Name</label>
                          <input 
                            type="text" 
                            value={profileForm.name || ""} 
                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} 
                            required 
                          />
                        </div>
                        <div className="form-input-group">
                          <label>Professional Role / Title</label>
                          <input 
                            type="text" 
                            value={profileForm.role || ""} 
                            onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })} 
                            required 
                          />
                        </div>
                      </div>

                      <div className="form-input-group">
                        <label>Tagline (Hero Header Quote)</label>
                        <input 
                          type="text" 
                          value={profileForm.tagline || ""} 
                          onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })} 
                          required 
                        />
                      </div>

                      <div className="form-group-row">
                        <div className="form-input-group">
                          <label><Image size={12} style={{ marginRight: '6px' }} /> Profile Photo URL</label>
                          <input 
                            type="text" 
                            value={profileForm.profileImage || ""} 
                            onChange={(e) => setProfileForm({ ...profileForm, profileImage: e.target.value })} 
                          />
                        </div>
                        <div className="form-input-group">
                          <label><LinkIcon size={12} style={{ marginRight: '6px' }} /> Resume Download Link</label>
                          <input 
                            type="text" 
                            value={profileForm.resumeUrl || ""} 
                            onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })} 
                          />
                        </div>
                      </div>

                      <div className="form-input-group">
                        <label>Career Objective / Summary Text</label>
                        <input 
                          type="text" 
                          value={profileForm.careerObjective || ""} 
                          onChange={(e) => setProfileForm({ ...profileForm, careerObjective: e.target.value })} 
                        />
                      </div>

                      <div className="form-input-group">
                        <label>Main Biography Description</label>
                        <textarea 
                          rows="6" 
                          value={profileForm.bio || ""} 
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} 
                          required 
                        />
                      </div>

                      {/* Stats Dynamic Fields */}
                      <div className="dynamic-list-section">
                        <div className="list-header">
                          <h4>Key Statistics Widget</h4>
                          <button type="button" onClick={addStat} className="btn-add-item">
                            <Plus size={12} /> Add Stat
                          </button>
                        </div>
                        
                        {(profileForm.stats || []).map((stat, idx) => (
                          <div key={idx} className="dynamic-item-row stat-row">
                            <input 
                              type="text" 
                              placeholder="Stat Label (e.g. Projects Completed)" 
                              value={stat.label} 
                              onChange={(e) => handleStatChange(idx, "label", e.target.value)} 
                              required
                            />
                            <input 
                              type="text" 
                              placeholder="Value (e.g. 5+)" 
                              value={stat.value} 
                              onChange={(e) => handleStatChange(idx, "value", e.target.value)} 
                              required
                            />
                            <button type="button" onClick={() => removeStat(idx)} className="btn-remove-item">
                              <Trash size={14} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Achievements Dynamic Fields */}
                      <div className="dynamic-list-section">
                        <div className="list-header">
                          <h4>Highlight Accomplishments</h4>
                          <button type="button" onClick={addAchievement} className="btn-add-item">
                            <Plus size={12} /> Add Achievement
                          </button>
                        </div>
                        
                        {(profileForm.achievements || []).map((ach, idx) => (
                          <div key={idx} className="dynamic-item-row">
                            <input 
                              type="text" 
                              placeholder="Achievement detail statement" 
                              value={ach} 
                              onChange={(e) => handleAchievementChange(idx, e.target.value)} 
                              required
                            />
                            <button type="button" onClick={() => removeAchievement(idx)} className="btn-remove-item">
                              <Trash size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* --- Section 2: Social Links --- */}
                  {cmsSection === "socials" && (
                    <div className="form-section-fields">
                      <h3 className="section-title">Contact & Social Networks</h3>
                      
                      <div className="form-group-row">
                        <div className="form-input-group">
                          <label>Email Address</label>
                          <input 
                            type="email" 
                            value={socialForm.email || ""} 
                            onChange={(e) => setSocialForm({ ...socialForm, email: e.target.value })} 
                          />
                        </div>
                        <div className="form-input-group">
                          <label>Phone Number</label>
                          <input 
                            type="text" 
                            value={socialForm.phone || ""} 
                            onChange={(e) => setSocialForm({ ...socialForm, phone: e.target.value })} 
                          />
                        </div>
                      </div>

                      <div className="form-input-group">
                        <label>Location (City, State, Country)</label>
                        <input 
                          type="text" 
                          value={socialForm.location || ""} 
                          onChange={(e) => setSocialForm({ ...socialForm, location: e.target.value })} 
                        />
                      </div>

                      <div className="form-group-row">
                        <div className="form-input-group">
                          <label>GitHub Profile Link</label>
                          <input 
                            type="text" 
                            value={socialForm.github || ""} 
                            onChange={(e) => setSocialForm({ ...socialForm, github: e.target.value })} 
                          />
                        </div>
                        <div className="form-input-group">
                          <label>LinkedIn Profile Link</label>
                          <input 
                            type="text" 
                            value={socialForm.linkedin || ""} 
                            onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })} 
                          />
                        </div>
                      </div>

                      <div className="form-input-group">
                        <label>Twitter/X Profile Link</label>
                        <input 
                          type="text" 
                          value={socialForm.twitter || ""} 
                          onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })} 
                        />
                      </div>
                    </div>
                  )}

                  {/* --- Section 3: Skills CMS --- */}
                  {cmsSection === "skills" && (
                    <div className="form-section-fields">
                      <div className="list-header">
                        <h3 className="section-title">Skills & Knowledge Catalog</h3>
                        <button type="button" onClick={addSkillCategory} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          <PlusCircle size={14} /> Add Category Group
                        </button>
                      </div>

                      {skillsForm.map((cat, catIdx) => (
                        <div key={catIdx} className="skills-category-block">
                          <div className="category-header">
                            <input 
                              type="text" 
                              className="category-title-input" 
                              value={cat.category} 
                              onChange={(e) => handleSkillCategoryChange(catIdx, e.target.value)} 
                              required
                            />
                            <button type="button" onClick={() => removeSkillCategory(catIdx)} className="btn-remove-category text-danger">
                              <Trash size={16} /> Delete Category
                            </button>
                          </div>

                          <div className="skills-items-container">
                            <div className="skills-items-header">
                              <span>Skill Name</span>
                              <span>Level / Tag</span>
                              <span>Planned?</span>
                              <span>Action</span>
                            </div>
                            
                            {cat.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="skill-item-editor-row">
                                <input 
                                  type="text" 
                                  placeholder="e.g. React.js" 
                                  value={item.name} 
                                  onChange={(e) => handleSkillItemChange(catIdx, itemIdx, "name", e.target.value)} 
                                  required
                                />
                                <input 
                                  type="text" 
                                  placeholder="e.g. Expert" 
                                  value={item.level} 
                                  onChange={(e) => handleSkillItemChange(catIdx, itemIdx, "level", e.target.value)} 
                                  required
                                />
                                <div className="checkbox-wrapper">
                                  <input 
                                    type="checkbox" 
                                    checked={item.isPlanned || false} 
                                    onChange={(e) => handleSkillItemChange(catIdx, itemIdx, "isPlanned", e.target.checked)} 
                                  />
                                </div>
                                <button type="button" onClick={() => removeSkillItem(catIdx, itemIdx)} className="btn-remove-skill-item">
                                  <X size={14} />
                                </button>
                              </div>
                            ))}

                            <button type="button" onClick={() => addSkillItem(catIdx)} className="btn-add-skill-item">
                              <Plus size={12} /> Add Skill to Category
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* --- Section 4: Experience Timeline --- */}
                  {cmsSection === "experience" && (
                    <div className="form-section-fields">
                      <div className="list-header">
                        <h3 className="section-title">Experience & Education Timeline</h3>
                        <button type="button" onClick={addExperience} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          <PlusCircle size={14} /> Add Timeline Block
                        </button>
                      </div>

                      {experienceForm.map((exp, expIdx) => (
                        <div key={exp.id || expIdx} className="experience-editor-card">
                          <div className="card-header-row">
                            <span className="card-badge">Timeline Node</span>
                            <button type="button" onClick={() => removeExperience(exp.id)} className="btn-remove-item-card">
                              <Trash2 size={14} /> Remove Node
                            </button>
                          </div>

                          <div className="form-group-row">
                            <div className="form-input-group">
                              <label>Node Type</label>
                              <select 
                                value={exp.type} 
                                onChange={(e) => handleExperienceChange(expIdx, "type", e.target.value)}
                              >
                                <option value="work">Work Experience</option>
                                <option value="internship">Internship</option>
                                <option value="education">Education</option>
                              </select>
                            </div>
                            <div className="form-input-group">
                              <label>Job Title / Degree / Role</label>
                              <input 
                                type="text" 
                                value={exp.role} 
                                onChange={(e) => handleExperienceChange(expIdx, "role", e.target.value)} 
                                required 
                              />
                            </div>
                          </div>

                          <div className="form-group-row">
                            <div className="form-input-group">
                              <label>Company / School / Org</label>
                              <input 
                                type="text" 
                                value={exp.company} 
                                onChange={(e) => handleExperienceChange(expIdx, "company", e.target.value)} 
                                required 
                              />
                            </div>
                            <div className="form-input-group">
                              <label>Location</label>
                              <input 
                                type="text" 
                                value={exp.location || ""} 
                                onChange={(e) => handleExperienceChange(expIdx, "location", e.target.value)} 
                              />
                            </div>
                          </div>

                          <div className="form-input-group">
                            <label>Period (e.g. 2023 - Present or Jul 2026)</label>
                            <input 
                              type="text" 
                              value={exp.period} 
                              onChange={(e) => handleExperienceChange(expIdx, "period", e.target.value)} 
                              required 
                            />
                          </div>

                          {/* Dynamic description bullets */}
                          <div className="dynamic-list-section">
                            <div className="list-header" style={{ marginBottom: '8px' }}>
                              <label>Bullet Descriptions</label>
                              <button type="button" onClick={() => addExperienceDesc(expIdx)} className="btn-add-bullet-item">
                                <Plus size={10} /> Add Bullet
                              </button>
                            </div>

                            {exp.description.map((bullet, bulletIdx) => (
                              <div key={bulletIdx} className="bullet-item-row">
                                <input 
                                  type="text" 
                                  placeholder="Timeline detail bullet description" 
                                  value={bullet} 
                                  onChange={(e) => handleExperienceDescChange(expIdx, bulletIdx, e.target.value)} 
                                  required
                                />
                                <button type="button" onClick={() => removeExperienceDesc(expIdx, bulletIdx)} className="btn-remove-bullet">
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* --- Section 5: Projects CMS --- */}
                  {cmsSection === "projects" && (
                    <div className="form-section-fields">
                      <div className="list-header">
                        <h3 className="section-title">Portfolio Projects</h3>
                        <button type="button" onClick={addProject} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          <PlusCircle size={14} /> Add Project
                        </button>
                      </div>

                      {projectsForm.map((proj, projIdx) => (
                        <div key={proj.id || projIdx} className="experience-editor-card">
                          <div className="card-header-row">
                            <span className="card-badge project-badge">Project Card</span>
                            <button type="button" onClick={() => removeProject(proj.id)} className="btn-remove-item-card">
                              <Trash2 size={14} /> Remove Project
                            </button>
                          </div>

                          <div className="form-group-row">
                            <div className="form-input-group">
                              <label>Project Title</label>
                              <input 
                                type="text" 
                                value={proj.title} 
                                onChange={(e) => handleProjectChange(projIdx, "title", e.target.value)} 
                                required 
                              />
                            </div>
                            <div className="form-input-group">
                              <label>Category (e.g. AI/ML, Full Stack)</label>
                              <input 
                                type="text" 
                                value={proj.category || ""} 
                                onChange={(e) => handleProjectChange(projIdx, "category", e.target.value)} 
                              />
                            </div>
                          </div>

                          <div className="form-input-group">
                            <label>Thumbnail Image URL</label>
                            <input 
                              type="text" 
                              value={proj.image || ""} 
                              onChange={(e) => handleProjectChange(projIdx, "image", e.target.value)} 
                            />
                          </div>

                          <div className="form-input-group">
                            <label>Short Description Summary</label>
                            <textarea 
                              rows="3" 
                              value={proj.description} 
                              onChange={(e) => handleProjectChange(projIdx, "description", e.target.value)} 
                              required 
                            />
                          </div>

                          <div className="form-group-row">
                            <div className="form-input-group">
                              <label>Technologies (Comma-separated)</label>
                              <input 
                                type="text" 
                                placeholder="React, Node.js, FastAPI..."
                                value={(proj.technologies || []).join(", ")} 
                                onChange={(e) => handleProjectChange(projIdx, "technologies", e.target.value)} 
                              />
                            </div>
                            <div className="form-input-group">
                              <label>Architecture Tags (Comma-separated)</label>
                              <input 
                                type="text" 
                                placeholder="RAG, Vector Search, JWT..."
                                value={(proj.architecture || []).join(", ")} 
                                onChange={(e) => handleProjectChange(projIdx, "architecture", e.target.value)} 
                              />
                            </div>
                          </div>

                          <div className="form-group-row">
                            <div className="form-input-group">
                              <label>GitHub Repo URL</label>
                              <input 
                                type="text" 
                                value={proj.githubUrl || ""} 
                                onChange={(e) => handleProjectChange(projIdx, "githubUrl", e.target.value)} 
                              />
                            </div>
                            <div className="form-input-group">
                              <label>Live Demo URL</label>
                              <input 
                                type="text" 
                                value={proj.liveUrl || ""} 
                                onChange={(e) => handleProjectChange(projIdx, "liveUrl", e.target.value)} 
                              />
                            </div>
                          </div>

                          <div className="form-input-group">
                            <label>Status Tag (e.g. Completed, Production, Active)</label>
                            <input 
                              type="text" 
                              value={proj.status || ""} 
                              onChange={(e) => handleProjectChange(projIdx, "status", e.target.value)} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* --- Section 6: Certifications CMS --- */}
                  {cmsSection === "certifications" && (
                    <div className="form-section-fields">
                      <div className="list-header">
                        <h3 className="section-title">Certifications Catalog</h3>
                        <button type="button" onClick={addCertification} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          <PlusCircle size={14} /> Add Certification
                        </button>
                      </div>

                      {certsForm.map((cert, certIdx) => (
                        <div key={cert.id || certIdx} className="experience-editor-card">
                          <div className="card-header-row">
                            <span className="card-badge certification-badge">Certification</span>
                            <button type="button" onClick={() => removeCertification(cert.id)} className="btn-remove-item-card">
                              <Trash2 size={14} /> Remove Certification
                            </button>
                          </div>

                          <div className="form-group-row">
                            <div className="form-input-group">
                              <label>Certification Name / Title</label>
                              <input 
                                type="text" 
                                value={cert.title} 
                                onChange={(e) => handleCertChange(certIdx, "title", e.target.value)} 
                                required 
                              />
                            </div>
                            <div className="form-input-group">
                              <label>Issuer Authority</label>
                              <input 
                                type="text" 
                                value={cert.issuer} 
                                onChange={(e) => handleCertChange(certIdx, "issuer", e.target.value)} 
                                required 
                              />
                            </div>
                          </div>

                          <div className="form-group-row">
                            <div className="form-input-group">
                              <label>Date Issued (e.g. 2026)</label>
                              <input 
                                type="text" 
                                value={cert.issueDate} 
                                onChange={(e) => handleCertChange(certIdx, "issueDate", e.target.value)} 
                                required 
                              />
                            </div>
                            <div className="form-input-group">
                              <label>Credential ID</label>
                              <input 
                                type="text" 
                                value={cert.credentialId || ""} 
                                onChange={(e) => handleCertChange(certIdx, "credentialId", e.target.value)} 
                              />
                            </div>
                          </div>

                          <div className="form-input-group">
                            <label>Verification Link URL</label>
                            <input 
                              type="text" 
                              value={cert.verificationUrl || ""} 
                              onChange={(e) => handleCertChange(certIdx, "verificationUrl", e.target.value)} 
                            />
                          </div>

                          <div className="form-input-group">
                            <label>Certification Description Summary</label>
                            <textarea 
                              rows="3" 
                              value={cert.description || ""} 
                              onChange={(e) => handleCertChange(certIdx, "description", e.target.value)} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Submission Row */}
                  <div className="cms-submit-row">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-save" 
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <div className="loader-spinner spinner-small"></div>
                          Saving in progress...
                        </>
                      ) : (
                        <>
                          <Save size={16} /> Save Section Changes
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </section>
          </div>
        )}
      </main>

      <style>{`
        .admin-dashboard-container {
          min-height: 100vh;
          background-color: var(--bg-primary);
          padding-bottom: 80px;
        }
        .dashboard-header {
          position: sticky;
          top: 0;
          z-index: 90;
          background-color: rgba(9, 9, 11, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-primary);
        }
        .header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;
        }
        .dashboard-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .header-icon {
          color: var(--accent);
        }
        .dashboard-title h2 {
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .tab-navigation {
          display: flex;
          gap: 8px;
          background-color: var(--bg-secondary);
          padding: 4px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-primary);
        }
        .nav-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 6px 14px;
          font-size: 0.8125rem;
          font-weight: 600;
          font-family: var(--font-mono);
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all var(--transition-fast);
        }
        .nav-tab-btn:hover {
          color: var(--text-primary);
        }
        .nav-tab-btn.active {
          background-color: var(--bg-card);
          color: var(--accent);
          border: 1px solid var(--border-primary);
          box-shadow: var(--shadow-sm);
        }
        .tab-badge {
          background-color: var(--accent);
          color: white;
          font-size: 0.7rem;
          padding: 1px 5px;
          border-radius: 10px;
          font-family: sans-serif;
        }
        .logout-btn {
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-sm);
        }
        .dashboard-main {
          margin-top: 40px;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .metric-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        .metric-card.highlight-unread {
          border-color: var(--border-accent);
          background-color: rgba(99, 102, 241, 0.02);
        }
        .metric-num {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 8px;
        }
        .metric-card.highlight-unread .metric-num {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .metric-label {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          color: var(--text-secondary);
        }
        .inbox-section h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
        }
        .inbox-loader {
          text-align: center;
          padding: 60px 24px;
          color: var(--text-secondary);
        }
        .loader-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border-primary);
          border-top-color: var(--accent);
          border-radius: 50%;
          display: inline-block;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        .loader-spinner.spinner-small {
          width: 14px;
          height: 14px;
          border-width: 2px;
          margin-bottom: 0;
          margin-right: 6px;
          vertical-align: middle;
        }
        .inbox-empty {
          text-align: center;
          padding: 80px 24px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          color: var(--text-secondary);
        }
        .empty-icon {
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .message-inbox-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          padding: 24px;
          transition: border var(--transition-fast), box-shadow var(--transition-fast);
        }
        .message-inbox-card:hover {
          border-color: var(--border-hover);
        }
        .message-inbox-card.unread-highlight {
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 0 16px rgba(99, 102, 241, 0.05);
        }
        .message-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-primary);
        }
        .msg-icon {
          color: var(--text-muted);
        }
        .msg-name {
          color: var(--text-primary);
          font-size: 0.9375rem;
        }
        .msg-email {
          color: var(--text-secondary);
          font-size: 0.8125rem;
          font-family: var(--font-mono);
        }
        .msg-meta-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }
        .msg-body-content {
          font-size: 0.9375rem;
          color: var(--text-primary);
          white-space: pre-wrap;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .message-action-row {
          display: flex;
          gap: 12px;
        }
        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 0.75rem;
          font-weight: 600;
          font-family: var(--font-mono);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          border: 1px solid var(--border-primary);
          color: var(--text-secondary);
        }
        .action-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
          background-color: var(--bg-secondary);
        }
        .action-btn.read-btn {
          border-color: var(--border-accent);
          color: var(--accent-secondary);
        }
        .action-btn.read-btn:hover {
          background-color: rgba(99, 102, 241, 0.05);
        }
        .action-btn.delete-btn:hover {
          border-color: rgba(239, 68, 68, 0.4);
          color: #ef4444;
          background-color: rgba(239, 68, 68, 0.05);
        }
        
        /* CMS Styling Layout */
        .cms-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
          align-items: start;
        }
        .cms-sidebar {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          padding: 16px;
        }
        .cms-nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 10px 16px;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .cms-nav-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-secondary);
        }
        .cms-nav-btn.active {
          background: var(--accent-gradient);
          color: white;
          font-weight: 600;
        }
        .cms-content {
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          padding: 32px;
          box-shadow: var(--shadow-sm);
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-primary);
          padding-bottom: 12px;
        }
        
        /* Forms styling */
        .form-section-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-input-group label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          font-family: var(--font-mono);
        }
        .form-input-group input, 
        .form-input-group select, 
        .form-input-group textarea {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-size: 0.9375rem;
          transition: border-color var(--transition-fast);
        }
        .form-input-group input:focus, 
        .form-input-group select:focus, 
        .form-input-group textarea:focus {
          border-color: var(--border-accent);
          outline: none;
        }
        
        /* Dynamic list styles */
        .dynamic-list-section {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          padding: 20px;
          margin-top: 10px;
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .list-header h4 {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .btn-add-item {
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          color: var(--text-secondary);
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all var(--transition-fast);
        }
        .btn-add-item:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }
        .dynamic-item-row {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          align-items: center;
        }
        .dynamic-item-row input {
          flex: 1;
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          font-size: 0.875rem;
        }
        .dynamic-item-row input:focus {
          border-color: var(--border-accent);
          outline: none;
        }
        .btn-remove-item {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .btn-remove-item:hover {
          color: #ef4444;
        }
        
        /* Skills section custom style */
        .skills-category-block {
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          padding: 20px;
          margin-bottom: 24px;
          background-color: var(--bg-secondary);
        }
        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          border-bottom: 1px dashed var(--border-primary);
          padding-bottom: 12px;
        }
        .category-title-input {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          background: transparent;
          border: none;
          border-bottom: 1px solid transparent;
          padding: 2px 4px;
          width: 50%;
        }
        .category-title-input:focus {
          border-color: var(--border-accent);
          outline: none;
        }
        .btn-remove-category {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 0.8125rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .text-danger {
          color: #ef4444;
        }
        .skills-items-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .skills-items-header {
          display: grid;
          grid-template-columns: 2fr 1.5fr 80px 40px;
          gap: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          padding-bottom: 4px;
        }
        .skill-item-editor-row {
          display: grid;
          grid-template-columns: 2fr 1.5fr 80px 40px;
          gap: 12px;
          align-items: center;
        }
        .skill-item-editor-row input {
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          border-radius: var(--radius-md);
          padding: 8px 12px;
          font-size: 0.875rem;
        }
        .skill-item-editor-row input:focus {
          border-color: var(--border-accent);
          outline: none;
        }
        .checkbox-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .checkbox-wrapper input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
        .btn-remove-skill-item {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .btn-remove-skill-item:hover {
          color: #ef4444;
        }
        .btn-add-skill-item {
          margin-top: 8px;
          background-color: var(--bg-card);
          border: 1px dashed var(--border-primary);
          color: var(--text-secondary);
          padding: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .btn-add-skill-item:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
        }
        
        /* Experience Timeline editor card */
        .experience-editor-card {
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 24px;
          background-color: var(--bg-secondary);
        }
        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .card-badge {
          font-size: 0.7rem;
          font-weight: 700;
          font-family: var(--font-mono);
          text-transform: uppercase;
          background-color: rgba(99, 102, 241, 0.1);
          color: var(--accent);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }
        .card-badge.project-badge {
          background-color: rgba(167, 139, 250, 0.1);
          color: #a78bfa;
          border-color: rgba(167, 139, 250, 0.2);
        }
        .card-badge.certification-badge {
          background-color: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
          border-color: rgba(245, 158, 11, 0.2);
        }
        .btn-remove-item-card {
          background-color: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .btn-remove-item-card:hover {
          background-color: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
        }
        .btn-add-bullet-item {
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          color: var(--text-secondary);
          padding: 2px 8px;
          font-size: 0.6875rem;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .bullet-item-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 8px;
        }
        .bullet-item-row input {
          flex: 1;
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          color: var(--text-primary);
          border-radius: var(--radius-md);
          padding: 6px 12px;
          font-size: 0.8125rem;
        }
        .btn-remove-bullet {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        
        /* Submission Save Row */
        .cms-submit-row {
          margin-top: 32px;
          border-top: 1px solid var(--border-primary);
          padding-top: 24px;
          display: flex;
          justify-content: flex-end;
        }
        .btn-save {
          padding: 12px 24px;
          font-weight: 600;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 1024px) {
          .cms-layout {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .message-header-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .form-group-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .skills-items-header {
            display: none;
          }
          .skill-item-editor-row {
            grid-template-columns: 1fr;
            gap: 8px;
            border-bottom: 1px solid var(--border-primary);
            padding-bottom: 12px;
            margin-bottom: 8px;
          }
          .checkbox-wrapper {
            justify-content: flex-start;
            gap: 8px;
          }
          .checkbox-wrapper::before {
            content: "Planned?:";
            font-size: 0.8125rem;
            color: var(--text-secondary);
          }
        }
      `}</style>
    </div>
  );
}
