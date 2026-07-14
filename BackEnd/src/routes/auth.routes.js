import express from "express";
import * as validators from '../validator/auth.validator.js'

import 
 * as auths
 from "../controllers/auth.Controller.js";

let authRoutes = express.Router();

authRoutes.post("/register", validators.registerValidator, auths.register);
authRoutes.post("/login",  validators.loginValidator, auths.login);
authRoutes.get("/logout", auths.logout);
// authRoutes.get("/getme", getme);
// authRoutes.get("/logout", logout);

export default authRoutes;
