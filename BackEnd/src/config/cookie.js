import cookieParser from "cookie-parser";

// 1. Export the middleware for app.use(cookieParserMiddleware)
export const cookieParserMiddleware = cookieParser();

// 2. Export the cookie options object to use in res.cookie("token", val, cookieOptions)
const isProduction = process.env.NODE_ENV === "production" || true; // Set true for Vercel

export const cookieOptions = {
  httpOnly: true,
  secure: isProduction, // MUST be true when sameSite is 'none'
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};


