import express from "express";
import {
  loginAdmin,
  getMessages,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage,
  updateProfile,
  updateSocialLinks,
  updateSkills,
  updateExperience,
  updateProjects,
  updateCertifications
} from "../controllers/admin.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { loginRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Login endpoint with rate limiter protection
router.post("/login", loginRateLimiter, loginAdmin);

// Protected dashboard routes
router.get("/messages", requireAuth, getMessages);
router.patch("/messages/:id/read", requireAuth, markMessageAsRead);
router.patch("/messages/:id/unread", requireAuth, markMessageAsUnread);
router.delete("/messages/:id", requireAuth, deleteMessage);

// CMS Update routes
router.put("/profile", requireAuth, updateProfile);
router.put("/social-links", requireAuth, updateSocialLinks);
router.put("/skills", requireAuth, updateSkills);
router.put("/experience", requireAuth, updateExperience);
router.put("/projects", requireAuth, updateProjects);
router.put("/certifications", requireAuth, updateCertifications);

export default router;
