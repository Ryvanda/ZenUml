# UI/UX Style Guide
## ZenUML - Web-Based UML Diagram Editor

**Document Version**: 1.0.0
**Date**: November 18, 2024
**Status**: Draft

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Icons](#icons)
7. [Interactions](#interactions)
8. [Accessibility](#accessibility)
9. [Responsive Design](#responsive-design)

---

## 1. Design Philosophy

### Core Principles

1. **Simplicity**: Clean, uncluttered interface
2. **Consistency**: Uniform design across all pages
3. **Intuitiveness**: Self-explanatory UI elements
4. **Accessibility**: WCAG 2.1 Level AA compliance
5. **Performance**: Fast, responsive interactions
6. **Professionalism**: Modern, polished appearance

### Design Goals

- Minimize learning curve
- Maximize productivity
- Support collaboration
- Enable creativity
- Ensure reliability

---

## 2. Color Palette

### Primary Colors

```
Primary Blue: #3B82F6
  - Used for: Primary actions, links, highlights
  - RGB: 59, 130, 246
  - HSL: 217°, 91%, 60%

Secondary Gray: #6B7280
  - Used for: Secondary text, borders, disabled states
  - RGB: 107, 114, 128
  - HSL: 210°, 9%, 46%

Accent Green: #10B981
  - Used for: Success states, confirmations
  - RGB: 16, 185, 129
  - HSL: 160°, 84%, 39%
```

### Semantic Colors

```
Success: #10B981 (Green)
Warning: #F59E0B (Amber)
Error: #EF4444 (Red)
Info: #3B82F6 (Blue)
```

### Neutral Colors

```
Background: #FFFFFF
Surface: #F9FAFB
Border: #E5E7EB
Text Primary: #1F2937
Text Secondary: #6B7280
Text Disabled: #9CA3AF
```

### Dark Mode

```
Background: #1F2937
Surface: #111827
Border: #374151
Text Primary: #F9FAFB
Text Secondary: #D1D5DB
```

### Usage Guidelines

- Use primary blue for main actions
- Use green for success/positive actions
- Use red for destructive actions
- Use amber for warnings
- Maintain sufficient contrast (WCAG AA)
- Avoid using color alone to convey information

---

## 3. Typography

### Font Family

```
Primary Font: Inter
  - Used for: Body text, UI elements
  - Weights: 400, 500, 600, 700
  - URL: https://fonts.google.com/specimen/Inter

Monospace Font: Fira Code
  - Used for: Code snippets, technical text
  - Weights: 400, 500, 600
  - URL: https://fonts.google.com/specimen/Fira+Code
```

### Font Sizes

```
Display Large: 48px (2rem) - Page titles
Display Medium: 36px (1.5rem) - Section titles
Heading 1: 32px (1.25rem) - Main headings
Heading 2: 24px (1rem) - Subheadings
Heading 3: 20px (0.875rem) - Minor headings
Body Large: 16px (1rem) - Main body text
Body Regular: 14px (0.875rem) - Secondary text
Body Small: 12px (0.75rem) - Captions, hints
```

### Font Weights

```
Light: 300 - Not commonly used
Regular: 400 - Body text
Medium: 500 - Emphasis, labels
Semibold: 600 - Headings, buttons
Bold: 700 - Strong emphasis
```

### Line Height

```
Display: 1.2 (tight)
Heading: 1.3 (tight)
Body: 1.5 (normal)
Code: 1.6 (relaxed)
```

### Letter Spacing

```
Tight: -0.02em
Normal: 0em
Relaxed: 0.02em
```

---

## 4. Spacing & Layout

### Spacing Scale

```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
7: 28px
8: 32px
9: 36px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
```

### Grid System

- 12-column grid
- Gutter: 24px
- Breakpoints:
  - Mobile: 320px
  - Tablet: 768px
  - Desktop: 1024px
  - Large: 1280px

### Padding & Margins

```
Compact: 8px
Normal: 16px
Comfortable: 24px
Spacious: 32px
```

### Container Sizes

```
Small: 640px
Medium: 768px
Large: 1024px
XLarge: 1280px
```

---

## 5. Components

### Buttons

#### Primary Button
```
Background: #3B82F6
Text: White
Padding: 12px 24px
Border Radius: 6px
Font Weight: 600
Hover: #2563EB (darker)
Active: #1D4ED8 (even darker)
Disabled: #D1D5DB (gray)
```

#### Secondary Button
```
Background: #F3F4F6
Text: #1F2937
Border: 1px #E5E7EB
Padding: 12px 24px
Border Radius: 6px
Hover: #E5E7EB
```

#### Danger Button
```
Background: #EF4444
Text: White
Padding: 12px 24px
Border Radius: 6px
Hover: #DC2626
```

### Input Fields

```
Height: 40px
Padding: 10px 12px
Border: 1px #E5E7EB
Border Radius: 6px
Font Size: 14px
Focus: Border #3B82F6, Shadow 0 0 0 3px rgba(59, 130, 246, 0.1)
Error: Border #EF4444
```

### Cards

```
Background: White
Border: 1px #E5E7EB
Border Radius: 8px
Padding: 24px
Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
Hover Shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
```

### Modals

```
Overlay: rgba(0, 0, 0, 0.5)
Background: White
Border Radius: 12px
Box Shadow: 0 20px 25px rgba(0, 0, 0, 0.15)
Padding: 32px
Max Width: 500px
```

### Notifications

```
Success: Background #D1FAE5, Border #10B981, Text #065F46
Warning: Background #FEF3C7, Border #F59E0B, Text #78350F
Error: Background #FEE2E2, Border #EF4444, Text #7F1D1D
Info: Background #DBEAFE, Border #3B82F6, Text #1E3A8A
```

---

## 6. Icons

### Icon Library

- **Primary**: Lucide React
- **Size**: 16px, 20px, 24px, 32px
- **Stroke Width**: 2px
- **Color**: Inherit from text color

### Icon Usage

```
Navigation: 24px
Buttons: 20px
Inline: 16px
Large displays: 32px
```

### Common Icons

- Menu: Menu
- Close: X
- Search: Search
- Settings: Settings
- User: User
- Logout: LogOut
- Save: Save
- Delete: Trash2
- Edit: Edit2
- Add: Plus
- Download: Download
- Upload: Upload

---

## 7. Interactions

### Hover States

- Buttons: Darken by 10%
- Links: Underline appears
- Cards: Shadow increases
- Icons: Color changes to primary

### Focus States

- Outline: 2px solid #3B82F6
- Offset: 2px
- Border Radius: Match element

### Active States

- Buttons: Darken by 20%
- Navigation: Highlight with primary color
- Tabs: Underline appears

### Disabled States

- Opacity: 50%
- Cursor: not-allowed
- Color: Gray (#9CA3AF)

### Loading States

- Spinner: Animated circle
- Duration: 1s per rotation
- Color: Primary blue

### Transitions

```
Default: 200ms ease-in-out
Hover: 150ms ease-out
Modal: 300ms ease-in-out
Collapse: 200ms ease-in-out
```

---

## 8. Accessibility

### WCAG 2.1 Compliance

- **Level AA**: Minimum requirement
- **Contrast Ratio**: 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Always visible
- **Keyboard Navigation**: Full support

### Color Accessibility

- Don't rely on color alone
- Use patterns or text labels
- Sufficient contrast ratios
- Test with color blindness simulators

### Text Accessibility

- Descriptive link text
- Proper heading hierarchy
- Alt text for images
- Captions for videos

### Interactive Elements

- Minimum touch target: 44x44px
- Clear focus indicators
- Keyboard shortcuts documented
- Screen reader support

---

## 9. Responsive Design

### Breakpoints

```
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1279px
Large: 1280px+
```

### Mobile Design

- Single column layout
- Full-width elements
- Larger touch targets (48px)
- Simplified navigation
- Collapsible sections

### Tablet Design

- Two column layout
- Optimized spacing
- Touch-friendly controls
- Responsive grid

### Desktop Design

- Multi-column layout
- Optimal reading width (600-800px)
- Hover states
- Keyboard shortcuts

---

## 10. Design Tokens

### CSS Variables

```css
/* Colors */
--color-primary: #3B82F6;
--color-secondary: #6B7280;
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;

/* Typography */
--font-family-primary: 'Inter', sans-serif;
--font-family-mono: 'Fira Code', monospace;
--font-size-base: 16px;
--line-height-base: 1.5;

/* Spacing */
--spacing-unit: 4px;
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;

/* Border Radius */
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

---

## 11. Component Library

### Available Components

- Button (Primary, Secondary, Danger)
- Input (Text, Email, Password, Number)
- Select (Dropdown)
- Checkbox
- Radio
- Toggle
- Card
- Modal
- Toast/Notification
- Tooltip
- Dropdown Menu
- Tabs
- Accordion
- Badge
- Progress Bar
- Spinner
- Skeleton
- Avatar
- Breadcrumb
- Pagination

---

## 12. Usage Examples

### Button Usage

```jsx
// Primary Button
<Button variant="primary" size="md">
  Save Changes
</Button>

// Secondary Button
<Button variant="secondary" size="md">
  Cancel
</Button>

// Danger Button
<Button variant="danger" size="md">
  Delete
</Button>
```

### Form Usage

```jsx
<Form>
  <FormGroup>
    <Label>Email Address</Label>
    <Input type="email" placeholder="user@example.com" />
  </FormGroup>
  <FormGroup>
    <Label>Password</Label>
    <Input type="password" placeholder="••••••••" />
  </FormGroup>
  <Button type="submit">Sign In</Button>
</Form>
```

---

## 13. Brand Guidelines

### Logo Usage

- Minimum size: 48px
- Clear space: 16px around logo
- Don't distort or rotate
- Use on light or dark backgrounds

### Brand Voice

- Professional yet approachable
- Clear and concise
- Helpful and supportive
- Inclusive and respectful

### Tone

- Friendly
- Confident
- Helpful
- Respectful

---

## 14. Appendices

### A. Design Tools

- Figma: Design and prototyping
- Adobe XD: Alternative design tool
- InVision: Prototyping and collaboration
- Zeplin: Design handoff

### B. Resources

- Material Design: https://material.io
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines
- Web Content Accessibility Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

### C. Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-11-18 | Initial version |

---

**End of UI/UX Style Guide**
