import connectDB from "../config/dbConnect.js";

export const ensureDbConnected = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error); // Sends error directly to your errorHandler middleware
  }
};