import { body } from "express-validator";
import { carTypes } from "../utils/carTypes.js"; // Ensure correct spelling (carTypes instead of cartTypes)

export const checkIn = [
  // 1. Driver Name
  body("driverName")
    .trim() // Clean whitespace first
    .notEmpty()
    .withMessage("Driver name is required")
    .isLength({ min: 3 })
    .withMessage("Driver name must be at least 3 characters long"),

  // 2. Phone Number
 body("phone")
  .trim()
  .notEmpty()
  .withMessage("Phone number is required")
  .isMobilePhone("any") 
  .withMessage("Please enter a valid mobile phone number")
  // Clean the number so it matches your strict 11-digit schema format
  .customSanitizer((value) => {
    // 1. Strip out everything that isn't a number (spaces, dashes, plus signs)
    let digitsOnly = value.replace(/\D/g, "");

    // 2. If it starts with a country code like '92', convert it to local '0' 
    // Example: "923001234567" -> "03001234567" (11 digits)
    if (digitsOnly.startsWith("92") && digitsOnly.length === 12) {
      digitsOnly = "0" + digitsOnly.slice(2);
    }

    return digitsOnly;
  }),
  // 3. Vehicle Type
  body("type")
    .trim()
    .toLowerCase() // Sanitize to lowercase first
    .notEmpty()
    .withMessage("Vehicle type is required")
    .isIn(Object.values(carTypes))
    .withMessage(`Type must be one of: ${Object.values(carTypes).join(", ")}`),

  // 4. Licence Plate
  body("licencePlate")
    .trim()
    .toUpperCase() // Automatically convert to UPPERCASE (e.g., "lhr-123" -> "LHR-123")
    .notEmpty()
    .withMessage("Licence plate is required")
    // Ensure it doesn't contain weird symbols, just letters, numbers, and dashes/spaces
    .matches(/^[A-Z0-9\s-]+$/)
    .withMessage("Licence plate must only contain letters, numbers, hyphens, or spaces")
    .isLength({ min: 3, max: 15 })
    .withMessage("Licence plate must be between 3 and 15 characters"),
];