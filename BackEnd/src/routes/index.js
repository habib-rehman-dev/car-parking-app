import { Router } from "express";
import authRoutes from "./auth.routes.js";
import vehicleRoutes from "./vehicle.routes.js";
import parkingSessionROutes from './parkingSession.routes.js'
import { dashboardRoutes } from "./dashboard.routes.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router()
router.use('/auth' , authRoutes)
router.use(protect)
router.use('/vehicle' , vehicleRoutes)
router.use('/sessions' , parkingSessionROutes)
router.use('/dashboard' , dashboardRoutes)

export default router