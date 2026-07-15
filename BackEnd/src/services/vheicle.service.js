import Vehicle from "../model/Vehicle.js";
import ParkingSession from "../model/ParkingSession.js";
import { FeeOnTYpe } from "../utils/carTypes.js";
import * as utils from "../utils/parkingCalculators.js";
import { ApiError } from "../utils/errors.js";

export async function checkin({ type, phone, driverName, licencePlate }) {
  let vehicle = await Vehicle.findOne({ licencePlate });
  if (!vehicle) {
    vehicle = await Vehicle.create({ type, phone, driverName, licencePlate });
  }

  // Double-check in app logic first (good practice)
  let activeSession = await ParkingSession.findOne({
    vehicleId: vehicle._id,
    status: "parked",
  });
  if (activeSession) {
    throw new ApiError(
      "Vehicle is already parked",
      400,
      "VEHICLE_ALREADY_PARKED",
    );
  }

  try {
    // Create the session
    let session = await ParkingSession.create({
      vehicleId: vehicle._id,
      status: "parked",
      entryTime: new Date(),
    });

    await session.populate("vehicleId");

    return {
      message: "Vehicle checked in successfully!",
      session: {
        id: session._id,
        vehicle: session.vehicleId,
        entryTime: session.entryTime,
        status: session.status,
      },
    };
  } catch (error) {
    // --- THE FIX: CATCH CONCURRENT DOUBLE CHECK-IN ---
    if (error.code === 11000) {
      throw new ApiError(
        "Vehicle is already being parked (duplicate request)",
        400,
        "VEHICLE_ALREADY_PARKED",
      );
    }
    throw error;
  }
}
export async function checkOut({ licencePlate }) {
  let vehicle = await Vehicle.findOne({ licencePlate });
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  let exitTime = new Date();

  // 1. Fetch the active session to calculate the fee first
  let activeSession = await ParkingSession.findOne({
    vehicleId: vehicle._id,
    status: "parked",
  });

  if (!activeSession) {
    throw new Error("Vehicle is not parked");
  }

  let daysParked = utils.calculateDaysParked(exitTime, activeSession.entryTime);
  let fee = utils.calculateFee(FeeOnTYpe, vehicle.type, daysParked);

  // --- THE FIX: ATOMIC CONDITIONAL UPDATE ---
  // We only update if the status is STILL "parked" at this exact millisecond
  let updatedSession = await ParkingSession.findOneAndUpdate(
    {
      _id: activeSession._id,
      status: "parked" // Must still be parked!
    },
    {
      $set: {
        exitTime: exitTime,
        fee: fee,
        status: "exited"
      }
    },
    { new: true } // Returns the updated document
  );

  // If another request beat us to it, updatedSession will be null
  if (!updatedSession) {
    throw new Error("Vehicle has already been checked out by another process!");
  }

  return {
    message: "Vehicle checked out successfully!",
    session: updatedSession,
    success: true,
  };
}
export async function search({ licencePlate }) {
  console.log(licencePlate);

  let vehicle = await Vehicle.findOne({ licencePlate });

  if (!vehicle) {
    throw new Error("vehicle not found");
  }

  let activeSession = await ParkingSession.findOne({
    vehicleId: vehicle._id,
    status: "parked",
  });
  let message = activeSession ? "Parked" : "Not parked";

  let result = {
    message: message,
    session: activeSession,
    success: !!activeSession,
  };
  return result;
}
