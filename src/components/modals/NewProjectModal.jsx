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

const NewProjectModal = ({ open, onClose, onCreateProject }) => {
  const [projectName, setProjectName] = React.useState('');

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreateProject(projectName);
      setProjectName('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#252526] border-[#3e3e42] text-white">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="projectName" className="text-gray-300">Project Name</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Enter project name"
            className="mt-2 bg-[#2a2d2e] border-[#3e3e42] text-white"
          />
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

export default NewProjectModal;