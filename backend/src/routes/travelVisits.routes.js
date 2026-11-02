import { Router } from 'express';
import { TravelVisitsController } from '../controllers/travelVisits.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Public routes
router.get('/', TravelVisitsController.getPublicUpcomingVisits);
router.get('/:id', TravelVisitsController.getPublicVisitById);

// Admin routes (Assistant / Super Admin / Admin)
router.get('/admin/all', authenticateAdmin, requirePermission('travel:read'), TravelVisitsController.getAllAdminVisits);
router.post('/admin', authenticateAdmin, requirePermission('travel:create'), TravelVisitsController.createVisit);
router.put('/admin/:id', authenticateAdmin, requirePermission('travel:update'), TravelVisitsController.updateVisit);
router.delete('/admin/:id', authenticateAdmin, requirePermission('travel:delete'), TravelVisitsController.deleteVisit);

export default router;
