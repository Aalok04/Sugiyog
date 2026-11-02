import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Restricts route access to specific role names
 * @param {string[]} allowedRoles
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.admin) {
      return ApiResponse.error(res, 'Unauthenticated', 401);
    }

    if (req.admin.role === 'SUPER_ADMIN') {
      return next(); // Super admin bypasses all role checks
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return ApiResponse.error(
        res,
        'Forbidden: You do not possess the required role authority to access this resource.',
        403
      );
    }

    next();
  };
}

/**
 * Restricts route access to specific permission codes
 * @param {string} permissionCode
 */
export function requirePermission(permissionCode) {
  return (req, res, next) => {
    if (!req.admin) {
      return ApiResponse.error(res, 'Unauthenticated', 401);
    }

    if (req.admin.role === 'SUPER_ADMIN') {
      return next();
    }

    if (!req.admin.permissions || !req.admin.permissions.includes(permissionCode)) {
      return ApiResponse.error(
        res,
        `Forbidden: Insufficient permissions (${permissionCode}) for this action.`,
        403
      );
    }

    next();
  };
}
