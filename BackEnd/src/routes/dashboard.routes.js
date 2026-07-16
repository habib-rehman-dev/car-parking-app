import { Router } from "express";
import * as dashboardCtrls from '../controllers/dashboard.controller.js';
import protect, { checkRole } from "../middlewares/auth.middleware.js";

export let dashboardRoutes = Router();

// Public route (anyone can see)
dashboardRoutes.get('/stats', dashboardCtrls.getStats);

// Protected routes (requires login)
dashboardRoutes.use(protect);
dashboardRoutes.get('/getallparked',  dashboardCtrls.getAllParked);
dashboardRoutes.get('/revenue', checkRole(['admin']), dashboardCtrls.getRevenue);