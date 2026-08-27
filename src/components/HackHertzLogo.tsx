import React from 'react';

interface HackHertzLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
  variant?: 'badge' | 'mark' | 'horizontal' | 'compact';
  glow?: boolean;
  accentColor?: string;
}

export const HackHertzLogo: React.FC<HackHertzLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'badge',
  glow = true,
}) => {
  // Size mapping
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-32 h-32',
    custom: '',
  };

  // Horizontal variant dimensions
  const horizontalSizeClasses = {
    xs: 'h-6',
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
    '2xl': 'h-28',
    custom: '',
  };

  const glowStyle = glow
    ? 'drop-shadow-[0_0_15px_rgba(250,204,21,0.35)]'
    : '';

  if (variant === 'mark') {
    // Just the HH split rectangle emblem
    return (
      <svg
        viewBox="0 0 200 165"
        className={`${size === 'custom' ? '' : sizeClasses[size]} ${glowStyle} ${className} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="markTopRight">
            <polygon points="5,160 5,5 195,5 195,10 5,160" />
          </clipPath>
          <clipPath id="markBottomLeft">
            <polygon points="5,160 195,10 195,160 5,160" />
          </clipPath>
        </defs>

        {/* Outer border */}
        <rect x="6" y="6" width="188" height="153" fill="none" stroke="#FFFFFF" strokeWidth="12" />

        {/* Upper-Right Half (White Background + Black HH) */}
        <g clipPath="url(#markTopRight)">
          <rect x="6" y="6" width="188" height="153" fill="#FFFFFF" />
          {/* Black H1 */}
          <rect x="29" y="21" width="22" height="123" fill="#000000" />
          <rect x="71" y="21" width="22" height="123" fill="#000000" />
          <rect x="51" y="70" width="20" height="25" fill="#000000" />
          {/* Black H2 */}
          <rect x="109" y="21" width="22" height="123" fill="#000000" />
          <rect x="151" y="21" width="22" height="123" fill="#000000" />
          <rect x="131" y="70" width="20" height="25" fill="#000000" />
        </g>

        {/* Lower-Left Half (Black Background + White HH) */}
        <g clipPath="url(#markBottomLeft)">
          <rect x="6" y="6" width="188" height="153" fill="#000000" />
          {/* White H1 */}
          <rect x="29" y="21" width="22" height="123" fill="#FFFFFF" />
          <rect x="71" y="21" width="22" height="123" fill="#FFFFFF" />
          <rect x="51" y="70" width="20" height="25" fill="#FFFFFF" />
          {/* White H2 */}
          <rect x="109" y="21" width="22" height="123" fill="#FFFFFF" />
          <rect x="151" y="21" width="22" height="123" fill="#FFFFFF" />
          <rect x="131" y="70" width="20" height="25" fill="#FFFFFF" />
        </g>

        {/* Diagonal dividing line */}
        <line x1="6" y1="159" x2="194" y2="6" stroke="#FFFFFF" strokeWidth="4" />
      </svg>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {/* The Mark */}
        <div className={`${size === 'custom' ? '' : horizontalSizeClasses[size]} aspect-square shrink-0 rounded-full bg-black flex items-center justify-center p-1.5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.15)]`}>
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <use href="#global-hh-defs" />
            <circle cx="250" cy="250" r="240" fill="#000000" />
            <rect x="45" y="170" width="190" height="155" fill="none" stroke="#FFFFFF" strokeWidth="12" />
            <g clipPath="url(#topRightTriangle)">
              <rect x="45" y="170" width="190" height="155" fill="#FFFFFF" />
              <rect x="68" y="185" width="22" height="125" fill="#000000" />
              <rect x="110" y="185" width="22" height="125" fill="#000000" />
              <rect x="90" y="235" width="20" height="25" fill="#000000" />
              <rect x="148" y="185" width="22" height="125" fill="#000000" />
              <rect x="190" y="185" width="22" height="125" fill="#000000" />
              <rect x="170" y="235" width="20" height="25" fill="#000000" />
            </g>
            <g clipPath="url(#bottomLeftTriangle)">
              <rect x="45" y="170" width="190" height="155" fill="#000000" />
              <rect x="68" y="185" width="22" height="125" fill="#FFFFFF" />
              <rect x="110" y="185" width="22" height="125" fill="#FFFFFF" />
              <rect x="90" y="235" width="20" height="25" fill="#FFFFFF" />
              <rect x="148" y="185" width="22" height="125" fill="#FFFFFF" />
              <rect x="190" y="185" width="22" height="125" fill="#FFFFFF" />
              <rect x="170" y="235" width="20" height="25" fill="#FFFFFF" />
            </g>
            <line x1="45" y1="325" x2="235" y2="175" stroke="#FFFFFF" strokeWidth="4" />
            <text x="252" y="236" fill="#FFFFFF" className="font-extrabold" fontSize="64" letterSpacing="-1.5" fontFamily="Plus Jakarta Sans, sans-serif">Hack</text>
            <text x="252" y="294" fill="#FFFFFF" className="font-extrabold" fontSize="64" letterSpacing="-1.5" fontFamily="Plus Jakarta Sans, sans-serif">Hertz.</text>
            <text x="254" y="326" fill="#FFFFFF" className="font-black" fontSize="25" letterSpacing="4" fontFamily="Orbitron, sans-serif">2.0</text>
          </svg>
        </div>

        {/* Text next to it */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-pixel text-yellow-400 text-sm sm:text-base tracking-wider neon-text-yellow">
              HACKHERTZ
            </span>
            <span className="font-pixel text-xs px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-400 border border-cyan-400/40">
              2.0
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
            Retro Arcade Edition
          </span>
        </div>
      </div>
    );
  }

  // Default: Full Circular Emblem Logo matching the uploaded image exactly
  return (
    <div
      className={`relative inline-block shrink-0 transition-transform duration-300 ${
        size === 'custom' ? '' : sizeClasses[size]
      } ${className}`}
    >
      <svg
        viewBox="0 0 500 500"
        className={`w-full h-full rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-white/10 ${glowStyle}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="circleTopRight">
            <polygon points="45,325 45,170 235,170 235,175 45,325" />
          </clipPath>
          <clipPath id="circleBottomLeft">
            <polygon points="45,325 235,175 235,330 45,330 45,325" />
          </clipPath>
        </defs>

        {/* Black Disc Background */}
        <circle cx="250" cy="250" r="246" fill="#000000" stroke="#1c1c1c" strokeWidth="2" />

        {/* White Outer Box for HH */}
        <rect
          x="45"
          y="170"
          width="190"
          height="155"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="12"
          strokeLinejoin="miter"
        />

        {/* Upper-Right Half (White Background + Black HH) */}
        <g clipPath="url(#circleTopRight)">
          <rect x="45" y="170" width="190" height="155" fill="#FFFFFF" />
          {/* Black H #1 */}
          <rect x="68" y="185" width="22" height="125" fill="#000000" />
          <rect x="110" y="185" width="22" height="125" fill="#000000" />
          <rect x="90" y="235" width="20" height="25" fill="#000000" />
          {/* Black H #2 */}
          <rect x="148" y="185" width="22" height="125" fill="#000000" />
          <rect x="190" y="185" width="22" height="125" fill="#000000" />
          <rect x="170" y="235" width="20" height="25" fill="#000000" />
        </g>

        {/* Lower-Left Half (Black Background + White HH) */}
        <g clipPath="url(#circleBottomLeft)">
          <rect x="45" y="170" width="190" height="155" fill="#000000" />
          {/* White H #1 */}
          <rect x="68" y="185" width="22" height="125" fill="#FFFFFF" />
          <rect x="110" y="185" width="22" height="125" fill="#FFFFFF" />
          <rect x="90" y="235" width="20" height="25" fill="#FFFFFF" />
          {/* White H #2 */}
          <rect x="148" y="185" width="22" height="125" fill="#FFFFFF" />
          <rect x="190" y="185" width="22" height="125" fill="#FFFFFF" />
          <rect x="170" y="235" width="20" height="25" fill="#FFFFFF" />
        </g>

        {/* Clean diagonal cut line */}
        <line x1="45" y1="325" x2="235" y2="175" stroke="#FFFFFF" strokeWidth="4" />

        {/* Right side typography */}
        {/* "Hack" */}
        <text
          x="252"
          y="236"
          fill="#FFFFFF"
          fontWeight="800"
          fontSize="64"
          letterSpacing="-1.5"
          fontFamily="Plus Jakarta Sans, -apple-system, system-ui, sans-serif"
        >
          Hack
        </text>

        {/* "Hertz." */}
        <text
          x="252"
          y="294"
          fill="#FFFFFF"
          fontWeight="800"
          fontSize="64"
          letterSpacing="-1.5"
          fontFamily="Plus Jakarta Sans, -apple-system, system-ui, sans-serif"
        >
          Hertz.
        </text>

        {/* "2.0" */}
        <text
          x="254"
          y="326"
          fill="#FFFFFF"
          fontWeight="900"
          fontSize="25"
          letterSpacing="4"
          fontFamily="Orbitron, Plus Jakarta Sans, sans-serif"
        >
          2.0
        </text>
      </svg>
    </div>
  );
};
