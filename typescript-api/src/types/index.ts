/**
 * Type definitions for C2PA detection
 */

export interface C2PAManifest {
  title?: string;
  format?: string;
  instanceId?: string;
  claimGenerator?: string;
  claimGeneratorInfo?: ClaimGeneratorInfo[];
  signatureInfo?: SignatureInfo;
  assertions?: Assertion[];
  ingredients?: Ingredient[];
}

export interface ClaimGeneratorInfo {
  name: string;
  version?: string;
  icon?: string;
}

export interface SignatureInfo {
  issuer?: string;
  time?: string;
  commonName?: string;
  organization?: string;
}

export interface Assertion {
  label: string;
  data?: any;
  kind?: string;
}

export interface Ingredient {
  title?: string;
  format?: string;
  instanceId?: string;
  relationship?: string;
}

export interface DetectionResult {
  file: string;
  exists: boolean;
  fileType: 'image' | 'video' | 'unsupported';
  c2paStatus: C2PAStatus;
  c2paInfo?: C2PAInfo;
  platform?: string;
  company?: string;
  verdict: DetectionVerdict;
  confidence: ConfidenceLevel;
  message?: string;
}

export type C2PAStatus =
  | 'valid'
  | 'invalid_signature'
  | 'no_manifest'
  | 'error';

export interface C2PAInfo {
  manifest?: C2PAManifest;
  platform?: string;
  company?: string;
  software?: string;
  generator?: string;
  organization?: string;
  certificate?: string;
  detectedMarkers?: string[];
  aiGenerated?: boolean;
  signatureValid?: boolean;
}

export type DetectionVerdict =
  | 'AI_DETECTED_C2PA'
  | 'HUMAN_VERIFIED_C2PA'
  | 'NO_C2PA_FOUND'
  | 'UNSUPPORTED_FORMAT'
  | 'ERROR';

export type ConfidenceLevel = 'high' | 'medium-high' | 'medium' | 'low' | 'none';

export interface Platform {
  name: string;
  company: string;
  markers: string[];
  aiIndicators: string[];
}

export interface PlatformMetadata {
  company: string;
  software?: string;
  generator?: string;
  model?: string;
  certificate?: string;
  organization?: string;
  detectedMarkers: string[];
}
