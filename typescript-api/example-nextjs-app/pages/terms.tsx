import Head from 'next/head';
import Layout from '../components/Layout';
import { FileText, AlertCircle, CheckCircle, Scale, ExternalLink } from 'lucide-react';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Huminify</title>
        <meta name="description" content="Huminify Terms of Service - Rules and guidelines for using our AI content detection service." />
      </Head>

      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Agreement to Terms</h2>
                  <p className="text-slate-600 leading-relaxed">
                    By accessing or using Huminify, you agree to be bound by these Terms of Service. 
                    If you disagree with any part of these terms, you may not use our service.
                  </p>
                </div>
              </div>
            </section>

            {/* Service Description */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Service Description</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Huminify provides AI content detection services using C2PA (Coalition for Content Provenance and Authenticity) technology. 
                Our service analyzes images and videos to determine if they were AI-generated or human-created.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Detection results are provided "as-is" and should not be considered 100% accurate. 
                  Always verify critical content through multiple sources.
                </p>
              </div>
            </section>

            {/* Acceptable Use */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Acceptable Use</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">You may use Huminify to:</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Verify content authenticity for personal or commercial purposes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Integrate our API into your applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Analyze images and videos you own or have permission to use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Use detection results for research and educational purposes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prohibited Use */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Prohibited Use</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">You may NOT use Huminify to:</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Upload illegal, harmful, or offensive content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Violate intellectual property rights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Attempt to reverse engineer or exploit the service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Overload or disrupt our servers (DDoS attacks)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Use the service for harassment or malicious purposes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Accuracy & Limitations */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Accuracy & Limitations</h2>
              <div className="space-y-4 text-slate-600">
                <p className="leading-relaxed">
                  <strong>C2PA Detection:</strong> Highly accurate when C2PA metadata is present, but not all content has C2PA data embedded.
                </p>
                <p className="leading-relaxed">
                  <strong>AI Model Detection:</strong> Fallback detection has ~70-85% accuracy and may produce false positives or negatives.
                </p>
                <p className="leading-relaxed">
                  <strong>No Guarantee:</strong> We do not guarantee 100% accuracy. Results should be used as guidance, not absolute truth.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Scale className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Intellectual Property</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Huminify is open source software licensed under the MIT License. You are free to:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>Use the software commercially</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>Modify the source code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>Distribute copies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>Use privately</span>
                    </li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    You must include the original license and copyright notice in any copies or substantial portions of the software.
                  </p>
                </div>
              </div>
            </section>

            {/* User Content */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">User Content</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You retain all rights to content you upload. By using our service, you grant us a temporary license to process your content for detection purposes only.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We do not store uploaded files permanently. Files are processed in memory and automatically deleted after analysis.
              </p>
            </section>

            {/* Disclaimer */}
            <section className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Disclaimer of Warranties</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We do not warrant that the service will be uninterrupted, error-free, or completely secure. 
                Use at your own risk.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Changes to Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. 
                Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            {/* Open Source */}
            <section className="bg-primary-50 rounded-xl border border-primary-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Open Source License</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Huminify is licensed under the MIT License. View the full license and source code on GitHub.
              </p>
              <a
                href="https://github.com/Yogesh1290/huminify-c2pa-detector/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                View MIT License
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>

            {/* Contact */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Questions about these Terms of Service? Contact us on GitHub:
              </p>
              <a
                href="https://github.com/Yogesh1290/huminify-c2pa-detector/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Contact on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>

            {/* Governing Law */}
            <section className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Governing Law</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws. 
                Any disputes shall be resolved through good faith negotiation or appropriate legal channels.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
