import React, { useState } from 'react';
import { Button } from './ui/button';
import { Plus, FolderPlus, Code, FileImage, ChevronDown, FolderOpen, Save } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Toolbar = ({ onNewProject, onNewDiagram, onOpenCodeGenerator, onExportImage, onExportProject, onOpenProject }) => {
  return (
    <div className="h-12 bg-[#2b2b2c] border-b border-[#3e3e42] flex items-center px-4 space-x-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={onNewProject}
        className="text-gray-300 hover:text-white hover:bg-[#37373d]"
      >
        <FolderPlus size={16} className="mr-2" />
        New Project
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onNewDiagram}
        className="text-gray-300 hover:text-white hover:bg-[#37373d]"
      >
        <Plus size={16} className="mr-2" />
        New Diagram
      </Button>
      <div className="h-6 w-px bg-[#3e3e42] mx-2"></div>
      <Button
        size="sm"
        variant="ghost"
        onClick={onOpenCodeGenerator}
        className="text-gray-300 hover:text-white hover:bg-[#37373d]"
      >
        <Code size={16} className="mr-2" />
        Generate Code
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-[#37373d]"
          >
            <FileImage size={16} className="mr-2" />
            Export
            <ChevronDown size={16} className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#2b2b2c] border-[#3e3e42] text-gray-300">
          <DropdownMenuItem 
            onClick={onExportImage} 
            className="cursor-pointer hover:bg-[#37373d] focus:bg-[#37373d] focus:text-white"
          >
            <span>Export as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onExportImage('svg')} 
            className="cursor-pointer hover:bg-[#37373d] focus:bg-[#37373d] focus:text-white"
          >
            <span>Export as SVG</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onExportImage('pdf')} 
            className="cursor-pointer hover:bg-[#37373d] focus:bg-[#37373d] focus:text-white"
          >
            <span>Export as PDF</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="h-6 w-px bg-[#3e3e42] mx-2"></div>
      <Button
        size="sm"
        variant="ghost"
        onClick={onOpenProject}
        className="text-gray-300 hover:text-white hover:bg-[#37373d]"
      >
        <FolderOpen size={16} className="mr-2" />
        Open Project
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onExportProject}
        className="text-gray-300 hover:text-white hover:bg-[#37373d]"
      >
        <Save size={16} className="mr-2" />
        Export Project
      </Button>
    </div>
  );
};

export default Toolbar;