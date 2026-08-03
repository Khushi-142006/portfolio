import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Certification from "../models/Certification.js";
import SocialLink from "../models/SocialLink.js";

export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne().exec();
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().exec();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().exec();
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

export const getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.find().exec();
    res.json(experience);
  } catch (error) {
    next(error);
  }
};

export const getCertifications = async (req, res, next) => {
  try {
    const certifications = await Certification.find().exec();
    res.json(certifications);
  } catch (error) {
    next(error);
  }
};

export const getSocialLinks = async (req, res, next) => {
  try {
    const socialLinks = await SocialLink.findOne().exec();
    if (!socialLinks) {
      return res.status(404).json({
        success: false,
        message: "Social links not found"
      });
    }
    res.json(socialLinks);
  } catch (error) {
    next(error);
  }
};
