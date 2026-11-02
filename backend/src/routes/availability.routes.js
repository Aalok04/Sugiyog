import { Router } from 'express';
import { AvailabilityController } from '../controllers/availability.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Public routes
router.get('/', AvailabilityController.getAvailableSlots);

// Admin routes
router.get('/admin/all', authenticateAdmin, requirePermission('slot:read'), AvailabilityController.getAdminSlots);
router.post('/admin', authenticateAdmin, requirePermission('slot:create'), AvailabilityController.createSlot);
router.put('/admin/:id', authenticateAdmin, requirePermission('slot:update'), AvailabilityController.updateSlot);
router.delete('/admin/:id', authenticateAdmin, requirePermission('slot:update'), AvailabilityController.deleteSlot);

export default router;
