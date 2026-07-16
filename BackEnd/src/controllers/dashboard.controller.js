import * as dashboardService from "../services/dashboard.service.js";
import { ApiError } from "../utils/errors.js";

export async function getStats(req, res, next) {
  try {
    let stats = await dashboardService.getStats();
    if (!stats) {
      throw new ApiError(
        "Error while fetching stats",
        500,
        "STATS_FETCH_ERROR",
      );
    }
    res.json({
      success: true,
      message: "stats get in",
      stats,
    });
  } catch (error) {
    next(error);
  }
}
export async function getAllParked(req, res, next) {
  try {
    console.log("Fetching all parked vehicles...");
    let parked = await dashboardService.getAllParked();
    console.log("Parked vehicles fetched:", parked);
    if (!parked || parked == [] || parked.length === 0) {
      throw new ApiError(
        "Error while fetching parked vehicles",
        500,
        "PARKED_FETCH_ERROR",
      );
    }
    res.json({
      success: true,
      message: "Parked vhecel got successfull",
      parked,
    });
  } catch (error) {
    next(error);
  }
}

export async function getRevenue(req, res, next) {
  try {
    let revenue = await dashboardService.getRevenue();
    if (!revenue) {
      throw new ApiError(
        "there is some technical issue in the calculation of the total revenue.",
        500,
        "REVENUE_CALCULATION_ERROR"
      );
    }
    res.status(200).json({
      success: true,
      message: "Revenue fetched successfully",
      revenue,
    });
  } catch (error) {
    next(error);
  }
}
