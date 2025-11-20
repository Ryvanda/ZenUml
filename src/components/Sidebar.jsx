import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Box, Circle, ArrowRight, Diamond, Triangle, User, RectangleVertical, Square, GitMerge, GitBranch, Database, ArrowLeft } from 'lucide-react';

const iconMap = {
  Box, Circle, ArrowRight, Diamond, Triangle, User, RectangleVertical, Square, GitMerge, GitBranch, Database, ArrowLeft
};

const Sidebar = ({ openDiagrams, toolboxItems, onDiagramSelect, selectedDiagram, onToolSelect }) => {
  return (
    <div className="w-64 bg-[#252526] border-r border-[#3e3e42] flex flex-col">
      {/* Working Diagrams */}
      <div className="border-b border-[#3e3e42] p-3">
        <h3 className="text-xs text-gray-400 uppercase font-semibold mb-2">Working Diagrams</h3>
        <ScrollArea className="h-32">
          {openDiagrams.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No diagrams open</p>
          ) : (
            <div className="space-y-1">
              {openDiagrams.map((diagram) => (
                <button
                  key={diagram.id}
                  onClick={() => onDiagramSelect(diagram)}
                  className={`w-full text-left px-2 py-1.5 rounded text-sm transition ${
                    selectedDiagram?.id === diagram.id
                      ? 'bg-[#37373d] text-white'
                      : 'text-gray-300 hover:bg-[#2a2d2e]'
                  }`}
                >
                  {diagram.name}
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Toolbox */}
      <div className="flex-1 p-3 overflow-auto">
        <h3 className="text-xs text-gray-400 uppercase font-semibold mb-3">Toolbox</h3>
        {selectedDiagram && toolboxItems[selectedDiagram.type] ? (
          <div className="space-y-1">
            {toolboxItems[selectedDiagram.type].map((tool) => {
              const IconComponent = iconMap[tool.icon];
              return (
                <button
                  key={tool.id}
                  onClick={() => onToolSelect(tool)}
                  className="w-full flex items-center space-x-2 px-2 py-2 rounded text-sm text-gray-300 hover:bg-[#2a2d2e] transition"
                >
                  {IconComponent && <IconComponent size={16} />}
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-500 italic">Select a diagram to see tools</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;