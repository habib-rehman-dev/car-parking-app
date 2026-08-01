import cookieParser from "cookie-parser";
import "./env.js";
// src/config/cookie.js (or wherever cookieOptions is defined)
const isProduction = process.env.NODE_ENV === "production";

export default cookieParser({
  httpOnly: true, // Prevents XSS attacks (JavaScript cannot read cookie)
  secure: isProduction, // MUST be true in production (requires HTTPS)
  sameSite: isProduction ? "none" : "lax", // MUST be "none" for cross-origin frontend/backend!
  path: "/",
})
