import Router from "express";
import * as vehicle from "../controllers/vhicle.controller.js";
import * as validators from "../validator/vehicle.validator.js";
import { expressValidator } from "../middlewares/validate.middleware.js";

let vehicleRoutes = Router();

vehicleRoutes.post(
  "/checkin",
  validators.chekIn,
  expressValidator,
  vehicle.checkIn,
);
vehicleRoutes.put(
  "/checkout",
 vehicle.checkOut
);
vehicleRoutes.get(
  "/search/:licencePlate",
 vehicle.search
);

export default vehicleRoutes;
