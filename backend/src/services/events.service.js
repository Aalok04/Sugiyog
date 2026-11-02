import prisma from '../config/database.js';

export class EventsService {
  static async getPublicEvents() {
    return prisma.event.findMany({
      where: {
        isPublished: true,
        deletedAt: null,
      },
      orderBy: { eventDate: 'asc' },
    });
  }

  static async getAllAdminEvents() {
    return prisma.event.findMany({
      where: { deletedAt: null },
      orderBy: { eventDate: 'desc' },
    });
  }

  static async createEvent(data) {
    return prisma.event.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        eventDate: new Date(data.eventDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        location: data.location,
        city: data.city,
        country: data.country,
        isOnline: Boolean(data.isOnline),
        registrationLink: data.registrationLink,
        isPublished: Boolean(data.isPublished),
        imageUrl: data.imageUrl,
      },
    });
  }

  static async updateEvent(id, data) {
    return prisma.event.update({
      where: { id },
      data: {
        ...data,
        eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
  }

  static async deleteEvent(id) {
    return prisma.event.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
