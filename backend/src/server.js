import app from './app.js';
import { config } from './config/environment.js';
import prisma from './config/database.js';

// Support PORT from process.env (Render sets this dynamically, e.g. 10000 or custom)
const PORT = process.env.PORT || config.port || 5000;
const HOST = '0.0.0.0';

async function startServer() {
  // Start Express HTTP listener on 0.0.0.0 so Render can detect and bind the port immediately
  const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Sugiyog Backend Server running at http://${HOST}:${PORT}`);
    console.log(`🩺 Health check available at: http://${HOST}:${PORT}/api/v1/health`);
    console.log(`🌍 Environment: ${config.nodeEnv}`);
  });

  // Verify database connection asynchronously without crashing the entire container
  try {
    if (!config.databaseUrl) {
      console.warn('⚠️ Warning: DATABASE_URL environment variable is not defined.');
      console.warn('👉 Add DATABASE_URL to your Render Service Environment settings.');
    } else {
      await prisma.$connect();
      console.log('✅ Connected to MySQL Database via Prisma');
    }
  } catch (dbError) {
    console.error('❌ Failed to connect to MySQL Database:');
    console.error(dbError.message || dbError);
    console.warn('⚠️ Server will stay active in degraded mode to serve health checks and static routes.');
    console.warn('👉 Verify your DATABASE_URL, credentials, and SSL settings in Render Environment Variables.');
  }

  // Graceful shutdown handling
  const shutdown = async (signal) => {
    console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
    server.close(async () => {
      try {
        await prisma.$disconnect();
        console.log('🔒 Database connection closed.');
      } catch (err) {
        // Ignore disconnect errors on shutdown
      }
      console.log('👋 Server terminated cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

startServer();
