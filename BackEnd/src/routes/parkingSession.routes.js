import Router from "express";
import * as parkingSessionControllers from '../controllers/parkingSession.controller.js'
let parkingSessionROutes = Router();

parkingSessionROutes.get("/getactive" , parkingSessionControllers.getAllActiveSessions);
parkingSessionROutes.get("/gethistory" , parkingSessionControllers.getHistory);

export default parkingSessionROutes;
