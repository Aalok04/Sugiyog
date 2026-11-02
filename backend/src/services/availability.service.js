import prisma from '../config/database.js';

export class AvailabilityService {
  /**
   * Get available slots for public booking
   */
  static async getAvailableSlots({ slotType, travelVisitId, startDate, endDate }) {
    const where = {
      status: 'AVAILABLE',
      isBlocked: false,
    };

    if (slotType) {
      where.slotType = slotType;
    }

    if (travelVisitId) {
      where.travelVisitId = travelVisitId;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    } else {
      where.date = { gte: new Date() };
    }

    return prisma.availabilitySlot.findMany({
      where,
      include: {
        travelVisit: {
          select: {
            title: true,
            city: true,
            country: true,
            timezone: true,
          },
        },
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
  }

  /**
   * Admin: List slots for management
   */
  static async getAdminSlots({ travelVisitId, slotType }) {
    const where = {};
    if (travelVisitId) where.travelVisitId = travelVisitId;
    if (slotType) where.slotType = slotType;

    return prisma.availabilitySlot.findMany({
      where,
      include: {
        travelVisit: {
          select: {
            id: true,
            title: true,
            city: true,
          },
        },
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
  }

  /**
   * Admin: Create availability slot
   */
  static async createSlot(data) {
    return prisma.availabilitySlot.create({
      data: {
        slotType: data.slotType || 'ONLINE',
        travelVisitId: data.travelVisitId || null,
        date: new Date(data.date),
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        timezone: data.timezone || 'Asia/Kolkata',
        capacity: parseInt(data.capacity, 10) || 1,
        bookedCount: 0,
        status: 'AVAILABLE',
        isBlocked: Boolean(data.isBlocked),
        notes: data.notes,
      },
    });
  }

  /**
   * Admin: Toggle block or update slot capacity
   */
  static async updateSlot(id, data) {
    return prisma.availabilitySlot.update({
      where: { id },
      data: {
        ...data,
        capacity: data.capacity !== undefined ? parseInt(data.capacity, 10) : undefined,
      },
    });
  }

  /**
   * Admin: Delete slot
   */
  static async deleteSlot(id) {
    return prisma.availabilitySlot.delete({
      where: { id },
    });
  }
}
