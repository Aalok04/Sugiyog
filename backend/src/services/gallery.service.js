import prisma from '../config/database.js';

export class GalleryService {
  static async getPublicGallery(category) {
    const where = { isPublished: true };
    if (category) where.category = category;

    return prisma.gallery.findMany({
      where,
      include: { media: true },
      orderBy: { displayOrder: 'asc' },
    });
  }

  static async getAllAdminGallery() {
    return prisma.gallery.findMany({
      include: { media: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createGalleryItem(data) {
    // If mediaId is not provided, create a placeholder media record
    let mediaId = data.mediaId;
    if (!mediaId && data.fileUrl) {
      const media = await prisma.media.create({
        data: {
          fileName: data.fileName || 'image.jpg',
          fileUrl: data.fileUrl,
          mimeType: data.mimeType || 'image/jpeg',
          fileSize: data.fileSize || 1024,
          altText: data.title,
        },
      });
      mediaId = media.id;
    }

    return prisma.gallery.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category || 'General',
        isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
        displayOrder: parseInt(data.displayOrder, 10) || 0,
        mediaId,
      },
      include: { media: true },
    });
  }

  static async deleteGalleryItem(id) {
    return prisma.gallery.delete({
      where: { id },
    });
  }
}
