import React from 'react';
import ZenUMLIcon from './branding/ZenUMLIcon';

const StatusBar = ({ selectedElement, zoom }) => {
  return (
    <div className="h-6 bg-[#007acc] border-t border-[#3e3e42] flex items-center justify-between px-4 text-xs text-white">
      <div className="flex items-center space-x-4">
        <span>Ready</span>
        {selectedElement && (
          <span>Selected: {selectedElement.data?.label || 'Element'}</span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <span>Zoom: {Math.round(zoom * 100)}%</span>
        <div className="flex items-center space-x-1">
          <ZenUMLIcon size={12} />
          <span className="text-xs">ZenUML</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;