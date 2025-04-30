class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Operational error, trusted error: we can send message to client

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
