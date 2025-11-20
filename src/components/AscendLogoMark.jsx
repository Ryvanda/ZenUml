import React from 'react';

export function AscendLogoMark({ size = 'md', className = '', isDark = false }) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 64,
    lg: 128,
    xl: 256
  };

  const width = sizeMap[size] || sizeMap.md;
  const height = width;

  const primaryColor = isDark ? '#1E1B4B' : '#6B46C1';
  const secondaryColor = isDark ? '#6B46C1' : '#8B5CF6';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      className={`ascend-logo-mark ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ascendMarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: secondaryColor, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: primaryColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M 30 150 Q 60 50, 100 80 Q 120 100, 140 90 Q 160 80, 180 120 Q 200 160, 170 180"
        fill="none"
        stroke="url(#ascendMarkGradient)"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
