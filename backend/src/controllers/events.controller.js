import { EventsService } from '../services/events.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class EventsController {
  static async getPublicEvents(req, res, next) {
    try {
      const list = await EventsService.getPublicEvents();
      return ApiResponse.success(res, list);
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminEvents(req, res, next) {
    try {
      const list = await EventsService.getAllAdminEvents();
      return ApiResponse.success(res, list);
    } catch (error) {
      next(error);
    }
  }

  static async createEvent(req, res, next) {
    try {
      const event = await EventsService.createEvent(req.body);
      return ApiResponse.created(res, event, 'Event created');
    } catch (error) {
      next(error);
    }
  }

  static async updateEvent(req, res, next) {
    try {
      const event = await EventsService.updateEvent(req.params.id, req.body);
      return ApiResponse.success(res, event, 'Event updated');
    } catch (error) {
      next(error);
    }
  }

  static async deleteEvent(req, res, next) {
    try {
      await EventsService.deleteEvent(req.params.id);
      return ApiResponse.success(res, null, 'Event deleted');
    } catch (error) {
      next(error);
    }
  }
}
