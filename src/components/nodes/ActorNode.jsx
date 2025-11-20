import React from 'react';
import { Handle, Position } from '@xyflow/react';

const ActorNode = ({ data, selected }) => {
  return (
    <div className="relative flex flex-col items-center">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex flex-col items-center">
        {/* UML Actor - Stick Figure */}
        <svg width="50" height="70" viewBox="0 0 50 70" className={`${selected ? 'drop-shadow-lg' : ''}`}>
          {/* Head */}
          <circle cx="25" cy="12" r="8" stroke="#1f2937" strokeWidth="2" fill="white" />
          
          {/* Body */}
          <line x1="25" y1="20" x2="25" y2="38" stroke="#1f2937" strokeWidth="2" />
          
          {/* Left Arm */}
          <line x1="25" y1="26" x2="10" y2="32" stroke="#1f2937" strokeWidth="2" />
          
          {/* Right Arm */}
          <line x1="25" y1="26" x2="40" y2="32" stroke="#1f2937" strokeWidth="2" />
          
          {/* Left Leg */}
          <line x1="25" y1="38" x2="15" y2="60" stroke="#1f2937" strokeWidth="2" />
          
          {/* Right Leg */}
          <line x1="25" y1="38" x2="35" y2="60" stroke="#1f2937" strokeWidth="2" />
          
          {/* Selection border */}
          {selected && (
            <rect x="2" y="2" width="46" height="66" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" />
          )}
        </svg>
        
        <div className="mt-2 text-sm font-medium text-gray-800 text-center max-w-[80px] truncate">
          {data.label}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

export default ActorNode;