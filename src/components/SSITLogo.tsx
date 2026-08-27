import React from 'react';
import ssitLogoImage from '../assets/images/regenerated_image_1786948365162.png';

interface SSITLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
  withBadge?: boolean;
  withName?: boolean;
  subtitle?: string;
  glow?: boolean;
}

export const SSITLogo: React.FC<SSITLogoProps> = ({
  className = '',
  size = 'md',
  withBadge = false,
  withName = false,
  subtitle = 'Gandhinagar, Gujarat',
  glow = true,
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
    custom: '',
  };

  const glowEffect = glow ? 'drop-shadow-[0_0_12px_rgba(250,204,21,0.45)]' : '';

  const logoGraphic = (
    <img
      src={ssitLogoImage}
      alt="Shree Swaminarayan Institute of Technology (SSIT) Emblem"
      className={`${size === 'custom' ? '' : sizeMap[size]} ${glowEffect} ${className} shrink-0 object-contain transition-transform duration-300`}
      loading="eager"
    />
  );

  if (withName) {
    return (
      <div className="flex items-center gap-3">
        {logoGraphic}
        <div className="flex flex-col text-left">
          <span className="font-bold text-white text-sm sm:text-base leading-tight tracking-wide group-hover:text-yellow-400 transition-colors">
            Shree Swaminarayan Institute of Technology
          </span>
          {subtitle && (
            <span className="text-[11px] font-mono text-slate-400 leading-normal">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (withBadge) {
    return (
      <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-slate-950/90 border border-yellow-500/40 shadow-[0_0_20px_rgba(250,204,21,0.15)] group">
        {logoGraphic}
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-pixel text-yellow-400 uppercase tracking-wider">
            ORGANIZING INSTITUTE
          </span>
          <span className="text-xs font-bold text-slate-100 leading-tight">
            Shree Swaminarayan Institute of Technology
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Bhat, Gandhinagar • Approved by AICTE
          </span>
        </div>
      </div>
    );
  }

  return logoGraphic;
};

export default SSITLogo;
