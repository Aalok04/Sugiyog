import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Centralized error handling middleware
 */
export function errorHandler(err, req, res, next) {
  console.error('Unhandled Application Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
  });

  // Handle Prisma Known Request Errors
  if (err.code === 'P2002') {
    return ApiResponse.error(res, 'A record with this unique identifier already exists.', 409, {
      fields: err.meta?.target,
    });
  }

  if (err.code === 'P2025') {
    return ApiResponse.error(res, 'The requested record was not found.', 404);
  }

  // Handle JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.error(res, 'Invalid authorization token.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.error(res, 'Authorization token has expired. Please log in again.', 401);
  }

  // Default response
  const statusCode = err.statusCode || 500;
  const message = err.isOperational || process.env.NODE_ENV === 'development' 
    ? err.message 
    : 'Internal server error';

  return ApiResponse.error(res, message, statusCode);
}
