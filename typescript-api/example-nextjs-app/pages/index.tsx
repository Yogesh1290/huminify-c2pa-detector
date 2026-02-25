import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { 
  Upload, 
  Search, 
  FileCheck, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Loader2,
  Shield,
  Sparkles,
  Tag,
  FileImage,
  Info,
  Calendar,
  Cpu,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  ChevronRight
} from 'lucide-react';

interface DetectionResult {
  file: string;
  fileType: string;
  c2paStatus: string;
  verdict: string;
  confidence: string;
  platform?: string;
  company?: string;
  message?: string;
  c2paInfo?: {
    aiGenerated?: boolean;
    signatureValid?: boolean;
    detectedMarkers?: string[];
    title?: string;
    software?: string;
    organization?: string;
    [key: string]: any;
  };
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/detect', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Detection failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    if (verdict.includes('AI_DETECTED')) return 'text-red-600';
    if (verdict.includes('HUMAN')) return 'text-green-600';
    return 'text-slate-600';
  };

  const getVerdictBg = (verdict: string) => {
    if (verdict.includes('AI_DETECTED')) return 'bg-red-50 border-red-200';
    if (verdict.includes('HUMAN')) return 'bg-green-50 border-green-200';
    return 'bg-slate-50 border-slate-200';
  };

  return (
    <>
      <Head>
        <title>Huminify - AI Content Detector | Verify Image & Video Authenticity with C2PA</title>
        <meta name="description" content="Detect AI-generated images and videos instantly. Huminify uses C2PA technology to verify content authenticity from OpenAI, Google, Adobe, and Microsoft. Free online AI detector." />
        <meta name="keywords" content="AI detector, AI content detector, C2PA, content authenticity, deepfake detector, AI image detector, verify AI content, ChatGPT detector, DALL-E detector, content credentials" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Huminify - AI Content Detector | Verify Content Authenticity" />
        <meta property="og:description" content="Detect AI-generated images and videos using C2PA technology. Verify content from OpenAI, Google, Adobe, and Microsoft." />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Huminify - AI Content Detector" />
        <meta name="twitter:description" content="Detect AI-generated content using C2PA technology. Free online verification tool." />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Huminify" />
        <link rel="canonical" href="https://huminify.com" />
        
        {/* Favicons - handled in _document.tsx but can override here if needed */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-200px)]">
          {/* Left Column - Upload */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                Detect AI-Generated Content Instantly
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-4">
                Upload images or videos to verify their authenticity using C2PA Content Credentials. 
                Detect AI-generated content from ChatGPT, DALL-E, Google Gemini, Adobe Firefly, and more.
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                  <CheckCircle className="w-4 h-4" />
                  100% Free
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                  <Shield className="w-4 h-4" />
                  C2PA Verified
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200">
                  <Sparkles className="w-4 h-4" />
                  Instant Results
                </span>
                <a
                  href="https://github.com/Yogesh1290/huminify-c2pa-detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Open Source
                </a>
              </div>
              <p className="text-sm text-slate-500">
                <strong>Note:</strong> Content Credentials (C2PA) are still being adopted. 
                Not all content will have embedded metadata to verify.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
              <div 
                className={`flex-1 flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl transition-all duration-300 ${
                  dragActive 
                    ? 'border-primary-500 bg-primary-50/50' 
                    : 'border-slate-300 bg-white hover:border-primary-400 hover:bg-slate-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {file ? (
                  <div className="text-center w-full max-w-md">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 gradient-primary rounded-2xl">
                      {file.type.startsWith('video/') ? (
                        <Video className="w-10 h-10 text-white" />
                      ) : (
                        <ImageIcon className="w-10 h-10 text-white" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 truncate">
                      {file.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.split('/')[0]}
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          Inspect Content
                        </>
                      )}
                    </button>
                    <label 
                      htmlFor="file"
                      className="block mt-4 text-sm text-primary-500 hover:text-primary-600 cursor-pointer font-medium"
                    >
                      Select another file
                    </label>
                  </div>
                ) : (
                  <label htmlFor="file" className="cursor-pointer text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-2xl">
                      <Upload className="w-8 h-8 text-slate-400" strokeWidth={2} />
                    </div>
                    <p className="text-lg font-semibold text-primary-500 hover:text-primary-600 mb-2">
                      Select a file from your device
                    </p>
                    <p className="text-base text-slate-900 mb-4">
                      or drag and drop anywhere
                    </p>
                    <p className="text-sm text-slate-500 mb-3">
                      <strong>Supported formats:</strong>
                    </p>
                    <p className="text-xs text-slate-500">
                      Images: PNG, JPEG, WEBP, HEIC, AVIF<br />
                      Videos: MP4, MOV, AVI, WEBM, MKV
                    </p>
                  </label>
                )}
              </div>

              {error && (
                <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-900">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <strong className="font-semibold">Error:</strong> {error}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Column - Results */}
          <div className="flex flex-col">
            {result ? (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 gradient-primary rounded-xl">
                      <FileCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{result.file}</h3>
                      <p className="text-sm text-slate-500">
                        {result.c2paInfo?.organization || result.company || 'Unknown source'}
                      </p>
                    </div>
                  </div>

                  {/* Verdict Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getVerdictBg(result.verdict)}`}>
                    {result.verdict.includes('AI_DETECTED') ? (
                      <Sparkles className={`w-4 h-4 ${getVerdictColor(result.verdict)}`} />
                    ) : result.verdict.includes('HUMAN') ? (
                      <CheckCircle className={`w-4 h-4 ${getVerdictColor(result.verdict)}`} />
                    ) : (
                      <AlertCircle className={`w-4 h-4 ${getVerdictColor(result.verdict)}`} />
                    )}
                    <span className={`text-sm font-semibold ${getVerdictColor(result.verdict)}`}>
                      {result.c2paInfo?.aiGenerated ? 'AI Generated Content' : result.verdict.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Content Summary */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {result.message && (
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900">{result.message}</p>
                    </div>
                  )}

                  {/* Process Section */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Process
                    </h4>
                    <div className="space-y-3">
                      {result.platform && (
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg flex-shrink-0">
                            <Tag className="w-4 h-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">Platform</p>
                            <p className="text-sm text-slate-600 capitalize">{result.platform}</p>
                          </div>
                        </div>
                      )}

                      {result.c2paInfo?.software && (
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg flex-shrink-0">
                            <Cpu className="w-4 h-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">App or device used</p>
                            <p className="text-sm text-slate-600">{result.c2paInfo.software}</p>
                          </div>
                        </div>
                      )}

                      {result.c2paInfo?.organization && (
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg flex-shrink-0">
                            <Shield className="w-4 h-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">Organization</p>
                            <p className="text-sm text-slate-600">{result.c2paInfo.organization}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Section */}
                  {result.c2paInfo?.aiGenerated !== undefined && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Actions
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg flex-shrink-0">
                            {result.c2paInfo.aiGenerated ? (
                              <Sparkles className="w-4 h-4 text-purple-600" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {result.c2paInfo.aiGenerated ? 'Created with AI' : 'Created'}
                            </p>
                            <p className="text-sm text-slate-600">
                              {result.c2paInfo.aiGenerated 
                                ? 'Generated using artificial intelligence' 
                                : 'Created a new file or content'}
                            </p>
                          </div>
                        </div>

                        {result.c2paInfo.signatureValid !== undefined && (
                          <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-lg flex-shrink-0">
                              {result.c2paInfo.signatureValid ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">Signature Status</p>
                              <p className="text-sm text-slate-600">
                                {result.c2paInfo.signatureValid ? 'Verified and valid' : 'Invalid or expired'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Detected Markers */}
                  {result.c2paInfo?.detectedMarkers && result.c2paInfo.detectedMarkers.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Detected Markers
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.c2paInfo.detectedMarkers.map((marker, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                          >
                            <Sparkles className="w-3 h-3" />
                            {marker}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confidence */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">Confidence Level</span>
                      <span className="text-sm font-semibold text-slate-900 uppercase">
                        {result.confidence}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-white rounded-3xl border border-slate-200 p-12">
                <div className="text-center max-w-md">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-2xl">
                    <FileCheck className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    Ready to Verify Content
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Upload an image or video to detect AI-generated content and view detailed Content Credentials.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">Instant Detection</p>
                        <p className="text-xs text-slate-600">Get results in seconds</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">C2PA Verified</p>
                        <p className="text-xs text-slate-600">Industry-standard technology</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">Multi-Platform</p>
                        <p className="text-xs text-slate-600">OpenAI, Google, Adobe, Microsoft</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
