import cookieParser from "cookie-parser";
import "./env.js";
// src/config/cookie.js (or wherever cookieOptions is defined)
const isProduction = process.env.NODE_ENV === "production" || true; // Adjust this based on your deployment environment


// {
//   httpOnly: true,       // Protects against XSS attacks
//   secure: true,         // REQUIRED on HTTPS (Vercel) when sameSite is 'none'
//   sameSite: "none",     // REQUIRED for cross-origin requests (localhost -> Vercel or Vercel -> Vercel)
//   path: "/",
// };
export default cookieParser({
  httpOnly: true, // Prevents XSS attacks (JavaScript cannot read cookie)
  secure: isProduction, // MUST be true in production (requires HTTPS)
  sameSite: isProduction ? "none" : "lax", // MUST be "none" for cross-origin frontend/backend!
  path: "/",
})
