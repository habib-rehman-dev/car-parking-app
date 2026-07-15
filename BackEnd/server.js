import './src/config/env.js'; // Import env vars first so process.env.PORT is available
import app from './src/app.js';
import connectDB from './src/config/dbConnect.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // 1. Wait for MongoDB to connect first
    await connectDB();

    // 2. Only start listening if DB is connected
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Critical: Server failed to start due to DB connection error.");
    process.exit(1); // Exit the Node process with a "failure" code
  }
}

startServer();