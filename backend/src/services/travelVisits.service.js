import prisma from '../config/database.js';

export class TravelVisitsService {
  /**
   * Public list of published visits with filters
   */
  static async getPublicUpcomingVisits({ country, city, month, year }) {
    const whereClause = {
      isPublic: true,
      status: 'PUBLISHED',
      deletedAt: null,
      endDate: {
        gte: new Date(), // upcoming visits only
      },
    };

    if (country) {
      whereClause.country = { contains: country };
    }

    if (city) {
      whereClause.city = { contains: city };
    }

    if (month && year) {
      const startOfMonth = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
      const endOfMonth = new Date(parseInt(year, 10), parseInt(month, 10), 0, 23, 59, 59);
      whereClause.startDate = {
        gte: startOfMonth,
        lte: endOfMonth,
      };
    }

    const visits = await prisma.travelVisit.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            slots: {
              where: {
                status: 'AVAILABLE',
                isBlocked: false,
              },
            },
          },
        },
      },
      orderBy: { startDate: 'asc' },
    });

    // Mask private venue details for public API
    return visits.map((v) => ({
      id: v.id,
      title: v.title,
      country: v.country,
      city: v.city,
      venueName: v.isVenuePrivate ? 'Private Venue (Disclosed upon confirmed booking)' : v.venueName,
      venueAddress: v.isVenuePrivate ? 'Shared privately upon booking confirmation' : v.venueAddress,
      venueMapsUrl: v.isVenuePrivate ? null : v.venueMapsUrl,
      isVenuePrivate: v.isVenuePrivate,
      startDate: v.startDate,
      endDate: v.endDate,
      timezone: v.timezone,
      isBookingOpen: v.isBookingOpen,
      availableSlotsCount: v._count.slots,
      notes: v.notes,
    }));
  }

  /**
   * Public single visit detail
   */
  static async getPublicVisitById(id) {
    const visit = await prisma.travelVisit.findFirst({
      where: {
        id,
        isPublic: true,
        status: 'PUBLISHED',
        deletedAt: null,
      },
      include: {
        slots: {
          where: {
            status: 'AVAILABLE',
            isBlocked: false,
          },
          orderBy: { startTime: 'asc' },
        },
      },
    });

    if (!visit) {
      const error = new Error('Visit not found or is not currently open for public viewing');
      error.statusCode = 404;
      error.isOperational = true;
      throw error;
    }

    return {
      id: visit.id,
      title: visit.title,
      country: visit.country,
      city: visit.city,
      venueName: visit.isVenuePrivate ? 'Private Venue (Disclosed upon confirmed booking)' : visit.venueName,
      venueAddress: visit.isVenuePrivate ? 'Shared privately upon booking confirmation' : visit.venueAddress,
      venueMapsUrl: visit.isVenuePrivate ? null : visit.venueMapsUrl,
      isVenuePrivate: visit.isVenuePrivate,
      startDate: visit.startDate,
      endDate: visit.endDate,
      timezone: visit.timezone,
      isBookingOpen: visit.isBookingOpen,
      notes: visit.notes,
      slots: visit.isBookingOpen ? visit.slots : [],
    };
  }

  /**
   * Admin: List all visits including drafts, cancelled, and past
   */
  static async getAllAdminVisits() {
    return prisma.travelVisit.findMany({
      where: { deletedAt: null },
      include: {
        _count: {
          select: {
            slots: true,
            bookings: true,
          },
        },
      },
      orderBy: { startDate: 'desc' },
    });
  }

  /**
   * Admin: Create city visit
   */
  static async createVisit(data, adminId) {
    const visit = await prisma.travelVisit.create({
      data: {
        title: data.title,
        country: data.country,
        city: data.city,
        venueName: data.venueName,
        venueAddress: data.venueAddress,
        venueMapsUrl: data.venueMapsUrl,
        isVenuePrivate: Boolean(data.isVenuePrivate),
        privateVenueDetails: data.privateVenueDetails,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        timezone: data.timezone || 'Asia/Kolkata',
        status: data.status || 'DRAFT',
        isPublic: Boolean(data.isPublic),
        isBookingOpen: Boolean(data.isBookingOpen),
        maxCapacity: parseInt(data.maxCapacity, 10) || 0,
        notes: data.notes,
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        adminUserId: adminId,
        action: 'CREATE_TRAVEL_VISIT',
        entityType: 'TravelVisit',
        entityId: visit.id,
        details: JSON.stringify({ title: visit.title, city: visit.city }),
      },
    });

    return visit;
  }

  /**
   * Admin: Update city visit
   */
  static async updateVisit(id, data, adminId) {
    const updated = await prisma.travelVisit.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: adminId,
        action: 'UPDATE_TRAVEL_VISIT',
        entityType: 'TravelVisit',
        entityId: id,
        details: JSON.stringify(data),
      },
    });

    return updated;
  }

  /**
   * Admin: Soft-delete visit
   */
  static async deleteVisit(id, adminId) {
    const deleted = await prisma.travelVisit.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'CANCELLED' },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: adminId,
        action: 'DELETE_TRAVEL_VISIT',
        entityType: 'TravelVisit',
        entityId: id,
      },
    });

    return deleted;
  }
}
