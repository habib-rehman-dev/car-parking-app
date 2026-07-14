import Vehicle from "../model/Vehicle.js";
import ParkingSession from "../model/ParkingSession.js";
import { FeeOnTYpe } from "../utils/carTypes.js";
import * as utils from "../utils/parkingCalculators.js";

export async function checkin({ type, phone, driverName, licencePlate }) {
  
  let vheicle = await Vehicle.findOne({ licencePlate });
  if (!vheicle) {
    vheicle = await Vehicle.create({ type, phone, driverName, licencePlate });
  }

  let activeSession = await ParkingSession.findOne({
    vehicleId: vheicle._id,
    status: "parked",
  });
  if (activeSession) {
    throw new Error("vheicle is already Parked");
  }
  // create a new session if not exist
  let session = await ParkingSession.create({
    vehicleId: vheicle._id,
    status: "parked",
    entryTime: new Date(),
  });
  session.populate("vehicleId");
  let result = {
    message: "vheicle checked in successfully!",
    session: {
      id: session._id,
      vheicle: session.vehicleId,
      etnryTime: session.entryTime,
      status: session.status,
    },
  };
  return result;
}
export async function checkOut({ licencePlate }) {
  console.log(licencePlate);

  let vheicle = await Vehicle.findOne({ licencePlate });

  if (!vheicle) {
    throw new Error("vheicle not found");
  }
  console.log(vheicle);
  let activeSession = await ParkingSession.findOne({
    vehicleId : vheicle._id,
    status: "parked",
  });
  // await activeSession.populate('vheicleId')
  console.log(activeSession);
  
  if (!activeSession) {
    throw new Error("vheicle is not parked--------");
  }
  let exitTime = new Date();
  let daysParked = utils.calculateDaysParked(exitTime, activeSession.entryTime);

  console.log(daysParked);
  let fee = utils.calculateFee(FeeOnTYpe ,vheicle.type, daysParked);
  console.log(fee);


  activeSession.exitTime = exitTime;
  activeSession.fee = fee;
  activeSession.status = "exited";
  await activeSession.save();
  

  let result = {
    message: "vheicle checked in successfully!",
    session: activeSession,
    success: true,
  };
  return result;
}
export async function search({ licencePlate }) {
  console.log(licencePlate);

  let vheicle = await Vehicle.findOne({ licencePlate });

  if (!vheicle) {
    throw new Error("vheicle not found");
  }

  let activeSession = await ParkingSession.findOne({
    vehicleId : vheicle._id,
    status: "parked",
  });
  let message = activeSession ? 'Parked':'Not parked'

  let result = {
    message: message,
    session: activeSession,
    success: !!activeSession,
  };
  return result;
}
