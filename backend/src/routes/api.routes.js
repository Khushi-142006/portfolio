import express from "express";
import {
  getProfile,
  getProjects,
  getSkills,
  getExperience,
  getCertifications,
  getSocialLinks
} from "../controllers/portfolio.controller.js";
import { submitContactForm } from "../controllers/contact.controller.js";

const router = express.Router();

// Portfolio data routes
router.get("/profile", getProfile);
router.get("/projects", getProjects);
router.get("/skills", getSkills);
router.get("/experience", getExperience);
router.get("/certifications", getCertifications);
router.get("/social-links", getSocialLinks);

// Interaction routes
router.post("/contact", submitContactForm);

export default router;
