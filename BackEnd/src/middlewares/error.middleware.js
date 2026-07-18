// middleware/errorHandler.js

import { ApiError } from "../utils/errors.js";

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next();
  }
  console.log(err.statusCode)

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.errorCode,
      },
    });
  }



  return res.status(500).json({
    success: false,
    error: {
      message: "Something went wrong",
      code: "INTERNAL_SERVER_ERROR",
    },
  });
};

export default errorHandler;
