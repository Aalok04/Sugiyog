import { PrismaClient } from '@prisma/client';

// Single reusable Prisma Client instance across the application
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

export default prisma;
