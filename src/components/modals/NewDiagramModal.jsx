import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const NewDiagramModal = ({ open, onClose, onCreateDiagram }) => {
  const [diagramName, setDiagramName] = React.useState('');
  const [diagramType, setDiagramType] = React.useState('class');

  const handleCreate = () => {
    if (diagramName.trim()) {
      onCreateDiagram(diagramName, diagramType);
      setDiagramName('');
      setDiagramType('class');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#252526] border-[#3e3e42] text-white">
        <DialogHeader>
          <DialogTitle>Create New Diagram</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="diagramName" className="text-gray-300">Diagram Name</Label>
            <Input
              id="diagramName"
              value={diagramName}
              onChange={(e) => setDiagramName(e.target.value)}
              placeholder="Enter diagram name"
              className="mt-2 bg-[#2a2d2e] border-[#3e3e42] text-white"
            />
          </div>
          <div>
            <Label htmlFor="diagramType" className="text-gray-300">Diagram Type</Label>
            <Select value={diagramType} onValueChange={setDiagramType}>
              <SelectTrigger className="mt-2 bg-[#2a2d2e] border-[#3e3e42] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#252526] border-[#3e3e42] text-white">
                <SelectItem value="class">Class Diagram</SelectItem>
                <SelectItem value="sequence">Sequence Diagram</SelectItem>
                <SelectItem value="usecase">Use Case Diagram</SelectItem>
                <SelectItem value="activity">Activity Diagram</SelectItem>
                <SelectItem value="state">State Machine Diagram</SelectItem>
                <SelectItem value="component">Component Diagram</SelectItem>
                <SelectItem value="deployment">Deployment Diagram</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="bg-[#2a2d2e] border-[#3e3e42] text-white hover:bg-[#37373d]">
            Cancel
          </Button>
          <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewDiagramModal;