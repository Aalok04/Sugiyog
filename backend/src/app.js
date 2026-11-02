import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/environment.js';
import { globalLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { ApiResponse } from './utils/apiResponse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route modules
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import servicesRoutes from './routes/services.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';
import availabilityRoutes from './routes/availability.routes.js';
import travelVisitsRoutes from './routes/travelVisits.routes.js';
import paymentsRoutes from './routes/payments.routes.js';
import testimonialsRoutes from './routes/testimonials.routes.js';
import eventsRoutes from './routes/events.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import inquiriesRoutes from './routes/inquiries.routes.js';
import adminRoutes from './routes/admin.routes.js';
import settingsRoutes from './routes/settings.routes.js';

const app = express();

// Security Middlewares with Cross-Origin Resource Policy for uploaded assets
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching CLIENT_URL
      if (!origin || origin === config.clientUrl || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
  })
);

// Logging Middleware
if (config.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Request Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploaded media assets
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Apply rate limiting to all requests
app.use(globalLimiter);

// Base Route
app.get('/', (req, res) => {
  res.json({
    name: 'Sugiyog API',
    description: 'Nadi Shastra Consultation & Appointment Booking Platform',
    version: '1.0.0',
    documentation: '/docs',
    health: '/api/v1/health',
  });
});

// API v1 Mounts
const apiV1 = express.Router();

apiV1.use('/', healthRoutes);
apiV1.use('/auth', authRoutes);
apiV1.use('/users', usersRoutes);
apiV1.use('/services', servicesRoutes);
apiV1.use('/bookings', bookingsRoutes);
apiV1.use('/availability', availabilityRoutes);
apiV1.use('/travel-visits', travelVisitsRoutes);
apiV1.use('/payments', paymentsRoutes);
apiV1.use('/testimonials', testimonialsRoutes);
apiV1.use('/events', eventsRoutes);
apiV1.use('/gallery', galleryRoutes);
apiV1.use('/inquiries', inquiriesRoutes);
apiV1.use('/admin', adminRoutes);
apiV1.use('/settings', settingsRoutes);

app.use('/api/v1', apiV1);

// 404 Handler for undefined routes
app.use('*', (req, res) => {
  ApiResponse.error(res, `Cannot ${req.method} ${req.originalUrl} - Route not found`, 404);
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
