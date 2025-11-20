import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';

const RightPanel = ({ projects, selectedElement, onPropertyChange }) => {
  const [expandedNodes, setExpandedNodes] = React.useState(['proj-1']);

  const toggleNode = (id) => {
    setExpandedNodes(prev => 
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-80 bg-[#252526] border-l border-[#3e3e42] flex flex-col">
      {/* Model Explorer */}
      <div className="border-b border-[#3e3e42] p-3 flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs text-gray-400 uppercase font-semibold">Model Explorer</h3>
        </div>
        <ScrollArea className="h-64">
          <div className="space-y-1">
            {projects.map((project) => (
              <div key={project.id}>
                <button
                  onClick={() => toggleNode(project.id)}
                  className="w-full flex items-center space-x-1 px-2 py-1 rounded text-sm text-gray-300 hover:bg-[#2a2d2e] transition"
                >
                  {expandedNodes.includes(project.id) ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                  <Folder size={14} />
                  <span>{project.name}</span>
                </button>
                {expandedNodes.includes(project.id) && (
                  <div className="ml-4 space-y-1">
                    {project.diagrams.map((diagram) => (
                      <button
                        key={diagram.id}
                        className="w-full flex items-center space-x-1 px-2 py-1 rounded text-sm text-gray-300 hover:bg-[#2a2d2e] transition"
                      >
                        <FileText size={14} />
                        <span>{diagram.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Editors */}
      <div className="p-3 flex-1">
        <h3 className="text-xs text-gray-400 uppercase font-semibold mb-3">Editors</h3>
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#2a2d2e]">
            <TabsTrigger value="properties" className="text-xs">Properties</TabsTrigger>
            <TabsTrigger value="style" className="text-xs">Style</TabsTrigger>
          </TabsList>
          <TabsContent value="properties" className="mt-3">
            <ScrollArea className="h-64">
              {selectedElement ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-400">Name</Label>
                    <Input
                      value={selectedElement.data?.label || ''}
                      onChange={(e) => onPropertyChange('label', e.target.value)}
                      className="mt-1 bg-[#2a2d2e] border-[#3e3e42] text-white"
                    />
                  </div>
                  {selectedElement.data?.stereotype !== undefined && (
                    <div>
                      <Label className="text-xs text-gray-400">Stereotype</Label>
                      <Input
                        value={selectedElement.data.stereotype}
                        onChange={(e) => onPropertyChange('stereotype', e.target.value)}
                        className="mt-1 bg-[#2a2d2e] border-[#3e3e42] text-white"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No element selected</p>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="style" className="mt-3">
            <ScrollArea className="h-64">
              {selectedElement ? (
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-400">Fill Color</Label>
                    <Input
                      type="color"
                      defaultValue="#ffffff"
                      className="mt-1 h-8 bg-[#2a2d2e] border-[#3e3e42]"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-400">Line Color</Label>
                    <Input
                      type="color"
                      defaultValue="#000000"
                      className="mt-1 h-8 bg-[#2a2d2e] border-[#3e3e42]"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No element selected</p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RightPanel;