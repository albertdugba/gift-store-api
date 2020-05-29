const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  console.log(err);

  // Mongoose Bad Object
  if (err.name === "CastError") {
    const message = `Resource could not be found with Id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate keys object
  if (err.code === 11000) {
    const message = `Duplicate fields value`;
    error = new ErrorResponse(message, 404);
  }

  if (err.name === "ValidationError") {
    const message = Object.keys(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server down" });
};

module.exports = errorHandler;
