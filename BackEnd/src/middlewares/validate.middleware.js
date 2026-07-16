import { validationResult } from "express-validator";
import { ValidationError } from "../utils/errors.js";

export const expressValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errors_ = errors.array();
   throw new ValidationError(errors_);
  }
  next();
};
