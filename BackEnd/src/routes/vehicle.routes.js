import Router from "express";
import * as vehicle from "../controllers/vehicle.controller.js";
import * as validators from "../validator/vheicle.validator.js";
import { expressValidator } from "../middlewares/validate.middleware.js";

let vehicleRoutes = Router();

vehicleRoutes.post(
  "/checkin",
  validators.checkIn,
  expressValidator,
  vehicle.checkIn,
);
vehicleRoutes.patch(
  "/checkout",
 vehicle.checkOut
);
vehicleRoutes.get(
  "/search/:licencePlate",
 vehicle.search
);

export default vehicleRoutes;
