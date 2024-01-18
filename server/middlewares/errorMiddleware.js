const AppError = require("../utils/appError");

const handleCastErrorDb = err => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

const handleValidationErrorDb = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDb = err => {
  const name = Object.keys(err.keyValue)[0];
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate field "${name}: ${value}". Please use another ${name}!`;
  return new AppError(message, 400);
};

// GLOBAL ERROR MIDDLEWARES
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Something went wrong!";

  // ERROR IN DEVELOPMENT
  if (process.env.NODE_ENV === "development")
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      isOperational: err.isOperational || false,
      error: err,
      stack: err.stack || null,
    });
  //ERROR IN PRODUCTION
  else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDb(err);
    if (err.name === "ValidationError") err = handleValidationErrorDb(err);
    if (err.code === 11000) err = handleDuplicateFieldDb(err);

    if (err.isOperational)
      // OPERATIONAL ERROR, TRUSTED ERROR, SEND MESSAGE TO THE CLIENT.
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

    // ELSE UNKNOWN ERROR OR PROGRAMMING ERROR, SEND GENERIC MESSAGE TO CLIENT
    return res.status(err.statusCode).json({
      status: "error",
      message: "Something went very wrong!!!",
    });
  }
};
