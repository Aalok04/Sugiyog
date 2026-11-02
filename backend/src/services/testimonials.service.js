import prisma from '../config/database.js';

export class TestimonialsService {
  static async getPublicTestimonials() {
    return prisma.testimonial.findMany({
      where: {
        isApproved: true,
        deletedAt: null,
      },
      orderBy: [{ isFeatured: 'desc' }, { displayOrder: 'asc' }],
    });
  }

  static async getAllAdminTestimonials() {
    return prisma.testimonial.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createTestimonial(data) {
    return prisma.testimonial.create({
      data: {
        clientName: data.clientName,
        clientLocation: data.clientLocation,
        quote: data.quote,
        fullStory: data.fullStory,
        rating: parseInt(data.rating, 10) || 5,
        consultationType: data.consultationType,
        isFeatured: Boolean(data.isFeatured),
        isApproved: Boolean(data.isApproved),
      },
    });
  }

  static async updateTestimonial(id, data) {
    return prisma.testimonial.update({
      where: { id },
      data,
    });
  }

  static async deleteTestimonial(id) {
    return prisma.testimonial.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
