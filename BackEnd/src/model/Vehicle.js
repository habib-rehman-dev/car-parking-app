import mongoose from "mongoose";
import { carTypes } from "../utils/carTypes.js";
let VehicleSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum:Object.values(carTypes),
      lowercase: true,
      trim: true,
      required: [true, "Type can be car or bike"],
    },
    licencePlate: {
      type: String,
      unique: true,
      uppercase: true,
      required: [true, "Licence Plate is Required"],
    },
    driverName: {
      type: String,
      required: [true, "Driver name is must"],
      trim: true,
    },
   phone: {
  type: String,
  required: [true, "Phone number is required"],
  trim: true, // Automatically removes accidental leading/trailing spaces
  // match: [/^\d{11}$/, "Please enter a valid 11-digit phone number"],
}
  },
  {
    timestamps: true,
  },
);

let Vehicle = mongoose.model("Vehicle", VehicleSchema);

export default Vehicle;
