import { SettingsService } from '../services/settings.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class SettingsController {
  static async getPublicSettings(req, res, next) {
    try {
      const settings = await SettingsService.getPublicSettings();
      return ApiResponse.success(res, settings);
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminSettings(req, res, next) {
    try {
      const settings = await SettingsService.getAllAdminSettings();
      return ApiResponse.success(res, settings);
    } catch (error) {
      next(error);
    }
  }

  static async updateSetting(req, res, next) {
    try {
      const { key, value } = req.body;
      const setting = await SettingsService.updateSetting(key, typeof value === 'object' ? JSON.stringify(value) : value);
      return ApiResponse.success(res, setting, 'Setting updated');
    } catch (error) {
      next(error);
    }
  }
}
