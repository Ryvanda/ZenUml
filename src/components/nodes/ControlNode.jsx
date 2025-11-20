import React from 'react';
import { Handle, Position } from '@xyflow/react';

const ControlNode = ({ data, selected }) => {
  return (
    <div className="relative flex flex-col items-center">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex flex-col items-center">
        {/* UML Control - Circle with arrow */}
        <svg width="60" height="60" viewBox="0 0 60 60" className={`${selected ? 'drop-shadow-lg' : ''}`}>
          {/* Circle */}
          <circle cx="30" cy="30" r="20" stroke="#1f2937" strokeWidth="2" fill="white" />
          
          {/* Arrow inside circle (pointing right) */}
          <line x1="20" y1="30" x2="35" y2="30" stroke="#1f2937" strokeWidth="1.5" />
          <polygon points="35,30 32,27 32,33" fill="#1f2937" />
          
          {/* Selection border */}
          {selected && (
            <rect x="2" y="2" width="56" height="56" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
          )}
        </svg>
        
        <div className="mt-2 text-sm font-medium text-gray-800 text-center max-w-[100px] truncate">
          {data.label}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

export default ControlNode;
