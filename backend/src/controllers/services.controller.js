import { ServicesService } from '../services/services.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class ServicesController {
  static async getPublicServices(req, res, next) {
    try {
      const services = await ServicesService.getPublicServices();
      return ApiResponse.success(res, services);
    } catch (error) {
      next(error);
    }
  }

  static async getServiceBySlug(req, res, next) {
    try {
      const service = await ServicesService.getServiceBySlug(req.params.slug);
      return ApiResponse.success(res, service);
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminServices(req, res, next) {
    try {
      const services = await ServicesService.getAllAdminServices();
      return ApiResponse.success(res, services);
    } catch (error) {
      next(error);
    }
  }

  static async createService(req, res, next) {
    try {
      const service = await ServicesService.createService(req.body);
      return ApiResponse.created(res, service, 'Service created successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updateService(req, res, next) {
    try {
      const service = await ServicesService.updateService(req.params.id, req.body);
      return ApiResponse.success(res, service, 'Service updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req, res, next) {
    try {
      await ServicesService.deleteService(req.params.id);
      return ApiResponse.success(res, null, 'Service deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
