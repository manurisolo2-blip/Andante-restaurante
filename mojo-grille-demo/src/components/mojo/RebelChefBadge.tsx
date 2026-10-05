import React from 'react';

export interface RebelChefBadgeProps {
  className?: string;
  badgeText?: string;
  tag?: string;
}

export function RebelChefBadge({
  className = '',
  badgeText = 'FIRMA ANDANTE',
  tag = 'SIN TACC',
}: RebelChefBadgeProps) {
  return (
    <div
      className={`inline-flex items-center select-none pointer-events-none transition-transform duration-200 group-hover:scale-105 group-hover:rotate-0 ${className}`}
      aria-label={`${badgeText} - ${tag}`}
    >
      <div
        className="relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-brass text-canvas rotate-[-2deg] shadow-md"
        style={{
          clipPath:
            'polygon(0% 8%, 4% 0%, 96% 0%, 100% 8%, 97% 25%, 100% 50%, 96% 75%, 100% 100%, 96% 92%, 4% 100%, 0% 92%, 3% 75%, 0% 50%, 4% 25%)',
        }}
      >
        <span className="font-sans text-[10px] sm:text-[11px] font-black tracking-wider text-canvas uppercase flex items-center gap-1">
          <span>{badgeText}</span>
        </span>
        <span className="h-3 w-px bg-canvas/30" />
        <span className="font-sans text-[9px] sm:text-[9.5px] font-black uppercase tracking-wider text-canvas">
          {tag}
        </span>
      </div>
    </div>
  );
}

export default RebelChefBadge;
