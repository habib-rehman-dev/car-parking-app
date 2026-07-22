import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI;
   console.log(mongoUri)
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in your environment variables!");
    }

    const db = await mongoose.connect(mongoUri, {
      dbName: "Parking",
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", );
    console.log(error)
  }
}

export default connectDB;