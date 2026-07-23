import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in your environment variables!");
}

// Global cache across serverless function re-uses
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: "Parking",
      bufferCommands: false, // Prevents queries from hanging when disconnected
      serverSelectionTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset promise on failure so next request retries
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;