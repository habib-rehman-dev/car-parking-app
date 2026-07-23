import { validationResult } from "express-validator";
import { ValidationError } from "../utils/errors.js";

export const expressValidator = (req, res, next) => {
  console.log('req.body')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    console.log('454545')
    let errors_ = errors.array();
   throw new ValidationError(errors_);
  }
  console.log('validation passed')
 return next();
};


