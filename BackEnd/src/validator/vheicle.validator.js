import { body } from "express-validator";
import {cartTypes} from '../utils/carTypes.js'
export let chekIn = [
  body("driverName")
    .notEmpty()
    .isLength({
      min: 3,
    })
    .withMessage("Please name must be greater then 3 chars ")
    .trim(),

  body("phone")
    .notEmpty()
    // .isMobilePhone('pt-PT')
    .withMessage("Enter valid phone number"),
  body("type").isIn(Object.values(cartTypes)).toLowerCase().withMessage("Type must be car or bike"),
  body("licencePlate")
    .notEmpty().toUpperCase()
    //     .islicencePlate()
    .withMessage("Enter valid licence number"),
];
