import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

router.get('/admin/all', authenticateAdmin, requirePermission('booking:read'), UsersController.getAllUsers);
router.get('/admin/:id', authenticateAdmin, requirePermission('booking:read'), UsersController.getUserById);

export default router;
