import React from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Clock, Users, FileText, Plus } from 'lucide-react';

const HomePage = ({ projects, onNewProject, onOpenProject }) => {
  // Mock data for recent files and collaboration projects
  const recentFiles = [
    { id: 'diag-1', name: 'Class Diagram - Library', type: 'class', lastOpened: '2 hours ago', projectId: 'proj-1' },
    { id: 'diag-4', name: 'Product Class Diagram', type: 'class', lastOpened: '1 day ago', projectId: 'proj-2' },
    { id: 'diag-2', name: 'Use Case Diagram', type: 'usecase', lastOpened: '2 days ago', projectId: 'proj-1' },
  ];

  const collaborationProjects = [
    { id: 'collab-1', name: 'Team Project', members: 3, lastUpdated: '5 hours ago' },
    { id: 'collab-2', name: 'Open Source Contribution', members: 12, lastUpdated: '2 days ago' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to ZenUML</h1>
        <button
          onClick={onNewProject}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>

      {/* Recent Files Section */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-700">Recent Files</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentFiles.map((file) => {
            const project = projects.find(p => p.id === file.projectId);
            return (
              <Link
                key={file.id}
                to={`/project/${file.projectId}/diagram/${file.id}`}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-center mb-2">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-gray-800">{file.name}</h3>
                </div>
                <p className="text-sm text-gray-500">
                  {project?.name || 'Project'} • {file.type} • {file.lastOpened}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Your Projects Section */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <FolderOpen className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-700">Your Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
            >
              <h3 className="font-medium text-gray-800 mb-1">{project.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {project.diagrams?.length || 0} diagrams
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.diagrams?.slice(0, 3).map(diagram => (
                  <span key={diagram.id} className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600">
                    {diagram.type}
                  </span>
                ))}
                {project.diagrams?.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-500">
                    +{project.diagrams.length - 3} more
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Collaboration Projects Section */}
      <section>
        <div className="flex items-center mb-4">
          <Users className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-700">Collaboration Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collaborationProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
            >
              <h3 className="font-medium text-gray-800 mb-1">{project.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                <span className="mr-3">{project.members} members</span>
                <span>Updated {project.lastUpdated}</span>
              </div>
            </div>
          ))}
          <button
            onClick={() => {}}
            className="p-4 border-2 border-dashed rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center text-gray-500"
          >
            <Plus className="w-6 h-6 mb-2" />
            <span>Join or create team</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
