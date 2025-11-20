# Sequence Diagram Symbols - Visual Reference

## UML Standard Symbols as Implemented in ZenUML

---

## Symbol Comparison

### Before vs After

#### ACTOR
```
BEFORE (Generic Icon):          AFTER (UML Standard):
┌──────────────┐                      ○
│      👤      │                     /|\
│    ACTOR     │                     / \
└──────────────┘                    User

Icon: User from Lucide            SVG Stick Figure
Generic representation            UML Standard (Martin Fowler)
```

#### BOUNDARY
```
BEFORE (Generic Icon):          AFTER (UML Standard):
┌──────────────┐                      ◯
│      ◻️       │                      |
│   BOUNDARY   │                   Screen
└──────────────┘

Icon: Square from Lucide          SVG Circle with Line
Generic representation            UML Standard (Martin Fowler)
```

#### CONTROL
```
BEFORE (Generic Icon):          AFTER (UML Standard):
┌──────────────┐                      ◯
│      ◯       │                      
│   CONTROL    │                 Controller
└──────────────┘

Icon: Circle from Lucide          SVG Circle
Generic representation            UML Standard (Martin Fowler)
```

#### ENTITY
```
BEFORE (Generic Icon):          AFTER (UML Standard):
┌──────────────┐                    ╭─╮
│      🗄️       │                    │ │
│    ENTITY    │                    ╰─╯
└──────────────┘                  Database

Icon: Database from Lucide        SVG Cylinder
Generic representation            UML Standard (Martin Fowler)
```

---

## Detailed Symbol Breakdown

### ACTOR - Stick Figure
```
SVG Rendering:

    ○           <- Head (circle)
   /|\          <- Body and arms (lines)
   / \          <- Legs (lines)

Components:
- Head: Circle at (25, 12) with radius 8
- Body: Vertical line from (25, 20) to (25, 38)
- Left Arm: Line from (25, 26) to (10, 32)
- Right Arm: Line from (25, 26) to (40, 32)
- Left Leg: Line from (25, 38) to (15, 60)
- Right Leg: Line from (25, 38) to (35, 60)

Size: 50x70 pixels
Stroke: 2px, #1f2937 (dark gray)
Fill: White
```

### BOUNDARY - Circle with Line
```
SVG Rendering:

    ◯           <- Circle
    |           <- Vertical line through center

Components:
- Circle: Center (30, 30) with radius 20
- Line: Vertical from (30, 10) to (30, 50)

Size: 60x60 pixels
Stroke: 2px, #1f2937 (dark gray)
Fill: White
```

### CONTROL - Circle
```
SVG Rendering:

    ◯           <- Simple circle

Components:
- Circle: Center (30, 30) with radius 20

Size: 60x60 pixels
Stroke: 2px, #1f2937 (dark gray)
Fill: White
```

### ENTITY - Cylinder
```
SVG Rendering:

   ╭─╮         <- Top ellipse
   │ │         <- Vertical lines
   ╰─╯         <- Bottom ellipse

Components:
- Top Ellipse: Center (30, 12), radii 18x8
- Left Line: From (12, 12) to (12, 50)
- Right Line: From (48, 12) to (48, 50)
- Bottom Ellipse: Center (30, 50), radii 18x8

Size: 60x70 pixels
Stroke: 2px, #1f2937 (dark gray)
Fill: White
```

---

## Complete Sequence Diagram with UML Symbols

```
┌─────────────────────────────────────────────────────────────────┐
│                    SEQUENCE DIAGRAM EXAMPLE                     │
└─────────────────────────────────────────────────────────────────┘

    User          Screen         Controller      Database
     ○              ◯              ◯              ╭─╮
     |              |              |              │ │
     |              |              |              ╰─╯
     |              |              |              |
     |──click──────>|              |              |
     |              |              |              |
     |              |──process────>|              |
     |              |              |              |
     |              |              |──query──────>|
     |              |              |              |
     |              |              |<──data───────|
     |              |              |              |
     |              |<──result─────|              |
     |              |              |              |
     |<──display────|              |              |
     |              |              |              |
```

---

## Symbol Legend

```
┌──────────────────────────────────────────────────────────────┐
│                    SYMBOL REFERENCE                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ○ with stick figure = ACTOR (External User/System)         │
│  ◯ with line        = BOUNDARY (Interface/UI)               │
│  ◯                  = CONTROL (Controller/Coordinator)      │
│  ╭─╮ │ │ ╰─╯        = ENTITY (Database/Data)                │
│  |                  = LIFELINE (Timeline)                   │
│  ──>                = MESSAGE (Synchronous)                 │
│  ──>>               = MESSAGE (Asynchronous)                │
│  <──                = RETURN (Return Value)                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Real-World Examples

### Example 1: E-Commerce Purchase
```
Customer       Browser         Server         Payment         Database
   ○              ◯              ◯              ◯              ╭─╮
   |              |              |              |              │ │
   |──browse─────>|              |              |              ╰─╯
   |              |              |              |              |
   |<──display────|              |              |              |
   |              |              |              |              |
   |──add item───>|              |              |              |
   |              |──save───────────────────────────────────>|
   |              |              |              |              |
   |──checkout───>|              |              |              |
   |              |──process────>|              |              |
   |              |              |──charge────>|              |
   |              |              |<──confirm───|              |
   |              |<──success────|              |              |
   |<──confirm────|              |              |              |
   |              |              |              |              |
```

### Example 2: Login Flow
```
User           App            API            Database
 ○              ◯              ◯              ╭─╮
 |              |              |              │ │
 |──login──────>|              |              ╰─╯
 |              |──verify─────>|              |
 |              |              |──query──────>|
 |              |              |<──user───────|
 |              |<──valid──────|              |
 |<──token──────|              |              |
 |              |              |              |
```

### Example 3: File Upload
```
User           Client         Server         Storage
 ○              ◯              ◯              ╭─╮
 |              |              |              │ │
 |──select─────>|              |              ╰─╯
 |              |──upload─────>|              |
 |              |              |──save───────>|
 |              |              |<──path───────|
 |              |<──success────|              |
 |<──confirm────|              |              |
 |              |              |              |
```

---

## Implementation Details

### SVG Rendering
```javascript
// Example: Actor Node
<svg width="50" height="70" viewBox="0 0 50 70">
  {/* Head */}
  <circle cx="25" cy="12" r="8" stroke="#1f2937" strokeWidth="2" fill="white" />
  
  {/* Body */}
  <line x1="25" y1="20" x2="25" y2="38" stroke="#1f2937" strokeWidth="2" />
  
  {/* Left Arm */}
  <line x1="25" y1="26" x2="10" y2="32" stroke="#1f2937" strokeWidth="2" />
  
  {/* Right Arm */}
  <line x1="25" y1="26" x2="40" y2="32" stroke="#1f2937" strokeWidth="2" />
  
  {/* Left Leg */}
  <line x1="25" y1="38" x2="15" y2="60" stroke="#1f2937" strokeWidth="2" />
  
  {/* Right Leg */}
  <line x1="25" y1="38" x2="35" y2="60" stroke="#1f2937" strokeWidth="2" />
</svg>
```

### Selection Highlighting
```javascript
// When selected, a dashed blue border appears
{selected && (
  <rect x="2" y="2" width="46" height="66" 
        fill="none" stroke="#3b82f6" 
        strokeWidth="2" strokeDasharray="4" />
)}
```

---

## Color Specifications

```
Stroke Color:     #1f2937 (Dark Gray)
Fill Color:       White
Selection Color:  #3b82f6 (Blue)
Stroke Width:     2px
Selection Style:  Dashed border (4px dash)
```

---

## Dimensions

| Symbol | Width | Height | Notes |
|--------|-------|--------|-------|
| Actor | 50px | 70px | Stick figure |
| Boundary | 60px | 60px | Circle with line |
| Control | 60px | 60px | Circle |
| Entity | 60px | 70px | Cylinder |

---

## Comparison with Other Tools

### ZenUML (Now)
✅ UML Standard symbols
✅ SVG rendering
✅ Scalable and crisp
✅ Selection highlighting
✅ Connection handles

### Generic Icon Approach (Before)
❌ Not UML standard
❌ Generic icons
❌ Less professional
❌ Confusing for students

---

## UML Standard Compliance

**Reference**: UML Distilled by Martin Fowler (3rd Edition)

All symbols implemented follow the UML 2.x standard notation:
- ✅ Actor: Stick figure representation
- ✅ Boundary: Circle with vertical line
- ✅ Control: Simple circle
- ✅ Entity: Cylinder representation

---

## Usage in ZenUML

### Creating Elements
1. Open/Create Sequence Diagram
2. Select element from Toolbox
3. Click on canvas to place
4. Elements appear with UML standard symbols
5. Double-click to edit label

### Connecting Elements
1. Click Message or Return tool
2. Drag from source to target
3. Message appears as arrow
4. Label automatically added

---

**UML Standard Compliant ✅**

All symbols now follow the official UML notation as described in Martin Fowler's "UML Distilled".
