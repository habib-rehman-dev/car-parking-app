import cors from "cors";
import "./env.js";

export default cors({
  // Vercel's Origin header never has a trailing slash, so neither should this
  // value. Override it with CLIENT_URL in the Vercel backend project settings.
  origin: process.env.CLIENT_URL || "https://car-parking-app-z9po.vercel.app",
  credentials: true,
});
