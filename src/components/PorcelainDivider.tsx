import React from 'react';

interface PorcelainDividerProps {
  dark?: boolean;
  withSeal?: boolean;
  label?: string;
  className?: string;
}

export const PorcelainDivider: React.FC<PorcelainDividerProps> = ({
  dark = false,
  withSeal = true,
  label = 'TRADITIONAL CERAMIC MOTIF • ARTISANAL BAKERY',
  className = '',
}) => {
  return (
    <div className={`relative w-full py-5 overflow-hidden select-none ${className}`}>
      <div className="w-full flex items-center justify-center">
        <div className={`h-[1px] flex-1 ${dark ? 'bg-gradient-to-r from-transparent via-white/10 to-white/20' : 'bg-gradient-to-r from-transparent via-[#121F3E]/15 to-[#121F3E]/30'}`} />
        
        {/* Porcelain Ribbon */}
        <div className={`px-4 py-1.5 rounded-full flex items-center gap-3 border shadow-xs ${
          dark 
            ? 'bg-[#182952] border-white/15 text-white' 
            : 'bg-white border-[#121F3E]/15 text-[#121F3E]'
        }`}>
          <svg className="w-28 sm:w-40 h-3.5 text-current" viewBox="0 0 160 16" fill="none">
            <path
              d="M0 8 Q20 2 40 8 Q60 14 80 8 Q100 2 120 8 Q140 14 160 8"
              stroke={dark ? '#FFFFFF' : '#121F3E'}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            {[10, 30, 50, 70, 90, 110, 130, 150].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy="8" r="2" fill={dark ? '#FFFFFF' : '#121F3E'} fillOpacity="0.7" />
                <circle cx={cx} cy="4" r="0.8" fill={dark ? '#F9FBFB' : '#121F3E'} fillOpacity="0.4" />
                <circle cx={cx} cy="12" r="0.8" fill={dark ? '#F9FBFB' : '#121F3E'} fillOpacity="0.4" />
              </g>
            ))}
          </svg>

          {withSeal && (
            <span className={`text-[10px] uppercase font-serif tracking-[0.2em] font-semibold ${dark ? 'text-white/90' : 'text-[#121F3E]'}`}>
              {label}
            </span>
          )}

          <svg className="w-28 sm:w-40 h-3.5 text-current" viewBox="0 0 160 16" fill="none">
            <path
              d="M0 8 Q20 2 40 8 Q60 14 80 8 Q100 2 120 8 Q140 14 160 8"
              stroke={dark ? '#FFFFFF' : '#121F3E'}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            {[10, 30, 50, 70, 90, 110, 130, 150].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy="8" r="2" fill={dark ? '#FFFFFF' : '#121F3E'} fillOpacity="0.7" />
                <circle cx={cx} cy="4" r="0.8" fill={dark ? '#F9FBFB' : '#121F3E'} fillOpacity="0.4" />
                <circle cx={cx} cy="12" r="0.8" fill={dark ? '#F9FBFB' : '#121F3E'} fillOpacity="0.4" />
              </g>
            ))}
          </svg>
        </div>

        <div className={`h-[1px] flex-1 ${dark ? 'bg-gradient-to-l from-transparent via-white/10 to-white/20' : 'bg-gradient-to-l from-transparent via-[#121F3E]/15 to-[#121F3E]/30'}`} />
      </div>
    </div>
  );
};
