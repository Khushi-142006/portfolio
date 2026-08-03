import express from "express";
import {
  loginAdmin,
  getMessages,
  markMessageAsRead,
  markMessageAsUnread,
  deleteMessage
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

export default router;
