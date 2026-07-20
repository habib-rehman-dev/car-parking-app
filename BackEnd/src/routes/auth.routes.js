import express from "express";
import * as validators from "../validator/auth.validator.js";
import * as auths from "../controllers/auth.Controller.js";
import protect from "../middlewares/auth.middleware.js";
import { expressValidator } from "../middlewares/validate.middleware.js";


let authRoutes = express.Router();

// --- PUBLIC ROUTES (No authentication required) ---
authRoutes.post('/login', validators.loginValidator, expressValidator, auths.login);
authRoutes.post(
  "/register",
  
  validators.registerValidator,
  expressValidator,
  auths.register, 
); 
// what i do 

// --- PROTECT MIDDLEWARE ---
// Everything below this line will require a valid token/session to access
authRoutes.use(protect);

// --- PROTECTED ROUTES ---

authRoutes.get("/getme", auths.getme);
authRoutes.get("/refresh", auths.refresh);
authRoutes.get("/logout", auths.logout);

export default authRoutes;
