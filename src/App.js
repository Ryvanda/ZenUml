import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import RightPanel from './components/RightPanel';
import StatusBar from './components/StatusBar';
import LogoShowcase from './components/LogoShowcase';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NewProjectModal from './components/modals/NewProjectModal';
import NewDiagramModal from './components/modals/NewDiagramModal';
import CodeGeneratorModal from './components/modals/CodeGeneratorModal';
import { Toaster } from './components/ui/toaster';
import { toast } from './hooks/use-toast';
import { mockProjects, toolboxItems, mockClassDiagramData } from './mock/mockData';
import { toPng, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { FolderOpen, Home } from 'lucide-react';
import debounce from 'lodash/debounce';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainApp() {
  const [projects, setProjects] = useState(mockProjects);
  const [currentProject, setCurrentProject] = useState(mockProjects[0]);
  const [openDiagrams, setOpenDiagrams] = useState([mockProjects[0].diagrams[0]]);
  const [selectedDiagram, setSelectedDiagram] = useState(mockProjects[0].diagrams[0]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [diagramData, setDiagramData] = useState({
    'diag-1': mockClassDiagramData,
  });
  const [zoom, setZoom] = useState(1);
  
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNewDiagramModal, setShowNewDiagramModal] = useState(false);
  const [showCodeGeneratorModal, setShowCodeGeneratorModal] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleCreateProject = (projectName) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: projectName,
      diagrams: []
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
    toast({
      title: "Project created",
      description: `Project "${projectName}" has been created successfully.`,
    });
  };

  const handleCreateDiagram = (diagramName, diagramType) => {
    const newDiagram = {
      id: `diag-${Date.now()}`,
      name: diagramName,
      type: diagramType
    };
    
    const updatedProjects = projects.map(project => {
      if (project.id === currentProject.id) {
        return {
          ...project,
          diagrams: [...project.diagrams, newDiagram]
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setCurrentProject(updatedProjects.find(p => p.id === currentProject.id));
    setOpenDiagrams([...openDiagrams, newDiagram]);
    setSelectedDiagram(newDiagram);
    
    // Initialize empty diagram data
    setDiagramData({
      ...diagramData,
      [newDiagram.id]: { nodes: [], edges: [] }
    });
    
    toast({
      title: "Diagram created",
      description: `Diagram "${diagramName}" has been created successfully.`,
    });
  };

  const handleDiagramSelect = (diagram) => {
    if (!openDiagrams.find(d => d.id === diagram.id)) {
      setOpenDiagrams([...openDiagrams, diagram]);
    }
    setSelectedDiagram(diagram);
    setSelectedElement(null);
  };

  const handleToolSelect = (tool) => {
    if (tool.nodeType) {
      // Add new node to canvas
      const currentData = diagramData[selectedDiagram.id] || { nodes: [], edges: [] };
      const newNode = {
        id: `node-${Date.now()}`,
        type: tool.nodeType,
        position: { 
          x: Math.random() * 300 + 100, 
          y: Math.random() * 300 + 100 
        },
        data: { 
          label: 'New Element',
          attributes: [],
          methods: []
        }
      };
      
      setDiagramData({
        ...diagramData,
        [selectedDiagram.id]: {
          ...currentData,
          nodes: [...currentData.nodes, newNode]
        }
      });
      
      toast({
        title: "Element added",
        description: "New element has been added to the canvas.",
      });
    }
  };

  const handlePropertyChange = (property, value) => {
    if (!selectedElement || !selectedDiagram) return;
    
    const currentData = diagramData[selectedDiagram.id];
    const updatedNodes = currentData.nodes.map(node => {
      if (node.id === selectedElement.id) {
        return {
          ...node,
          data: {
            ...node.data,
            [property]: value
          }
        };
      }
      return node;
    });
    
    setDiagramData({
      ...diagramData,
      [selectedDiagram.id]: {
        ...currentData,
        nodes: updatedNodes
      }
    });
  };

  const handleExportProject = () => {
    if (!currentProject) return;
    
    const projectData = {
      ...currentProject,
      // Include all diagrams with their data
      diagrams: currentProject.diagrams.map(diagram => ({
        ...diagram,
        data: diagramData[diagram.id] || { nodes: [], edges: [] }
      }))
    };
    
    const dataStr = JSON.stringify(projectData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${currentProject.name.replace(/\s+/g, '_').toLowerCase()}.zenuml`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Project exported",
      description: `Project "${currentProject.name}" has been exported successfully.`,
    });
  };
  
  const handleOpenProject = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const projectData = JSON.parse(e.target.result);
        
        // Extract diagram data from the project
        const newDiagramData = {};
        projectData.diagrams.forEach(diagram => {
          if (diagram.data) {
            newDiagramData[diagram.id] = diagram.data;
          }
        });
        
        // Update state with the imported project
        setProjects(prevProjects => [...prevProjects, projectData]);
        setCurrentProject(projectData);
        setDiagramData(prev => ({ ...prev, ...newDiagramData }));
        
        // Open the first diagram if available
        if (projectData.diagrams.length > 0) {
          setSelectedDiagram(projectData.diagrams[0]);
          if (!openDiagrams.some(d => d.id === projectData.diagrams[0].id)) {
            setOpenDiagrams([...openDiagrams, projectData.diagrams[0]]);
          }
        }
        
        toast({
          title: "Project imported",
          description: `Project "${projectData.name}" has been imported successfully.`,
        });
      } catch (error) {
        console.error('Error importing project:', error);
        toast({
          title: "Import failed",
          description: "The selected file is not a valid ZenUML project.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    event.target.value = null;
  };

  // Memoize the diagram data to prevent unnecessary re-renders
  const currentDiagramData = useMemo(() => {
    return selectedDiagram ? diagramData[selectedDiagram.id] : null;
  }, [selectedDiagram, diagramData]);

  // Cleanup function for component unmount
  useEffect(() => {
    return () => {
      // Cleanup any resources if needed
    };
  }, []);

  // Using the imported lodash debounce function

  // Memoize the export function
  const handleExportImage = useCallback(async (format = 'png') => {
    const canvasElement = document.querySelector('.react-flow');
    if (!canvasElement) {
      toast({
        title: "Export failed",
        description: "No diagram to export.",
        variant: "destructive"
      });
      return;
    }

    try {
      let dataUrl;
      let fileName = `${selectedDiagram?.name || 'diagram'}.${format}`;
      
      // Handle different export formats
      switch (format) {
        case 'svg':
          dataUrl = await toSvg(canvasElement, {
            quality: 1,
            backgroundColor: '#ffffff'
          });
          break;
          
        case 'pdf':
          // First, export as PNG to get the image data
          const pngDataUrl = await toPng(canvasElement, {
            quality: 1,
            backgroundColor: '#ffffff'
          });
          
          // Create a new PDF document
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm'
          });
          
          // Get the image dimensions
          const img = new Image();
          await new Promise((resolve) => {
            img.onload = resolve;
            img.src = pngDataUrl;
          });
          
          // Calculate dimensions to maintain aspect ratio
          const imgWidth = 280; // A4 width in mm (landscape)
          const imgHeight = (img.height * imgWidth) / img.width;
          
          // Add the image to the PDF
          pdf.addImage(pngDataUrl, 'PNG', 10, 10, imgWidth, imgHeight);
          
          // Save the PDF
          pdf.save(fileName);
          
          toast({
            title: "Export successful",
            description: `Diagram has been exported as ${format.toUpperCase()}.`,
          });
          return; // Early return for PDF as it's handled differently
          
        case 'png':
        default:
          dataUrl = await toPng(canvasElement, {
            quality: 0.95,
            backgroundColor: '#ffffff'
          });
      }
      
      // For SVG and PNG, create a download link
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        document.body.appendChild(link); // Required for Firefox
        link.click();
        
        // Clean up the link element
        setTimeout(() => {
          document.body.removeChild(link);
          // Revoke the object URL to free up memory
          if (dataUrl.startsWith('blob:')) {
            URL.revokeObjectURL(dataUrl);
          }
        }, 100);
        
        toast({
          title: "Export successful",
          description: `Diagram has been exported as ${format.toUpperCase()}.`,
        });
      }
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: `Failed to export diagram as ${format.toUpperCase()}.`,
        variant: "destructive"
      });
    }
  }, [format]);

  // Handle node changes with debouncing
  const handleNodesChange = useCallback((changes) => {
    try {
      if (!selectedDiagram || !changes) return;
      
      // Update the diagram data with the changes
      setDiagramData(prev => {
        if (!prev || !selectedDiagram.id) return prev;
        
        const updatedData = { ...prev };
        const currentDiagram = updatedData[selectedDiagram.id];
        
        if (!currentDiagram || !currentDiagram.nodes) return prev;
        
        changes.forEach(change => {
          if (change && change.type === 'position' && change.dragging) {
            const nodeIndex = currentDiagram.nodes.findIndex(n => n && n.id === change.id);
            if (nodeIndex !== -1 && currentDiagram.nodes[nodeIndex]) {
              updatedData[selectedDiagram.id] = {
                ...currentDiagram,
                nodes: [...currentDiagram.nodes]
              };
              
              updatedData[selectedDiagram.id].nodes[nodeIndex] = {
                ...currentDiagram.nodes[nodeIndex],
                position: {
                  x: change.x,
                  y: change.y
                },
                style: {
                  ...(currentDiagram.nodes[nodeIndex].style || {}),
                  transform: `translate(${change.x}px, ${change.y}px)`
                }
              };
            }
          }
        });
        
        return updatedData;
      });
    } catch (error) {
      console.error('Error in handleNodesChange:', error);
    }
  }, [selectedDiagram]);
  
  // Memoize the debounced version of handleNodesChange
  const debouncedNodesChange = useMemo(
    () => debounce(handleNodesChange, 300),
    [handleNodesChange]
  );
  
  // Use the debounced version for node changes
  const handleNodeChanges = useCallback((changes) => {
    debouncedNodesChange(changes);
  }, [debouncedNodesChange]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedNodesChange.cancel?.();
    };
  }, [debouncedNodesChange]);

  const CanvasComponent = useMemo(() => {
    if (!selectedDiagram || !currentDiagramData) {
      return (
        <div className="flex-1 flex items-center justify-center bg-white text-gray-500">
          <div className="text-center">
            <p className="text-xl mb-2">No diagram selected</p>
            <p className="text-sm">Create a new diagram or select one from the sidebar</p>
          </div>
        </div>
      );
    }

    return (
      <Canvas
        key={selectedDiagram.id}
        initialNodes={currentDiagramData.nodes}
        initialEdges={currentDiagramData.edges}
        onSelectionChange={setSelectedElement}
        onNodesChange={handleNodeChanges}
      />
    );
  }, [selectedDiagram, currentDiagramData, handleNodesChange]);

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] overflow-hidden">
      <TopNavbar>
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center text-gray-700 hover:text-gray-900">
            <Home className="w-5 h-5 mr-1" />
            <span>Home</span>
          </Link>
          <Link to="/branding" className="text-gray-700 hover:text-gray-900">Branding</Link>
        </div>
      </TopNavbar>
      <Toolbar
        onNewProject={() => setShowNewProjectModal(true)}
        onNewDiagram={() => setShowNewDiagramModal(true)}
        onOpenCodeGenerator={() => setShowCodeGeneratorModal(true)}
        onExportImage={handleExportImage}
        onExportProject={handleExportProject}
        onOpenProject={() => fileInputRef.current?.click()}
      />
      <input
        type="file"
        ref={fileInputRef}
        accept=".zenuml,application/json"
        style={{ display: 'none' }}
        onChange={handleOpenProject}
      />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          openDiagrams={openDiagrams}
          toolboxItems={toolboxItems}
          onDiagramSelect={handleDiagramSelect}
          selectedDiagram={selectedDiagram}
          onToolSelect={handleToolSelect}
        />
        {CanvasComponent}
        <RightPanel
          projects={projects}
          selectedElement={selectedElement}
          onPropertyChange={handlePropertyChange}
        />
      </div>
      <StatusBar selectedElement={selectedElement} zoom={zoom} />
      
      <NewProjectModal
        open={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onCreateProject={handleCreateProject}
      />
      <NewDiagramModal
        open={showNewDiagramModal}
        onClose={() => setShowNewDiagramModal(false)}
        onCreateDiagram={handleCreateDiagram}
      />
      <CodeGeneratorModal
        open={showCodeGeneratorModal}
        onClose={() => setShowCodeGeneratorModal(false)}
        nodes={currentDiagramData?.nodes || []}
      />
      
      <Toaster />
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  const [projects, setProjects] = useState(mockProjects);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const handleCreateProject = (projectName) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: projectName,
      diagrams: []
    };
    setProjects([...projects, newProject]);
    setShowNewProjectModal(false);
    toast({
      title: "Project created",
      description: `Project "${projectName}" has been created successfully.`,
    });
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <HomePage 
            projects={projects} 
            onNewProject={() => setShowNewProjectModal(true)} 
          />
        </ProtectedRoute>
      } />
      <Route path="/project/:projectId" element={
        <ProtectedRoute>
          <MainApp />
        </ProtectedRoute>
      } />
      <Route path="/project/:projectId/diagram/:diagramId" element={
        <ProtectedRoute>
          <MainApp />
        </ProtectedRoute>
      } />
      <Route path="/branding" element={<LogoShowcase />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <NewProjectModal
          open={false}
          onClose={() => {}}
          onCreateProject={() => {}}
        />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;