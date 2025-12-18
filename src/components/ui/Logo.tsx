import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo = ({ size = 'md', className = '', showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: { k: 'h-8 w-8', text: 'text-sm', container: 'gap-2' },
    md: { k: 'h-10 w-10', text: 'text-base', container: 'gap-2.5' },
    lg: { k: 'h-16 w-16', text: 'text-xl', container: 'gap-3' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center ${currentSize.container} ${className}`}>
      {/* Stylized K with Circuit Pattern */}
      <motion.div
        className={`relative ${currentSize.k}`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-sky-400/40 to-cyan-400/30 blur-xl rounded-lg animate-pulse"></div>
        
        {/* K Letter Container */}
        <div className="relative w-full h-full">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(14,165,233,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Circuit Pattern */}
              <pattern id={`circuit-${size}`} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.5" fill="rgba(52,211,153,0.4)" />
                <circle cx="8" cy="8" r="0.5" fill="rgba(14,165,233,0.4)" />
                <circle cx="13" cy="13" r="0.5" fill="rgba(6,182,212,0.4)" />
                <line x1="0" y1="7.5" x2="15" y2="7.5" stroke="rgba(52,211,153,0.15)" strokeWidth="0.3" />
                <line x1="7.5" y1="0" x2="7.5" y2="15" stroke="rgba(14,165,233,0.15)" strokeWidth="0.3" />
              </pattern>
              {/* K Gradient */}
              <linearGradient id={`kGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
              </linearGradient>
              {/* Glow Filter */}
              <filter id={`glow-${size}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Circuit Pattern Background */}
            <rect width="100" height="100" fill={`url(#circuit-${size})`} opacity="0.25" />

            {/* K Letter - Left Vertical Bar */}
            <rect
              x="18"
              y="12"
              width="10"
              height="76"
              fill={`url(#kGradient-${size})`}
              filter={`url(#glow-${size})`}
              rx="1"
            />

            {/* K Letter - Top Diagonal (angled) */}
            <rect
              x="28"
              y="12"
              width="10"
              height="38"
              fill={`url(#kGradient-${size})`}
              filter={`url(#glow-${size})`}
              transform="rotate(25 33 31)"
              rx="1"
            />

            {/* K Letter - Bottom Diagonal (angled) */}
            <rect
              x="28"
              y="50"
              width="10"
              height="38"
              fill={`url(#kGradient-${size})`}
              filter={`url(#glow-${size})`}
              transform="rotate(-25 33 69)"
              rx="1"
            />

            {/* Circuit Board Details - Small squares and lines */}
            <rect x="12" y="25" width="4" height="4" fill="#34d399" opacity="0.7" rx="0.5" />
            <rect x="12" y="48" width="4" height="4" fill="#22d3ee" opacity="0.7" rx="0.5" />
            <rect x="12" y="71" width="4" height="4" fill="#06b6d4" opacity="0.7" rx="0.5" />
            <rect x="52" y="18" width="4" height="4" fill="#34d399" opacity="0.7" rx="0.5" />
            <rect x="52" y="78" width="4" height="4" fill="#06b6d4" opacity="0.7" rx="0.5" />
            <line x1="14" y1="27" x2="14" y2="48" stroke="rgba(52,211,153,0.4)" strokeWidth="0.5" />
            <line x1="54" y1="20" x2="54" y2="78" stroke="rgba(14,165,233,0.4)" strokeWidth="0.5" />
          </svg>
        </div>
      </motion.div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`font-bold ${currentSize.text} text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)] tracking-tight`}
          >
            KILLARITY
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`font-bold ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'} text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(14,165,233,0.4)] tracking-tight`}
          >
            ENGINE
          </motion.div>
        </div>
      )}
    </div>
  );
};

