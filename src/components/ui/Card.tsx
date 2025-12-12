import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'bg-slate-900/70 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
