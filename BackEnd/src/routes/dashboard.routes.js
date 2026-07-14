import { Router } from "express";
import * as dashboardCtrls from '../controllers/dashboard.controller.js'
export let dashboardRoutes = Router()

dashboardRoutes.get('/stats' , dashboardCtrls.getStats)
dashboardRoutes.get('/getallparked' , dashboardCtrls.getAllParked)
dashboardRoutes.get('/revenue' , dashboardCtrls.getRevenue)


