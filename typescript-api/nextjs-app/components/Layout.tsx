import { ReactNode } from 'react';
import { Shield, Github, ExternalLink, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 gradient-primary rounded-xl shadow-lg shadow-primary-500/30">
                <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Huminify Check Powered by C2PA</h1>
                <p className="text-xs text-slate-500 font-medium">AI Content Detector</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-2">
              <a 
                href="#features" 
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-500 hover:bg-slate-50 rounded-lg transition-all"
              >
                Features
              </a>
              <a 
                href="https://c2pa.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-500 hover:bg-slate-50 rounded-lg transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                About C2PA
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white gradient-primary rounded-lg hover:shadow-lg hover:shadow-primary-500/30 transition-all"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-8 h-8 gradient-primary rounded-lg">
                  <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-bold gradient-text">Huminify</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Verify content authenticity and detect AI-generated media using C2PA technology.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://c2pa.org" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-primary-500 transition-colors">
                    C2PA Specification
                  </a>
                </li>
                <li>
                  <a href="https://contentauthenticity.org" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-primary-500 transition-colors">
                    Content Authenticity Initiative
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-primary-500 transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Powered By */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Powered By</h3>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <Shield className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">C2PA Technology</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Coalition for Content Provenance and Authenticity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Huminify. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
