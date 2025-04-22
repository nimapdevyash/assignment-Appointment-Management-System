class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends CustomError {
  constructor(message = "Validation Error") {
    super(message, 400);
  }
}

class DataNotFoundError extends CustomError {
  constructor(message = "No data found") {
    super(message, 404);
  }
}

class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ForbiddenRequestError extends CustomError {
  constructor(message = "Forbidden Request") {
    super(message, 403);
  }
}

module.exports = {
  CustomError,
  ValidationError,
  DataNotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenRequestError,
};
