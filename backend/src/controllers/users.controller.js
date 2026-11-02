import { UsersService } from '../services/users.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class UsersController {
  static async getAllUsers(req, res, next) {
    try {
      const result = await UsersService.getAllUsers(req.query);
      return ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user = await UsersService.getUserById(req.params.id);
      return ApiResponse.success(res, user);
    } catch (error) {
      next(error);
    }
  }
}
