import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET || 'default_insecure_jwt_secret_change_in_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
