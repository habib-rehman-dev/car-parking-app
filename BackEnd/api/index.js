import app from "../src/app.js";
import connectDB from "../src/config/dbConnect.js";
import '../src/config/env.js'


connectDB()
export default app
