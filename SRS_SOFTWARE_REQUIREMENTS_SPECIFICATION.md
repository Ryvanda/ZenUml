# Software Requirements Specification (SRS)
## ZenUML - Web-Based UML Diagram Editor

**Document Version**: 1.0.0
**Date**: November 18, 2024
**Status**: Draft
**Author**: Development Team
**Project**: ZenUML

---

## Table of Contents

1. [Introduction](#introduction)
2. [Overall Description](#overall-description)
3. [Specific Requirements](#specific-requirements)
4. [External Interface Requirements](#external-interface-requirements)
5. [System Features](#system-features)
6. [Non-Functional Requirements](#non-functional-requirements)
7. [Other Requirements](#other-requirements)

---

## 1. Introduction

### 1.1 Purpose

This document specifies the requirements for ZenUML, a web-based UML diagram editor that enables users to create, edit, and collaborate on UML diagrams in real-time. The application supports multiple diagram types following UML 2.x standards.

### 1.2 Scope

ZenUML is a cloud-based application that provides:
- Multiple UML diagram types (Class, Use Case, Sequence, Activity, State, Component, Deployment, Package)
- Real-time collaboration features
- File import/export capabilities
- Authentication and project management
- Team collaboration and sharing

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|-----------|
| UML | Unified Modeling Language |
| SRS | Software Requirements Specification |
| API | Application Programming Interface |
| JWT | JSON Web Token |
| OAuth | Open Authorization |
| CRUD | Create, Read, Update, Delete |
| SVG | Scalable Vector Graphics |
| XMI | XML Metadata Interchange |
| CRDT | Conflict-free Replicated Data Type |
| OT | Operational Transformation |

### 1.4 References

- UML 2.x Specification (OMG)
- "UML Distilled" by Martin Fowler (3rd Edition)
- IEEE 830-1998 (SRS Standard)

---

## 2. Overall Description

### 2.1 Product Perspective

ZenUML is a standalone web application that operates independently but can integrate with:
- GitHub (save diagrams)
- Jira (link diagrams)
- Slack (share diagrams)
- Confluence (embed diagrams)
- Other UML tools (import/export)

### 2.2 Product Functions

#### Major Functions:
1. **Diagram Creation & Editing**
   - Create multiple diagram types
   - Edit elements and connections
   - Undo/Redo functionality
   - Auto-save capability

2. **Project Management**
   - Create and organize projects
   - Manage multiple diagrams per project
   - Version control and history

3. **Collaboration**
   - Real-time multi-user editing
   - Comments and annotations
   - Sharing and permissions
   - Activity tracking

4. **Import/Export**
   - Export to multiple formats (UML, StarUML, XMI, SVG, PDF)
   - Import from various tools
   - Format conversion

5. **Authentication & Authorization**
   - User registration and login
   - OAuth integration (Google, GitHub)
   - Role-based access control
   - Team management

### 2.3 User Classes and Characteristics

#### 1. Individual Users
- Students learning UML
- Software architects
- Developers
- Business analysts
- **Characteristics**: Need simple, intuitive interface; occasional use

#### 2. Team Users
- Development teams
- Enterprise organizations
- Consulting firms
- **Characteristics**: Need collaboration, sharing, version control

#### 3. Enterprise Users
- Large organizations
- Need self-hosted options
- Advanced security requirements
- **Characteristics**: Need SSO, audit logs, SLA

### 2.4 Operating Environment

#### Frontend
- **Browser**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **OS**: Windows, macOS, Linux
- **Screen Resolution**: 1024x768 minimum
- **Internet**: Broadband connection

#### Backend
- **Server OS**: Linux (Ubuntu 20.04+)
- **Runtime**: Python 3.9+
- **Database**: MongoDB 4.5+
- **Cache**: Redis 6.0+

#### Network
- HTTPS/TLS encryption
- WebSocket support
- CDN for static assets

### 2.5 Design and Implementation Constraints

1. **Standards Compliance**
   - UML 2.x standard compliance
   - WCAG 2.1 accessibility
   - GDPR compliance for data privacy

2. **Technology Stack**
   - Frontend: React, React Flow, TailwindCSS
   - Backend: FastAPI, MongoDB, Motor
   - Real-time: Socket.io, Redis

3. **Performance Constraints**
   - Page load time < 2 seconds
   - Diagram rendering < 500ms
   - Real-time sync latency < 100ms

---

## 3. Specific Requirements

### 3.1 Functional Requirements

#### 3.1.1 User Authentication (REQ-AUTH)

**REQ-AUTH-001**: User Registration
- Users can register with email and password
- Email validation required
- Password strength requirements (min 8 chars, uppercase, number, special char)
- Email verification required

**REQ-AUTH-002**: User Login
- Users can login with email/password
- Users can login with Google OAuth
- Users can login with GitHub OAuth
- Session timeout after 30 minutes of inactivity
- "Remember me" option for 30 days

**REQ-AUTH-003**: Password Management
- Users can reset forgotten password
- Password reset link expires after 24 hours
- Users can change password
- Old password verification required

**REQ-AUTH-004**: Token Management
- JWT access tokens (30 minutes expiration)
- Refresh tokens (7 days expiration)
- Token refresh on expiration
- Token revocation on logout

#### 3.1.2 Project Management (REQ-PROJ)

**REQ-PROJ-001**: Create Project
- Users can create new projects
- Project name required (max 255 characters)
- Optional project description
- Project creation timestamp recorded

**REQ-PROJ-002**: View Projects
- Users can view list of their projects
- Pagination support (20 items per page)
- Sort by name, date created, date modified
- Search functionality

**REQ-PROJ-003**: Edit Project
- Users can edit project name and description
- Users can archive projects
- Users can delete projects (with confirmation)
- Audit trail of changes

**REQ-PROJ-004**: Project Sharing
- Users can share projects with other users
- Role-based sharing (View, Edit, Admin)
- Share links with expiration dates
- Revoke access anytime

#### 3.1.3 Diagram Management (REQ-DIAG)

**REQ-DIAG-001**: Create Diagram
- Users can create diagrams of different types
- Diagram types: Class, Use Case, Sequence, Activity, State, Component, Deployment, Package
- Diagram name required
- Default blank canvas

**REQ-DIAG-002**: Edit Diagram
- Add/remove elements
- Edit element properties
- Create connections between elements
- Undo/Redo (up to 50 steps)
- Auto-save every 30 seconds

**REQ-DIAG-003**: View Diagram
- Display diagram on canvas
- Zoom in/out (10% to 400%)
- Pan across diagram
- Fit to screen option
- Grid display (optional)

**REQ-DIAG-004**: Delete Diagram
- Users can delete diagrams
- Confirmation dialog required
- Permanent deletion after 30-day trash period
- Restore from trash within 30 days

#### 3.1.4 Diagram Elements (REQ-ELEM)

**REQ-ELEM-001**: Class Diagram Elements
- Class nodes with attributes and methods
- Interface nodes
- Relationships (association, aggregation, composition, generalization, dependency)
- Multiplicity indicators

**REQ-ELEM-002**: Sequence Diagram Elements
- 8 participant types (Participant, Actor, Boundary, Control, Entity, Database, Collections, Queue)
- Lifelines
- Messages (synchronous, asynchronous, return)
- Activation boxes
- Combined fragments

**REQ-ELEM-003**: Use Case Diagram Elements
- Actor symbols
- Use case ovals
- System boundary rectangle
- Relationships (association, include, extend)

**REQ-ELEM-004**: Element Properties
- Editable labels
- Color customization
- Line style customization
- Font customization
- Visibility settings

#### 3.1.5 Collaboration (REQ-COLLAB)

**REQ-COLLAB-001**: Real-Time Editing
- Multiple users can edit same diagram simultaneously
- Live cursor tracking
- Change notifications
- Conflict resolution

**REQ-COLLAB-002**: Comments
- Users can add comments to diagrams
- Users can add comments to elements
- Threaded discussions
- @mentions with notifications
- Comment history

**REQ-COLLAB-003**: Version Control
- Auto-save versions every 5 minutes
- Manual version snapshots
- Version history with timestamps
- Diff viewer
- Rollback to previous version

**REQ-COLLAB-004**: Permissions
- Owner can manage permissions
- View-only access
- Edit access
- Admin access
- Audit logs of all changes

#### 3.1.6 Import/Export (REQ-IO)

**REQ-IO-001**: Export Formats
- Export to ZenUML (.uml) format
- Export to StarUML (.mdj) format
- Export to XMI (.xmi) format
- Export to SVG (.svg) format
- Export to PNG (.png) format
- Export to PDF (.pdf) format

**REQ-IO-002**: Import Formats
- Import ZenUML (.uml) files
- Import StarUML (.mdj) files
- Import XMI (.xmi) files
- Import Lucidchart exports
- Import Draw.io exports

**REQ-IO-003**: Batch Operations
- Export multiple diagrams
- Import entire projects
- Format conversion
- Validation before import

#### 3.1.7 Search & Navigation (REQ-SEARCH)

**REQ-SEARCH-001**: Search Functionality
- Full-text search across diagrams
- Search by element name
- Search by diagram type
- Search results pagination

**REQ-SEARCH-002**: Navigation
- Breadcrumb navigation
- Quick navigation menu
- Go to definition
- Find references

### 3.2 Non-Functional Requirements

#### 3.2.1 Performance (REQ-PERF)

**REQ-PERF-001**: Response Time
- Page load time < 2 seconds
- Diagram rendering < 500ms
- Element creation < 100ms
- Real-time sync latency < 100ms

**REQ-PERF-002**: Scalability
- Support 1000+ concurrent users
- Support 100,000+ diagrams
- Support 1,000,000+ elements
- Database query optimization

**REQ-PERF-003**: Caching
- Browser caching for static assets
- Server-side caching (Redis)
- CDN for global distribution
- Cache invalidation strategy

#### 3.2.2 Reliability (REQ-REL)

**REQ-REL-001**: Availability
- 99.9% uptime SLA
- Graceful degradation
- Automatic failover
- Backup and recovery

**REQ-REL-002**: Data Integrity
- ACID transactions
- Data validation
- Referential integrity
- Backup strategy (daily)

**REQ-REL-003**: Error Handling
- Graceful error messages
- Error logging
- Error recovery
- User notification

#### 3.2.3 Security (REQ-SEC)

**REQ-SEC-001**: Authentication
- Secure password hashing (bcrypt)
- JWT token security
- OAuth 2.0 compliance
- Session management

**REQ-SEC-002**: Authorization
- Role-based access control
- Permission validation
- Audit logging
- Access control lists

**REQ-SEC-003**: Data Protection
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.2+)
- Data validation
- Input sanitization

**REQ-SEC-004**: Compliance
- GDPR compliance
- CCPA compliance
- SOC 2 compliance
- Regular security audits

#### 3.2.4 Usability (REQ-USE)

**REQ-USE-001**: User Interface
- Intuitive and clean design
- Consistent navigation
- Responsive design
- Dark/Light theme support

**REQ-USE-002**: Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader support
- Color contrast requirements

**REQ-USE-003**: Documentation
- User guide
- Video tutorials
- API documentation
- FAQ section

#### 3.2.5 Maintainability (REQ-MAINT)

**REQ-MAINT-001**: Code Quality
- Code review process
- Unit test coverage > 80%
- Integration test coverage > 70%
- Code documentation

**REQ-MAINT-002**: Version Control
- Git-based version control
- Semantic versioning
- Release notes
- Changelog

**REQ-MAINT-003**: Monitoring
- Application performance monitoring
- Error tracking (Sentry)
- User analytics
- Uptime monitoring

---

## 4. External Interface Requirements

### 4.1 User Interfaces

#### 4.1.1 Web Interface
- Responsive design (mobile, tablet, desktop)
- Modern UI framework (React)
- Accessibility standards compliance
- Dark/Light theme support

#### 4.1.2 Mobile Interface
- Progressive Web App (PWA)
- Touch-friendly controls
- Responsive layout
- Offline capability

### 4.2 Hardware Interfaces

- Keyboard and mouse support
- Touch screen support
- Multi-monitor support
- High DPI display support

### 4.3 Software Interfaces

#### 4.3.1 Third-Party APIs
- Google OAuth API
- GitHub OAuth API
- Slack API
- Jira API
- Confluence API

#### 4.3.2 Database Interface
- MongoDB connection
- Connection pooling
- Query optimization
- Backup/restore

#### 4.3.3 Cache Interface
- Redis connection
- Session management
- Cache invalidation
- Distributed caching

### 4.4 Communication Interfaces

- HTTPS/TLS for secure communication
- WebSocket for real-time updates
- REST API for client-server communication
- JSON for data exchange

---

## 5. System Features

### 5.1 Feature 1: Diagram Creation & Editing

**Description**: Users can create and edit UML diagrams with various element types and relationships.

**Actors**: Individual Users, Team Users

**Preconditions**: User is authenticated and has a project

**Main Flow**:
1. User selects diagram type
2. System creates blank diagram
3. User adds elements from toolbox
4. User creates connections
5. User edits element properties
6. System auto-saves changes

**Postconditions**: Diagram is saved with all changes

### 5.2 Feature 2: Real-Time Collaboration

**Description**: Multiple users can edit the same diagram simultaneously with live updates.

**Actors**: Team Users

**Preconditions**: User has edit permission on diagram

**Main Flow**:
1. User A makes change to diagram
2. System broadcasts change to all users
3. User B sees change in real-time
4. System resolves conflicts
5. All users see consistent state

**Postconditions**: All users have synchronized view

### 5.3 Feature 3: Import/Export

**Description**: Users can import diagrams from other tools and export to multiple formats.

**Actors**: Individual Users, Team Users

**Preconditions**: User has diagram to export or file to import

**Main Flow**:
1. User selects export/import option
2. System displays format options
3. User selects format
4. System processes file
5. System saves/displays result

**Postconditions**: File is exported/imported successfully

---

## 6. Other Requirements

### 6.1 Database Requirements

- MongoDB 4.5+
- Collections: users, projects, diagrams, versions, comments, teams
- Indexes on frequently queried fields
- Backup strategy (daily)
- Replication for high availability

### 6.2 Deployment Requirements

- Docker containerization
- Kubernetes orchestration (optional)
- CI/CD pipeline
- Load balancing
- SSL/TLS certificates

### 6.3 Support & Maintenance

- 24/7 monitoring
- Incident response plan
- Regular backups
- Security patches
- Performance optimization

### 6.4 Training & Documentation

- User documentation
- Administrator guide
- Developer documentation
- API documentation
- Video tutorials

---

## 7. Appendices

### A. Glossary

- **UML**: Unified Modeling Language - standard for software modeling
- **Diagram**: Visual representation of system using UML notation
- **Element**: Basic building block of diagram (class, actor, etc.)
- **Relationship**: Connection between elements
- **Collaboration**: Multiple users working on same diagram

### B. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2024-11-18 | Dev Team | Initial SRS |

### C. Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Project Manager | - | - | - |
| Product Owner | - | - | - |
| Technical Lead | - | - | - |

---

**End of Software Requirements Specification**
