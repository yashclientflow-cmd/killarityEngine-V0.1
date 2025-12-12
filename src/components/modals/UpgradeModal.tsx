import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUser } from '../../context/UserContext';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  const { upgradeToPro, upgradeToLifer } = useUser();

  const handleUpgrade = (type: 'pro' | 'lifer') => {
    if (type === 'pro') upgradeToPro();
    else upgradeToLifer();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-purple-500 to-sky-500" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-sky-400 fill-current" />
                </div>
                <h2 className="text-2xl font-bold text-white">Unlock Full Clarity</h2>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Full 7-day execution roadmap',
                  'First-5 paying users blueprint',
                  'Unlimited idea reports',
                  'PDF exports & history',
                  'Competitor traffic spy',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-300">
                    <Check className="w-5 h-5 text-sky-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full py-6 text-lg"
                  onClick={() => handleUpgrade('pro')}
                >
                  Upgrade to Pro – $29/mo
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-4 border-slate-700 hover:bg-slate-800"
                  onClick={() => handleUpgrade('lifer')}
                >
                  Get Lifetime Access – $290
                </Button>
              </div>
              
              <p className="text-center text-xs text-slate-500 mt-4">
                Secure payment via Stripe. 14-day money-back guarantee.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
