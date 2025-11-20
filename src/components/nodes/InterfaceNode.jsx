import React from 'react';
import { Handle, Position } from '@xyflow/react';

const InterfaceNode = ({ data, selected }) => {
  return (
    <div
      className={`bg-white border-2 rounded shadow-md min-w-[180px] ${
        selected ? 'border-blue-500' : 'border-gray-800'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      {/* Interface Name */}
      <div className="border-b border-gray-800 px-3 py-2 text-center font-semibold text-sm bg-blue-50">
        <div className="text-xs text-gray-600 italic mb-1">
          &lt;&lt;interface&gt;&gt;
        </div>
        <div>{data.label}</div>
      </div>

      {/* Methods */}
      {data.methods && data.methods.length > 0 && (
        <div className="px-3 py-2">
          {data.methods.map((method, index) => (
            <div key={index} className="text-xs font-mono text-gray-700">
              {method}
            </div>
          ))}
        </div>
      )}

      {(!data.methods || data.methods.length === 0) && (
        <div className="px-3 py-2 h-8"></div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

export default InterfaceNode;