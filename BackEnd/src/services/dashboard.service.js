import ParkingSession from "../model/ParkingSession.js";
import Vehicle from "../model/Vehicle.js";
import { carTypes } from "../utils/carTypes.js";

// global functions

export async function getStats() {
  
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let tomorow = new Date(today);
  tomorow.setDate(tomorow.getDate() + 1);

  // curently parked vheciles
  let currentlyparked = await ParkingSession.countDocuments({
    status: "parked",
  });
  // total vehicle in the system
  let totalvehicles = await Vehicle.countDocuments();
  // today checkins
  let todayCheckins = await ParkingSession.find({
    entryTime: { $gt: today, $lt: tomorow },
  });
  // today checkouts
  let todayCheckouts = await ParkingSession.find({
    status: "exited",
     exitTime: { $gt: today, $lt: tomorow },
  });
  let parkdedSessions = await ParkingSession.find({
    status: "parked",
  }).populate("vehicleId");
  let accopyBYType = await parkdedSessions.reduce(
    (acc, session) => {
      let vehicle = session.vehicleId;
      if (vehicle.type && vehicle) {
        acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
      }
      return acc;
    },
    {
      [carTypes.BIKE]: 0,
      [carTypes.CAR]: 0,
    },
  );
  
 
  
  return {
    currentlyparked,
    todayCheckouts,
    totalvehicles,
    // todayCheckins,
    // accopyBYType,
  };
}

export async function getAllParked() {
  let parked = await ParkingSession.find({ status: "parked" });
  
  return parked;
}

export async function getRevenue() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const monthAgo = new Date(today);
  monthAgo.setDate(today.getDate() - 30);

  // We run a single aggregation pipeline to calculate all values at once in the DB!
  const [revenueStats] = await ParkingSession.aggregate([
    {
      // Step 1: Filter only completed sessions with fees
      $match: {
        fee: { $ne: null },
        exitTime: { $ne: null }
      }
    },
    {
      // Step 2: Use conditional groups to sum up fees for different timeframes
      $group: {
        _id: null, // We want a single combined result document
        todayRevenue: {
          $sum: {
            $cond: [
              { $and: [{ $gte: ["$exitTime", today] }, { $lte: ["$exitTime", tomorrow] }] },
              "$fee",
              0
            ]
          }
        },
        lastWeekRevenue: {
          $sum: {
            $cond: [
              { $gte: ["$exitTime", weekAgo] },
              "$fee",
              0
            ]
          }
        },
        lastMonthRevenue: {
          $sum: {
            $cond: [
              { $gte: ["$exitTime", monthAgo] },
              "$fee",
              0
            ]
          }
        },
        allTimeRevenue: {
          $sum: "$fee"
        }
      }
    }
  ]);

  // If there are no sessions in the database yet, return zeros gracefully
  return {
    todayRevenue: revenueStats?.todayRevenue || 0,
    lastWeekRevenue: revenueStats?.lastWeekRevenue || 0,
    lastMonthRevenue: revenueStats?.lastMonthRevenue || 0,
    allTimeRevenue: revenueStats?.allTimeRevenue || 0,
  };
}
