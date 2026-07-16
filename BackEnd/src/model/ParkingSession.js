import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let ParkingSessionSchema = mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.ObjectId,
      ref: "Vehicle", // Note: Fixed typo "vehicle" to "Vehicle"
      required: [true, "Vehicle is not specified"],
    },
    entryTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    exitTime: {
      type: Date,
      default: null,
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

// over here i am using the mongose pagination plugin to paginate the data

ParkingSessionSchema.plugin(mongoosePaginate);

// --- THE FIX: PARTIAL UNIQUE INDEX ---
// This ensures a vehicleId can only have ONE document where status is "parked"

// ParkingSessionSchema.index({ exitTime: 1 });
ParkingSessionSchema.index(
  { vehicleId: 1, exitTime: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "parked" },
  },
);

let ParkingSession = mongoose.model("ParkingSession", ParkingSessionSchema);
export default ParkingSession;
