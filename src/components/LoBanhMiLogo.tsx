import React from 'react';

interface LoBanhMiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge' | 'badge-rounded' | 'inline' | 'transparent';
  showTextLockup?: boolean;
  textLockupClassName?: string;
}

export const LoBanhMiLogo: React.FC<LoBanhMiLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'badge-rounded',
  showTextLockup = false,
  textLockupClassName = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-32 h-32 sm:w-40 sm:h-40',
  };

  const isTransparent = variant === 'transparent';
  const isRounded = variant === 'badge-rounded';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className={`relative overflow-hidden shrink-0 flex items-center justify-center transition-transform ${
          sizeClasses[size]
        } ${
          isTransparent
            ? ''
            : isRounded
            ? 'rounded-2xl shadow-md border border-white/15'
            : 'rounded-lg shadow-sm'
        }`}
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full block select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="logo-dot-grid"
              x="0"
              y="0"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="18" cy="18" r="1.5" fill="#ffffff" opacity="0.15" />
            </pattern>
            <path id="logo-arch-path" d="M 65,225 A 200,165 0 0,1 435,225" fill="none" />
          </defs>

          {/* Navy Background */}
          {!isTransparent && (
            <>
              <rect width="500" height="500" fill="#0b192e" />
              <rect width="500" height="500" fill="url(#logo-dot-grid)" />
            </>
          )}

          {/* Arched Title: Lò Bánh Mì */}
          <text
            fill="#ffffff"
            fontFamily="'Gotu', 'Georgia', 'Playfair Display', serif"
            fontSize="46"
            fontWeight="700"
            letterSpacing="3"
          >
            <textPath href="#logo-arch-path" startOffset="50%" textAnchor="middle">
              Lò Bánh Mì
            </textPath>
          </text>

          {/* Baguettes Graphic */}
          <g id="logo-baguettes">
            {/* Upper / Back Baguette (angled) */}
            <g transform="translate(230, 240) rotate(-14) translate(-110, -32)">
              <path
                d="M 25,32 C 25,12 60,4 110,4 C 160,4 195,12 195,32 C 195,52 160,60 110,60 C 60,60 25,52 25,32 Z"
                fill="#e57d18"
                stroke="#0b102b"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              <path
                d="M 65,12 Q 72,32 78,50"
                stroke="#0b102b"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 105,10 Q 112,32 118,52"
                stroke="#0b102b"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 145,14 Q 152,32 158,48"
                stroke="#0b102b"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Front / Lower Baguette (horizontal) */}
            <g transform="translate(270, 272) rotate(2) translate(-125, -34)">
              <path
                d="M 25,34 C 25,12 65,3 125,3 C 185,3 225,12 225,34 C 225,56 185,65 125,65 C 65,65 25,56 25,34 Z"
                fill="#e57d18"
                stroke="#0b102b"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <path
                d="M 68,12 Q 76,34 82,54"
                stroke="#0b102b"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 112,10 Q 120,34 126,56"
                stroke="#0b102b"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 156,12 Q 164,34 170,54"
                stroke="#0b102b"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 195,18 Q 200,34 204,48"
                stroke="#0b102b"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>

          {/* Separator Line */}
          <line
            x1="90"
            y1="326"
            x2="410"
            y2="326"
            stroke="#ffffff"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Subtitle: French Bakery */}
          <text
            x="250"
            y="382"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontSize="34"
            fontWeight="400"
            letterSpacing="4"
          >
            French Bakery
          </text>
        </svg>
      </div>

      {showTextLockup && (
        <div className={`flex flex-col text-left ${textLockupClassName}`}>
          <span className="font-gotu font-bold text-lg sm:text-xl tracking-tight leading-none text-current">
            Lò Bánh Mì
          </span>
          <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-[#e57d18] leading-tight mt-0.5">
            French Bakery
          </span>
        </div>
      )}
    </div>
  );
};
