import Vehicle from "../model/Vehicle.js";
import ParkingSession from "../model/ParkingSession.js";
import { FeeOnTYpe } from "../utils/carTypes.js";
import * as utils from "../utils/parkingCalculators.js";
import { ApiError, NotFoundError } from "../utils/errors.js";

export async function checkin({ type, phone, driverName, licencePlate }) {

  // 1. Find or create the vehicle
  let vehicle = await Vehicle.findOne({ licencePlate });


  if (!vehicle) {
    console.log("Vehicle not found, creating a new record...");
    vehicle = await Vehicle.create({
      type,
      phone,
      driverName,
      licencePlate, 
    });
  }
  


  // 2. Double-check for an active parking session
  const activeSession = await ParkingSession.findOne({
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

  // console.log("Creating new parking session for vehicle:", vehicle.licencePlate);

  // 3. Create the session
  try {
    const session = await ParkingSession.create({
      vehicleId: vehicle._id,
      status: "parked",
      entryTime: new Date(),
    });

    // SAFE POPULATE: Works in both Mongoose v5/v6/v7+
    if (typeof session.populate("vehicleId").execPopulate === "function") {
      await session.populate("vehicleId").execPopulate();
    } else {
      await session.populate("vehicleId");
    }

    // console.log("Populated session successfully:", session);

    return {
      message: "Vehicle checked in successfully!",
      session: {
        id: session._id,
        vehicle: session.vehicleId, // Now correctly populated as an object
        entryTime: session.entryTime,
        status: session.status,
      },
    };
  } catch (error) {
    // 11000 is MongoDB's code for duplicate key errors
    if (error.code === 11000) {
      throw new ApiError(
        "Vehicle is already being parked (duplicate request)",
        400,
        "VEHICLE_ALREADY_PARKED",
      );
    }
    
    // FIXED: Was console.log(err), changed to matching parameter 'error'
    console.error("Error during checkin sequence:", error);
    throw error;
  }
}





export async function checkOut({ licencePlate }) {
  let vehicle = await Vehicle.findOne({ licencePlate });
  if (!vehicle) {
    throw new ApiError("Vehicle not found" , 404, "VEHICLE_NOT_FOUND");
  }

  let exitTime = new Date();

  // 1. Fetch the active session to calculate the fee first
  let activeSession = await ParkingSession.findOne({
    vehicleId: vehicle._id,
    status: "parked",
  });

  if (!activeSession) {
    throw new ApiError("No active parking session found for this vehicle", 404, "NO_ACTIVE_SESSION")  
  }

  let daysParked = utils.calculateDaysParked(exitTime, activeSession.entryTime);
  let fee = utils.calculateFee(FeeOnTYpe, vehicle.type, daysParked);

  // --- THE FIX: ATOMIC CONDITIONAL UPDATE ---
  // We only update if the status is STILL "parked" at this exact millisecond
  let updatedSession = await ParkingSession.findOneAndUpdate(
    {
      _id: activeSession._id,
      status: "parked", // Must still be parked!
    },
    {
      $set: {
        exitTime: exitTime,
        fee: fee,
        status: "exited",
      },
    },
    { new: true }, // Returns the updated document
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
