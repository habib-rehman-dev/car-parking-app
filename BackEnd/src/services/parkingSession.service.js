import ParkingSession from "../model/ParkingSession.js";
import { ApiError } from "../utils/errors.js";

export async function getAllSession() {
  let result = await ParkingSession.find({ status: "parked" }).populate(
    "vehicleId",
  );
  if (result == [] || result.length == 0) {
    throw new ApiError(
      "No active parking sessions found",
      404,
      "NO_ACTIVE_SESSIONS",
    );
  }
  return result;
}
export async function getHistory(options) {
  console.log("Options received in getHistory:", options);
  // how to populate the vehicleId in the result of the paginate function
  let result = await ParkingSession.paginate({ status: "exited" }, { ...options, populate: "vehicleId" });
  console.log(result)
  if (result == [] || result.length == 0) {
    throw new ApiError(
      "No exited parking sessions found",
      404,
      "NO_EXITED_SESSIONS",
    );
  }
  return result;
}
