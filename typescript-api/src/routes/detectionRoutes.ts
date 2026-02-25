/**
 * Detection API Routes
 */

import { Router, Request, Response } from 'express';
import multer from 'multer';
import { join } from 'path';
import { unlink } from 'fs/promises';
import { detectorService } from '../services/detectorService';
import { platformService } from '../services/platformService';
import { validateFile } from '../utils/fileUtils';
import { logger } from '../utils/logger';

const router = Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

/**
 * POST /api/detect
 * Analyze uploaded file for AI content
 */
router.post('/detect', upload.single('file'), async (req: Request, res: Response) => {
  let filePath: string | undefined;
  
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
    }
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      await unlink(file.path);
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }
    
    filePath = file.path;
    logger.info(`Analyzing file: ${file.originalname}`);
    
    // Analyze file
    const result = await detectorService.analyzeFile(filePath, file.originalname);
    
    // Clean up uploaded file
    await unlink(filePath);
    
    return res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    logger.error('Error in /detect endpoint:', error);
    
    // Clean up file if it exists
    if (filePath) {
      try {
        await unlink(filePath);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
});

/**
 * GET /api/platforms
 * Get list of supported platforms
 */
router.get('/platforms', (req: Request, res: Response) => {
  const platforms = platformService.getAllPlatforms();
  
  return res.json({
    success: true,
    data: {
      platforms,
      count: platforms.length,
    },
  });
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req: Request, res: Response) => {
  return res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
});

export default router;
