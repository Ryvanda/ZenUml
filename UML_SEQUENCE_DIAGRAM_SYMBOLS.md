# UML Sequence Diagram Symbols - Standard Notation

Based on **"UML Distilled: A Brief Guide to the Standard Object Modeling Language"** by Martin Fowler

---

## UML Standard Symbols for Sequence Diagrams

### 1. ACTOR (Participant)
```
    ○
   /|\
   / \
```

**Visual**: Stick figure (circle head, lines for body and limbs)

**Represents**: External users, external systems, or actors

**Used in**: Sequence diagrams, use case diagrams

**Example**:
```
    ○
   /|\
   / \
   User
```

---

### 2. BOUNDARY
```
    ◯
    |
```

**Visual**: Circle with vertical line through it

**Represents**: System boundary, interface, UI component

**Used in**: Sequence diagrams to show boundary objects

**Example**:
```
    ◯
    |
  Screen
```

---

### 3. CONTROL
```
    ◯
```

**Visual**: Simple circle

**Represents**: Control logic, coordinator, controller object

**Used in**: Sequence diagrams to show control objects

**Example**:
```
    ◯
 Controller
```

---

### 4. ENTITY
```
   ╭─╮
   │ │
   ╰─╯
```

**Visual**: Cylinder (top and bottom ellipse with vertical lines)

**Represents**: Data entity, database, persistent object

**Used in**: Sequence diagrams to show entity objects

**Example**:
```
   ╭─╮
   │ │
   ╰─╯
   Database
```

---

## Complete Sequence Diagram Example

```
Actor          Boundary        Control         Entity
  ○              ◯              ◯              ╭─╮
  |              |              |              │ │
  |              |              |              ╰─╯
  |──request────>|              |              |
  |              |              |              |
  |              |──process────>|              |
  |              |              |              |
  |              |              |──query──────>|
  |              |              |              |
  |              |              |<──data───────|
  |              |              |              |
  |              |<──result─────|              |
  |              |              |              |
  |<──response───|              |              |
  |              |              |              |
```

---

## UML Sequence Diagram Elements

### Participants (Lifelines)
```
Actor          Boundary        Control         Entity
  ○              ◯              ◯              ╭─╮
  |              |              |              │ │
  |              |              |              ╰─╯
  |              |              |              |
  |              |              |              |
  |              |              |              |
```

### Messages
```
Synchronous Message:
  ──────────────>

Asynchronous Message:
  ──────────────>>

Return Message:
  <──────────────

Self-call:
  ┐
  └──────────>
```

### Activation Box
```
  |
  |┌─────────┐
  ||         |
  ||         |
  |└─────────┘
  |
```

---

## Typical Interaction Patterns

### Pattern 1: Web Application
```
User          Browser         Server         Database
 ○              ◯              ◯              ╭─╮
 |              |              |              │ │
 |──click──────>|              |              ╰─╯
 |              |──request────>|              |
 |              |              |──query──────>|
 |              |              |<──data───────|
 |              |<──response───|              |
 |<──display────|              |              |
```

### Pattern 2: Mobile App
```
User           App            API            Database
 ○              ◯              ◯              ╭─╮
 |              |              |              │ │
 |──tap───────>|              |              ╰─╯
 |              |──request────>|              |
 |              |              |──query──────>|
 |              |              |<──data───────|
 |              |<──response───|              |
 |<──update────|              |              |
```

### Pattern 3: Microservices
```
Client         Gateway        Service        Database
 ○              ◯              ◯              ╭─╮
 |              |              |              │ │
 |──request───>|              |              ╰─╯
 |              |──forward────>|              |
 |              |              |──query──────>|
 |              |              |<──data───────|
 |              |<──response───|              |
 |<──result────|              |              |
```

---

## Symbol Reference Table

| Symbol | Name | Represents | Icon |
|--------|------|------------|------|
| ○ with stick figure | Actor | External user/system | 👤 |
| ◯ with line | Boundary | Interface/UI | ◻️ |
| ◯ | Control | Controller/Coordinator | ◯ |
| ╭─╮ │ │ ╰─╯ | Entity | Database/Data | 🗄️ |
| \| | Lifeline | Timeline of object | \| |
| ──> | Message | Synchronous call | → |
| ──>> | Message | Asynchronous call | >> |
| <── | Return | Return value | ← |

---

## Best Practices (from UML Distilled)

### ✅ DO
- Use Actor for external participants
- Use Boundary for UI/interface elements
- Use Control for business logic coordinators
- Use Entity for persistent data objects
- Keep interactions simple and clear
- Label all messages clearly
- Use consistent naming conventions

### ❌ DON'T
- Mix Actor and Boundary roles
- Use Entity for logic
- Create circular dependencies
- Overload Control with too many responsibilities
- Use unclear or ambiguous labels
- Create overly complex diagrams

---

## UML Diagram Types Supporting These Symbols

### 1. **Sequence Diagrams**
Uses: Actor, Boundary, Control, Entity, Lifelines, Messages

### 2. **Use Case Diagrams**
Uses: Actor, System Boundary

### 3. **Collaboration Diagrams**
Uses: Actor, Boundary, Control, Entity, Messages

### 4. **Communication Diagrams**
Uses: Actor, Boundary, Control, Entity, Messages

### 5. **Timing Diagrams**
Uses: Actor, Boundary, Control, Entity, Lifelines

---

## Implementation in ZenUML

### Node Types Implemented
```javascript
// Sequence Diagram Elements
- actorNode       // Stick figure
- boundaryNode    // Circle with line
- controlNode     // Circle
- entityNode      // Cylinder
- lifelineNode    // Vertical line
```

### Visual Rendering
All symbols are rendered using SVG for:
- Crisp, scalable graphics
- UML standard compliance
- Selection highlighting
- Connection handles

---

## Creating a Sequence Diagram

### Step 1: Identify Participants
- Determine who/what participates
- Classify as Actor, Boundary, Control, or Entity
- Add Lifelines

### Step 2: Define Interactions
- Identify message flow
- Determine message types (sync, async, return)
- Add activation boxes

### Step 3: Refine Diagram
- Add labels and descriptions
- Adjust layout for clarity
- Review for completeness

### Step 4: Validate
- Check UML compliance
- Verify message flow logic
- Ensure clarity

---

## Reference

**Book**: UML Distilled: A Brief Guide to the Standard Object Modeling Language
**Author**: Martin Fowler
**Edition**: 3rd Edition (2004)

**Key Chapters**:
- Chapter 2: Sequence Diagrams
- Chapter 3: Collaboration Diagrams
- Chapter 4: Use Case Diagrams

---

## Symbol Specifications

### Actor (Stick Figure)
- Head: Circle (diameter 8 units)
- Body: Vertical line (length 18 units)
- Arms: Two diagonal lines from body
- Legs: Two diagonal lines from body base
- Total height: ~70 units

### Boundary (Circle with Line)
- Circle: Radius 20 units
- Line: Vertical through center
- Total size: 60x60 units

### Control (Circle)
- Circle: Radius 20 units
- Total size: 60x60 units

### Entity (Cylinder)
- Top ellipse: Radius 18x8 units
- Bottom ellipse: Radius 18x8 units
- Height: 50 units
- Total size: 60x70 units

---

## Color Scheme
- **Stroke**: #1f2937 (Dark gray)
- **Fill**: White
- **Selection**: #3b82f6 (Blue)
- **Border**: 2px

---

**UML Standard Compliant ✅**

All symbols follow the UML 2.x standard notation as described in Martin Fowler's "UML Distilled".
