import React from 'react';
import { Handle, Position } from '@xyflow/react';

const UseCaseNode = ({ data, selected }) => {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div
        className={`bg-white border-2 rounded-full shadow-md px-6 py-4 min-w-[120px] text-center ${
          selected ? 'border-blue-500' : 'border-gray-800'
        }`}
      >
        <div className="text-sm font-medium text-gray-800">{data.label}</div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

export default UseCaseNode;