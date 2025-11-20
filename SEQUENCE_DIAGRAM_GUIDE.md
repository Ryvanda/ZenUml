# Sequence Diagram Elements - Visual Guide

## Elements Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   SEQUENCE DIAGRAM ELEMENTS                     │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │  │              │  │              │  │              │
│     👤       │  │      ◻️       │  │      ◯       │  │      🗄️       │
│              │  │              │  │              │  │              │
│    ACTOR     │  │   BOUNDARY   │  │   CONTROL    │  │    ENTITY    │
│              │  │              │  │              │  │              │
│   (User)     │  │ (Interface)  │  │(Coordinator) │  │   (Data)     │
│              │  │              │  │              │  │              │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

---

## Detailed Element Descriptions

### 1. ACTOR 👤
```
┌─────────────────────────────────────────┐
│                                         │
│  Visual Representation:                 │
│  ┌──────────────┐                       │
│  │      👤      │                       │
│  │   ACTOR      │                       │
│  └──────────────┘                       │
│                                         │
│  Icon: User (Lucide React)              │
│  Shape: Circle                          │
│  Size: 48x48 pixels                     │
│  Color: White background, gray border   │
│                                         │
│  Purpose:                               │
│  • Represents external users            │
│  • Represents external systems          │
│  • Starting point of interactions       │
│                                         │
│  Example Uses:                          │
│  • Customer                             │
│  • Admin                                │
│  • External API                         │
│  • Mobile App User                      │
│                                         │
└─────────────────────────────────────────┘
```

### 2. BOUNDARY ◻️
```
┌─────────────────────────────────────────┐
│                                         │
│  Visual Representation:                 │
│  ┌──────────────┐                       │
│  │      ◻️       │                       │
│  │   BOUNDARY   │                       │
│  └──────────────┘                       │
│                                         │
│  Icon: Square (Lucide React)            │
│  Shape: Rectangle                       │
│  Size: 64x48 pixels                     │
│  Color: White background, gray border   │
│                                         │
│  Purpose:                               │
│  • Represents system boundaries         │
│  • Represents UI components             │
│  • Represents interfaces                │
│                                         │
│  Example Uses:                          │
│  • Web Interface                        │
│  • Mobile Screen                        │
│  • API Gateway                          │
│  • System Boundary                      │
│                                         │
└─────────────────────────────────────────┘
```

### 3. CONTROL ◯
```
┌─────────────────────────────────────────┐
│                                         │
│  Visual Representation:                 │
│  ┌──────────────┐                       │
│  │      ◯       │                       │
│  │   CONTROL    │                       │
│  └──────────────┘                       │
│                                         │
│  Icon: Circle (Lucide React)            │
│  Shape: Circle                          │
│  Size: 56x56 pixels                     │
│  Color: White background, gray border   │
│                                         │
│  Purpose:                               │
│  • Represents control logic             │
│  • Represents coordinators              │
│  • Represents business logic            │
│                                         │
│  Example Uses:                          │
│  • Controller                           │
│  • Service Manager                      │
│  • Coordinator                          │
│  • Business Logic Handler               │
│                                         │
└─────────────────────────────────────────┘
```

### 4. ENTITY 🗄️
```
┌─────────────────────────────────────────┐
│                                         │
│  Visual Representation:                 │
│  ┌──────────────┐                       │
│  │      🗄️       │                       │
│  │    ENTITY    │                       │
│  └──────────────┘                       │
│                                         │
│  Icon: Database (Lucide React)          │
│  Shape: Rectangle                       │
│  Size: 64x48 pixels                     │
│  Color: White background, gray border   │
│                                         │
│  Purpose:                               │
│  • Represents data entities             │
│  • Represents databases                 │
│  • Represents data models               │
│                                         │
│  Example Uses:                          │
│  • Database                             │
│  • Data Store                           │
│  • Entity Object                        │
│  • Cache                                │
│                                         │
└─────────────────────────────────────────┘
```

---

## Typical Sequence Diagram Pattern

```
┌────────────────────────────────────────────────────────────────┐
│                    TYPICAL INTERACTION FLOW                    │
└────────────────────────────────────────────────────────────────┘

    Actor          Boundary        Control         Entity
     👤              ◻️              ◯              🗄️
     │               │               │              │
     │──request──────>│               │              │
     │               │               │              │
     │               │──process─────>│              │
     │               │               │              │
     │               │               │──query──────>│
     │               │               │              │
     │               │               │<──data───────│
     │               │               │              │
     │               │<──result──────│              │
     │               │               │              │
     │<──response────│               │              │
     │               │               │              │
```

---

## Sequence Diagram Creation Steps

### Step 1: Create Diagram
```
1. Open ZenUML
2. Create new project
3. Add sequence diagram
```

### Step 2: Add Elements
```
Toolbox (Left Sidebar):
├── Actor (👤)
├── Boundary (◻️)
├── Control (◯)
├── Entity (🗄️)
├── Lifeline (|)
├── Message (→)
└── Return (←)
```

### Step 3: Connect Elements
```
1. Click on Actor
2. Click Message
3. Connect to Boundary
4. Continue connecting elements
5. Add return messages
```

### Step 4: Label Elements
```
1. Double-click element
2. Enter label name
3. Press Enter
4. Repeat for all elements
```

---

## Common Sequence Diagram Scenarios

### Scenario 1: Web Application
```
User          Browser         Server         Database
(Actor)       (Boundary)      (Control)      (Entity)
  │              │              │              │
  │──click──────>│              │              │
  │              │──request────>│              │
  │              │              │──query──────>│
  │              │              │<──data───────│
  │              │<──response───│              │
  │<──display────│              │              │
  │              │              │              │
```

### Scenario 2: Mobile App
```
User           App            API            Database
(Actor)       (Boundary)     (Control)      (Entity)
  │             │              │              │
  │──tap───────>│              │              │
  │             │──request────>│              │
  │             │              │──query──────>│
  │             │              │<──data───────│
  │             │<──response───│              │
  │<──update────│              │              │
  │             │              │              │
```

### Scenario 3: Microservices
```
Client         Gateway        Service        Database
(Actor)       (Boundary)     (Control)      (Entity)
  │             │              │              │
  │──request───>│              │              │
  │             │──forward────>│              │
  │             │              │──query──────>│
  │             │              │<──data───────│
  │             │<──response───│              │
  │<──result────│              │              │
  │             │              │              │
```

---

## Element Interactions

### Message Types
```
Synchronous Message:  ────────>
Asynchronous Message: ──────>>
Return Message:       <───────
Self-call:            ┐
                      └──────>
```

### Lifeline
```
Actor       Boundary    Control     Entity
  │           │           │           │
  │───────────┼───────────┼───────────│
  │           │           │           │
  │           │           │           │
  │───────────┼───────────┼───────────│
  │           │           │           │
```

---

## Best Practices

### ✅ DO
- Use Actor for external users/systems
- Use Boundary for interfaces/UI
- Use Control for business logic
- Use Entity for data/databases
- Label all elements clearly
- Keep interactions simple
- Use consistent naming

### ❌ DON'T
- Mix Actor and Boundary roles
- Overload Control with too many responsibilities
- Use Entity for logic
- Create too many elements
- Use unclear labels
- Create circular dependencies

---

## Toolbox Access

### In ZenUML:
```
1. Open/Create Sequence Diagram
2. Look at Left Sidebar
3. Find "Toolbox" section
4. See all available elements:
   ✓ Actor
   ✓ Boundary
   ✓ Control
   ✓ Entity
   ✓ Lifeline
   ✓ Message
   ✓ Return
```

---

## Quick Reference

| Element | Icon | Type | Purpose |
|---------|------|------|---------|
| Actor | 👤 | actorNode | External user/system |
| Boundary | ◻️ | boundaryNode | Interface/UI |
| Control | ◯ | controlNode | Business logic |
| Entity | 🗄️ | entityNode | Data/Database |
| Lifeline | \| | lifelineNode | Vertical timeline |
| Message | → | message | Synchronous call |
| Return | ← | return | Return value |

---

## Summary

You now have all 4 main sequence diagram elements:
- ✅ **Actor** - Represents users and external systems
- ✅ **Boundary** - Represents system boundaries and interfaces
- ✅ **Control** - Represents control logic and coordinators
- ✅ **Entity** - Represents data entities and databases

Use these elements to create comprehensive sequence diagrams showing interactions between different parts of your system!

---

**Ready to create sequence diagrams! 🚀**
