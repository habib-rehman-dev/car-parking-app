import express from "express";
import router from "./routes/index.js";
import cookieConfig from "./config/cookie.js";
import helmet from "./config/helmet.js";
import cors from "./config/cors.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import './config/env.js'
import { NotFoundError } from "./utils/errors.js";

const app = express();

app.use(   
  express.json(),
  express.urlencoded({ extended: true }),
  cors,
  cookieConfig,
  helmet,
); 
console.log(process.env.CLIENT_URL.split(','))
app.use(router);
// app.use('/api/v1/',router);



app.get('/' , (req , res)=>{
  throw new NotFoundError('this is a test error') 
})


app.use(errorHandler);

export default app;
