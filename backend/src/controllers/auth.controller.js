import { AuthService } from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.loginAdmin(email, password);
      return ApiResponse.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const profile = await AuthService.getAdminProfile(req.admin.id);
      return ApiResponse.success(res, profile, 'Profile retrieved');
    } catch (error) {
      next(error);
    }
  }
}
