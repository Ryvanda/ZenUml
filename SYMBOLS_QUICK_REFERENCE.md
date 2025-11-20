# UML Sequence Diagram Symbols - Quick Reference

## Symbol Gallery

### ACTOR - Stick Figure
```
    ○
   /|\
   / \
  User
```
- **Icon**: Stick figure
- **Size**: 50x70 pixels
- **Use**: External users, external systems
- **Example**: Customer, Admin, Mobile App

### BOUNDARY - Circle with Line
```
    ◯
    |
  Screen
```
- **Icon**: Circle with vertical line
- **Size**: 60x60 pixels
- **Use**: System boundaries, interfaces, UI
- **Example**: Web Interface, Mobile Screen, API Gateway

### CONTROL - Circle
```
    ◯
Controller
```
- **Icon**: Simple circle
- **Size**: 60x60 pixels
- **Use**: Control logic, coordinators
- **Example**: Service Manager, Controller, Coordinator

### ENTITY - Cylinder
```
   ╭─╮
   │ │
   ╰─╯
Database
```
- **Icon**: Cylinder (ellipses + lines)
- **Size**: 60x70 pixels
- **Use**: Data entities, databases
- **Example**: Database, Data Store, Cache

---

## Complete Sequence Diagram Template

```
┌─────────────────────────────────────────────────────────────────┐
│                    SEQUENCE DIAGRAM                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Participant1      Participant2      Participant3      Participant4
│       ○                 ◯                  ◯                ╭─╮
│       |                 |                  |                │ │
│       |                 |                  |                ╰─╯
│       |                 |                  |                 |
│       |──message1──────>|                  |                 |
│       |                 |                  |                 |
│       |                 |──message2──────>|                 |
│       |                 |                 |                 |
│       |                 |                 |──message3──────>|
│       |                 |                 |                 |
│       |                 |                 |<──return3───────|
│       |                 |<──return2───────|                 |
│       |<──return1───────|                 |                 |
│       |                 |                 |                 |
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Common Patterns

### Pattern 1: User → System → Database
```
User          System         Database
 ○              ◯              ╭─╮
 |              |              │ │
 |──request────>|              ╰─╯
 |              |──query──────>|
 |              |<──data───────|
 |<──response───|              |
```

### Pattern 2: Client → Server → Service → Database
```
Client        Server         Service        Database
  ○             ◯              ◯              ╭─╮
  |             |              |              │ │
  |──request───>|              |              ╰─╯
  |             |──forward────>|              |
  |             |              |──query──────>|
  |             |              |<──data───────|
  |             |<──result─────|              |
  |<──response──|              |              |
```

### Pattern 3: Multiple Interactions
```
User          UI             Controller      Database
 ○             ◯              ◯              ╭─╮
 |             |              |              │ │
 |──click─────>|              |              ╰─╯
 |             |──process────>|              |
 |             |              |──query──────>|
 |             |              |<──data───────|
 |             |<──result─────|              |
 |<──display───|              |              |
```

---

## Element Characteristics

### Actor (Stick Figure)
```
Characteristics:
✓ Represents external participants
✓ Always at the edge of diagram
✓ Initiates interactions
✓ Can receive responses

Position: Usually leftmost or rightmost
Interactions: Sends and receives messages
Lifeline: Vertical line from actor
```

### Boundary (Circle with Line)
```
Characteristics:
✓ Represents system interface
✓ Mediates between actor and system
✓ Handles user input/output
✓ Translates external to internal

Position: Between actor and control
Interactions: Receives from actor, sends to control
Lifeline: Vertical line from boundary
```

### Control (Circle)
```
Characteristics:
✓ Represents business logic
✓ Coordinates interactions
✓ Makes decisions
✓ Orchestrates flow

Position: Center of diagram
Interactions: Receives from boundary, sends to entity
Lifeline: Vertical line from control
```

### Entity (Cylinder)
```
Characteristics:
✓ Represents persistent data
✓ Stores information
✓ Accessed by control
✓ Returns data on query

Position: Usually rightmost
Interactions: Receives queries, returns data
Lifeline: Vertical line from entity
```

---

## Message Types

```
Synchronous Message (solid arrow):
  ──────────────>

Asynchronous Message (open arrow):
  ──────────────>>

Return Message (dashed arrow):
  <──────────────

Self-call (loop back):
  ┐
  └──────────>
```

---

## Best Practices

### ✅ DO
```
✓ Use Actor for external users/systems
✓ Use Boundary for UI/interfaces
✓ Use Control for business logic
✓ Use Entity for databases/data
✓ Label all messages clearly
✓ Keep interactions simple
✓ Use consistent naming
✓ Follow left-to-right flow
```

### ❌ DON'T
```
✗ Mix Actor and Boundary roles
✗ Use Entity for logic
✗ Create circular dependencies
✗ Overload Control
✗ Use unclear labels
✗ Create overly complex diagrams
✗ Mix different naming conventions
✗ Ignore UML standards
```

---

## Toolbox in ZenUML

### Available Elements
```
Sequence Diagram Toolbox:
├── Actor (○ stick figure)
├── Boundary (◯ with line)
├── Control (◯)
├── Entity (╭─╮ cylinder)
├── Lifeline (|)
├── Message (→)
└── Return (←)
```

### How to Use
1. Open sequence diagram
2. Click element in toolbox
3. Click on canvas to place
4. Double-click to edit label
5. Connect with messages

---

## Real-World Examples

### E-Commerce
```
Customer       Browser         Server         Database
   ○             ◯              ◯              ╭─╮
   |             |              |              │ │
   |──browse────>|              |              ╰─╯
   |<──display───|              |              |
   |──add item──>|──save───────────────────────>|
   |──checkout──>|──process────>|              |
   |             |              |──save───────>|
   |<──confirm───|<──success────|              |
```

### Login Flow
```
User           App            API            Database
 ○             ◯              ◯              ╭─╮
 |             |              |              │ │
 |──login─────>|              |              ╰─╯
 |             |──verify─────>|              |
 |             |              |──query──────>|
 |             |              |<──user───────|
 |             |<──valid──────|              |
 |<──token─────|              |              |
```

### File Upload
```
User           Client         Server         Storage
 ○             ◯              ◯              ╭─╮
 |             |              |              │ │
 |──select────>|              |              ╰─╯
 |             |──upload─────>|              |
 |             |              |──save───────>|
 |             |              |<──path───────|
 |             |<──success────|              |
 |<──confirm───|              |              |
```

---

## Color Scheme

```
Stroke:        #1f2937 (Dark Gray)
Fill:          White
Selection:     #3b82f6 (Blue)
Stroke Width:  2px
```

---

## Dimensions Reference

```
Actor:         50px × 70px
Boundary:      60px × 60px
Control:       60px × 60px
Entity:        60px × 70px
```

---

## SVG Code Examples

### Actor
```svg
<svg width="50" height="70" viewBox="0 0 50 70">
  <circle cx="25" cy="12" r="8" stroke="#1f2937" strokeWidth="2" fill="white" />
  <line x1="25" y1="20" x2="25" y2="38" stroke="#1f2937" strokeWidth="2" />
  <line x1="25" y1="26" x2="10" y2="32" stroke="#1f2937" strokeWidth="2" />
  <line x1="25" y1="26" x2="40" y2="32" stroke="#1f2937" strokeWidth="2" />
  <line x1="25" y1="38" x2="15" y2="60" stroke="#1f2937" strokeWidth="2" />
  <line x1="25" y1="38" x2="35" y2="60" stroke="#1f2937" strokeWidth="2" />
</svg>
```

### Boundary
```svg
<svg width="60" height="60" viewBox="0 0 60 60">
  <circle cx="30" cy="30" r="20" stroke="#1f2937" strokeWidth="2" fill="white" />
  <line x1="30" y1="10" x2="30" y2="50" stroke="#1f2937" strokeWidth="2" />
</svg>
```

### Control
```svg
<svg width="60" height="60" viewBox="0 0 60 60">
  <circle cx="30" cy="30" r="20" stroke="#1f2937" strokeWidth="2" fill="white" />
</svg>
```

### Entity
```svg
<svg width="60" height="70" viewBox="0 0 60 70">
  <ellipse cx="30" cy="12" rx="18" ry="8" stroke="#1f2937" strokeWidth="2" fill="white" />
  <line x1="12" y1="12" x2="12" y2="50" stroke="#1f2937" strokeWidth="2" />
  <line x1="48" y1="12" x2="48" y2="50" stroke="#1f2937" strokeWidth="2" />
  <ellipse cx="30" cy="50" rx="18" ry="8" stroke="#1f2937" strokeWidth="2" fill="white" />
</svg>
```

---

## UML Standard Reference

**Source**: UML Distilled by Martin Fowler (3rd Edition)
**Standard**: UML 2.x
**Compliance**: ✅ Full compliance

---

## Quick Tips

1. **Actor is always external** - Represents users or external systems
2. **Boundary is the interface** - Shows where system starts
3. **Control is the logic** - Coordinates interactions
4. **Entity is the data** - Stores persistent information
5. **Messages flow left-to-right** - Follow natural reading order
6. **Label everything** - Clear communication
7. **Keep it simple** - One interaction per diagram
8. **Follow UML standards** - Professional quality

---

## Troubleshooting

### Symbol not showing?
- Check if element is selected in toolbox
- Verify diagram type is "sequence"
- Try clicking canvas again

### Label not visible?
- Double-click element to edit
- Check label text length
- Verify text color contrast

### Connection not working?
- Use Message or Return tool
- Click source element first
- Then click target element

---

**UML Standard Compliant ✅**

All symbols follow UML 2.x notation as specified in "UML Distilled" by Martin Fowler.

Ready to create professional sequence diagrams! 🚀
