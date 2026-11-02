import prisma from '../config/database.js';

export class ServicesService {
  static async getPublicServices() {
    return prisma.service.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: { displayOrder: 'asc' },
    });
  }

  static async getServiceBySlug(slug) {
    const service = await prisma.service.findFirst({
      where: {
        slug,
        isActive: true,
        deletedAt: null,
      },
    });

    if (!service) {
      const error = new Error('Service not found');
      error.statusCode = 404;
      error.isOperational = true;
      throw error;
    }

    return service;
  }

  static async getAllAdminServices() {
    return prisma.service.findMany({
      where: { deletedAt: null },
      orderBy: { displayOrder: 'asc' },
    });
  }

  static async createService(data) {
    return prisma.service.create({
      data: {
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription,
        description: data.description,
        durationMinutes: parseInt(data.durationMinutes, 10) || 45,
        price: data.price,
        currency: data.currency || 'INR',
        isOnlineSupported: data.isOnlineSupported !== undefined ? Boolean(data.isOnlineSupported) : true,
        isInPersonSupported: data.isInPersonSupported !== undefined ? Boolean(data.isInPersonSupported) : true,
        displayOrder: parseInt(data.displayOrder, 10) || 0,
        imageUrl: data.imageUrl,
      },
    });
  }

  static async updateService(id, data) {
    return prisma.service.update({
      where: { id },
      data,
    });
  }

  static async deleteService(id) {
    // Soft delete
    return prisma.service.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
