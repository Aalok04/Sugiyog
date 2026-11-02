import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { config } from '../config/environment.js';

export class AuthService {
  static async loginAdmin(email, password) {
    const admin = await prisma.adminUser.findUnique({
      where: { email },
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
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      error.isOperational = true;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      error.isOperational = true;
      throw error;
    }

    // Update last login
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role.name,
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      token,
      user: {
        id: admin.id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role.name,
        roleDisplayName: admin.role.displayName,
        permissions: admin.role.permissions.map((rp) => rp.permission.code),
      },
    };
  }

  static async getAdminProfile(adminId) {
    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
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

    if (!admin) {
      const error = new Error('Admin not found');
      error.statusCode = 404;
      error.isOperational = true;
      throw error;
    }

    return {
      id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
      phone: admin.phone,
      role: admin.role.name,
      roleDisplayName: admin.role.displayName,
      permissions: admin.role.permissions.map((rp) => rp.permission.code),
    };
  }
}
