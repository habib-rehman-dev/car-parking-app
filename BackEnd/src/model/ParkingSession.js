import mongoose from "mongoose";

let ParkingSessionSchema = mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.ObjectId,
      ref: "Vheicle",
      required: [true, "Vhicle is not Specify"],
    },
    entryTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    exitTime: {
      type: Date,
      default: null, // here if i am put the data.now then i will be have the data
    },
    fee: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["parked", "exited"],
      default: "parked",
    },
  },
  {
    timestamps: true,
  },
);

let ParkingSession = mongoose.model("ParkingSession", ParkingSessionSchema);

export default ParkingSession;
