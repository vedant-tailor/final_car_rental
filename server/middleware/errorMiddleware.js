// Error handling middleware for Express application

// Not Found Middleware
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
  // Determine status code (use existing status code or default to 500)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Prepare error response object
  const errorResponse = {
    message: err.message || 'An unexpected error occurred',
    // Include stack trace only in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  };

  // Handle specific error types
  if (err.name === 'CastError') {
    // Mongoose invalid ID error
    statusCode = 400;
    errorResponse.message = 'Invalid resource ID';
  }

  if (err.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    errorResponse.message = Object.values(err.errors)
      .map(error => error.message)
      .join(', ');
  }

  if (err.name === 'UnauthorizedError') {
    // JWT authentication error
    statusCode = 401;
    errorResponse.message = 'Unauthorized - Invalid token';
  }

  if (err.name === 'JsonWebTokenError') {
    // Specific JWT error handling
    statusCode = 401;
    errorResponse.message = 'Invalid authentication token';
  }

  if (err.name === 'TokenExpiredError') {
    // JWT token expiration error
    statusCode = 401;
    errorResponse.message = 'Authentication token has expired';
  }

  // Log error for server-side tracking (optional)
  console.error(`Error: ${err.message}`);

  // Send error response
  res.status(statusCode).json(errorResponse);
};