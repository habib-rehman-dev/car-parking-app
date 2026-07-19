import * as parkingSessionService from "../services/parkingSession.service.js";
export async function getAllActiveSessions(req, res, next) {
  try {
    let result = await parkingSessionService.getAllSession();
    if (!result) {
      throw new ApiError(
        "No active parking sessions found",
        404,
        "NO_ACTIVE_SESSIONS",
      );
    }
    res.json({ result, message: "session fethed successfully", success: true });
  } catch (err) {
    next(err);
  }
}

export async function getHistory(req, res, next) {
  try {
    // as i want to use the express paginnator over here
    let options = {
      limit:
        Number(req.query.limit) > 0 && Number(req.query.limit) < 50
          ? Number(req.query.limit)
          : 10 || 10,
      page: parseInt(req.query.page) || 1,
    };
    let result = await parkingSessionService.getHistory(options);
    if (!result ) {
      throw new ApiError(
        "No exited parking sessions found",
        404,
        "NO_EXITED_SESSIONS",
      );
    }

    res.json({
      result,
      message: "session history fetched successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
