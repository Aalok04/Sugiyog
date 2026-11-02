import prisma from '../config/database.js';

export class UsersService {
  static async getAllUsers({ search, page = 1, limit = 20 }) {
    const where = { deletedAt: null };
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        include: {
          _count: {
            select: { bookings: true, inquiries: true },
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
      users,
    };
  }

  static async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            service: true,
            travelVisit: true,
            payments: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.isOperational = true;
      throw error;
    }

    return user;
  }
}
