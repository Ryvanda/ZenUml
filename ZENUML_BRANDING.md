# ZenUML Brand Identity Guide

## Overview
ZenUML is a modern, web-based UML diagramming tool that emphasizes **flexibility** and **real-time collaboration**, inspired by Figma's collaborative approach. The brand identity reflects the core values of simplicity (Zen), technical precision (UML), and seamless teamwork.

---

## Logo & Icon

### Primary Logo
- **File:** `/app/frontend/public/zenuml-logo.svg`
- **Components:** Icon + "ZenUML" wordmark
- **Usage:** Navigation bars, headers, marketing materials

### Standalone Icon
- **File:** `/app/frontend/public/zenuml-icon.svg`
- **File (Favicon):** `/app/frontend/public/favicon.svg`
- **Usage:** Favicons, app icons, small spaces, social media avatars

---

## Design Concept

### 1. **Zen Philosophy**
The logo embodies Zen principles through:
- **Circular Form:** A soft, balanced circle representing harmony and wholeness
- **Minimalist Design:** Clean lines and uncluttered composition for clarity
- **Calm Blue Gradients:** Evoking peace, focus, and professional serenity
- **Smooth Curves:** Rounded corners and organic flow for approachability

### 2. **UML Integration**
Technical precision is represented by:
- **Three Overlapping Rectangles:** Abstract UML class diagram boxes
- **Layered Design:** Hierarchy and structure in modeling
- **Connecting Lines:** Relationships and associations between elements
- **Geometric Precision:** Mathematical accuracy with organic balance

### 3. **Collaboration**
Teamwork is subtly suggested through:
- **Interlocking Elements:** Multiple components working together
- **Transparent Layers:** Shared visibility and concurrent editing
- **Gradient Flow:** Seamless integration between team members
- **Multiple Depths:** Different users working at various levels

### 4. **Flexibility**
Adaptability is conveyed via:
- **Overlapping Forms:** Flexible, non-rigid structure
- **Soft Gradients:** Smooth transitions and responsiveness
- **Scalable Vector Design:** Works at any size without loss of quality
- **Modern Aesthetic:** Forward-thinking, contemporary design language

---

## Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Primary Blue** | `#3b82f6` | Main brand color, primary elements |
| **Light Blue** | `#60a5fa` | Accents, highlights, gradients |
| **Deep Blue** | `#2563eb` | Depth, shadows, emphasis |
| **Sky Blue** | `#93c5fd` | Subtle accents, backgrounds |

### Gradients
- **Primary Gradient:** `#60a5fa` → `#3b82f6` (top-left to bottom-right)
- **Deep Gradient:** `#3b82f6` → `#2563eb` (for depth)
- **Light Gradient:** `#93c5fd` → `#60a5fa` (for softer elements)

---

## Typography

### Wordmark
- **Font:** System-UI, -apple-system, BlinkMacSystemFont, sans-serif
- **"Zen" part:** White (`#ffffff`) - representing clarity and simplicity
- **"UML" part:** Light Blue (`#60a5fa`) - technical precision
- **Weight:** 600 (Semibold)
- **Size:** Scales proportionally (32px base at normal size)

### Characteristics
- Clean, modern sans-serif
- High legibility at all sizes
- Professional yet friendly
- Cross-platform compatibility

---

## Logo Sizes

### Large (40px icon)
- **Use Case:** Hero sections, landing pages, large headers
- **Min Width:** 160px (with text)

### Normal (32px icon) - **DEFAULT**
- **Use Case:** Navigation bars, standard headers, documentation
- **Min Width:** 128px (with text)

### Small (24px icon)
- **Use Case:** Compact UI, mobile navigation, secondary placements
- **Min Width:** 96px (with text)

### Icon Only
- **64px:** App icons, large buttons
- **48px:** Medium buttons, tiles
- **32px:** Standard UI elements
- **24px:** Small UI elements
- **16px:** Favicons, very compact spaces

---

## Usage Guidelines

### ✅ DO
- Use the full logo in navigation bars and headers
- Use the icon alone for favicons, app icons, and constrained spaces
- Maintain clear space around the logo equal to the icon's height
- Use colors from the defined palette
- Ensure high contrast against backgrounds (prefer dark backgrounds)
- Scale proportionally without distortion

### ❌ DON'T
- Don't stretch, rotate, or distort the logo
- Don't use colors outside the defined palette
- Don't place the logo on busy backgrounds that reduce legibility
- Don't add effects (drop shadows, outlines, etc.) to the logo
- Don't alter the spacing between icon and text
- Don't use low-contrast color combinations

---

## Clear Space
Maintain a minimum clear space around the logo equal to **1x the height of the icon** on all sides. This ensures the logo has breathing room and maintains visual impact.

---

## Background Guidelines

### Preferred Backgrounds
1. **Dark Gray/Charcoal:** `#2b2b2c`, `#1e1e1e`, `#252526` (as in the app)
2. **Pure White:** `#ffffff` (for marketing materials)
3. **Dark Gradients:** Similar to the app's gradient backgrounds

### Avoid
- Mid-tone grays (insufficient contrast)
- Busy patterns or images
- Competing gradients

---

## File Locations

All brand assets are located in `/app/frontend/public/`:
- `favicon.svg` - Favicon (24x24 icon)
- `zenuml-icon.svg` - Standalone icon (any size)
- `zenuml-logo.svg` - Full logo with wordmark

React components:
- `/app/frontend/src/components/branding/ZenUMLIcon.jsx`
- `/app/frontend/src/components/branding/ZenUMLLogo.jsx`

---

## Brand Showcase
View the complete brand identity at: `/branding` route in the application.

This page displays:
- Logo variations and sizes
- Icon variations
- Design concept explanation
- Color palette with hex codes
- Usage guidelines

---

## Technical Specifications

### SVG Structure
- **Format:** Scalable Vector Graphics (SVG)
- **Color Space:** RGB
- **Gradients:** Linear gradients for depth and dimension
- **Opacity:** Layered elements with varying opacity (0.6-0.9)
- **Scalability:** Infinite - no pixelation at any size

### React Integration
```jsx
import ZenUMLLogo from './components/branding/ZenUMLLogo';
import ZenUMLIcon from './components/branding/ZenUMLIcon';

// Full logo
<ZenUMLLogo size="normal" />
<ZenUMLLogo size="large" />
<ZenUMLLogo size="small" />

// Icon only
<ZenUMLIcon size={32} />
<ZenUMLIcon size={64} />
```

---

## Brand Personality

### Core Values
1. **Simple** - Easy to use, uncluttered interface
2. **Precise** - Technical accuracy in UML modeling
3. **Collaborative** - Built for teams working together
4. **Flexible** - Adapts to various workflows and needs
5. **Modern** - Contemporary design and technology

### Tone of Voice
- Professional yet approachable
- Clear and concise
- Helpful and empowering
- Technical without being intimidating
- Collaborative and inclusive

---

## Inspiration & Influences

### Similar Tools
- **Figma:** Collaborative design, modern UI, real-time editing
- **StarUML:** UML precision, comprehensive diagram support
- **Lucidchart:** Intuitive diagramming, cloud-based

### Design Influences
- **Minimalism:** Japanese Zen aesthetics
- **Material Design:** Google's design language for depth
- **Flat Design 2.0:** Modern with subtle depth
- **Blue Color Psychology:** Trust, professionalism, technology

---

## Future Considerations

### Potential Variations
- Dark mode logo (if needed on light backgrounds)
- Monochrome version for printing
- Animated logo for loading states
- Icon variations for different diagram types

### Brand Evolution
As ZenUML grows, maintain the core identity while:
- Keeping the circular Zen philosophy
- Preserving the three-box UML metaphor
- Maintaining the blue color palette
- Emphasizing collaboration and flexibility

---

**Version:** 1.0  
**Created:** 2025  
**Last Updated:** 2025  

---

*This brand identity was designed to embody ZenUML's core mission: making UML diagramming simple, collaborative, and flexible for modern development teams.*
