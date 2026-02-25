/**
 * File utility functions
 */

import { extname } from 'path';
import { config } from '../config';

export function getFileType(filename: string): 'image' | 'video' | 'unsupported' {
  const ext = extname(filename).toLowerCase();
  
  if (config.supportedImageFormats.includes(ext)) {
    return 'image';
  }
  
  if (config.supportedVideoFormats.includes(ext)) {
    return 'video';
  }
  
  return 'unsupported';
}

export function isSupported(filename: string): boolean {
  const fileType = getFileType(filename);
  return fileType !== 'unsupported';
}

export function validateFile(file: Express.Multer.File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }
  
  if (file.size > config.maxFileSize) {
    return { valid: false, error: `File too large. Max size: ${config.maxFileSize / 1024 / 1024}MB` };
  }
  
  if (!isSupported(file.originalname)) {
    return { valid: false, error: 'Unsupported file format' };
  }
  
  return { valid: true };
}
