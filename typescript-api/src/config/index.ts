/**
 * Configuration management
 */

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // File upload limits
  maxFileSize: 100 * 1024 * 1024, // 100MB
  
  // Supported file types
  supportedImageFormats: ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.avif'],
  supportedVideoFormats: ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.flv', '.wmv'],
} as const;

export default config;
