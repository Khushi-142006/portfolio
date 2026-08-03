import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";

// Connect to Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` PORTFOLIO BACKEND RUNNING IN ${ENV.toUpperCase()} MODE`);
    console.log(` Server Listening at: http://localhost:${PORT}`);
    console.log(` Health Check endpoint: http://localhost:${PORT}/health`);
    console.log(`====================================================`);
  });
});

