import mongoose from "mongoose";

async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in your environment variables!");
    }

    await mongoose.connect(mongoUri, {
      dbName: "Parking",
      serverSelectionTimeoutMS: 10000,
    });

    console.log("\n\n\n\nMongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Throwing the error ensures server.js can catch it and handle it (or crash gracefully)
    throw error; 
  }
}

export default connectDB;