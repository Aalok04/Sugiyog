import prisma from '../config/database.js';

export class SettingsService {
  static async getPublicSettings() {
    return prisma.siteSettings.findMany({
      where: {
        category: { in: ['general', 'policy'] },
      },
    });
  }

  static async getAllAdminSettings() {
    return prisma.siteSettings.findMany({
      orderBy: { category: 'asc' },
    });
  }

  static async updateSetting(key, value) {
    return prisma.siteSettings.upsert({
      where: { key },
      update: { value },
      create: {
        key,
        value,
      },
    });
  }
}
