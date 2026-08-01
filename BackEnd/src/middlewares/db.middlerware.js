import connectDB from "../config/dbConnect";

export const ensureDbConnected = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error); // Sends error directly to your errorHandler middleware
  }
};