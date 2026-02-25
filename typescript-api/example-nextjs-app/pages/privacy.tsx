import Head from 'next/head';
import Layout from '../components/Layout';
import { Shield, Eye, Database, Lock, ExternalLink } from 'lucide-react';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Huminify</title>
        <meta name="description" content="Huminify Privacy Policy - How we handle your data and protect your privacy." />
      </Head>

      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-slate-600">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Your Privacy Matters</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Huminify is committed to protecting your privacy. This policy explains how we handle your data when you use our AI content detection service.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Collection */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Database className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Data We Collect</h2>
                  <div className="space-y-4 text-slate-600">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Uploaded Files</h3>
                      <p className="leading-relaxed">
                        When you upload images or videos for analysis, we temporarily process them to extract C2PA metadata and detect AI-generated content. 
                        Files are processed in memory and are not permanently stored on our servers.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Usage Data</h3>
                      <p className="leading-relaxed">
                        We collect basic usage statistics (number of requests, file types) to improve our service. 
                        This data is anonymized and does not include personal information.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">Technical Information</h3>
                      <p className="leading-relaxed">
                        We collect standard technical information like IP addresses, browser type, and device information for security and performance monitoring.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Use Data */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">How We Use Your Data</h2>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>To analyze uploaded content for C2PA metadata and AI detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>To improve our detection algorithms and service quality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>To monitor system performance and security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>To comply with legal obligations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Lock className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Data Security</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    We implement industry-standard security measures to protect your data:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>HTTPS encryption for all data transmission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>Temporary file processing (no permanent storage)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>Regular security audits and updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>Access controls and monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Data Retention</h2>
              <p className="text-slate-600 leading-relaxed">
                Uploaded files are processed in real-time and are not stored permanently. 
                Temporary files are automatically deleted after processing is complete. 
                Anonymized usage statistics may be retained for service improvement purposes.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Third-Party Services</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use the following third-party services:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span><strong>Vercel:</strong> Hosting and deployment platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span><strong>Google Analytics:</strong> Anonymous usage statistics (if enabled)</span>
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Your Rights</h2>
              <p className="text-slate-600 leading-relaxed mb-4">You have the right to:</p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Access your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Request data deletion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Opt-out of data collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>Request data portability</span>
                </li>
              </ul>
            </section>

            {/* Open Source */}
            <section className="bg-primary-50 rounded-xl border border-primary-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Open Source Transparency</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Huminify is 100% open source. You can review our code, data handling practices, and security measures on GitHub.
              </p>
              <a
                href="https://github.com/Yogesh1290/huminify-c2pa-detector"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                View Source Code
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>

            {/* Contact */}
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Contact Us</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or how we handle your data, please contact us:
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

            {/* Updates */}
            <section className="bg-slate-50 rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Policy Updates</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. 
                Continued use of our service after changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
