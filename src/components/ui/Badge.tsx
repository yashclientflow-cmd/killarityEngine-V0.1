import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'danger' | 'neon';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    outline: 'bg-transparent border-slate-600 text-slate-400',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    neon: 'bg-sky-500/10 text-sky-400 border-sky-500/20 shadow-[0_0_10px_rgba(14,165,233,0.1)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
