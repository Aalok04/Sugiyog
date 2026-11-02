import { TravelVisitsService } from '../services/travelVisits.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class TravelVisitsController {
  static async getPublicUpcomingVisits(req, res, next) {
    try {
      const visits = await TravelVisitsService.getPublicUpcomingVisits(req.query);
      return ApiResponse.success(res, visits);
    } catch (error) {
      next(error);
    }
  }

  static async getPublicVisitById(req, res, next) {
    try {
      const visit = await TravelVisitsService.getPublicVisitById(req.params.id);
      return ApiResponse.success(res, visit);
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminVisits(req, res, next) {
    try {
      const visits = await TravelVisitsService.getAllAdminVisits();
      return ApiResponse.success(res, visits);
    } catch (error) {
      next(error);
    }
  }

  static async createVisit(req, res, next) {
    try {
      const visit = await TravelVisitsService.createVisit(req.body, req.admin.id);
      return ApiResponse.created(res, visit, 'Travel visit created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateVisit(req, res, next) {
    try {
      const visit = await TravelVisitsService.updateVisit(req.params.id, req.body, req.admin.id);
      return ApiResponse.success(res, visit, 'Travel visit updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteVisit(req, res, next) {
    try {
      await TravelVisitsService.deleteVisit(req.params.id, req.admin.id);
      return ApiResponse.success(res, null, 'Travel visit cancelled/deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
