import { validationResult } from "express-validator";
import { ValidationError } from "../utils/errors.js";

export const expressValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('yes there is error')
    let errors_ = errors.array();
   throw new ValidationError(errors_);
  }
  console.log('validation passed')
  next();
};
