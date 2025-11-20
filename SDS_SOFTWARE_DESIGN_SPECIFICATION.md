# Software Design Specification (SDS)
## ZenUML - Web-Based UML Diagram Editor

**Document Version**: 1.0.0
**Date**: November 18, 2024
**Status**: Draft
**Author**: Development Team

---

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Database Design](#database-design)
4. [API Design](#api-design)
5. [Frontend Design](#frontend-design)
6. [Component Design](#component-design)
7. [Security Design](#security-design)
8. [Performance Design](#performance-design)

---

## 1. Introduction

### 1.1 Purpose
This document describes the software design of ZenUML, including system architecture, database design, API design, and component design.

### 1.2 Scope
Covers all aspects of system design including frontend, backend, database, and infrastructure.

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Frontend (React Flow, TailwindCSS)            │  │
│  │  - Diagram Editor                                    │  │
│  │  - Project Management                                │  │
│  │  - Authentication                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS/WebSocket
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Load Balancer (Nginx/HAProxy)                       │  │
│  │  - Route requests                                    │  │
│  │  - SSL/TLS termination                               │  │
│  │  - Rate limiting                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  FastAPI Backend                                     │  │
│  │  - Routes (Auth, Projects, Diagrams)                 │  │
│  │  - Services (Business Logic)                         │  │
│  │  - Middleware (Logging, Error Handling)              │  │
│  │  - WebSocket Server (Real-time Collaboration)        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │  MongoDB         │  │  Redis Cache     │                │
│  │  - Users         │  │  - Sessions      │                │
│  │  - Projects      │  │  - Tokens        │                │
│  │  - Diagrams      │  │  - Collaboration │                │
│  │  - Versions      │  │    State         │                │
│  └──────────────────┘  └──────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Deployment Architecture

```
┌──────────────────────────────────────────────────────┐
│            CDN (CloudFlare)                          │
│  - Static Assets                                     │
│  - Image Caching                                     │
└──────────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────────┐
│         Frontend Hosting (Netlify/Vercel)            │
│  - React Application                                 │
│  - Static Files                                      │
│  - SSL/TLS                                           │
└──────────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────────┐
│      Backend Hosting (AWS/GCP/Azure)                 │
│  - Docker Containers                                 │
│  - Kubernetes Orchestration                          │
│  - Auto-scaling                                      │
│  - Load Balancing                                    │
└──────────────────────────────────────────────────────┘
                      ↓
┌──────────────────────────────────────────────────────┐
│      Database & Cache                                │
│  - MongoDB Atlas (Cloud)                             │
│  - Redis Cloud                                       │
│  - Backups & Replication                             │
└──────────────────────────────────────────────────────┘
```

---

## 3. Database Design

### 3.1 Database Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  picture: String,
  passwordHash: String (nullable),
  provider: String (google, github, email),
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  isActive: Boolean,
  preferences: {
    theme: String,
    language: String,
    notifications: Boolean
  }
}
```

#### Projects Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  ownerId: ObjectId (ref: users),
  createdAt: Date,
  updatedAt: Date,
  isPublic: Boolean,
  members: [{
    userId: ObjectId (ref: users),
    role: String (owner, editor, viewer),
    addedAt: Date
  }],
  tags: [String],
  archived: Boolean
}
```

#### Diagrams Collection
```javascript
{
  _id: ObjectId,
  projectId: ObjectId (ref: projects),
  name: String,
  type: String (class, sequence, usecase, etc.),
  description: String,
  createdBy: ObjectId (ref: users),
  createdAt: Date,
  updatedAt: Date,
  lastModifiedBy: ObjectId (ref: users),
  nodes: [{
    id: String,
    type: String,
    position: { x: Number, y: Number },
    data: Object
  }],
  edges: [{
    id: String,
    source: String,
    target: String,
    type: String,
    data: Object
  }],
  version: Number,
  isLocked: Boolean,
  lockedBy: ObjectId (ref: users)
}
```

#### Versions Collection
```javascript
{
  _id: ObjectId,
  diagramId: ObjectId (ref: diagrams),
  versionNumber: Number,
  nodes: Array,
  edges: Array,
  createdBy: ObjectId (ref: users),
  createdAt: Date,
  message: String,
  isSnapshot: Boolean
}
```

#### Comments Collection
```javascript
{
  _id: ObjectId,
  diagramId: ObjectId (ref: diagrams),
  elementId: String (nullable),
  userId: ObjectId (ref: users),
  content: String,
  createdAt: Date,
  updatedAt: Date,
  replies: [{
    userId: ObjectId (ref: users),
    content: String,
    createdAt: Date
  }],
  resolved: Boolean
}
```

#### RefreshTokens Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  token: String (unique),
  expiresAt: Date,
  createdAt: Date,
  isRevoked: Boolean,
  revokedAt: Date
}
```

### 3.2 Indexes

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })

// Projects
db.projects.createIndex({ ownerId: 1 })
db.projects.createIndex({ createdAt: -1 })
db.projects.createIndex({ "members.userId": 1 })

// Diagrams
db.diagrams.createIndex({ projectId: 1 })
db.diagrams.createIndex({ createdAt: -1 })
db.diagrams.createIndex({ createdBy: 1 })

// Versions
db.versions.createIndex({ diagramId: 1, versionNumber: -1 })

// Comments
db.comments.createIndex({ diagramId: 1 })
db.comments.createIndex({ userId: 1 })

// RefreshTokens
db.refreshTokens.createIndex({ userId: 1 })
db.refreshTokens.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
```

---

## 4. API Design

### 4.1 API Structure

```
Base URL: /api/v1

Authentication Routes:
  POST   /auth/register
  POST   /auth/login
  POST   /auth/logout
  POST   /auth/refresh
  GET    /auth/google
  POST   /auth/google/callback
  GET    /auth/me

Project Routes:
  GET    /projects
  POST   /projects
  GET    /projects/:id
  PUT    /projects/:id
  DELETE /projects/:id
  POST   /projects/:id/share
  GET    /projects/:id/members

Diagram Routes:
  GET    /diagrams
  POST   /diagrams
  GET    /diagrams/:id
  PUT    /diagrams/:id
  DELETE /diagrams/:id
  POST   /diagrams/:id/export
  POST   /diagrams/:id/import
  GET    /diagrams/:id/versions
  POST   /diagrams/:id/versions

Comment Routes:
  GET    /diagrams/:id/comments
  POST   /diagrams/:id/comments
  PUT    /comments/:id
  DELETE /comments/:id
```

### 4.2 Request/Response Format

```javascript
// Success Response
{
  status: "success",
  code: 200,
  data: { ... },
  message: "Operation successful"
}

// Error Response
{
  status: "error",
  code: 400,
  error: {
    type: "validation_error",
    message: "Invalid input",
    details: [...]
  }
}
```

---

## 5. Frontend Design

### 5.1 Component Hierarchy

```
App
├── AuthProvider
├── TopNavbar
├── Sidebar
│   ├── WorkingDiagrams
│   └── Toolbox
├── MainContent
│   ├── ProjectView
│   │   ├── DiagramList
│   │   └── DiagramDetails
│   ├── DiagramEditor
│   │   ├── Canvas
│   │   ├── Toolbar
│   │   ├── Properties
│   │   └── RightPanel
│   └── CollaborationPanel
└── Footer
```

### 5.2 State Management

```
Redux Store
├── auth
│   ├── user
│   ├── token
│   ├── isAuthenticated
│   └── loading
├── projects
│   ├── list
│   ├── current
│   └── loading
├── diagrams
│   ├── list
│   ├── current
│   ├── nodes
│   ├── edges
│   └── loading
├── collaboration
│   ├── activeUsers
│   ├── cursorPositions
│   └── changes
└── ui
    ├── theme
    ├── sidebarOpen
    └── notifications
```

---

## 6. Component Design

### 6.1 Key Components

#### Canvas Component
- Renders diagram using React Flow
- Handles node/edge creation and deletion
- Manages zoom and pan
- Supports drag and drop

#### Toolbar Component
- Element selection
- Zoom controls
- Undo/Redo
- Export/Import buttons

#### Properties Panel
- Edit element properties
- Style customization
- Advanced options

#### Collaboration Panel
- Active users
- Comments
- Version history
- Change log

---

## 7. Security Design

### 7.1 Authentication Flow

```
1. User submits credentials
2. Backend validates credentials
3. Backend generates JWT tokens
   - Access token (30 min)
   - Refresh token (7 days)
4. Frontend stores tokens
5. Frontend includes access token in requests
6. Backend validates token
7. On expiration, frontend uses refresh token
8. Backend issues new access token
```

### 7.2 Authorization

- Role-based access control (RBAC)
- Owner, Editor, Viewer roles
- Permission validation on each request
- Audit logging of all changes

### 7.3 Data Protection

- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.2+)
- Input validation and sanitization
- SQL injection prevention
- XSS protection

---

## 8. Performance Design

### 8.1 Caching Strategy

```
Browser Cache:
- Static assets (1 year)
- API responses (5 minutes)

Server Cache (Redis):
- User sessions (30 minutes)
- Project data (10 minutes)
- Frequently accessed diagrams (5 minutes)

Database Query Cache:
- Prepared statements
- Query result caching
```

### 8.2 Optimization Techniques

- Lazy loading of diagrams
- Virtual scrolling for large lists
- Debouncing for real-time updates
- Compression of responses
- CDN for static assets
- Database indexing
- Connection pooling

### 8.3 Scalability

- Horizontal scaling with load balancer
- Database replication
- Redis cluster
- Kubernetes auto-scaling
- Microservices architecture (future)

---

## 9. Deployment Design

### 9.1 Deployment Pipeline

```
1. Developer commits code
2. GitHub Actions triggers CI/CD
3. Run tests
4. Build Docker image
5. Push to registry
6. Deploy to staging
7. Run integration tests
8. Deploy to production
9. Monitor and alert
```

### 9.2 Infrastructure as Code

- Terraform for infrastructure
- Docker for containerization
- Kubernetes for orchestration
- GitHub Actions for CI/CD

---

## 10. Monitoring & Logging

### 10.1 Monitoring

- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- User analytics (Mixpanel)
- Uptime monitoring (StatusPage)

### 10.2 Logging

- Structured logging (JSON format)
- Log levels (DEBUG, INFO, WARNING, ERROR)
- Log aggregation (ELK Stack)
- Log retention (30 days)

---

## 11. Appendices

### A. Design Patterns Used

- MVC (Model-View-Controller)
- Repository Pattern
- Service Layer Pattern
- Middleware Pattern
- Observer Pattern (Real-time updates)

### B. Technology Decisions

| Decision | Rationale |
|----------|-----------|
| React | Popular, large community, good tooling |
| FastAPI | Fast, async support, automatic docs |
| MongoDB | Flexible schema, scalable |
| Redis | Fast caching, real-time support |
| Docker | Consistent deployment |
| Kubernetes | Scalability, reliability |

---

**End of Software Design Specification**
