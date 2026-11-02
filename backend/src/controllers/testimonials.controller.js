import { TestimonialsService } from '../services/testimonials.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class TestimonialsController {
  static async getPublicTestimonials(req, res, next) {
    try {
      const list = await TestimonialsService.getPublicTestimonials();
      return ApiResponse.success(res, list);
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminTestimonials(req, res, next) {
    try {
      const list = await TestimonialsService.getAllAdminTestimonials();
      return ApiResponse.success(res, list);
    } catch (error) {
      next(error);
    }
  }

  static async createTestimonial(req, res, next) {
    try {
      const item = await TestimonialsService.createTestimonial(req.body);
      return ApiResponse.created(res, item, 'Testimonial created');
    } catch (error) {
      next(error);
    }
  }

  static async updateTestimonial(req, res, next) {
    try {
      const item = await TestimonialsService.updateTestimonial(req.params.id, req.body);
      return ApiResponse.success(res, item, 'Testimonial updated');
    } catch (error) {
      next(error);
    }
  }

  static async deleteTestimonial(req, res, next) {
    try {
      await TestimonialsService.deleteTestimonial(req.params.id);
      return ApiResponse.success(res, null, 'Testimonial deleted');
    } catch (error) {
      next(error);
    }
  }
}
