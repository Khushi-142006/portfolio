import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import apiRoutes from "./routes/api.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { checkDbConnection } from "./middleware/dbCheck.js";

const app = express();

// Security Headers & Middlewares
app.use(helmet());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], // local dev ports for Vite
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(morgan("dev"));
app.use(express.json());

// Main API Route grouping with DB connection middleware check
app.use("/api", checkDbConnection, apiRoutes);
app.use("/api/admin", checkDbConnection, adminRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Fallback for page not found (404)
app.use((req, res, next) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found.` });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error: err.message,
      errors: Object.values(err.errors).map(val => val.message)
    });
  }

  // Mongoose Cast Error (Invalid format for fields)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
      error: `Invalid format for field ${err.path}`
    });
  }

  // Handle Mongoose Connection/Network Errors
  if (err.name === "MongoNetworkError" || err.name === "MongooseServerSelectionError") {
    return res.status(503).json({
      success: false,
      message: "Database connection failed"
    });
  }

  // Default Error Response
  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

export default app;
