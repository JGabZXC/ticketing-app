import AppError from "../utils/appError.js";

function handleCastErrorDB(err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

function handleValidationErrorDB(err) {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
}

function handleJsonWebTokenError(err) {
  return new AppError(
    `Invalid token: ${err.message}. Please log in again!`,
    401
  );
}

function handleTokenExpiredError(err) {
  return new AppError(`Token expired: ${err.message}`, 401);
}

function handleDuplicateFieldsDB(err) {
  const value = err.keyValue[Object.keys(err.keyValue)[0]];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 409);
}

function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err, req, res) {
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  console.error("ERROR 💥", err);

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
}

export default function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log(err);

  let error = { ...err, name: err.name, message: err.message };

  if (error.name === "CastError") error = handleCastErrorDB(error);
  if (error.name === "ValidationError") error = handleValidationErrorDB(error);
  if (error.name === "JsonWebTokenError")
    error = handleJsonWebTokenError(error);
  if (error.name === "TokenExpiredError")
    error = handleTokenExpiredError(error);
  if (error.name === "MongoServerError" && error.code === 11000) {
    error = handleDuplicateFieldsDB(error);
  }

  if (process.env.NODE_ENV === "development") return sendErrorDev(error, res);

  sendErrorProd(error, req, res);
}
