import mongoose from "mongoose";
import dotenv from "dotenv";
import Profile from "../src/models/Profile.js";

dotenv.config();

const updateImage = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    console.error("No MONGODB_URI found");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const result = await Profile.updateMany({}, { $set: { profileImage: "/profile.jpg" } });
    console.log("Profile updated successfully:", result);

    process.exit(0);
  } catch (err) {
    console.error("Database connection/update error:", err);
    process.exit(1);
  }
};

updateImage();
