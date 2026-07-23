import express from "express";
import router from "./routes/index.js";
import cookieConfig from "./config/cookie.js";
import helmet from "./config/helmet.js";
import cors from "./config/cors.js";
import errorHandler from "./middlewares/error.middleware.js";
import "./config/env.js";
import connectDB from "./config/dbConnect.js";

const app = express();

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors,
  cookieConfig,
  helmet,
);

app.use("/api/v1", router);

app.get("/", (req, res) => {
  console.log("Health check route hit");
  res.status(200).json({ message: "API is healthy" });
});

// Make unmatched URLs visible in Vercel function logs instead of falling
// through Express' default 404 response silently.
app.use((req, res) => {
  console.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: { message: "Route not found", code: "NOT_FOUND" },
  });
});

app.use(errorHandler);

connectDB()

export default app;
