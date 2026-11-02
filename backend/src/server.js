import app from './app.js';
import { config } from './config/environment.js';
import prisma from './config/database.js';

const PORT = config.port;

async function startServer() {
  try {
    // Verify database connection at startup
    await prisma.$connect();
    console.log('✅ Connected to MySQL Database via Prisma');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Sugiyog Backend Server running at http://localhost:${PORT}`);
      console.log(`🩺 Health check available at: http://localhost:${PORT}/api/v1/health`);
    });

    // Graceful shutdown handling
    const shutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
      server.close(async () => {
        await prisma.$disconnect();
        console.log('🔒 Database connection closed. Server terminated cleanly.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
