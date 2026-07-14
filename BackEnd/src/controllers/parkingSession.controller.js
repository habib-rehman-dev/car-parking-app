import * as parkingSessionService from "../services/parkingSession.service.js";
export async function getAllActiveSessions(req, res, next) {
  try {
    
  
    let result = await parkingSessionService.getAllSession();
 
    res.json({ result, message: "session fethed successfully", success: true });
  } catch (err) {
    next(err);
  }
}


export async function getHistory(req, res, next) {
  try {
  
    let result = await parkingSessionService.getHistory();
   
    res.json({ result, message: "session fethed successfully", success: true });
  } catch (err) {
    next(err);
  }
}
