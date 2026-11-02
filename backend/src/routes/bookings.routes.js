import { Router } from 'express';
import { BookingsController } from '../controllers/bookings.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Public booking endpoints
router.post('/instant', BookingsController.createInstantBooking);
router.post('/request', BookingsController.createRequestBooking);

// Admin booking endpoints
router.get('/admin/all', authenticateAdmin, requirePermission('booking:read'), BookingsController.getAllAdminBookings);
router.patch('/admin/:id/status', authenticateAdmin, requirePermission('booking:update'), BookingsController.updateBookingStatus);

export default router;
