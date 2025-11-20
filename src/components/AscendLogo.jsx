import React from 'react';

export function AscendLogo({ variant = 'full', size = 'md', className = '' }) {
  const sizeMap = {
    sm: 32,
    md: 64,
    lg: 128,
    xl: 256
  };

  const width = sizeMap[size] || sizeMap.md;
  const height = width * 0.5;

  if (variant === 'mark') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 400 200"
        className={`ascend-logo-mark ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ascendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6B46C1', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1E1B4B', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M 50 150 Q 100 50, 150 100 Q 180 130, 200 120 Q 220 110, 250 140 Q 300 190, 350 100"
          fill="none"
          stroke="url(#ascendGradient)"
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 800 200"
      className={`ascend-logo-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ascendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#6B46C1', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#1E1B4B', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M 50 150 Q 100 50, 150 100 Q 180 130, 200 120 Q 220 110, 250 140 Q 300 190, 350 100"
        fill="none"
        stroke="url(#ascendGradient)"
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="380" y="140" fontSize="120" fontWeight="bold" fill="#1E1B4B" fontFamily="Arial, sans-serif">
        ASCEND
      </text>
    </svg>
  );
}
