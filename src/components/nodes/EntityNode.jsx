import React from 'react';
import { Handle, Position } from '@xyflow/react';

const EntityNode = ({ data, selected }) => {
  return (
    <div className="relative flex flex-col items-center">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex flex-col items-center">
        {/* UML Entity - Plain circle with underline */}
        <svg width="60" height="70" viewBox="0 0 60 70" className={`${selected ? 'drop-shadow-lg' : ''}`}>
          {/* Circle */}
          <circle cx="30" cy="25" r="20" stroke="#1f2937" strokeWidth="2" fill="white" />
          
          {/* Underline at bottom */}
          <line x1="10" y1="50" x2="50" y2="50" stroke="#1f2937" strokeWidth="2" />
          
          {/* Selection border */}
          {selected && (
            <rect x="2" y="2" width="56" height="66" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
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

export default EntityNode;
