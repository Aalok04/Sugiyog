import { Router } from 'express';
import { SettingsController } from '../controllers/settings.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Public settings
router.get('/', SettingsController.getPublicSettings);

// Admin settings
router.get('/admin/all', authenticateAdmin, requirePermission('settings:manage'), SettingsController.getAllAdminSettings);
router.post('/admin', authenticateAdmin, requirePermission('settings:manage'), SettingsController.updateSetting);

export default router;
