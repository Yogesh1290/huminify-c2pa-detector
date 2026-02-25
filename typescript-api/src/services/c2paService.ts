/**
 * C2PA Service - Native Node.js Implementation
 * Uses @contentauth/c2pa-node for reading C2PA manifests
 */

import { Reader } from '@contentauth/c2pa-node';
import { logger } from '../utils/logger';

export interface C2PAManifest {
  title?: string;
  format?: string;
  claim_generator?: string;
  signature_info?: {
    issuer?: string;
    time?: string;
  };
  assertions?: any[];
  ingredients?: any[];
  [key: string]: any;
}

export interface C2PAInfo {
  title?: string;
  software?: string;
  organization?: string;
  certificate?: string;
  generator?: string;
  aiGenerated?: boolean;
  signatureValid?: boolean;
  [key: string]: any;
}

export class C2PAService {
  /**
   * Read C2PA manifest from file
   */
  async readManifest(filePath: string, mimeType?: string): Promise<{
    status: 'valid' | 'invalid_signature' | 'no_manifest' | 'error';
    manifest?: C2PAManifest;
    error?: string;
  }> {
    try {
      // Read file as buffer
      const fs = await import('fs/promises');
      const fileBuffer = await fs.readFile(filePath);
      
      // Determine MIME type if not provided
      if (!mimeType) {
        const ext = filePath.toLowerCase().split('.').pop();
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
        mimeType = mimeTypes[ext || ''] || 'application/octet-stream';
      }
      
      // Create asset object with MIME type
      const asset = {
        buffer: fileBuffer,
        mimeType: mimeType,
      };
      
      // Read manifest using native Node.js library
      const reader = await Reader.fromAsset(asset);
      
      if (!reader) {
        return {
          status: 'no_manifest',
          error: 'No C2PA manifest found',
        };
      }

      // Get the manifest store as JSON
      const manifestStore = reader.json();
      
      // Get the active manifest
      const activeManifest = reader.getActive();
      
      if (!activeManifest) {
        return {
          status: 'no_manifest',
          error: 'No active manifest found',
        };
      }

      return {
        status: 'valid',
        manifest: activeManifest as C2PAManifest,
      };
    } catch (error: any) {
      logger.error('Error reading C2PA manifest:', error);
      
      // Check if it's a validation error
      if (error.message?.includes('signature') || error.message?.includes('validation')) {
        return {
          status: 'invalid_signature',
          error: error.message,
        };
      }
      
      return {
        status: 'error',
        error: error.message || 'Failed to read C2PA manifest',
      };
    }
  }

  /**
   * Extract C2PA information from manifest
   */
  extractInfo(manifest: C2PAManifest): C2PAInfo {
    const info: C2PAInfo = {};

    // Extract title
    if (manifest.title) {
      info.title = manifest.title;
    }

    // Extract claim generator (software)
    if (manifest.claim_generator) {
      info.software = manifest.claim_generator;
      info.generator = manifest.claim_generator;
    }

    // Extract signature info
    if (manifest.signature_info) {
      if (manifest.signature_info.issuer) {
        info.certificate = manifest.signature_info.issuer;
        info.organization = manifest.signature_info.issuer;
      }
    }

    // Extract assertions
    if (manifest.assertions && Array.isArray(manifest.assertions)) {
      info.assertions = manifest.assertions.map((a: any) => a.label || a);
    }

    return info;
  }

  /**
   * Validate C2PA signature
   */
  async validateSignature(filePath: string, mimeType?: string): Promise<boolean> {
    try {
      // Read file as buffer
      const fs = await import('fs/promises');
      const fileBuffer = await fs.readFile(filePath);
      
      // Determine MIME type if not provided
      if (!mimeType) {
        const ext = filePath.toLowerCase().split('.').pop();
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
        mimeType = mimeTypes[ext || ''] || 'application/octet-stream';
      }
      
      // Create asset object with MIME type
      const asset = {
        buffer: fileBuffer,
        mimeType: mimeType,
      };
      
      // Read with verification enabled
      const settings = {
        verify: {
          verify_after_reading: true,
          verify_trust: true,
        },
      };
      
      const reader = await Reader.fromAsset(asset, settings);
      
      if (!reader) {
        return false;
      }

      // If we got here without errors, signature is valid
      return true;
    } catch (error: any) {
      logger.error('Signature validation failed:', error);
      return false;
    }
  }
}

export const c2paService = new C2PAService();
