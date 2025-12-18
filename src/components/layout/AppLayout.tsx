import { Navbar } from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

export const AppLayout = () => {
  const location = useLocation();
  const isReportPage = location.pathname.includes('/report');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30">
      {/* Global Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0f172a,_#020617_80%)]" />
      </div>

      <Navbar />

      <main className={cn("relative z-10 pt-24 pb-20 px-6", isReportPage ? "max-w-[1400px] mx-auto" : "max-w-5xl mx-auto")}>
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-slate-800/60 bg-slate-950 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div className="space-y-3 max-w-md">
              <div>
                <h3 className="text-white font-bold mb-3">KALLARITY ENGINE</h3>
                <p className="text-slate-300 text-sm font-medium mb-2">
                  Built for founders, not tourists.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Validate your startup idea with <span className="text-sky-400 font-semibold">real market data</span> and get a <span className="text-sky-400 font-semibold">7-day execution blueprint</span>. No fluff. Just truth.
                </p>
                <p className="text-slate-500 text-xs mt-3 pt-3 border-t border-slate-800">
                  Crafted by Yash Tyagi • Solo Founder • © 2025
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-slate-500 text-xs uppercase tracking-wider mb-3">Built by</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mb-1">
                      Yash & 16
                    </p>
                    <p className="text-slate-400 text-sm">Solo Founder • Indie Builder</p>
                    <p className="text-slate-500 text-xs mt-2">Building tools that founders actually use</p>
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-800">
                    <a
                      href="mailto:yashclient.flow@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-sky-400 transition-colors p-2 hover:bg-sky-500/10 rounded-lg"
                      aria-label="Email"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/AUxMindset"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-sky-400 transition-colors p-2 hover:bg-sky-500/10 rounded-lg"
                      aria-label="Twitter/X"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/yash-tyagi-089a49345/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-sky-400 transition-colors p-2 hover:bg-sky-500/10 rounded-lg"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 text-sm">
              © 2025 KALLARITY ENGINE. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-sky-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Privacy</a>
              <a
                href="https://x.com/AUxMindset"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
              >
                Twitter/X
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
