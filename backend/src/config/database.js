import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error("Error: MONGODB_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

// Graceful shutdown handling
const gracefulExit = async (signal) => {
  try {
    await mongoose.connection.close();
    console.log(`MongoDB connection closed through app termination (${signal})`);
    process.exit(0);
  } catch (err) {
    console.error(`Error closing MongoDB connection on ${signal}:`, err);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulExit("SIGINT"));
process.on("SIGTERM", () => gracefulExit("SIGTERM"));

export default connectDB;
