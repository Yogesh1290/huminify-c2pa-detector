/**
 * Next.js API Route for C2PA Detection
 * Place this file in your Next.js project at: pages/api/detect.ts or app/api/detect/route.ts
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { detectorService } from '../../src/services/detectorService';
import { validateFile } from '../../src/utils/fileUtils';
import { logger } from '../../src/utils/logger';
import { unlink } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  let filePath: string | undefined;

  try {
    // Parse form data
    const form = formidable({
      maxFileSize: 100 * 1024 * 1024, // 100MB
    });

    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
    }

    // Validate file
    const validation = validateFile({
      originalname: file.originalFilename || 'unknown',
      size: file.size,
      mimetype: file.mimetype || '',
    } as any);

    if (!validation.valid) {
      await unlink(file.filepath);
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    filePath = file.filepath;
    logger.info(`Analyzing file: ${file.originalFilename}`);

    // Analyze file
    const result = await detectorService.analyzeFile(filePath);

    // Clean up
    await unlink(filePath);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    logger.error('Error in Next.js API route:', error);

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
}
