import prisma from '../config/database.js';

export class InquiriesService {
  static async submitInquiry(data) {
    return prisma.inquiry.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        subject: data.subject || 'General Inquiry',
        message: data.message,
        status: 'NEW',
      },
    });
  }

  static async getAllAdminInquiries(status) {
    const where = {};
    if (status) where.status = status;

    return prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  static async updateInquiryStatus(id, { status, adminNotes }) {
    return prisma.inquiry.update({
      where: { id },
      data: {
        status,
        adminNotes,
      },
    });
  }
}
