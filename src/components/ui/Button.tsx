import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] border-transparent',
      secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700',
      ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white border-transparent',
      destructive: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/50',
      outline: 'bg-transparent border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white',
      success: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-8 py-3.5 text-base',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-lg transition-all duration-200 border disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
