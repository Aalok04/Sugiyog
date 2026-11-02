import { InquiriesService } from '../services/inquiries.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class InquiriesController {
  static async submitInquiry(req, res, next) {
    try {
      const inquiry = await InquiriesService.submitInquiry(req.body);
      return ApiResponse.created(res, inquiry, 'Inquiry submitted successfully. Our team will contact you shortly.');
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminInquiries(req, res, next) {
    try {
      const inquiries = await InquiriesService.getAllAdminInquiries(req.query.status);
      return ApiResponse.success(res, inquiries);
    } catch (error) {
      next(error);
    }
  }

  static async updateInquiryStatus(req, res, next) {
    try {
      const inquiry = await InquiriesService.updateInquiryStatus(req.params.id, req.body);
      return ApiResponse.success(res, inquiry, 'Inquiry updated');
    } catch (error) {
      next(error);
    }
  }
}
