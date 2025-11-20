// Mock data for StarUML clone

export const mockProjects = [
  {
    id: 'proj-1',
    name: 'Library Domain Model',
    diagrams: [
      { id: 'diag-1', name: 'Class Diagram', type: 'class' },
      { id: 'diag-2', name: 'Use Case Diagram', type: 'usecase' },
      { id: 'diag-3', name: 'Sequence Diagram', type: 'sequence' }
    ]
  },
  {
    id: 'proj-2',
    name: 'E-Commerce System',
    diagrams: [
      { id: 'diag-4', name: 'Product Class Diagram', type: 'class' },
      { id: 'diag-5', name: 'Checkout Sequence', type: 'sequence' }
    ]
  }
];

export const toolboxItems = {
  class: [
    { id: 'class-tool', label: 'Class', icon: 'Box', nodeType: 'classNode' },
    { id: 'interface-tool', label: 'Interface', icon: 'Circle', nodeType: 'interfaceNode' },
    { id: 'association-tool', label: 'Association', icon: 'ArrowRight', edgeType: 'association' },
    { id: 'aggregation-tool', label: 'Aggregation', icon: 'Diamond', edgeType: 'aggregation' },
    { id: 'composition-tool', label: 'Composition', icon: 'DiamondIcon', edgeType: 'composition' },
    { id: 'generalization-tool', label: 'Generalization', icon: 'Triangle', edgeType: 'generalization' },
    { id: 'dependency-tool', label: 'Dependency', icon: 'GitBranch', edgeType: 'dependency' }
  ],
  sequence: [
    { id: 'participant-tool', label: 'Participant', icon: 'Square', nodeType: 'participantNode' },
    { id: 'actor-tool', label: 'Actor', icon: 'User', nodeType: 'actorNode' },
    { id: 'boundary-tool', label: 'Boundary', icon: 'Square', nodeType: 'boundaryNode' },
    { id: 'control-tool', label: 'Control', icon: 'Circle', nodeType: 'controlNode' },
    { id: 'entity-tool', label: 'Entity', icon: 'Circle', nodeType: 'entityNode' },
    { id: 'database-tool', label: 'Database', icon: 'Database', nodeType: 'databaseNode' },
    { id: 'collections-tool', label: 'Collections', icon: 'Square', nodeType: 'collectionsNode' },
    { id: 'queue-tool', label: 'Queue', icon: 'Square', nodeType: 'queueNode' },
    { id: 'lifeline-tool', label: 'Lifeline', icon: 'RectangleVertical', nodeType: 'lifelineNode' },
    { id: 'message-tool', label: 'Message', icon: 'ArrowRight', edgeType: 'message' },
    { id: 'return-tool', label: 'Return', icon: 'ArrowLeft', edgeType: 'return' }
  ],
  usecase: [
    { id: 'actor-tool', label: 'Actor', icon: 'User', nodeType: 'usecaseActorNode' },
    { id: 'usecase-tool', label: 'Use Case', icon: 'Circle', nodeType: 'usecaseNode' },
    { id: 'system-tool', label: 'System Boundary', icon: 'Square', nodeType: 'systemNode' },
    { id: 'association-tool', label: 'Association', icon: 'ArrowRight', edgeType: 'association' },
    { id: 'include-tool', label: 'Include', icon: 'GitMerge', edgeType: 'include' },
    { id: 'extend-tool', label: 'Extend', icon: 'GitBranch', edgeType: 'extend' }
  ]
};

export const mockClassDiagramData = {
  nodes: [
    {
      id: 'book-1',
      type: 'classNode',
      position: { x: 100, y: 100 },
      data: {
        label: 'Book',
        stereotype: '',
        attributes: [
          '+ISBN: String[0..1] {id}',
          '+title: String',
          '+summary: String',
          '+publication date: Integer',
          '+number of pages: Integer',
          '+language: String'
        ],
        methods: []
      }
    },
    {
      id: 'author-1',
      type: 'classNode',
      position: { x: 450, y: 80 },
      data: {
        label: 'Author',
        stereotype: '',
        attributes: [
          '+name: String',
          '+biography: String'
        ],
        methods: []
      }
    },
    {
      id: 'account-1',
      type: 'classNode',
      position: { x: 450, y: 280 },
      data: {
        label: 'Account',
        stereotype: '',
        attributes: [
          '+number: int',
          '+history: History[0..*] {ordered}',
          '+openedDate: Date',
          '+state: AccountState'
        ],
        methods: []
      }
    },
    {
      id: 'library-1',
      type: 'classNode',
      position: { x: 450, y: 480 },
      data: {
        label: 'Library',
        stereotype: '',
        attributes: [
          '+name: String'
        ],
        methods: []
      }
    }
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'book-1',
      target: 'author-1',
      type: 'association',
      label: '+borrowed',
      markerEnd: { type: 'arrow' }
    },
    {
      id: 'edge-2',
      source: 'book-1',
      target: 'account-1',
      type: 'association',
      label: '0..3',
      markerEnd: { type: 'arrow' }
    },
    {
      id: 'edge-3',
      source: 'account-1',
      target: 'library-1',
      type: 'aggregation',
      label: '+accounts',
      markerEnd: { type: 'arrow' }
    }
  ]
};