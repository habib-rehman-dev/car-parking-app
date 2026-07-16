import * as parkingSessionService from "../services/parkingSession.service.js";
export async function getAllActiveSessions(req, res, next) {
  try {
    
  
    let result = await parkingSessionService.getAllSession();
 
    res.json({ result, message: "session fethed successfully", success: true });
  } catch (err) {
    next(err);
  }
}

export async function getHistory(page, limit) {
  // Define options for mongoose-paginate-v2
  const options = {
    page: page || 1, // Default to page 1 if not provided
    limit: limit || 10, // Default to 10 items per page if not provided
    sort: { exitTime: -1 }, // Show newest checkouts first
    populate: "vehicleId",   // Automatically populate vehicle details
  };

  // Perform the paginated query
  const query = { status: "exited" };
  const paginatedResult = await ParkingSession.paginate(query, options);

  // Return the data structured exactly how the frontend expects it
  return {
    sessions: paginatedResult.docs, // Note: mongoose-paginate-v2 returns documents in the 'docs' field
    pagination: {
      totalItems: paginatedResult.totalDocs,
      totalPages: paginatedResult.totalPages,
      currentPage: paginatedResult.page,
      limit: paginatedResult.limit,
      hasNextPage: paginatedResult.hasNextPage,
      hasPrevPage: paginatedResult.hasPrevPage,
    }
  };
}