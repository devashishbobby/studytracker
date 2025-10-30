// --- FILE: backend/middleware/errorMiddleware.js ---
// This file will create a custom error handler
// It overrides the default Express HTML error page with a JSON response

const errorHandler = (err, req, res, next) => {
  // Check if a status code was already set, otherwise default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    // We only want to show the error stack if we are in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
