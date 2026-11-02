import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';

export class AdminService {
  /**
   * Aggregate statistics for Admin Dashboard
   */
  static async getDashboardStats() {
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      activeVisits,
      totalUsers,
      recentInquiries,
      recentBookings,
      upcomingVisits,
      paymentAggregate,
    ] = await Promise.all([
      prisma.booking.count({ where: { deletedAt: null } }),
      prisma.booking.count({ where: { status: 'PENDING', deletedAt: null } }),
      prisma.booking.count({ where: { status: 'CONFIRMED', deletedAt: null } }),
      prisma.travelVisit.count({
        where: {
          status: 'PUBLISHED',
          endDate: { gte: new Date() },
          deletedAt: null,
        },
      }),
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.inquiry.findMany({
        where: { status: 'NEW' },
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.booking.findMany({
        take: 5,
        include: { user: true, service: true, travelVisit: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.travelVisit.findMany({
        where: {
          status: 'PUBLISHED',
          endDate: { gte: new Date() },
          deletedAt: null,
        },
        take: 4,
        orderBy: { startDate: 'asc' },
      }),
      prisma.payment.aggregate({
        where: { status: 'PAID' },
        _sum: { amount: true },
      }),
    ]);

    return {
      stats: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        activeVisits,
        totalUsers,
        totalRevenue: paymentAggregate._sum.amount || 0,
      },
      recentInquiries,
      recentBookings,
      upcomingVisits,
    };
  }

  static async getAllAdminUsers() {
    return prisma.adminUser.findMany({
      where: { deletedAt: null },
      include: { role: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getAllRoles() {
    return prisma.role.findMany({
      include: {
        permissions: {
          include: { permission: true },
        },
      },
    });
  }

  static async getAuditLogs({ page = 1, limit = 50 }) {
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const [total, logs] = await Promise.all([
      prisma.auditLog.count(),
      prisma.auditLog.findMany({
        include: {
          adminUser: {
            select: { fullName: true, email: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
    ]);

    return {
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / take),
      logs,
    };
  }
}
