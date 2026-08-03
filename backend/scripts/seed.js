import mongoose from "mongoose";
import dotenv from "dotenv";

import Profile from "../src/models/Profile.js";
import Project from "../src/models/Project.js";
import Skill from "../src/models/Skill.js";
import Experience from "../src/models/Experience.js";
import Certification from "../src/models/Certification.js";
import SocialLink from "../src/models/SocialLink.js";

import profileData from "../src/data/profile.js";
import projectsData from "../src/data/projects.js";
import skillsData from "../src/data/skills.js";
import experienceData from "../src/data/experience.js";
import certificationsData from "../src/data/certifications.js";
import socialLinksData from "../src/data/socialLinks.js";

dotenv.config();

const seedDatabase = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error("Error: MONGODB_URI is not defined in environment variables. Make sure .env file is populated.");
    process.exit(1);
  }

  try {
    console.log("Connecting to database for seeding...");
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Atlas.");

    // Clear existing data
    console.log("Clearing existing data...");
    await Profile.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Certification.deleteMany({});
    await SocialLink.deleteMany({});
    console.log("Existing data cleared.");

    // Insert new data
    console.log("Seeding profile data...");
    await Profile.create(profileData);

    console.log("Seeding projects data...");
    await Project.insertMany(projectsData);

    console.log("Seeding skills data...");
    await Skill.insertMany(skillsData);

    console.log("Seeding experience data...");
    await Experience.insertMany(experienceData);

    console.log("Seeding certifications data...");
    await Certification.insertMany(certificationsData);

    console.log("Seeding social links data...");
    await SocialLink.create(socialLinksData);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
