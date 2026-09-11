import React from 'react';

interface OfficialLogoProps {
  variant?: 'light' | 'dark' | 'badge';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
  showText = true,
}) => {
  // Dimension sizing presets
  const sizeMap = {
    sm: { width: 140, height: 110, textScale: 'text-xs' },
    md: { width: 200, height: 160, textScale: 'text-sm' },
    lg: { width: 280, height: 220, textScale: 'text-base' },
    xl: { width: 360, height: 280, textScale: 'text-lg' },
  };

  const { width, height } = sizeMap[size];

  const textColor = variant === 'light' ? '#FFFFFF' : '#121F3E';
  const lineColor = variant === 'light' ? '#FFFFFF' : '#121F3E';
  const breadColor = '#ED8C16';
  const breadColorDark = '#D4750B';

  if (variant === 'badge') {
    return (
      <div className={`relative rounded-2xl bg-[#0B0B26] p-6 shadow-2xl border border-white/10 flex flex-col items-center justify-center select-none overflow-hidden ${className}`}>
        {/* Subtle grid pattern background matching the original logo */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }} />
        
        <svg
          viewBox="0 0 280 220"
          className="w-full h-auto max-w-[280px] relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arched Top Text: Lò Bánh Mì */}
          <path id="badge-text-arc" d="M 30 90 Q 140 18 250 90" fill="none" />
          <text fill="#FFFFFF" fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="34" letterSpacing="0.04em">
            <textPath href="#badge-text-arc" startOffset="50%" textAnchor="middle">
              Lò Bánh Mì
            </textPath>
          </text>

          {/* Bread Illustration */}
          <g filter="drop-shadow(0 6px 12px rgba(0,0,0,0.3))">
            {/* Top / Background Loaf */}
            <path
              d="M 68 114 C 62 90, 105 78, 150 82 C 190 85, 208 98, 202 116 C 180 128, 120 126, 68 114 Z"
              fill={breadColor}
              stroke="#0B0B26"
              strokeWidth="3.5"
            />
            {/* Top Loaf Cuts */}
            <path d="M 98 94 C 94 104, 98 114, 106 120" stroke="#0B0B26" strokeWidth="3" strokeLinecap="round" />
            <path d="M 130 92 C 128 102, 134 112, 142 118" stroke="#0B0B26" strokeWidth="3" strokeLinecap="round" />
            <path d="M 162 96 C 162 104, 168 112, 176 116" stroke="#0B0B26" strokeWidth="3" strokeLinecap="round" />

            {/* Foreground / Main Loaf */}
            <path
              d="M 88 140 C 76 112, 128 96, 185 98 C 235 100, 252 118, 244 140 C 220 158, 145 160, 88 140 Z"
              fill={breadColor}
              stroke="#0B0B26"
              strokeWidth="4"
            />
            {/* Foreground Loaf Highlights & Shadow */}
            <path
              d="M 94 138 C 104 118, 145 106, 188 108"
              stroke="#FFAE42"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Foreground Loaf Cuts */}
            <path d="M 125 112 C 118 124, 126 138, 138 148" stroke="#0B0B26" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 164 110 C 158 124, 168 138, 180 148" stroke="#0B0B26" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 205 116 C 200 126, 208 136, 218 144" stroke="#0B0B26" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* Clean White Horizontal Bar */}
          <line x1="45" y1="168" x2="235" y2="168" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />

          {/* Subtitle: French Bakery */}
          <text
            x="140"
            y="200"
            fill="#FFFFFF"
            fontFamily="'Be Vietnam Pro', 'Montserrat', sans-serif"
            fontWeight="500"
            fontSize="22"
            letterSpacing="0.08em"
            textAnchor="middle"
          >
            French Bakery
          </text>
        </svg>
      </div>
    );
  }

  // Standard Vector Component (Transparent background, responsive)
  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 280 220"
        style={{ width: `${width}px`, height: 'auto' }}
        className="max-w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arched Top Text: Lò Bánh Mì */}
        <path id={`text-arc-${variant}-${size}`} d="M 30 90 Q 140 18 250 90" fill="none" />
        <text
          fill={textColor}
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="700"
          fontSize="34"
          letterSpacing="0.04em"
        >
          <textPath href={`#text-arc-${variant}-${size}`} startOffset="50%" textAnchor="middle">
            Lò Bánh Mì
          </textPath>
        </text>

        {/* Bread Illustration */}
        <g>
          {/* Top / Background Loaf */}
          <path
            d="M 68 114 C 62 90, 105 78, 150 82 C 190 85, 208 98, 202 116 C 180 128, 120 126, 68 114 Z"
            fill={breadColor}
            stroke={variant === 'light' ? '#0B0B26' : '#121F3E'}
            strokeWidth="3.5"
          />
          {/* Top Loaf Cuts */}
          <path d="M 98 94 C 94 104, 98 114, 106 120" stroke={variant === 'light' ? '#0B0B26' : '#121F3E'} strokeWidth="3" strokeLinecap="round" />
          <path d="M 130 92 C 128 102, 134 112, 142 118" stroke={variant === 'light' ? '#0B0B26' : '#121F3E'} strokeWidth="3" strokeLinecap="round" />
          <path d="M 162 96 C 162 104, 168 112, 176 116" stroke={variant === 'light' ? '#0B0B26' : '#121F3E'} strokeWidth="3" strokeLinecap="round" />

          {/* Foreground / Main Loaf */}
          <path
            d="M 88 140 C 76 112, 128 96, 185 98 C 235 100, 252 118, 244 140 C 220 158, 145 160, 88 140 Z"
            fill={breadColor}
            stroke={variant === 'light' ? '#0B0B26' : '#121F3E'}
            strokeWidth="4"
          />
          {/* Foreground Loaf Highlight */}
          <path
            d="M 94 138 C 104 118, 145 106, 188 108"
            stroke="#FFAE42"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Foreground Loaf Cuts */}
          <path d="M 125 112 C 118 124, 126 138, 138 148" stroke={variant === 'light' ? '#0B0B26' : '#121F3E'} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 164 110 C 158 124, 168 138, 180 148" stroke={variant === 'light' ? '#0B0B26' : '#121F3E'} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 205 116 C 200 126, 208 136, 218 144" stroke={variant === 'light' ? '#0B0B26' : '#121F3E'} strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Horizontal Bar */}
        <line x1="45" y1="168" x2="235" y2="168" stroke={lineColor} strokeWidth="3.5" strokeLinecap="round" />

        {/* Subtitle: French Bakery */}
        {showText && (
          <text
            x="140"
            y="200"
            fill={textColor}
            fontFamily="'Be Vietnam Pro', 'Montserrat', sans-serif"
            fontWeight="500"
            fontSize="22"
            letterSpacing="0.08em"
            textAnchor="middle"
          >
            French Bakery
          </text>
        )}
      </svg>
    </div>
  );
};
