import { validationResult } from "express-validator";

export const expressValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errors_ = errors.array();
   throw errors
  }
  next();
};
