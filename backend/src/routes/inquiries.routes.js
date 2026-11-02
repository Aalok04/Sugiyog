import { Router } from 'express';
import { InquiriesController } from '../controllers/inquiries.controller.js';
import { publicFormLimiter } from '../middlewares/rateLimiter.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Public inquiry submission
router.post('/', publicFormLimiter, InquiriesController.submitInquiry);

// Admin review
router.get('/admin/all', authenticateAdmin, InquiriesController.getAllAdminInquiries);
router.patch('/admin/:id', authenticateAdmin, InquiriesController.updateInquiryStatus);

export default router;
