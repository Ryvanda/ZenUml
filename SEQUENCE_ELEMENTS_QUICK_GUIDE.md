# UML Sequence Diagram Elements - Quick Visual Guide

## All 8 Participant Types at a Glance

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SEQUENCE DIAGRAM ELEMENTS                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. PARTICIPANT    2. ACTOR       3. BOUNDARY    4. CONTROL        │
│  +───────────+        ○             ◯              ↺               │
│  │Participant│       /|\            |           (circle           │
│  +───────────+       / \                        + arrow)           │
│  (Rectangle)     (Stick figure) (Circle+line)  (Circle+arrow)     │
│                                                                     │
│  5. ENTITY         6. DATABASE    7. COLLECTIONS  8. QUEUE        │
│     ◯                ╭─╮          +──────────+    +────────+      │
│     ―                │ │          │Collections│   │ Queue  │      │
│  (Circle+line)      ╰─╯          +──────────+    +────────+      │
│                   (Cylinder)      (Rectangle)     (Rectangle)     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Element Reference Card

### 1️⃣ PARTICIPANT
```
Visual:  +─────────────+
         │ Participant │
         +─────────────+

Type:    Rectangle box
Purpose: Generic participant/object
Use:     Services, modules, components
```

### 2️⃣ ACTOR
```
Visual:     ○
           /|\
           / \

Type:    Stick figure
Purpose: External user/system
Use:     People, external systems
```

### 3️⃣ BOUNDARY
```
Visual:     ◯
            |

Type:    Circle with line
Purpose: System boundary/interface
Use:     UI, API gateway
```

### 4️⃣ CONTROL
```
Visual:     ↺
          (circle
           + arrow)

Type:    Circle with arrow
Purpose: Control logic/coordinator
Use:     Business logic, coordinators
```

### 5️⃣ ENTITY
```
Visual:     ◯
            ―

Type:    Circle with underline
Purpose: Domain object/entity
Use:     Business objects
```

### 6️⃣ DATABASE
```
Visual:   ╭─╮
          │ │
          ╰─╯

Type:    Cylinder
Purpose: Persistent storage
Use:     Databases, repositories
```

### 7️⃣ COLLECTIONS
```
Visual:  +──────────+
         │Collections│
         +──────────+

Type:    Rectangle
Purpose: Collection of objects
Use:     Lists, arrays
```

### 8️⃣ QUEUE
```
Visual:  +────────+
         │ Queue  │
         +────────+

Type:    Rectangle
Purpose: Message/event queue
Use:     Async messaging
```

---

## Typical Sequence Diagram

```
User          UI            Service        Entity        Database
 ○             ◯              ↺              ◯            ╭─╮
 |             |              |              |            │ │
 |             |              |              |            ╰─╯
 |──click─────>|              |              |            |
 |             |──process────>|              |            |
 |             |              |──create─────>|            |
 |             |              |              |──save─────>|
 |             |              |              |<──id───────|
 |             |              |<──result─────|            |
 |             |<──display────|              |            |
 |<──show──────|              |              |            |
 |             |              |              |            |
```

---

## When to Use Each Element

| Element | When to Use | Example |
|---------|------------|---------|
| **Participant** | Generic component | Service, Module |
| **Actor** | External user/system | Customer, Admin |
| **Boundary** | UI/Interface | Web Page, Mobile App |
| **Control** | Business logic | Controller, Manager |
| **Entity** | Domain object | Order, User, Product |
| **Database** | Data storage | SQL DB, NoSQL DB |
| **Collections** | Group of objects | User List, Orders |
| **Queue** | Message queue | Event Queue, Task Queue |

---

## Common Patterns

### Pattern 1: Simple Request-Response
```
User → Boundary → Control → Database
 ○      ◯        ↺        ╭─╮
```

### Pattern 2: With Entity
```
User → Boundary → Control → Entity → Database
 ○      ◯        ↺        ◯      ╭─╮
```

### Pattern 3: With Collections
```
User → Boundary → Control → Collections → Database
 ○      ◯        ↺        +──────+     ╭─╮
```

### Pattern 4: With Queue
```
User → Boundary → Control → Queue → Service → Database
 ○      ◯        ↺        +────+   ↺      ╭─╮
```

---

## Toolbox in ZenUML

```
Sequence Diagram Toolbox:
✓ Participant
✓ Actor
✓ Boundary
✓ Control
✓ Entity
✓ Database
✓ Collections
✓ Queue
✓ Lifeline
✓ Message
✓ Return
```

---

## Quick Steps

### 1. Create Diagram
- Open ZenUML
- Create new project
- Add sequence diagram

### 2. Add Elements
- Click element in toolbox
- Click canvas to place
- Repeat for all participants

### 3. Connect Elements
- Select Message tool
- Click source element
- Click target element
- Add label

### 4. Add Returns
- Select Return tool
- Click source element
- Click target element
- Add label

### 5. Finalize
- Edit labels
- Adjust layout
- Save diagram

---

## Symbol Meanings

```
─────────>    Synchronous message
─────────>>   Asynchronous message
<─────────    Return message
┐
└─────────>   Self-call/loop
```

---

## Color Scheme

- **Stroke**: Dark Gray (#1f2937)
- **Fill**: White
- **Selection**: Blue (#3b82f6)
- **Border Width**: 2px

---

## Real-World Example: E-Commerce

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

---

## Best Practices

✅ **DO**
- Use correct element types
- Label all participants
- Keep interactions simple
- Follow left-to-right flow
- Use consistent naming

❌ **DON'T**
- Mix element types
- Use unclear labels
- Create complex diagrams
- Use circular flows
- Overload elements

---

## Reference

**Book**: UML Distilled by Martin Fowler
**Standard**: UML 2.x
**Status**: ✅ Fully Compliant

---

**Ready to create sequence diagrams! 🚀**
