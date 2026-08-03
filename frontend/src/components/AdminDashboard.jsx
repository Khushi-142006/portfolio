import React, { useState, useEffect } from "react";
import { LogOut, Inbox, Mail, CheckCircle2, ShieldAlert, AlertTriangle, Calendar, User, Trash2, Eye, EyeOff } from "lucide-react";
import { fetchAdminMessages, markMessageAsRead, markMessageAsUnread, deleteAdminMessage } from "../services/api";

export default function AdminDashboard({ token, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminMessages(token);
      setMessages(data);
    } catch (err) {
      setError(err.message || "Failed to load messages. Session may have expired.");
      if (err.message?.toLowerCase().includes("unauthorized") || err.message?.toLowerCase().includes("token")) {
        // Automatically logout on expired token
        setTimeout(onLogout, 2500);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [token]);

  const handleToggleRead = async (id, currentStatus) => {
    setError("");
    setSuccess("");
    try {
      if (currentStatus) {
        // Mark as Unread
        await markMessageAsUnread(id, token);
        setMessages(messages.map(m => m._id === id || m.id === id ? { ...m, isRead: false } : m));
        setSuccess("Message status updated to unread.");
      } else {
        // Mark as Read
        await markMessageAsRead(id, token);
        setMessages(messages.map(m => m._id === id || m.id === id ? { ...m, isRead: true } : m));
        setSuccess("Message status updated to read.");
      }
    } catch (err) {
      setError(err.message || "Failed to update message status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this message?")) {
      return;
    }
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
            <Inbox size={20} className="header-icon" />
            <h2>Security Command - Message Center</h2>
          </div>
          <button onClick={onLogout} className="btn btn-secondary logout-btn">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container dashboard-main">
        {/* Status Messages */}
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
                        <>
                          <EyeOff size={14} /> Mark Unread
                        </>
                      ) : (
                        <>
                          <Eye size={14} /> Mark Read
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id || msg.id)}
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
        @keyframes spin {
          to { transform: rotate(360deg); }
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
        }
      `}</style>
    </div>
  );
}
