import { Router } from 'express';
import { GalleryController } from '../controllers/gallery.controller.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';
import { uploadImage } from '../middlewares/uploadMiddleware.js';

const router = Router();

// Public routes
router.get('/', GalleryController.getPublicGallery);

// Admin routes
router.get('/admin/all', authenticateAdmin, requirePermission('content:read'), GalleryController.getAllAdminGallery);
router.post(
  '/admin',
  authenticateAdmin,
  requirePermission('content:write'),
  uploadImage.single('image'),
  GalleryController.createGalleryItem
);
router.post(
  '/admin/upload',
  authenticateAdmin,
  requirePermission('content:write'),
  uploadImage.single('image'),
  GalleryController.uploadMedia
);
router.delete('/admin/:id', authenticateAdmin, requirePermission('content:write'), GalleryController.deleteGalleryItem);

export default router;
