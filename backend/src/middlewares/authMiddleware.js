import jwt from 'jsonwebtoken';
import { config } from '../config/environment.js';
import prisma from '../config/database.js';
import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Verifies JWT token and attaches authenticated admin user to req.adminUser
 */
export async function authenticateAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.error(res, 'Authentication token missing or invalid format', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret);

    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!admin || !admin.isActive || admin.deletedAt) {
      return ApiResponse.error(res, 'Admin account not found or deactivated', 401);
    }

    // Attach user and permissions to request
    req.admin = {
      id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role.name,
      roleDisplayName: admin.role.displayName,
      permissions: admin.role.permissions.map((rp) => rp.permission.code),
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ApiResponse.error(res, 'Session token expired. Please log in again.', 401);
    }
    return ApiResponse.error(res, 'Invalid authorization token', 401);
  }
}
