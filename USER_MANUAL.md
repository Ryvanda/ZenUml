# User Manual
## ZenUML - Web-Based UML Diagram Editor

**Version**: 1.0.0
**Date**: November 18, 2024

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating Diagrams](#creating-diagrams)
3. [Editing Diagrams](#editing-diagrams)
4. [Collaboration](#collaboration)
5. [Export & Import](#export--import)
6. [Tips & Tricks](#tips--tricks)
7. [Troubleshooting](#troubleshooting)
8. [FAQ](#faq)

---

## 1. Getting Started

### 1.1 Signing Up

1. Visit [https://zenuml.com](https://zenuml.com)
2. Click **"Sign Up"**
3. Choose sign-up method:
   - **Google**: Click "Sign up with Google"
   - **GitHub**: Click "Sign up with GitHub"
   - **Email**: Enter email and password
4. Verify your email (if using email signup)
5. Complete your profile

### 1.2 Logging In

1. Visit [https://zenuml.com](https://zenuml.com)
2. Click **"Sign In"**
3. Choose login method
4. Enter credentials
5. Click **"Sign In"**

### 1.3 Dashboard Overview

```
┌─────────────────────────────────────────────────┐
│  ZenUML                              [Profile]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Welcome, [Your Name]!                          │
│                                                 │
│  ┌──────────────────┐  ┌──────────────────┐    │
│  │ New Project      │  │ Recent Projects  │    │
│  │ [+ Button]       │  │ - Project 1      │    │
│  └──────────────────┘  │ - Project 2      │    │
│                        │ - Project 3      │    │
│                        └──────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 2. Creating Diagrams

### 2.1 Create a New Project

1. Click **"New Project"** button
2. Enter project name (required)
3. Enter project description (optional)
4. Click **"Create"**
5. You're now in your project

### 2.2 Create a Diagram

1. In your project, click **"New Diagram"**
2. Select diagram type:
   - **Class Diagram** - Define classes and relationships
   - **Use Case Diagram** - Model system functionality
   - **Sequence Diagram** - Show object interactions
3. Enter diagram name
4. Click **"Create"**
5. Blank diagram opens in editor

### 2.3 Diagram Editor Interface

```
┌──────────────────────────────────────────────────────┐
│  [Project] > [Diagram]  [Save] [Export] [Share]     │
├──────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌────────────────────────────────────┐ │
│ │ Toolbox  │ │                                    │ │
│ │          │ │         Canvas Area                │ │
│ │ - Actor  │ │                                    │ │
│ │ - Boundary│ │                                    │ │
│ │ - Control│ │                                    │ │
│ │ - Entity │ │                                    │ │
│ │ - Message│ │                                    │ │
│ │          │ │                                    │ │
│ └──────────┘ └────────────────────────────────────┘ │
│              ┌────────────────────────────────────┐ │
│              │ Properties Panel                   │ │
│              │ - Name: [input]                    │ │
│              │ - Color: [picker]                  │ │
│              │ - Style: [options]                 │ │
│              └────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

## 3. Editing Diagrams

### 3.1 Adding Elements

#### For Sequence Diagrams:

1. **Add Actor**
   - Click "Actor" in toolbox
   - Click on canvas where you want it
   - Actor appears with default name

2. **Add Boundary**
   - Click "Boundary" in toolbox
   - Click on canvas
   - Boundary element added

3. **Add Control**
   - Click "Control" in toolbox
   - Click on canvas
   - Control element added

4. **Add Entity**
   - Click "Entity" in toolbox
   - Click on canvas
   - Entity element added

5. **Add Message**
   - Click "Message" in toolbox
   - Click on source element
   - Click on target element
   - Message connection created

### 3.2 Editing Elements

#### Rename Element:
1. Double-click element
2. Type new name
3. Press Enter

#### Change Color:
1. Select element
2. In Properties panel, click color picker
3. Choose new color
4. Click outside to apply

#### Delete Element:
1. Click element to select
2. Press Delete key
   OR
3. Right-click and select "Delete"

### 3.3 Connecting Elements

1. Click "Message" tool
2. Click source element
3. Click target element
4. Connection created with arrow

### 3.4 Undo/Redo

- **Undo**: Press `Ctrl+Z` or click Undo button
- **Redo**: Press `Ctrl+Y` or click Redo button
- Up to 50 steps of undo/redo available

### 3.5 Zoom & Pan

- **Zoom In**: `Ctrl+Scroll` or `+` button
- **Zoom Out**: `Ctrl+Scroll` or `-` button
- **Fit to Screen**: Click "Fit" button
- **Pan**: Click and drag canvas

---

## 4. Collaboration

### 4.1 Share Diagram

1. Open diagram
2. Click **"Share"** button
3. Enter collaborator's email
4. Select permission level:
   - **Viewer** - Can view only
   - **Editor** - Can edit
   - **Admin** - Can manage permissions
5. Click **"Share"**
6. Collaborator receives notification

### 4.2 Real-Time Collaboration

- When multiple users edit same diagram:
  - See live cursor positions
  - See changes in real-time
  - Automatic conflict resolution
  - See who made each change

### 4.3 Comments

1. Click element or diagram area
2. Click **"Add Comment"** button
3. Type comment text
4. Click **"Post"**
5. Comment appears with your name and timestamp

#### Reply to Comment:
1. Click "Reply" on comment
2. Type reply text
3. Click "Post"

### 4.4 Version History

1. Click **"Version History"** button
2. See list of all versions with timestamps
3. Click version to preview
4. Click **"Restore"** to revert to that version

---

## 5. Export & Import

### 5.1 Export Diagram

1. Open diagram
2. Click **"Export"** button
3. Select format:
   - **SVG** - Vector graphics (recommended)
   - **PNG** - Raster image
   - **PDF** - Document format
   - **XMI** - UML standard format
   - **StarUML** - StarUML format
4. Click **"Download"**
5. File downloads to your computer

### 5.2 Import Diagram

1. In project, click **"Import"**
2. Select file to import:
   - Supported formats: UML, XMI, StarUML, Lucidchart, Draw.io
3. Click **"Import"**
4. Diagram imported and added to project

### 5.3 Export Project

1. In project view, click **"Export Project"**
2. Select format
3. Click **"Download"**
4. All diagrams exported together

---

## 6. Tips & Tricks

### 6.1 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+C` | Copy |
| `Ctrl+V` | Paste |
| `Ctrl+X` | Cut |
| `Delete` | Delete selected |
| `Tab` | Next element |
| `Shift+Tab` | Previous element |

### 6.2 Best Practices

1. **Use Meaningful Names**
   - Clear, descriptive element names
   - Helps others understand diagram

2. **Keep Diagrams Simple**
   - One concept per diagram
   - Avoid clutter
   - Use multiple diagrams if needed

3. **Use Consistent Styling**
   - Same colors for similar elements
   - Consistent naming conventions
   - Aligned layout

4. **Document Complex Relationships**
   - Add comments explaining logic
   - Use descriptive message labels
   - Document assumptions

5. **Version Regularly**
   - Save versions at milestones
   - Add meaningful version messages
   - Easy to track changes

### 6.3 Productivity Tips

- **Duplicate Elements**: Select element, press `Ctrl+D`
- **Align Elements**: Select multiple, use alignment tools
- **Group Elements**: Select multiple, press `Ctrl+G`
- **Quick Zoom**: Double-click element to zoom to it
- **Search**: Use `Ctrl+F` to find elements

---

## 7. Troubleshooting

### Issue: Can't Save Diagram

**Solution**:
1. Check internet connection
2. Verify you have edit permission
3. Try refreshing page
4. Clear browser cache
5. Try different browser

### Issue: Elements Not Appearing

**Solution**:
1. Check zoom level (might be zoomed out too far)
2. Click "Fit to Screen" button
3. Refresh page
4. Check if elements are off-canvas

### Issue: Slow Performance

**Solution**:
1. Reduce number of elements (split into multiple diagrams)
2. Close other browser tabs
3. Clear browser cache
4. Update browser to latest version
5. Try different browser

### Issue: Can't Export

**Solution**:
1. Check file format is supported
2. Verify diagram has content
3. Check browser download settings
4. Try different format
5. Contact support if issue persists

### Issue: Collaboration Not Working

**Solution**:
1. Verify collaborator has access
2. Check both users are viewing same diagram
3. Refresh page
4. Check internet connection
5. Try different browser

---

## 8. FAQ

### Q: Is ZenUML free?
**A**: Yes! ZenUML offers a free tier with up to 5 projects. Premium plans available for advanced features.

### Q: Can I use ZenUML offline?
**A**: Currently, ZenUML requires internet connection. Offline support coming soon.

### Q: How do I delete my account?
**A**: Go to Settings > Account > Delete Account. This will delete all your data.

### Q: Can I export my diagrams?
**A**: Yes! Export to SVG, PNG, PDF, XMI, or StarUML formats.

### Q: How many people can collaborate on one diagram?
**A**: Unlimited! As many people as you want can collaborate simultaneously.

### Q: Is my data secure?
**A**: Yes! We use industry-standard encryption and security practices. See our Security Policy for details.

### Q: Can I import diagrams from other tools?
**A**: Yes! We support importing from StarUML, XMI, Lucidchart, and Draw.io.

### Q: How do I get help?
**A**: Visit our Help Center, email support@zenuml.com, or check FAQ section.

### Q: Can I use ZenUML for commercial projects?
**A**: Yes! ZenUML can be used for commercial projects. See License for details.

### Q: How often is ZenUML updated?
**A**: We release updates monthly with new features and improvements.

### Q: Can I embed diagrams in my website?
**A**: Yes! Use the embed feature to add diagrams to your website or documentation.

### Q: What browsers are supported?
**A**: Chrome, Firefox, Safari, and Edge (latest 2 versions recommended).

### Q: How do I report a bug?
**A**: Click Help > Report Bug or email bugs@zenuml.com with details.

### Q: Can I customize colors and styles?
**A**: Yes! Use the Properties panel to customize colors, fonts, and styles.

### Q: How do I backup my diagrams?
**A**: Use Export feature to download diagrams. We also auto-backup all data.

### Q: Is there a mobile app?
**A**: Mobile app coming soon! Currently works on mobile web browser.

---

## 9. Getting Help

### Support Channels

- **Email**: support@zenuml.com
- **Chat**: Live chat on website
- **Documentation**: https://docs.zenuml.com
- **Community**: https://community.zenuml.com
- **Twitter**: @ZenUML

### Reporting Issues

1. Click Help > Report Issue
2. Describe the problem
3. Include screenshots if possible
4. Click Submit
5. We'll respond within 24 hours

### Feature Requests

1. Click Help > Request Feature
2. Describe the feature
3. Explain why you need it
4. Click Submit
5. We'll review and consider for future releases

---

## 10. Keyboard Shortcuts Reference

### Navigation
- `Home` - Go to dashboard
- `Ctrl+N` - New diagram
- `Ctrl+O` - Open diagram
- `Ctrl+,` - Settings

### Editing
- `Ctrl+Z` - Undo
- `Ctrl+Y` - Redo
- `Ctrl+C` - Copy
- `Ctrl+V` - Paste
- `Ctrl+X` - Cut
- `Ctrl+D` - Duplicate
- `Delete` - Delete selected
- `Ctrl+A` - Select all

### View
- `Ctrl++` - Zoom in
- `Ctrl+-` - Zoom out
- `Ctrl+0` - Reset zoom
- `Ctrl+1` - Fit to screen
- `Space` - Pan mode

### Collaboration
- `Ctrl+Shift+S` - Share
- `Ctrl+Shift+C` - Add comment
- `Ctrl+Shift+H` - Version history

---

## 11. Glossary

| Term | Definition |
|------|-----------|
| **Diagram** | Visual representation of system using UML notation |
| **Element** | Basic building block (class, actor, etc.) |
| **Relationship** | Connection between elements |
| **Collaboration** | Multiple users working on same diagram |
| **Export** | Save diagram in different format |
| **Import** | Load diagram from file |
| **Version** | Snapshot of diagram at specific time |
| **Comment** | Annotation or note on diagram |

---

## 12. Additional Resources

- **UML Tutorial**: https://www.tutorialspoint.com/uml/
- **UML Specification**: https://www.omg.org/spec/UML/
- **Martin Fowler UML**: https://martinfowler.com/books/uml.html
- **Best Practices**: https://docs.zenuml.com/best-practices

---

**Need help? Contact support@zenuml.com**

**Last Updated**: November 18, 2024
**Version**: 1.0.0

---

[⬆ Back to top](#user-manual)
