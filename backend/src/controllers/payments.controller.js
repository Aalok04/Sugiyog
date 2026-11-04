import { PaymentsService } from '../services/payments.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class PaymentsController {
  static async getAllPayments(req, res, next) {
    try {
      const payments = await PaymentsService.getAllPayments();
      return ApiResponse.success(res, payments);
    } catch (error) {
      next(error);
    }
  }

  static async recordManualPayment(req, res, next) {
    try {
      const payment = await PaymentsService.recordManualPayment(req.body, req.admin.id);
      return ApiResponse.created(res, payment, 'Payment recorded successfully');
    } catch (error) {
      next(error);
    }
  }

  static async processDemoPayment(req, res, next) {
    try {
      const result = await PaymentsService.processDemoPayment(req.body);
      return ApiResponse.created(res, result, 'Payment processed successfully (Demo Sandbox)');
    } catch (error) {
      next(error);
    }
  }
}
