import { Router } from 'express';
import { EventsController } from '../controllers/events.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Public routes
router.get('/', EventsController.getPublicEvents);

// Admin routes
router.get('/admin/all', authenticateAdmin, requirePermission('content:read'), EventsController.getAllAdminEvents);
router.post('/admin', authenticateAdmin, requirePermission('content:write'), EventsController.createEvent);
router.put('/admin/:id', authenticateAdmin, requirePermission('content:write'), EventsController.updateEvent);
router.delete('/admin/:id', authenticateAdmin, requirePermission('content:write'), EventsController.deleteEvent);

export default router;
