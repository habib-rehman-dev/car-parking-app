import { configDotenv } from "dotenv";

configDotenv();

const requiredEnvVars = [
  "MONGO_URI",
  "ACCESS_SECRET",
  "REFRESH_SECRET",
  "COOKIE_SECRET",
  "CLIENT_URL",
  "PORT",
];

// will throegh eroor over here
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(
      `[Config Error]: Missing required environment variable in .env: ${envVar}`,
    );
  }
});

// for the production i will use this cases not for now

// export const env = {
//   DATABASE_URL: process.env.DATABASE_URL,
//   JWT_SECRET: process.env.JWT_SECRET,
//   PORT: parseInt(process.env.PORT || '3000', 10), // parses port as a number with a default fallback
//   NODE_ENV: process.env.NODE_ENV || 'development'
// };
