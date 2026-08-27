import React from 'react';

interface SSIPLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  glow?: boolean;
  withBadge?: boolean;
}

export const SSIPLogo: React.FC<SSIPLogoProps> = ({
  className = '',
  size = 'md',
  glow = true,
  withBadge = false,
}) => {
  const sizeMap = {
    xs: 'h-4 w-auto',
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-12 w-auto',
    xl: 'h-16 w-auto',
    custom: '',
  };

  const glowClass = glow ? 'drop-shadow-[0_0_12px_rgba(237,28,36,0.5)]' : '';

  const logoSvg = (
    <svg
      viewBox="0 0 320 130"
      className={`${size === 'custom' ? '' : sizeMap[size]} ${glowClass} ${className} shrink-0 transition-transform duration-300`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SSIP - Student Startup and Innovation Policy Logo"
    >
      <g stroke="#ED1C24" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* First 'S' */}
        <path d="M 78 28 C 74 14, 58 8, 42 8 C 22 8, 8 22, 8 42 C 8 62, 24 70, 44 76 C 66 82, 78 90, 78 106 C 78 122, 60 126, 42 126 C 24 126, 12 118, 8 104" />
        <path d="M 72 34 C 68 22, 54 16, 42 16 C 26 16, 16 26, 16 42 C 16 56, 28 64, 46 70 C 64 76, 72 84, 72 104 C 72 116, 58 118, 42 118 C 28 118, 18 110, 15 100" />
        <path d="M 66 40 C 62 30, 52 24, 42 24 C 30 24, 24 32, 24 42 C 24 50, 32 58, 48 64 C 62 70, 66 78, 66 102 C 66 110, 56 110, 42 110 C 32 110, 24 104, 22 96" />
        <path d="M 60 46 C 56 38, 48 32, 42 32 C 34 32, 32 38, 32 42 C 32 46, 36 52, 50 58 C 60 64, 60 74, 60 100 C 60 104, 52 102, 42 102 C 36 102, 30 98, 29 92" />

        {/* Second 'S' */}
        <path d="M 160 28 C 156 14, 140 8, 124 8 C 104 8, 90 22, 90 42 C 90 62, 106 70, 126 76 C 148 82, 160 90, 160 106 C 160 122, 142 126, 124 126 C 106 126, 94 118, 90 104" />
        <path d="M 154 34 C 150 22, 136 16, 124 16 C 108 16, 98 26, 98 42 C 98 56, 110 64, 128 70 C 146 76, 154 84, 154 104 C 154 116, 140 118, 124 118 C 110 118, 100 110, 97 100" />
        <path d="M 148 40 C 144 30, 134 24, 124 24 C 112 24, 106 32, 106 42 C 106 50, 114 58, 130 64 C 144 70, 148 78, 148 102 C 148 110, 138 110, 124 110 C 114 110, 106 104, 104 96" />
        <path d="M 142 46 C 138 38, 130 32, 124 32 C 116 32, 114 38, 114 42 C 114 46, 118 52, 132 58 C 142 64, 142 74, 142 100 C 142 104, 134 102, 124 102 C 118 102, 112 98, 111 92" />

        {/* 'I' */}
        <line x1="178" y1="8" x2="178" y2="126" />
        <line x1="187" y1="8" x2="187" y2="126" />
        <line x1="196" y1="8" x2="196" y2="126" />
        <line x1="205" y1="8" x2="205" y2="126" />

        {/* 'P' */}
        <path d="M 222 126 L 222 8 L 272 8 C 298 8, 312 24, 312 45 C 312 66, 298 82, 272 82 L 252 82" />
        <path d="M 231 126 L 231 16 L 270 16 C 292 16, 303 28, 303 45 C 303 62, 292 74, 270 74 L 252 74" />
        <path d="M 240 126 L 240 24 L 268 24 C 286 24, 294 32, 294 45 C 294 58, 286 66, 268 66 L 252 66" />
        <path d="M 249 126 L 249 32 L 266 32 C 280 32, 285 36, 285 45 C 285 54, 280 58, 266 58 L 252 58" />
      </g>
    </svg>
  );

  if (withBadge) {
    return (
      <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500/40 shadow-[0_0_15px_rgba(237,28,36,0.15)]">
        {logoSvg}
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-pixel text-red-400 uppercase tracking-wider">
            SUPPORTED BY SSIP
          </span>
          <span className="text-[9px] font-mono text-slate-400 leading-tight">
            Student Startup & Innovation Policy
          </span>
        </div>
      </div>
    );
  }

  return logoSvg;
};

export default SSIPLogo;
