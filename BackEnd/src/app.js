import express from "express";
 import router from "./routes/index.js";
import cookieConfig from "./config/cookie.js";
import helmet from "./config/helmet.js";
import cors from "./config/cors.js";
import  errorHandler  from "./middlewares/error.middleware.js";
import './config/env.js'

const app = express();

app.use(   
  express.json(),
  express.urlencoded({ extended: true }),
  cors,
  cookieConfig,
  helmet,
); 


app.use('/api/v1',router);

app.get("/", (req, res) => {
  console.log("Health check route hit");
  res.status(200).json({ message: "API is healthy" });
});





app.use(errorHandler);

export default app;
