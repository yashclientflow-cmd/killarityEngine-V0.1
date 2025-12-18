import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, User, Download, BookmarkCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { useUser } from '../../context/UserContext';
import { UpgradeModal } from '../modals/UpgradeModal';
import { generateReportPDF } from '../../lib/pdfGenerator';

export const Navbar = () => {
  const { userPlan } = useUser();
  const location = useLocation();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handlePdfClick = () => {
    if (!userPlan || userPlan === "free") {
      setIsUpgradeModalOpen(true);
    } else {
      // Try to get report from localStorage if on report page
      if (location.pathname.includes('/report')) {
        try {
          const latestReport = localStorage.getItem("latest_report");
          if (latestReport) {
            const report = JSON.parse(latestReport);
            const reportId = report.meta?.report_id || location.pathname.split('/').pop() || "unknown";
            generateReportPDF(report, reportId);
          } else {
            alert("No report found. Please generate a report first.");
          }
        } catch (error) {
          console.error("Error generating PDF:", error);
          alert("Failed to generate PDF. Please try again.");
        }
      } else {
        alert("Please open a report to download as PDF.");
      }
    }
  };

  return (
    <>
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 whitespace-nowrap select-none group">
          <Logo size="sm" showText={false} />
          <div className="flex flex-col">
            <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(14,165,233,0.4)] leading-tight group-hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.6)] transition-all duration-300">
              KILLARITY
            </span>
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.3)] leading-tight group-hover:drop-shadow-[0_0_12px_rgba(14,165,233,0.5)] transition-all duration-300">
              ENGINE
            </span>
          </div>
        </Link>
        {/* Center Nav */}
<div className="hidden md:flex items-center gap-8">
  <Link
    to="/saved"
    className="text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-1.5"
  >
    <BookmarkCheck className="w-4 h-4" />
    Saved
  </Link>
  <Link
    to="/pricing"
    className="text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors"
  >
    Pricing
  </Link>
  <Link
    to="/account"
    className="text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors"
  >
    Account
  </Link>
</div>

{/* Right Actions */}
<div className="flex items-center gap-4">

  {/* Pro/Lifer Badge */}
  {userPlan !== "free" && (
    <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
      <Sparkles className="w-3 h-3 text-sky-400" />
      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
        {userPlan === "lifer" ? "Lifer" : "Pro"}
      </span>
    </div>
  )}

  {/* PDF Button (desktop only) */}
  <Button
    variant="outline"
    size="sm"
    onClick={handlePdfClick}
    className="hidden md:flex"
  >
    <Download className="w-4 h-4 mr-2" />
    PDF
  </Button>

  {/* Account Icon for Mobile */}
  <Link to="/account" className="md:hidden">
    <User className="w-5 h-5 text-slate-400" />
  </Link>

  {/* Login + Start Free (desktop only) */}
  <div className="hidden md:flex items-center gap-3">
    <Button variant="ghost" size="sm" className="text-slate-400">
      Log in
    </Button>
    <Link to="/start">
      <Button size="sm">Start free</Button>
    </Link>
  </div>
</div>
      </div>
    </nav>
    </>
  );
};