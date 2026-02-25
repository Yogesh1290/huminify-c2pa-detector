/**
 * Express Application Setup
 */

import express from 'express';
import cors from 'cors';
import detectionRoutes from './routes/detectionRoutes';
import { logger } from './utils/logger';
import { config } from './config';

export function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });

  // Routes
  app.use('/api', detectionRoutes);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      name: 'C2PA Content Detection API',
      version: '1.0.0',
      endpoints: {
        detect: 'POST /api/detect',
        platforms: 'GET /api/platforms',
        health: 'GET /api/health',
      },
    });
  });

  // Error handling
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  });

  return app;
}
