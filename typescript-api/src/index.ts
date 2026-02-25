/**
 * Main Entry Point for Express Server
 */

import { createApp } from './app';
import { config } from './config';
import { logger } from './utils/logger';

const app = createApp();

app.listen(config.port, () => {
  logger.info(`🚀 Server running on http://localhost:${config.port}`);
  logger.info(`📝 API Documentation: http://localhost:${config.port}/api/health`);
  logger.info(`🔍 Detection endpoint: POST http://localhost:${config.port}/api/detect`);
});
