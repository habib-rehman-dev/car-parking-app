import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables!");
}

// Global cache across serverless warm starts
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // 1. Return cached connection if ready
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // 2. If no promise exists, create a new connection promise
  if (!cached.promise) {
    const opts = {
      dbName: "Parking",
      bufferCommands: false, // Prevents queries from buffering infinitely
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      console.log("MongoDB connected successfully");
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset promise on error so subsequent requests retry
    console.error("MongoDB connection failed:", error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;