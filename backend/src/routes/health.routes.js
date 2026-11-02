import { Router } from 'express';
import prisma from '../config/database.js';
import { ApiResponse } from '../utils/apiResponse.js';

const router = Router();

router.get('/health', async (req, res) => {
  const startTime = Date.now();
  let dbStatus = 'DISCONNECTED';
  let dbLatencyMs = null;

  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - dbStart;
    dbStatus = 'CONNECTED';
  } catch (error) {
    dbStatus = `ERROR: ${error.message}`;
  }

  const healthData = {
    platform: 'Sugiyog API',
    status: dbStatus === 'CONNECTED' ? 'HEALTHY' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      type: 'MySQL',
      status: dbStatus,
      latencyMs: dbLatencyMs,
    },
    version: '1.0.0',
    totalResponseTimeMs: Date.now() - startTime,
  };

  return ApiResponse.success(res, healthData, 'Sugiyog API Health Check');
});

export default router;
