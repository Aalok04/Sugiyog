import prisma from '../config/database.js';

export class PaymentsService {
  static async getAllPayments() {
    return prisma.payment.findMany({
      include: {
        booking: {
          include: {
            user: true,
            service: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async recordManualPayment(data, adminId) {
    const { bookingId, amount, currency, paymentMethod, notes } = data;

    const paymentReference = `PAY-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    return prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          paymentReference,
          bookingId,
          amount,
          currency: currency || 'INR',
          paymentMethod: paymentMethod || 'CASH',
          status: 'PAID',
          paidAt: new Date(),
          notes,
        },
      });

      await tx.booking.update({
        where: { id: bookingId },
        data: { paymentStatus: 'PAID' },
      });

      await tx.auditLog.create({
        data: {
          adminUserId: adminId,
          action: 'RECORD_PAYMENT',
          entityType: 'Payment',
          entityId: payment.id,
          details: JSON.stringify({ bookingId, amount, paymentMethod }),
        },
      });

      return payment;
    });
  }
}
