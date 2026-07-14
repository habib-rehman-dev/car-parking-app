import Router from "express";
import * as vheicle from "../controllers/vhicle.controller.js";
import * as validators from "../validator/vheicle.validator.js";
import { expressValidator } from "../middlewares/validate.middleware.js";

let vheicleRoutes = Router();

vheicleRoutes.post(
  "/checkin",
  validators.chekIn,
  expressValidator,
  vheicle.checkIn,
);
vheicleRoutes.put(
  "/checkout",
 vheicle.checkOut
);
vheicleRoutes.get(
  "/search/:licencePlate",
 vheicle.search
);

export default vheicleRoutes;
