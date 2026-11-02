import { GalleryService } from '../services/gallery.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export class GalleryController {
  static async getPublicGallery(req, res, next) {
    try {
      const items = await GalleryService.getPublicGallery(req.query.category);
      return ApiResponse.success(res, items);
    } catch (error) {
      next(error);
    }
  }

  static async getAllAdminGallery(req, res, next) {
    try {
      const items = await GalleryService.getAllAdminGallery();
      return ApiResponse.success(res, items);
    } catch (error) {
      next(error);
    }
  }

  static async createGalleryItem(req, res, next) {
    try {
      const data = { ...req.body };

      // Handle file upload from multer
      if (req.file) {
        data.fileName = req.file.originalname;
        data.fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        data.mimeType = req.file.mimetype;
        data.fileSize = req.file.size;
      }

      if (!data.fileUrl) {
        return ApiResponse.error(res, 'Please provide an image file or an image URL.', 400);
      }

      const item = await GalleryService.createGalleryItem(data);
      return ApiResponse.created(res, item, 'Gallery image added successfully');
    } catch (error) {
      next(error);
    }
  }

  static async uploadMedia(req, res, next) {
    try {
      if (!req.file) {
        return ApiResponse.error(res, 'No image file uploaded', 400);
      }

      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      return ApiResponse.success(
        res,
        {
          fileUrl,
          fileName: req.file.originalname,
          mimeType: req.file.mimetype,
          fileSize: req.file.size,
        },
        'Image uploaded successfully'
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteGalleryItem(req, res, next) {
    try {
      await GalleryService.deleteGalleryItem(req.params.id);
      return ApiResponse.success(res, null, 'Gallery item removed');
    } catch (error) {
      next(error);
    }
  }
}
