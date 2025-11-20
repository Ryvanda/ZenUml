import React from 'react';
import { Handle, Position } from '@xyflow/react';

const ParticipantNode = ({ data, selected }) => {
  return (
    <div className="relative flex flex-col items-center">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex flex-col items-center">
        {/* UML Participant - Rectangle */}
        <div
          className={`border-2 px-4 py-3 bg-white shadow-md rounded ${
            selected ? 'border-blue-500' : 'border-gray-800'
          }`}
        >
          <div className="text-sm font-medium text-gray-800 text-center whitespace-nowrap">
            {data.label}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

export default ParticipantNode;
