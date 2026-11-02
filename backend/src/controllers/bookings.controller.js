import { BookingsService } from '../services/bookings.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class BookingsController {
  static async createInstantBooking(req, res, next) {
    try {
      const booking = await BookingsService.createInstantBooking(req.body);
      return ApiResponse.created(res, booking, 'Booking placed successfully');
    } catch (error) {
      next(error);
    }
  }

  static async createRequestBooking(req, res, next) {
    try {
      const booking = await BookingsService.createRequestBooking(req.body);
      return ApiResponse.created(res, booking, 'Booking request submitted for assistant review');
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminBookings(req, res, next) {
    try {
      const result = await BookingsService.getAllAdminBookings(req.query);
      return ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  static async updateBookingStatus(req, res, next) {
    try {
      const updated = await BookingsService.updateBookingStatus(req.params.id, req.body, req.admin.id);
      return ApiResponse.success(res, updated, 'Booking status updated');
    } catch (error) {
      next(error);
    }
  }
}
