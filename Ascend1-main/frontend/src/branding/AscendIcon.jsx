import React from 'react';

const AscendIcon = ({ className = '', width = 60, height = 'auto' }) => {
  return (
    <img 
      src="/ascend-icon.svg" 
      alt="Ascend Icon" 
      className={className}
      style={{ width, height }}
    />
  );
};

export default AscendIcon;
