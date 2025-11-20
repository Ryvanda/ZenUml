import React, { useCallback, memo, useMemo, useState, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ClassNode from './nodes/ClassNode';
import InterfaceNode from './nodes/InterfaceNode';
import UseCaseNode from './nodes/UseCaseNode';
import ActorNode from './nodes/ActorNode';
import BoundaryNode from './nodes/BoundaryNode';
import ControlNode from './nodes/ControlNode';
import EntityNode from './nodes/EntityNode';
import ParticipantNode from './nodes/ParticipantNode';
import DatabaseNode from './nodes/DatabaseNode';
import CollectionsNode from './nodes/CollectionsNode';
import QueueNode from './nodes/QueueNode';

// Memoize the node types to prevent recreation on every render
const nodeTypes = {
  classNode: ClassNode,
  interfaceNode: InterfaceNode,
  usecaseNode: UseCaseNode,
  usecaseActorNode: ActorNode,
  actorNode: ActorNode,
  boundaryNode: BoundaryNode,
  controlNode: ControlNode,
  entityNode: EntityNode,
  participantNode: ParticipantNode,
  databaseNode: DatabaseNode,
  collectionsNode: CollectionsNode,
  queueNode: QueueNode,
  lifelineNode: ClassNode,
  systemNode: InterfaceNode
};

// Memoize the Canvas component to prevent unnecessary re-renders
const Canvas = memo(({ initialNodes, initialEdges, onSelectionChange, onNodesChange: onNodesChangeProp, onEdgesChange: onEdgesChangeProp }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges || []);
  
  // Memoize the edges to prevent unnecessary recalculations
  const edgesWithMarkers = useMemo(() => 
    edges.map(edge => ({
      ...edge,
      type: 'smoothstep',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    })),
    [edges]
  );
  
  // Memoize the background and controls to prevent recreation on every render
  const backgroundComponent = useMemo(() => (
    <Background color="#ddd" gap={16} />
  ), []);
  
  const controlsComponent = useMemo(() => (
    <Controls />
  ), []);
  
  const miniMapComponent = useMemo(() => (
    <MiniMap
      nodeColor="#3b82f6"
      maskColor="rgba(0, 0, 0, 0.1)"
      className="bg-white border border-gray-300"
    />
  ), []);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed },
    }, eds));
  }, [setEdges]);

  const onNodeClick = useCallback((event, node) => {
    onSelectionChange(node);
  }, [onSelectionChange]);

  const onPaneClick = useCallback(() => {
    onSelectionChange(null);
  }, [onSelectionChange]);

  const handleNodesChange = useCallback((changes) => {
    onNodesChange(changes);
    if (onNodesChangeProp) {
      onNodesChangeProp(changes);
    }
  }, [onNodesChange, onNodesChangeProp]);

  const handleEdgesChange = useCallback((changes) => {
    onEdgesChange(changes);
    if (onEdgesChangeProp) {
      onEdgesChangeProp(changes);
    }
  }, [onEdgesChange, onEdgesChangeProp]);

  React.useEffect(() => {
    setNodes(initialNodes || []);
    setEdges(initialEdges || []);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Memoize the main ReactFlow component props
  const reactFlowProps = useMemo(() => ({
    nodes,
    edges: edgesWithMarkers,
    onNodesChange: handleNodesChange,
    onEdgesChange: handleEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    nodeTypes,
    fitView: true,
    attributionPosition: 'bottom-left',
    nodesDraggable: true,
    nodesConnectable: true,
    elementsSelectable: true,
    defaultEdgeOptions: {
      type: 'smoothstep',
      style: { stroke: '#555' },
    },
  }), [nodes, edgesWithMarkers, handleNodesChange, handleEdgesChange, onConnect, onNodeClick, onPaneClick, nodeTypes]);

  return (
    <div className="flex-1 bg-white relative">
      <ReactFlow {...reactFlowProps}>
        {backgroundComponent}
        {controlsComponent}
        {miniMapComponent}
      </ReactFlow>
    </div>
  );
});

// Add display name for better debugging
Canvas.displayName = 'Canvas';

export default Canvas;