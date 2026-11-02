import { Router } from 'express';
import { TestimonialsController } from '../controllers/testimonials.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Public routes
router.get('/', TestimonialsController.getPublicTestimonials);

// Admin routes
router.get('/admin/all', authenticateAdmin, requirePermission('content:read'), TestimonialsController.getAllAdminTestimonials);
router.post('/admin', authenticateAdmin, requirePermission('content:write'), TestimonialsController.createTestimonial);
router.put('/admin/:id', authenticateAdmin, requirePermission('content:write'), TestimonialsController.updateTestimonial);
router.delete('/admin/:id', authenticateAdmin, requirePermission('content:write'), TestimonialsController.deleteTestimonial);

export default router;
