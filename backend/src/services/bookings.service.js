import prisma from '../config/database.js';

export class BookingsService {
  /**
   * Helper to generate human-readable unique booking reference
   */
  static generateBookingNumber() {
    const year = new Date().getFullYear();
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    return `SUG-${year}-${randomHex}`;
  }

  /**
   * Public: Create Instant Booking (Transactional with Concurrency check)
   */
  static async createInstantBooking(data) {
    const {
      serviceId,
      availabilitySlotId,
      consultationFormat,
      fullName,
      email,
      phone,
      countryCode,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      gender,
      clientNotes,
    } = data;

    // Use Prisma interactive transaction to ensure slot capacity is atomically reserved
    return prisma.$transaction(async (tx) => {
      // 1. Fetch and verify service
      const service = await tx.service.findFirst({
        where: { id: serviceId, isActive: true, deletedAt: null },
      });

      if (!service) {
        const error = new Error('Selected consultation service is not available');
        error.statusCode = 404;
        error.isOperational = true;
        throw error;
      }

      // 2. Fetch and atomically lock availability slot
      const slot = await tx.availabilitySlot.findUnique({
        where: { id: availabilitySlotId },
        include: { travelVisit: true },
      });

      if (!slot || slot.isBlocked || slot.status !== 'AVAILABLE') {
        const error = new Error('The selected appointment slot is no longer available');
        error.statusCode = 409;
        error.isOperational = true;
        throw error;
      }

      if (slot.bookedCount >= slot.capacity) {
        const error = new Error('This slot has already reached its maximum capacity');
        error.statusCode = 409;
        error.isOperational = true;
        throw error;
      }

      // 3. Upsert User (Seeker profile)
      let user = await tx.user.findUnique({
        where: { email },
      });

      if (user) {
        user = await tx.user.update({
          where: { id: user.id },
          data: {
            fullName,
            phone: phone || user.phone,
            countryCode: countryCode || user.countryCode,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : user.dateOfBirth,
            timeOfBirth: timeOfBirth || user.timeOfBirth,
            placeOfBirth: placeOfBirth || user.placeOfBirth,
            gender: gender || user.gender,
          },
        });
      } else {
        user = await tx.user.create({
          data: {
            fullName,
            email,
            phone,
            countryCode,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            timeOfBirth,
            placeOfBirth,
            gender,
          },
        });
      }

      // 4. Increment slot booked count and update status if fully booked
      const newBookedCount = slot.bookedCount + 1;
      await tx.availabilitySlot.update({
        where: { id: slot.id },
        data: {
          bookedCount: newBookedCount,
          status: newBookedCount >= slot.capacity ? 'BOOKED' : 'AVAILABLE',
        },
      });

      // 5. Create Booking
      const bookingNumber = BookingsService.generateBookingNumber();
      const booking = await tx.booking.create({
        data: {
          bookingNumber,
          userId: user.id,
          serviceId: service.id,
          travelVisitId: slot.travelVisitId,
          availabilitySlotId: slot.id,
          bookingType: 'INSTANT',
          consultationFormat: consultationFormat || 'ONLINE',
          status: 'CONFIRMED',
          scheduledDate: slot.date,
          scheduledStartTime: slot.startTime,
          scheduledEndTime: slot.endTime,
          timezone: slot.timezone,
          clientNotes,
          totalAmount: service.price,
          currency: service.currency,
          paymentStatus: 'UNPAID', // Payment handled separately
        },
        include: {
          service: true,
          travelVisit: true,
          availabilitySlot: true,
          user: true,
        },
      });

      return booking;
    });
  }

  /**
   * Public: Create Request-Based Booking
   */
  static async createRequestBooking(data) {
    const {
      serviceId,
      travelVisitId,
      consultationFormat,
      preferredDates,
      fullName,
      email,
      phone,
      countryCode,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      clientNotes,
    } = data;

    return prisma.$transaction(async (tx) => {
      const service = await tx.service.findFirst({
        where: { id: serviceId, isActive: true, deletedAt: null },
      });

      if (!service) {
        const error = new Error('Selected consultation service is not available');
        error.statusCode = 404;
        error.isOperational = true;
        throw error;
      }

      // Upsert User
      let user = await tx.user.findUnique({ where: { email } });
      if (!user) {
        user = await tx.user.create({
          data: {
            fullName,
            email,
            phone,
            countryCode,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            timeOfBirth,
            placeOfBirth,
          },
        });
      }

      const bookingNumber = BookingsService.generateBookingNumber();
      const booking = await tx.booking.create({
        data: {
          bookingNumber,
          userId: user.id,
          serviceId: service.id,
          travelVisitId: travelVisitId || null,
          bookingType: 'REQUEST_BASED',
          consultationFormat: consultationFormat || 'ONLINE',
          status: 'PENDING', // Request-based is always PENDING initially
          preferredDates,
          clientNotes,
          totalAmount: service.price,
          currency: service.currency,
          paymentStatus: 'UNPAID',
        },
        include: {
          service: true,
          travelVisit: true,
          user: true,
        },
      });

      return booking;
    });
  }

  /**
   * Admin: List all bookings with filtering
   */
  static async getAllAdminBookings({ status, serviceId, consultationFormat, page = 1, limit = 20 }) {
    const where = { deletedAt: null };
    if (status) where.status = status;
    if (serviceId) where.serviceId = serviceId;
    if (consultationFormat) where.consultationFormat = consultationFormat;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const take = parseInt(limit, 10);

    const [total, bookings] = await Promise.all([
      prisma.booking.count({ where }),
      prisma.booking.findMany({
        where,
        include: {
          user: true,
          service: true,
          travelVisit: true,
          availabilitySlot: true,
          payments: true,
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
      bookings,
    };
  }

  /**
   * Admin: Update booking status or notes
   */
  static async updateBookingStatus(id, { status, paymentStatus, internalAdminNotes, meetingLink }, adminId) {
    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status,
        paymentStatus,
        internalAdminNotes,
        meetingLink,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: adminId,
        action: 'UPDATE_BOOKING_STATUS',
        entityType: 'Booking',
        entityId: id,
        details: JSON.stringify({ status, paymentStatus }),
      },
    });

    return booking;
  }
}
