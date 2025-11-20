import React from 'react';
import ZenUMLIcon from './ZenUMLIcon';

const ZenUMLLogo = ({ size = 'normal', showText = true, className = '' }) => {
  const iconSize = size === 'small' ? 24 : size === 'large' ? 40 : 32;
  const fontSize = size === 'small' ? 'text-base' : size === 'large' ? 'text-2xl' : 'text-xl';
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <ZenUMLIcon size={iconSize} />
      {showText && (
        <div className={`font-semibold ${fontSize}`}>
          <span className="text-white">Zen</span>
          <span className="text-blue-400">UML</span>
        </div>
      )}
    </div>
  );
};

export default ZenUMLLogo;