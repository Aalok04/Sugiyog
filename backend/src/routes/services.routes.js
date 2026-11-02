import { Router } from 'express';
import { ServicesController } from '../controllers/services.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Public routes
router.get('/', ServicesController.getPublicServices);
router.get('/:slug', ServicesController.getServiceBySlug);

// Admin routes
router.get('/admin/all', authenticateAdmin, requirePermission('content:read'), ServicesController.getAllAdminServices);
router.post('/admin', authenticateAdmin, requirePermission('content:write'), ServicesController.createService);
router.put('/admin/:id', authenticateAdmin, requirePermission('content:write'), ServicesController.updateService);
router.delete('/admin/:id', authenticateAdmin, requirePermission('content:write'), ServicesController.deleteService);

export default router;
