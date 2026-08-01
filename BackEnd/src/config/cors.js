import cors from "cors";
import "./env.js";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  (process.env.CLIENT_URL || "https://car-parking-app-qc9f.vercel.app").replace(/\/+$/, ""),
];

export default cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman, curl, or mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy blocks request from origin: ${origin}`));
    }
  },
  credentials: true, // 👈 REQUIRED for cookies
});