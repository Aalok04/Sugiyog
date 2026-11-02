import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requireRole, requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Protect all admin endpoints with JWT auth
router.use(authenticateAdmin);

router.get('/dashboard-stats', AdminController.getDashboardStats);
router.get('/users', requireRole('SUPER_ADMIN', 'ADMIN'), AdminController.getAllAdminUsers);
router.get('/roles', requireRole('SUPER_ADMIN', 'ADMIN'), AdminController.getAllRoles);
router.get('/audit-logs', requireRole('SUPER_ADMIN'), AdminController.getAuditLogs);

export default router;
