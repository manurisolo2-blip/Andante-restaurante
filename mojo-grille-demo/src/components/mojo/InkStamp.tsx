import React from "react";

export interface InkStampProps {
  className?: string;
  size?: number;
}

export function InkStamp({ className = "", size = 130 }: InkStampProps) {
  const center = 65;
  const radius = 45;
  const pathId = "andante-stamp-circle-path";

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full border-2 border-dashed border-brass rotate-[-6deg] opacity-90 select-none pointer-events-none transition-transform duration-300 hover:rotate-0 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      {/* SVG con texto circular perimetral de Andante */}
      <svg
        viewBox="0 0 130 130"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <path
            id={pathId}
            d={`M ${center},${center} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>

        {/* Anillo interior fino concéntrico */}
        <circle
          cx={center}
          cy={center}
          r={radius - 8}
          fill="none"
          stroke="#C9A86A"
          strokeWidth="1"
          strokeDasharray="4 2"
          className="opacity-70"
        />

        {/* Texto perimetral circular */}
        <text className="fill-brass font-sans text-[8px] font-bold uppercase tracking-[0.2em]">
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            ANDANTE BAR · PALERMO HOLLYWOOD
          </textPath>
        </text>
      </svg>

      {/* Núcleo central con tipografía editorial de Andante */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center leading-none">
        <span className="font-display font-black text-brass text-base sm:text-lg uppercase tracking-tight leading-[0.9]">
          100%
          <br />
          SIN TACC
        </span>
        <span className="mt-1 font-sans text-[7.5px] font-bold text-amber tracking-widest uppercase">
          TEMPO 76–108 PPM
        </span>
      </div>
    </div>
  );
}

export default InkStamp;
