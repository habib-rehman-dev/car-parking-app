import { body } from "express-validator";

export let registerValidator = [
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please enter the correct Email address")
    .trim(),

  body("password")
    .isLength({
      min: 8,
      max: 40,
    })
    .withMessage("passwerd should be between 8 and 40"),
  body("role")
    .notEmpty()
    
    .isIn(["user", "admin"])
    .withMessage("role should be *user* or *admin*"), // i want to match over here by the validator user na admin so then how that i can do that also
];

export let loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Enter the emial for login")
    .isEmail()
    .withMessage("Please enter the correct Email address")
    .trim(),

  body("password").isLength({
    min: 8,
    max: 40,
  }),
];
