import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const checkDb = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const Profile = mongoose.model("Profile", new mongoose.Schema({}, { strict: false }));
    const profile = await Profile.findOne();
    console.log("Profile in database:", profile ? profile.toJSON() : "NONE");

    const Project = mongoose.model("Project", new mongoose.Schema({}, { strict: false }));
    const projects = await Project.find();
    console.log("Projects in database count:", projects.length);

    process.exit(0);
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

checkDb();
