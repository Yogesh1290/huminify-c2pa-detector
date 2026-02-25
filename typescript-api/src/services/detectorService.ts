/**
 * Main Detection Service
 */

import { readFile } from 'fs/promises';
import { c2paService } from './c2paService';
import { platformService } from './platformService';
import { getFileType } from '../utils/fileUtils';
import { logger } from '../utils/logger';
import type { DetectionResult } from '../types';

export class DetectorService {
  /**
   * Analyze file for AI content detection
   */
  async analyzeFile(filePath: string, originalFilename?: string): Promise<DetectionResult> {
    const filenameToCheck = originalFilename || filePath;
    
    const result: DetectionResult = {
      file: originalFilename || filePath,
      exists: true,
      fileType: getFileType(filenameToCheck),
      c2paStatus: 'no_manifest',
      verdict: 'NO_C2PA_FOUND',
      confidence: 'none',
    };
    
    // Check if file type is supported
    if (result.fileType === 'unsupported') {
      result.verdict = 'UNSUPPORTED_FORMAT';
      return result;
    }
    
    try {
      // Read file data
      const fileData = await readFile(filePath);
      
      // Determine MIME type from original filename
      const ext = filenameToCheck.toLowerCase().split('.').pop();
      const mimeTypes: Record<string, string> = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'webp': 'image/webp',
        'heic': 'image/heic',
        'avif': 'image/avif',
        'mp4': 'video/mp4',
        'mov': 'video/quicktime',
        'avi': 'video/x-msvideo',
        'webm': 'video/webm',
        'mkv': 'video/x-matroska',
      };
      const mimeType = mimeTypes[ext || ''] || 'application/octet-stream';
      
      // Try to read C2PA manifest
      const { status, manifest, error } = await c2paService.readManifest(filePath, mimeType);
      result.c2paStatus = status;
      
      if (status === 'valid' && manifest) {
        // Extract C2PA info
        result.c2paInfo = c2paService.extractInfo(manifest);
        
        // Detect platform
        const detection = platformService.detectPlatform(manifest, fileData);
        
        if (detection) {
          result.platform = detection.platform;
          result.company = detection.metadata.company;
          result.c2paInfo = {
            ...result.c2paInfo,
            ...detection.metadata,
          };
          
          // Check if AI-generated
          const isAI = platformService.isAIGenerated(detection.metadata, manifest);
          result.c2paInfo.aiGenerated = isAI;
          
          // Validate signature
          const signatureValid = await c2paService.validateSignature(filePath, mimeType);
          result.c2paInfo.signatureValid = signatureValid;
          
          // Determine verdict
          if (isAI) {
            result.verdict = 'AI_DETECTED_C2PA';
            result.confidence = signatureValid ? 'high' : 'medium-high';
            result.message = 'AI-generated content detected via C2PA';
          } else {
            result.verdict = 'HUMAN_VERIFIED_C2PA';
            result.confidence = signatureValid ? 'high' : 'medium';
            result.message = 'Human-created content verified via C2PA';
          }
        } else {
          result.verdict = 'NO_C2PA_FOUND';
          result.message = 'C2PA manifest found but platform not recognized';
        }
      } else if (status === 'invalid_signature') {
        // Try to detect platform from raw data
        const detection = platformService.detectPlatform({} as any, fileData);
        
        if (detection) {
          result.platform = detection.platform;
          result.company = detection.metadata.company;
          result.c2paInfo = detection.metadata;
          result.verdict = 'AI_DETECTED_C2PA';
          result.confidence = 'medium';
          result.message = 'C2PA data found but signature invalid';
        } else {
          result.verdict = 'NO_C2PA_FOUND';
          result.message = error || 'Invalid C2PA signature';
        }
      } else {
        // No C2PA found
        if (result.fileType === 'video') {
          result.message = 'No C2PA metadata found. Video AI detection not available.';
        } else {
          result.message = 'No C2PA metadata found. Image AI detection not available in TypeScript version.';
        }
      }
    } catch (error: any) {
      logger.error('Error analyzing file:', error);
      result.verdict = 'ERROR';
      result.message = error.message;
    }
    
    return result;
  }
}

export const detectorService = new DetectorService();
