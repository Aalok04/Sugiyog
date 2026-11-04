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

  static async processDemoPayment(data) {
    const { bookingId, amount, currency, paymentMethod } = data;

    if (!bookingId) {
      const error = new Error('Booking ID is required to process payment');
      error.statusCode = 400;
      throw error;
    }

    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true, user: true },
    });

    if (!existingBooking) {
      const error = new Error('Booking not found');
      error.statusCode = 404;
      throw error;
    }

    const paymentReference = `PAY-DEMO-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    return prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          paymentReference,
          bookingId: existingBooking.id,
          amount: amount ? Number(amount) : existingBooking.totalAmount,
          currency: currency || existingBooking.currency || 'INR',
          paymentMethod: paymentMethod || 'ONLINE_GATEWAY',
          status: 'PAID',
          gatewayName: 'Demo Sandbox Gateway',
          gatewayTransactionId: `TXN_DEMO_${Date.now()}`,
          paidAt: new Date(),
          notes: `Demonstration payment for booking ${existingBooking.bookingNumber}`,
        },
      });

      const updatedBooking = await tx.booking.update({
        where: { id: existingBooking.id },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
        },
        include: {
          service: true,
          user: true,
          availabilitySlot: true,
          travelVisit: true,
          payments: true,
        },
      });

      return { payment, booking: updatedBooking };
    });
  }
}
