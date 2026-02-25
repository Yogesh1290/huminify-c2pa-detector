import Head from 'next/head';
import Layout from '../components/Layout';
import { Code, Terminal, Zap, Shield, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Docs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      <Head>
        <title>Documentation - Huminify API Integration Guide</title>
        <meta name="description" content="Complete guide to integrating Huminify AI Content Detection API into your application. Easy setup with code examples." />
      </Head>

      <Layout>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">API Documentation</h1>
            <p className="text-lg text-slate-600">
              Integrate AI content detection into your application in minutes with our simple REST API.
            </p>
          </div>

          {/* Quick Start */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary-500" />
              Quick Start
            </h2>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">1. API Endpoint</h3>
              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>POST https://your-domain.com/api/detect</code>
                </pre>
                <button
                  onClick={() => copyToClipboard('POST https://your-domain.com/api/detect', 'endpoint')}
                  className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {copiedCode === 'endpoint' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">2. Make a Request</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">JavaScript / TypeScript</p>
                  <div className="relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/detect', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`const formData = new FormData();\nformData.append('file', fileInput.files[0]);\n\nconst response = await fetch('/api/detect', {\n  method: 'POST',\n  body: formData\n});\n\nconst result = await response.json();\nconsole.log(result);`, 'js')}
                      className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      {copiedCode === 'js' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Python</p>
                  <div className="relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`import requests

with open('image.jpg', 'rb') as f:
    files = {'file': f}
    response = requests.post(
        'https://your-domain.com/api/detect',
        files=files
    )
    
result = response.json()
print(result)`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`import requests\n\nwith open('image.jpg', 'rb') as f:\n    files = {'file': f}\n    response = requests.post(\n        'https://your-domain.com/api/detect',\n        files=files\n    )\n    \nresult = response.json()\nprint(result)`, 'python')}
                      className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      {copiedCode === 'python' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">cURL</p>
                  <div className="relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{`curl -X POST https://your-domain.com/api/detect \\
  -F "file=@/path/to/image.jpg"`}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(`curl -X POST https://your-domain.com/api/detect \\\n  -F "file=@/path/to/image.jpg"`, 'curl')}
                      className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      {copiedCode === 'curl' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Response Format */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Code className="w-6 h-6 text-primary-500" />
              Response Format
            </h2>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`{
  "success": true,
  "data": {
    "file": "image.jpg",
    "fileType": "image/jpeg",
    "c2paStatus": "FOUND",
    "verdict": "AI_DETECTED_C2PA",
    "confidence": "HIGH",
    "platform": "openai",
    "company": "OpenAI",
    "message": "C2PA metadata found",
    "c2paInfo": {
      "aiGenerated": true,
      "signatureValid": true,
      "software": "DALL-E 3",
      "organization": "OpenAI",
      "detectedMarkers": ["c2pa.ai_generative_training"]
    }
  }
}`}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(`{\n  "success": true,\n  "data": {\n    "file": "image.jpg",\n    "fileType": "image/jpeg",\n    "c2paStatus": "FOUND",\n    "verdict": "AI_DETECTED_C2PA",\n    "confidence": "HIGH",\n    "platform": "openai",\n    "company": "OpenAI",\n    "message": "C2PA metadata found",\n    "c2paInfo": {\n      "aiGenerated": true,\n      "signatureValid": true,\n      "software": "DALL-E 3",\n      "organization": "OpenAI",\n      "detectedMarkers": ["c2pa.ai_generative_training"]\n    }\n  }\n}`, 'response')}
                  className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {copiedCode === 'response' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-semibold text-slate-900">Response Fields</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-3">
                    <code className="text-primary-600 font-mono">success</code>
                    <span className="text-slate-600">Boolean indicating if the request was successful</span>
                  </div>
                  <div className="flex gap-3">
                    <code className="text-primary-600 font-mono">verdict</code>
                    <span className="text-slate-600">Detection result: AI_DETECTED_C2PA, HUMAN_CREATED, or NO_C2PA_DATA</span>
                  </div>
                  <div className="flex gap-3">
                    <code className="text-primary-600 font-mono">confidence</code>
                    <span className="text-slate-600">Confidence level: HIGH, MEDIUM, or LOW</span>
                  </div>
                  <div className="flex gap-3">
                    <code className="text-primary-600 font-mono">platform</code>
                    <span className="text-slate-600">Detected platform: openai, google, adobe, microsoft</span>
                  </div>
                  <div className="flex gap-3">
                    <code className="text-primary-600 font-mono">c2paInfo</code>
                    <span className="text-slate-600">Detailed C2PA metadata including AI generation status</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Supported Formats */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary-500" />
              Supported Formats
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Images</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    PNG (.png)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    JPEG (.jpg, .jpeg)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    WebP (.webp)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    HEIC (.heic)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    AVIF (.avif)
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Videos</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    MP4 (.mp4)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    MOV (.mov)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    AVI (.avi)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    WebM (.webm)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    MKV (.mkv)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Integration Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary-500" />
              Integration Examples
            </h2>

            <div className="space-y-6">
              {/* React Example */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">React / Next.js</h3>
                <div className="relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`import { useState } from 'react';

function AIDetector() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Detection failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {loading && <p>Analyzing...</p>}
      {result && (
        <div>
          <p>Verdict: {result.data.verdict}</p>
          <p>Confidence: {result.data.confidence}</p>
        </div>
      )}
    </div>
  );
}`}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`import { useState } from 'react';\n\nfunction AIDetector() {\n  const [result, setResult] = useState(null);\n  const [loading, setLoading] = useState(false);\n\n  const handleFileUpload = async (e) => {\n    const file = e.target.files[0];\n    if (!file) return;\n\n    setLoading(true);\n    const formData = new FormData();\n    formData.append('file', file);\n\n    try {\n      const response = await fetch('/api/detect', {\n        method: 'POST',\n        body: formData,\n      });\n      const data = await response.json();\n      setResult(data);\n    } catch (error) {\n      console.error('Detection failed:', error);\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  return (\n    <div>\n      <input type="file" onChange={handleFileUpload} />\n      {loading && <p>Analyzing...</p>}\n      {result && (\n        <div>\n          <p>Verdict: {result.data.verdict}</p>\n          <p>Confidence: {result.data.confidence}</p>\n        </div>\n      )}\n    </div>\n  );\n}`, 'react')}
                    className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedCode === 'react' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Node.js Example */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Node.js / Express</h3>
                <div className="relative">
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{`const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/detect', upload.single('file'), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));

    const response = await axios.post(
      'https://your-domain.com/api/detect',
      formData,
      { headers: formData.getHeaders() }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);`}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`const express = require('express');\nconst multer = require('multer');\nconst FormData = require('form-data');\nconst axios = require('axios');\nconst fs = require('fs');\n\nconst app = express();\nconst upload = multer({ dest: 'uploads/' });\n\napp.post('/detect', upload.single('file'), async (req, res) => {\n  try {\n    const formData = new FormData();\n    formData.append('file', fs.createReadStream(req.file.path));\n\n    const response = await axios.post(\n      'https://your-domain.com/api/detect',\n      formData,\n      { headers: formData.getHeaders() }\n    );\n\n    res.json(response.data);\n  } catch (error) {\n    res.status(500).json({ error: error.message });\n  }\n});\n\napp.listen(3000);`, 'node')}
                    className="absolute top-2 right-2 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedCode === 'node' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Error Handling */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Error Handling</h2>
            
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="relative">
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`{
  "success": false,
  "error": "No file uploaded"
}

// Common error messages:
// - "No file uploaded"
// - "Unsupported file type"
// - "File too large (max 100MB)"
// - "Failed to process file"`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Resources */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Additional Resources</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="https://github.com/Yogesh1290/huminify-c2pa-detector"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-slate-200 p-6 hover:border-primary-500 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-500">GitHub Repository</h3>
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-primary-500" />
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  Open source project. View code, contribute, report issues, and star the repo!
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-medium">Open Source</span>
                  <span>⭐ Star on GitHub</span>
                </div>
              </a>

              <a
                href="https://c2pa.org"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-slate-200 p-6 hover:border-primary-500 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-500">C2PA Specification</h3>
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-primary-500" />
                </div>
                <p className="text-sm text-slate-600">
                  Learn more about the C2PA standard for content authenticity and provenance.
                </p>
              </a>

              <a
                href="https://contentauthenticity.org"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-slate-200 p-6 hover:border-primary-500 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-500">Content Authenticity Initiative</h3>
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-primary-500" />
                </div>
                <p className="text-sm text-slate-600">
                  Explore the CAI's mission to restore trust in digital content.
                </p>
              </a>
            </div>
          </section>

          {/* Support */}
          <section className="bg-primary-50 rounded-xl border border-primary-200 p-8 text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Need Help?</h2>
            <p className="text-slate-600 mb-6">
              Have questions about integration? We're here to help.
            </p>
            <a
              href="mailto:support@huminify.com"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Contact Support
            </a>
          </section>

          {/* Open Source CTA */}
          <section className="bg-slate-900 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Open Source & Community Driven</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Huminify is 100% open source. Star the repo, contribute code, report issues, or suggest features. 
              Help us build the future of content authenticity verification!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/Yogesh1290/huminify-c2pa-detector"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Star on GitHub
              </a>
              <a
                href="https://github.com/Yogesh1290/huminify-c2pa-detector/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-all"
              >
                Report Issue
              </a>
              <a
                href="https://github.com/Yogesh1290/huminify-c2pa-detector/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-all"
              >
                Fork & Contribute
              </a>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
