import React from 'react';

// Line-Art Icons in clean Midnight Navy / Neutral tones (No gold accents)
export const ConicalHatIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M12 3L2 19C2 19 6.5 21 12 21C17.5 21 22 19 22 19L12 3Z" />
    <path d="M7 11C8.5 12 10.2 12.5 12 12.5C13.8 12.5 15.5 12 17 11" opacity="0.8" />
    <path d="M4.5 15C6.8 16.5 9.3 17.2 12 17.2C14.7 17.2 17.2 16.5 19.5 15" opacity="0.8" />
    <path d="M9 19.5C9 21.5 12 22.5 12 22.5C12 22.5 15 21.5 15 19.5" strokeDasharray="1 1" />
  </svg>
);

export const LotusIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M12 4C12 4 14.5 8.5 14.5 12.5C14.5 14.5 13.5 16.5 12 17.5C10.5 16.5 9.5 14.5 9.5 12.5C9.5 8.5 12 4 12 4Z" />
    <path d="M10 7.5C8 9.5 6.5 12 6.5 14.5C6.5 16.8 8.2 18.2 10.5 18.2C11 18.2 11.5 18 12 17.5" />
    <path d="M14 7.5C16 9.5 17.5 12 17.5 14.5C17.5 16.8 15.8 18.2 13.5 18.2C13 18.2 12.5 18 12 17.5" />
    <path d="M7 13.5C5 15 3.5 17 3.5 18.5C3.5 20 5.5 20.5 8 20" />
    <path d="M17 13.5C19 15 20.5 17 20.5 18.5C20.5 20 18.5 20.5 16 20" />
    <path d="M9 20C10 20.5 11 20.7 12 20.7C13 20.7 14 20.5 15 20" />
  </svg>
);

export const CoffeeDripIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <circle cx="12" cy="2.5" r="1" />
    <path d="M8 4.5H16L15 5.5H9L8 4.5Z" />
    <path d="M8.5 5.5H15.5V11C15.5 12 14.5 13 13.5 13H10.5C9.5 13 8.5 12 8.5 11V5.5Z" />
    <path d="M6 13H18" />
    <path d="M7.5 13.5L8.5 21H15.5L16.5 13.5" />
    <path d="M9 19.5H15" opacity="0.6" strokeDasharray="1 1" />
  </svg>
);

export const BaguetteIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M4 14C3 13 2.5 11.5 3 10C4 6.5 7.5 3.5 11 2.5C15 1.5 20 4 21.5 7.5C22.5 10 21.5 13 19 16C16 19.5 10 22 6.5 21.5C5 21 3.5 20 3 18.5" />
    <path d="M8 6L11 9" />
    <path d="M12 9L15 12" />
    <path d="M16 12L18.5 15.5" />
  </svg>
);

export const RattanTrayIcon: React.FC<{ className?: string; size?: number }> = ({ className = 'w-5 h-5', size }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <ellipse cx="12" cy="12" rx="9.5" ry="6.5" />
    <ellipse cx="12" cy="12" rx="7.5" ry="5" strokeDasharray="2 2" opacity="0.7" />
    <path d="M5.5 12H18.5" opacity="0.5" />
    <path d="M12 6.5V17.5" opacity="0.5" />
  </svg>
);
