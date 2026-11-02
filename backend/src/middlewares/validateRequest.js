import { validationResult } from 'express-validator';
import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Validates request schema and returns formatted 422 error if invalid
 */
export function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.error(res, 'Validation failed', 422, errors.array());
  }
  next();
}
