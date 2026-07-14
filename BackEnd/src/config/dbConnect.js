import mongoose from "mongoose";
// what is the error over here
async function connectDB() {
  try {
  
  await  mongoose.connect(process.env.MONGODB_URI + "Parking")
      console.log(`MongoDB connected\n\n\n`);
    
  } catch (error) {
    console.log(
      `connection failed ${error}`,
    );
  }
}
   
export default connectDB;
