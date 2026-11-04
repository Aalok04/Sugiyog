import { Router } from 'express';
import { PaymentsController } from '../controllers/payments.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Public / Sandbox Payment Demonstration Endpoint
router.post('/demo-process', PaymentsController.processDemoPayment);

// Admin Finance Routes
router.get('/admin/all', authenticateAdmin, requirePermission('finance:read'), PaymentsController.getAllPayments);
router.post('/admin/record', authenticateAdmin, requirePermission('finance:update'), PaymentsController.recordManualPayment);

export default router;
