export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  let statusCode = err?.statuscode
  console.log(err);

  if (err.name == "CastError") {
    let message = "Resource not found";
    error = { message, statusCode: 404 };
  }
  if (err.code == 11000) {
    let message = "Duplicate field vlaue not alowed!";
    error = { message, statusCode: 400 };
  }
  if (err.name == "ValidationError") {
    let message = "Feild validation error accure";
    error = { message, statusCode: 400 };
  }

  if (err.name == "JsonWebTokenError") {
    let message = "Invalid token";
    error = { message, statusCode: 401 };
  }

  if (err.name == "TokenExpiredError") {
    let message = "token expired";
    error = { message, statusCode: 401 };
  }
  console.log(error.message);
  console.log("\n" + error.message + "\n");
  console.log(error);
  res.status(statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};
