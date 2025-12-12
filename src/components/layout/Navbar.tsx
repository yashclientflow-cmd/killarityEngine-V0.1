import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Sparkles, User, LogIn, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUser } from '../../context/UserContext';
import { UpgradeModal } from '../modals/UpgradeModal';
import { cn } from '../../lib/utils';

export const Navbar = () => {
  const { userPlan } = useUser();
  const location = useLocation();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const handlePdfClick = () => {
    if (!userPlan || userPlan === "free") {
      setIsUpgradeModalOpen(true);
    } else {
      alert("Downloading PDF…");
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
        <Link to="/" className="flex items-center gap-3 whitespace-nowrap select-none">
  <img 
    src="/kallarity-logo.png"
    alt="KALLARITY ENGINE"
    className="h-10 w-auto object-contain"
  />
  <span className="font-bold text-xl tracking-tight text-slate-100">
    KALLARITY ENGINE
  </span>
</Link>
        {/* Center Nav */}
<div className="hidden md:flex items-center gap-8">
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