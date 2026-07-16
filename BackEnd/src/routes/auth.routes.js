import express from "express";
import * as validators from "../validator/auth.validator.js";
import * as auths from "../controllers/auth.Controller.js";
import protect from "../middlewares/auth.middleware.js";

let authRoutes = express.Router();

// --- PUBLIC ROUTES (No authentication required) ---
authRoutes.post("/login", validators.loginValidator, auths.login);
authRoutes.post("/register", validators.registerValidator, auths.register); // Moved here!

// --- PROTECT MIDDLEWARE ---
// Everything below this line will require a valid token/session to access
authRoutes.use(protect);

// --- PROTECTED ROUTES ---
authRoutes.get("/getme", auths.getme);
authRoutes.get("/logout", auths.logout);

export default authRoutes;