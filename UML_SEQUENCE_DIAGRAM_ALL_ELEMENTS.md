# Complete UML Sequence Diagram Elements Reference

## All 8 Participant Types

### 1. PARTICIPANT - Rectangle
```
+─────────────+
│ Participant │
+─────────────+
```

**Visual**: Rectangular box with label
**Represents**: Generic participant/object
**Use Case**: Generic system components
**Example**: Service, Module, Component

---

### 2. ACTOR - Stick Figure
```
    ○
   /|\
   / \
   User
```

**Visual**: Stick figure (circle head, body, arms, legs)
**Represents**: External user or system
**Use Case**: People, external systems
**Example**: Customer, Admin, External API

---

### 3. BOUNDARY - Circle with Line
```
    ◯
    |
  Screen
```

**Visual**: Circle with vertical line through center
**Represents**: System boundary, interface
**Use Case**: UI components, API gateways
**Example**: Web Interface, Mobile Screen, API Gateway

---

### 4. CONTROL - Circle with Arrow
```
    ↺
 Controller
```

**Visual**: Circle with small arrow inside (pointing right)
**Represents**: Control logic, coordinator
**Use Case**: Business logic, coordinators
**Example**: Service Manager, Controller, Coordinator

---

### 5. ENTITY - Plain Circle with Underline
```
    ◯
    ―
  Database
```

**Visual**: Circle with horizontal line below
**Represents**: Domain object, entity
**Use Case**: Business objects, domain models
**Example**: Order, User, Product

---

### 6. DATABASE - Cylinder
```
   ╭─╮
   │ │
   ╰─╯
 Database
```

**Visual**: Cylinder (top and bottom ellipse with vertical lines)
**Represents**: Persistent storage, database
**Use Case**: Data storage, repositories
**Example**: SQL Database, NoSQL Database, Cache

---

### 7. COLLECTIONS - Rectangle
```
+─────────────+
| Collections |
+─────────────+
```

**Visual**: Rectangular box with "Collections" label
**Represents**: Collection of objects
**Use Case**: Lists, arrays, collections
**Example**: User List, Order Collection, Product Array

---

### 8. QUEUE - Rectangle
```
+────────+
| Queue  |
+────────+
```

**Visual**: Rectangular box with "Queue" label
**Represents**: Message queue, event queue
**Use Case**: Asynchronous messaging, event handling
**Example**: Message Queue, Event Queue, Task Queue

---

## Complete Sequence Diagram with All Elements

```
┌────────────────────────────────────────────────────────────────────┐
│                    COMPLETE SEQUENCE DIAGRAM                       │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  User      Screen      Controller    Order      Database  Queue   │
│   ○         ◯           ↺            ◯          ╭─╮      +────+   │
│   |         |           |            |          │ │      │    │   │
│   |         |           |            |          ╰─╯      +────+   │
│   |         |           |            |           |         |      │
│   |──click─>|           |            |           |         |      │
│   |         |──process─>|            |           |         |      │
│   |         |           |──create───>|           |         |      │
│   |         |           |            |──save────>|         |      │
│   |         |           |            |           |         |      │
│   |         |           |            |<──id──────|         |      │
│   |         |           |<──result───|           |         |      │
│   |         |           |            |──queue───────────>|  |      │
│   |         |<──display─|            |           |         |      │
│   |<────────|           |            |           |         |      │
│   |         |           |            |           |         |      │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Element Characteristics Table

| Element | Visual | Type | Purpose | Example |
|---------|--------|------|---------|---------|
| Participant | Rectangle | Box | Generic component | Service |
| Actor | Stick figure | SVG | External user | Customer |
| Boundary | Circle + line | SVG | Interface | UI Screen |
| Control | Circle + arrow | SVG | Logic | Controller |
| Entity | Circle + line | SVG | Domain object | Order |
| Database | Cylinder | SVG | Storage | Database |
| Collections | Rectangle | Box | Collection | List |
| Queue | Rectangle | Box | Queue | Message Queue |

---

## Typical Interaction Patterns

### Pattern 1: User → UI → Controller → Database
```
User          UI            Controller      Database
 ○             ◯              ↺              ╭─╮
 |             |              |              │ │
 |──click─────>|              |              ╰─╯
 |             |──process────>|              |
 |             |              |──query──────>|
 |             |              |<──data───────|
 |             |<──result─────|              |
 |<──display───|              |              |
```

### Pattern 2: User → Boundary → Control → Entity → Database
```
User        Boundary       Control        Entity        Database
 ○            ◯              ↺              ◯            ╭─╮
 |            |              |              |            │ │
 |──request──>|              |              |            ╰─╯
 |            |──process────>|              |            |
 |            |              |──create─────>|            |
 |            |              |              |──save─────>|
 |            |              |              |<──id───────|
 |            |              |<──result─────|            |
 |            |<──response───|              |            |
 |<──display──|              |              |            |
```

### Pattern 3: With Collections and Queue
```
User          UI            Service        Collections    Queue
 ○             ◯              ↺             +──────────+  +────+
 |             |              |             │          │  │    │
 |──request───>|              |             +──────────+  +────+
 |             |──process────>|             |            |
 |             |              |──fetch─────────────────>|
 |             |              |<──items───────────────|
 |             |              |──queue────────────────────>|
 |             |<──result─────|             |            |
 |<──display───|              |             |            |
```

### Pattern 4: Microservices with Database
```
Client        API           Service        Entity        Database
 ○             ◯              ↺              ◯            ╭─╮
 |             |              |              |            │ │
 |──request───>|              |              |            ╰─╯
 |             |──forward────>|              |            |
 |             |              |──create─────>|            |
 |             |              |              |──save─────>|
 |             |              |              |<──id───────|
 |             |              |<──result─────|            |
 |             |<──response───|              |            |
 |<──data──────|              |              |            |
```

---

## Best Practices

### ✅ DO
- Use Actor for external users/systems
- Use Boundary for UI/interfaces
- Use Control for business logic
- Use Entity for domain objects
- Use Database for persistent storage
- Use Collections for groups of objects
- Use Queue for asynchronous messaging
- Label all participants clearly
- Keep interactions simple
- Follow left-to-right flow

### ❌ DON'T
- Mix Actor and Boundary roles
- Use Entity for logic
- Use Database for logic
- Create circular dependencies
- Overload Control with too many responsibilities
- Use unclear labels
- Create overly complex diagrams
- Mix different element types for same purpose

---

## Sequence Diagram Creation Steps

### Step 1: Identify Participants
```
1. List all participants
2. Classify each participant:
   - External user? → Actor
   - UI/Interface? → Boundary
   - Business logic? → Control
   - Domain object? → Entity
   - Data storage? → Database
   - Collection? → Collections
   - Message queue? → Queue
   - Generic? → Participant
3. Add lifelines
```

### Step 2: Define Interactions
```
1. Identify message flow
2. Determine message types:
   - Synchronous call → solid arrow
   - Asynchronous call → open arrow
   - Return value → dashed arrow
3. Add activation boxes
4. Add labels
```

### Step 3: Refine Diagram
```
1. Adjust layout for clarity
2. Verify message flow logic
3. Check element positioning
4. Review for completeness
```

### Step 4: Validate
```
1. Check UML compliance
2. Verify message flow
3. Ensure clarity
4. Review with team
```

---

## ZenUML Toolbox Elements

### Available in Sequence Diagram
```
Sequence Diagram Toolbox:
├── Participant (Rectangle)
├── Actor (Stick figure)
├── Boundary (Circle + line)
├── Control (Circle + arrow)
├── Entity (Circle + underline)
├── Database (Cylinder)
├── Collections (Rectangle)
├── Queue (Rectangle)
├── Lifeline (Vertical line)
├── Message (Arrow)
└── Return (Dashed arrow)
```

### How to Use
1. Open/Create sequence diagram
2. Click element in toolbox
3. Click on canvas to place
4. Double-click to edit label
5. Connect with messages

---

## Real-World Examples

### E-Commerce Order Processing
```
Customer       Browser         Server         Order         Database
   ○             ◯              ↺              ◯            ╭─╮
   |             |              |              |            │ │
   |──browse────>|              |              |            ╰─╯
   |<──display───|              |              |            |
   |──add item──>|──process────>|              |            |
   |             |              |──create─────>|            |
   |             |              |              |──save─────>|
   |             |              |              |<──id───────|
   |──checkout──>|──process────>|              |            |
   |             |              |──update─────>|            |
   |             |              |              |──save─────>|
   |             |<──success────|              |            |
   |<──confirm───|              |              |            |
```

### Notification System
```
User          App            Service        Queue          Database
 ○             ◯              ↺             +────+         ╭─╮
 |             |              |             │    │         │ │
 |──action────>|              |             +────+         ╰─╯
 |             |──process────>|             |              |
 |             |              |──queue──────────────────>|
 |             |<──ack────────|             |              |
 |<──response──|              |             |              |
 |             |              |──save──────────────────────>|
 |             |              |             |              |
```

### Microservices Architecture
```
Client        Gateway        Auth           User           Database
  ○             ◯              ↺              ◯            ╭─╮
  |             |              |              |            │ │
  |──request───>|              |              |            ╰─╯
  |             |──verify─────>|              |            |
  |             |<──token──────|              |            |
  |             |──forward────────────────>|              |
  |             |              |              |──query────>|
  |             |              |              |<──data─────|
  |             |              |              |            |
  |             |<──response────────────────|            |
  |<──data──────|              |              |            |
```

---

## Symbol Specifications

### Participant
- Shape: Rectangle
- Border: 2px, #1f2937
- Fill: White
- Size: Variable (fits label)

### Actor
- Shape: Stick figure
- Stroke: 2px, #1f2937
- Fill: White
- Size: 50x70 pixels

### Boundary
- Shape: Circle with line
- Stroke: 2px, #1f2937
- Fill: White
- Size: 60x60 pixels

### Control
- Shape: Circle with arrow
- Stroke: 2px, #1f2937
- Fill: White
- Arrow: 1.5px, #1f2937
- Size: 60x60 pixels

### Entity
- Shape: Circle with underline
- Stroke: 2px, #1f2937
- Fill: White
- Size: 60x70 pixels

### Database
- Shape: Cylinder
- Stroke: 2px, #1f2937
- Fill: White
- Size: 60x70 pixels

### Collections
- Shape: Rectangle
- Border: 2px, #1f2937
- Fill: White
- Size: Variable

### Queue
- Shape: Rectangle
- Border: 2px, #1f2937
- Fill: White
- Size: Variable

---

## Color Scheme
- **Stroke**: #1f2937 (Dark Gray)
- **Fill**: White
- **Selection**: #3b82f6 (Blue) with dashed border
- **Stroke Width**: 2px

---

## UML Standard Reference

**Source**: UML Distilled by Martin Fowler (3rd Edition)
**Standard**: UML 2.x
**Compliance**: ✅ Full compliance

All elements follow the official UML notation for sequence diagrams.

---

## Summary

ZenUML now supports all 8 UML sequence diagram participant types:

✅ **Participant** - Generic rectangular box
✅ **Actor** - Stick figure for external users
✅ **Boundary** - Circle with line for interfaces
✅ **Control** - Circle with arrow for logic
✅ **Entity** - Circle with underline for objects
✅ **Database** - Cylinder for storage
✅ **Collections** - Rectangle for collections
✅ **Queue** - Rectangle for queues

Plus supporting elements:
✅ **Lifeline** - Vertical timeline
✅ **Message** - Synchronous/asynchronous calls
✅ **Return** - Return values

---

**UML Standard Compliant ✅**

Ready to create professional sequence diagrams! 🚀
