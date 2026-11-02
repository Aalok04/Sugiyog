import { AdminService } from '../services/admin.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class AdminController {
  static async getDashboardStats(req, res, next) {
    try {
      const data = await AdminService.getDashboardStats();
      return ApiResponse.success(res, data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminUsers(req, res, next) {
    try {
      const users = await AdminService.getAllAdminUsers();
      return ApiResponse.success(res, users);
    } catch (error) {
      next(error);
    }
  }

  static async getAllRoles(req, res, next) {
    try {
      const roles = await AdminService.getAllRoles();
      return ApiResponse.success(res, roles);
    } catch (error) {
      next(error);
    }
  }

  static async getAuditLogs(req, res, next) {
    try {
      const logs = await AdminService.getAuditLogs(req.query);
      return ApiResponse.success(res, logs);
    } catch (error) {
      next(error);
    }
  }
}
