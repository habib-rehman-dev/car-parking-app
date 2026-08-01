// api/index.js
import app from '../src/app.js';
import connectDB from '../src/config/dbConnect.js';

// Connect DB once when serverless function warms up
connectDB().catch(err => console.error("MongoDB Connection Error:", err));

export default app;