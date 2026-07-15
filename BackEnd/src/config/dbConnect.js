import mongoose from "mongoose";

async function connectDB() {
  try {
    // Ensure the URI exists before trying to connect
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in your environment variables!");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Parking" // Cleanly targets the 'Parking' database
    });
    
    console.log(`MongoDB connected\n\n\n`);
  } catch (error) {
    console.log(`connection failed ${error}`);
  }
}
   
export default connectDB;