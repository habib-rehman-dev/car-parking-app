// utils/errors.js
class ApiError extends Error {
  constructor(message, statusCode, errorCode = 'INTERNAL_SERVER_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types for better organization
class ValidationError extends ApiError {
  constructor(message) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

class AuthenticationError extends ApiError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

class DuplicateError extends ApiError {
  constructor(message = 'Duplicate field value not allowed') {
    super(message, 400, 'DUPLICATE_ERROR');
  }
}

export { ApiError, ValidationError, NotFoundError, AuthenticationError, DuplicateError };