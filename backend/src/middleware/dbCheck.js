import mongoose from "mongoose";

export const checkDbConnection = (req, res, next) => {
  // state 1 means connected
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Database disconnected. Please try again later."
    });
  }
  next();
};
