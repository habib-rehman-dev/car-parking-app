import { Router } from "express"; // Note: Use { Router } directly from express
import * as parkingSessionControllers from '../controllers/parkingSession.controller.js';
import protect from "../middlewares/auth.middleware.js"; // Import protection middleware

let parkingSessionRoutes = Router(); // Fixed casing typo (ROutes -> Routes)

// Protect all session routes below this line
parkingSessionRoutes.use(protect);

parkingSessionRoutes.get("/getactive", parkingSessionControllers.getAllActiveSessions);
parkingSessionRoutes.get("/gethistory", parkingSessionControllers.getHistory);

export default parkingSessionRoutes;