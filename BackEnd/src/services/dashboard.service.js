import ParkingSession from "../model/ParkingSession.js";
import Vehicle from "../model/Vehicle.js";
import { cartTypes } from "../utils/carTypes.js";

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

  // total vheicle in the system
  let totalVheicles = await Vehicle.countDocuments();

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
      let vheicle = session.vehicleId;
      if (vheicle.type && vheicle) {
        acc[vheicle.type] = (acc[vheicle.type] || 0) + 1;
      }
      return acc;
    },
    {
      [cartTypes.BIKE]: 0,
      [cartTypes.CAR]: 0,
    },
  );
  return {
    currentlyparked,
    todayCheckouts,
    totalVheicles,
    todayCheckins,
    accopyBYType,
  };
}

export async function getAllParked() {
  let parked = await ParkingSession.find({ status: "parked" });
  return parked;
}

export async function getRevenue() {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let tomorow = new Date(today);
  tomorow.setDate(tomorow.getDate() + 1);

  let weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  let monthAgo = new Date(today)
  monthAgo.setDate(today.getDate()-30)

  let todaySessions = await ParkingSession.find({fee : {$ne : null} ,exitTime : {$gte : today , $lte:tomorow}})
  let todayRevenue = todaySessions.reduce((sum , s)=>{
    return sum + (s.fee || 0)
  }, 0)


  let lastWeekSessions =  await ParkingSession.find({fee : {$ne : null} ,exitTime : {$gte : weekAgo }})
  let lastWeekRevenue = lastWeekSessions.reduce((sum , s)=>{
    return sum + (s.fee || 0)
  }, 0)

  let lastMonthSessions =  await ParkingSession.find({fee : {$ne : null} ,exitTime : {$gte : monthAgo }})
  let lastMonthRevenue = lastMonthSessions.reduce((sum , s)=>{
    return sum + (s.fee || 0)
  }, 0)

  let allTimeSessions =  await ParkingSession.find({fee : {$ne : null} })
  let allTimeRevenue = allTimeSessions.reduce((sum , s)=>{
    return sum + (s.fee || 0)
  }, 0)


  let revenue = {
    todayRevenue,
    lastWeekRevenue,
    lastMonthRevenue,
    allTimeRevenue
  }
  return revenue;
}
