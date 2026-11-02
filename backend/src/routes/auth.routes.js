import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { loginValidator } from '../validators/auth.validator.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', authLimiter, loginValidator, validateRequest, AuthController.login);
router.get('/profile', authenticateAdmin, AuthController.getProfile);

export default router;
