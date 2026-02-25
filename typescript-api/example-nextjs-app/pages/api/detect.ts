/**
 * Next.js API Route - C2PA Detection
 * Serverless function for Vercel deployment
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { readFile } from 'fs/promises';
import { detectorService } from '../../lib/detectorService';

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

  try {
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

    // Read file buffer
    const fileBuffer = await readFile(file.filepath);
    const fileName = file.originalFilename || 'unknown';

    // Analyze file
    const result = await detectorService.analyzeFile(fileBuffer, fileName);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error in /api/detect:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
