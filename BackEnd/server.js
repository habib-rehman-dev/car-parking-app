// server.js
import './src/config/env.js';
import app from './src/app.js';
import connectDB from './src/config/dbConnect.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running locally on port ${PORT}`);
    });
  } catch (error) {
    console.error("Critical: Server failed to start due to DB connection error.", error);
    process.exit(1);
  }
}

startServer();