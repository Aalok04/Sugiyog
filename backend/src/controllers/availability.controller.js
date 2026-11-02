import { AvailabilityService } from '../services/availability.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class AvailabilityController {
  static async getAvailableSlots(req, res, next) {
    try {
      const slots = await AvailabilityService.getAvailableSlots(req.query);
      return ApiResponse.success(res, slots);
    } catch (error) {
      next(error);
    }
  }

  static async getAdminSlots(req, res, next) {
    try {
      const slots = await AvailabilityService.getAdminSlots(req.query);
      return ApiResponse.success(res, slots);
    } catch (error) {
      next(error);
    }
  }

  static async createSlot(req, res, next) {
    try {
      const slot = await AvailabilityService.createSlot(req.body);
      return ApiResponse.created(res, slot, 'Availability slot created');
    } catch (error) {
      next(error);
    }
  }

  static async updateSlot(req, res, next) {
    try {
      const slot = await AvailabilityService.updateSlot(req.params.id, req.body);
      return ApiResponse.success(res, slot, 'Availability slot updated');
    } catch (error) {
      next(error);
    }
  }

  static async deleteSlot(req, res, next) {
    try {
      await AvailabilityService.deleteSlot(req.params.id);
      return ApiResponse.success(res, null, 'Availability slot deleted');
    } catch (error) {
      next(error);
    }
  }
}
