import React from 'react';

const AscendLogo = ({ className = '', width = 240, height = 'auto' }) => {
  return (
    <img 
      src="/ascend-logo.svg" 
      alt="Ascend Logo" 
      className={className}
      style={{ width, height }}
    />
  );
};

export default AscendLogo;
