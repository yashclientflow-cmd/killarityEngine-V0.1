import React from 'react';
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
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-slate-500 text-sm">
            © 2025 KALLARITYENGINE.ai. Built for founders, not tourists.
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-sky-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
