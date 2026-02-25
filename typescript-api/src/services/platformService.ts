/**
 * Platform Detection Service
 */

import type { Platform, PlatformMetadata, C2PAManifest } from '../types';

const platforms: Record<string, Platform> = {
  openai: {
    name: 'openai',
    company: 'OpenAI',
    markers: ['OpenAI', 'ChatGPT', 'GPT-4', 'GPT-4o', 'DALL-E', 'DALL·E', 'Truepic', 'Sora'],
    aiIndicators: ['trainedAlgorithmicMedia', 'c2pa.ai_generated', 'generativeType'],
  },
  google: {
    name: 'google',
    company: 'Google',
    markers: ['Google LLC', 'Google', 'Google Media Processing', 'Google Media Processing Services', 'Pixel Camera', 'Google Photos'],
    aiIndicators: ['ai_generated', 'synthetic'],
  },
  adobe: {
    name: 'adobe',
    company: 'Adobe',
    markers: ['Adobe', 'Firefly', 'Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects'],
    aiIndicators: ['generative', 'ai_generated'],
  },
  microsoft: {
    name: 'microsoft',
    company: 'Microsoft',
    markers: ['Microsoft', 'Designer', 'Bing Image Creator', 'Bing', 'Copilot'],
    aiIndicators: ['ai_generated', 'synthetic'],
  },
};

export class PlatformService {
  /**
   * Detect platform from C2PA manifest
   */
  detectPlatform(manifest: C2PAManifest, rawData?: Buffer): { platform: string; metadata: PlatformMetadata } | null {
    // Try to detect from manifest
    if (manifest.claimGeneratorInfo && manifest.claimGeneratorInfo.length > 0) {
      const generatorName = manifest.claimGeneratorInfo[0].name.toLowerCase();
      
      for (const [platformName, platform] of Object.entries(platforms)) {
        if (platform.markers.some(marker => generatorName.includes(marker.toLowerCase()))) {
          return {
            platform: platformName,
            metadata: this.extractMetadata(platform, manifest, rawData),
          };
        }
      }
    }
    
    // Try to detect from raw data if available
    if (rawData) {
      const dataStr = rawData.toString('latin1');
      
      for (const [platformName, platform] of Object.entries(platforms)) {
        const foundMarkers = platform.markers.filter(marker => dataStr.includes(marker));
        
        if (foundMarkers.length > 0) {
          return {
            platform: platformName,
            metadata: {
              company: platform.company,
              detectedMarkers: foundMarkers,
            },
          };
        }
      }
    }
    
    return null;
  }
  
  /**
   * Extract platform-specific metadata
   */
  private extractMetadata(platform: Platform, manifest: C2PAManifest, rawData?: Buffer): PlatformMetadata {
    const metadata: PlatformMetadata = {
      company: platform.company,
      detectedMarkers: [],
    };
    
    // Extract from manifest
    if (manifest.claimGeneratorInfo && manifest.claimGeneratorInfo.length > 0) {
      const generator = manifest.claimGeneratorInfo[0];
      metadata.generator = generator.name;
      metadata.software = generator.name;
    }
    
    if (manifest.signatureInfo) {
      metadata.certificate = manifest.signatureInfo.commonName;
      metadata.organization = manifest.signatureInfo.organization || manifest.signatureInfo.issuer;
    }
    
    // Search for markers in raw data
    if (rawData) {
      const dataStr = rawData.toString('latin1');
      metadata.detectedMarkers = platform.markers.filter(marker => dataStr.includes(marker));
    }
    
    return metadata;
  }
  
  /**
   * Check if content is AI-generated based on metadata
   */
  isAIGenerated(metadata: PlatformMetadata, manifest?: C2PAManifest): boolean {
    // Check detected markers
    if (metadata.detectedMarkers && metadata.detectedMarkers.length > 0) {
      return true;
    }
    
    // Check manifest assertions
    if (manifest && manifest.assertions) {
      const hasAIIndicator = manifest.assertions.some(assertion => {
        const label = assertion.label.toLowerCase();
        return label.includes('ai') || label.includes('generated') || label.includes('synthetic');
      });
      
      if (hasAIIndicator) {
        return true;
      }
    }
    
    return false;
  }
  
  /**
   * Get all supported platforms
   */
  getAllPlatforms(): string[] {
    return Object.keys(platforms);
  }
}

export const platformService = new PlatformService();
