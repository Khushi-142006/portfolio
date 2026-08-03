import React, { useState } from "react";
import { Lock, User, Key, ShieldAlert } from "lucide-react";
import { adminLogin } from "../services/api";

export default function AdminLogin({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ username: "", password: "", secretPhrase: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.secretPhrase) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await adminLogin(formData.username, formData.password, formData.secretPhrase);
      if (response.success && response.token) {
        onLoginSuccess(response.token);
      } else {
        setError(response.message || "Invalid authentication response.");
      }
    } catch (err) {
      setError(err.message || "Failed to connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="login-header">
          <div className="login-icon-box">
            <Lock size={24} />
          </div>
          <h2>Secure Access Gate</h2>
          <p>Access is restricted to authorized personnel only.</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <div className="input-with-icon">
              <User size={16} className="input-icon" />
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter identity"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Key size={16} className="input-icon" />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="secretPhrase">Secret Phrase</label>
            <div className="input-with-icon">
              <ShieldAlert size={16} className="input-icon" />
              <input
                id="secretPhrase"
                type="password"
                name="secretPhrase"
                value={formData.secretPhrase}
                onChange={handleChange}
                placeholder="Enter secret clearance phrase"
                className="form-input"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", marginTop: "12px" }}
          >
            {loading ? "Verifying clearance..." : "Authenticate Access"}
          </button>

          {error && (
            <div className="form-status error" style={{ marginTop: "16px" }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span>{error}</span>
              </div>
            </div>
          )}
        </form>
      </div>

      <style>{`
        .admin-login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: var(--bg-primary);
          padding: 24px;
        }
        .admin-login-card {
          width: 100%;
          max-width: 420px;
          background-color: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          padding: 40px 32px;
          box-shadow: var(--shadow-premium);
        }
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-icon-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: var(--radius-sm);
          background-color: rgba(99, 102, 241, 0.08);
          border: 1px solid var(--border-accent);
          color: var(--accent);
          margin-bottom: 16px;
        }
        .login-header h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .login-header p {
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }
        .input-with-icon {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }
        .input-with-icon .form-input {
          padding-left: 44px;
        }
      `}</style>
    </div>
  );
}
