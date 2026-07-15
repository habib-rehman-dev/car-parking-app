import mongoose from "mongoose";
import { cartTypes } from "../utils/carTypes.js";
let VehicleSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum:Object.values(cartTypes),
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
      required: [true, "Phone Number is must"],
      match: [/^\d{11}$/, "Please Enter the valid Email Addresss"],
    },
  },
  {
    timestamps: true,
  },
);

let Vehicle = mongoose.model("vehicle", VehicleSchema);

export default Vehicle;
