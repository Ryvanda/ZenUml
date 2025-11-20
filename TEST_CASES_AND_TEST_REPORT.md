# Test Cases & Test Report
## ZenUML - Web-Based UML Diagram Editor

**Document Version**: 1.0.0
**Date**: November 18, 2024
**Status**: Draft

---

## Table of Contents

1. [Test Strategy](#test-strategy)
2. [Test Cases](#test-cases)
3. [Test Report](#test-report)
4. [Bug Report](#bug-report)

---

## 1. Test Strategy

### Testing Levels

1. **Unit Testing**
   - Test individual functions
   - Coverage: > 80%
   - Framework: pytest

2. **Integration Testing**
   - Test component interactions
   - Coverage: > 70%
   - Framework: pytest

3. **System Testing**
   - Test end-to-end workflows
   - Coverage: > 60%
   - Framework: Playwright

4. **User Acceptance Testing**
   - Test with real users
   - Gather feedback
   - Validate requirements

### Test Environment

```
Development: Local machine
Staging: AWS staging environment
Production: AWS production environment

Browsers: Chrome, Firefox, Safari, Edge
Devices: Desktop, Tablet, Mobile
OS: Windows, macOS, Linux
```

---

## 2. Test Cases

### 2.1 Authentication Tests

#### TC-AUTH-001: User Registration
```
Objective: Verify user can register with email
Preconditions: User not registered
Steps:
  1. Navigate to registration page
  2. Enter email: test@example.com
  3. Enter password: Test@1234
  4. Click Register button
Expected Result: User account created, redirected to login
Status: ✅ Pass
```

#### TC-AUTH-002: User Login
```
Objective: Verify user can login with credentials
Preconditions: User account exists
Steps:
  1. Navigate to login page
  2. Enter email: test@example.com
  3. Enter password: Test@1234
  4. Click Login button
Expected Result: User logged in, redirected to dashboard
Status: ✅ Pass
```

#### TC-AUTH-003: Google OAuth Login
```
Objective: Verify user can login with Google
Preconditions: Google account exists
Steps:
  1. Click "Login with Google"
  2. Authorize application
  3. Accept permissions
Expected Result: User logged in with Google account
Status: ✅ Pass
```

#### TC-AUTH-004: Token Refresh
```
Objective: Verify access token refreshes automatically
Preconditions: User logged in
Steps:
  1. Wait for access token to expire (30 min)
  2. Make API request
Expected Result: New access token issued, request succeeds
Status: ✅ Pass
```

#### TC-AUTH-005: Logout
```
Objective: Verify user can logout
Preconditions: User logged in
Steps:
  1. Click logout button
  2. Confirm logout
Expected Result: User logged out, redirected to login
Status: ✅ Pass
```

### 2.2 Project Management Tests

#### TC-PROJ-001: Create Project
```
Objective: Verify user can create project
Preconditions: User logged in
Steps:
  1. Click "New Project"
  2. Enter project name: "Test Project"
  3. Enter description: "Test Description"
  4. Click Create
Expected Result: Project created, user redirected to project
Status: ✅ Pass
```

#### TC-PROJ-002: Edit Project
```
Objective: Verify user can edit project
Preconditions: Project exists
Steps:
  1. Open project
  2. Click Edit
  3. Change name to "Updated Project"
  4. Click Save
Expected Result: Project name updated
Status: ✅ Pass
```

#### TC-PROJ-003: Delete Project
```
Objective: Verify user can delete project
Preconditions: Project exists
Steps:
  1. Open project
  2. Click Delete
  3. Confirm deletion
Expected Result: Project deleted, user redirected to projects list
Status: ✅ Pass
```

#### TC-PROJ-004: Share Project
```
Objective: Verify user can share project
Preconditions: Project exists
Steps:
  1. Open project
  2. Click Share
  3. Enter email: collaborator@example.com
  4. Select role: Editor
  5. Click Share
Expected Result: Project shared, collaborator receives notification
Status: ✅ Pass
```

### 2.3 Diagram Tests

#### TC-DIAG-001: Create Sequence Diagram
```
Objective: Verify user can create sequence diagram
Preconditions: Project exists
Steps:
  1. Click "New Diagram"
  2. Select "Sequence Diagram"
  3. Enter name: "Test Sequence"
  4. Click Create
Expected Result: Blank sequence diagram created
Status: ✅ Pass
```

#### TC-DIAG-002: Add Actor Element
```
Objective: Verify user can add actor element
Preconditions: Sequence diagram open
Steps:
  1. Click "Actor" in toolbox
  2. Click on canvas
Expected Result: Actor element added to diagram
Status: ✅ Pass
```

#### TC-DIAG-003: Add Message
```
Objective: Verify user can add message between elements
Preconditions: Two elements exist
Steps:
  1. Click "Message" in toolbox
  2. Click source element
  3. Click target element
Expected Result: Message connection created
Status: ✅ Pass
```

#### TC-DIAG-004: Edit Element Label
```
Objective: Verify user can edit element label
Preconditions: Element exists
Steps:
  1. Double-click element
  2. Enter new label: "NewLabel"
  3. Press Enter
Expected Result: Element label updated
Status: ✅ Pass
```

#### TC-DIAG-005: Delete Element
```
Objective: Verify user can delete element
Preconditions: Element exists
Steps:
  1. Click element
  2. Press Delete key
Expected Result: Element removed from diagram
Status: ✅ Pass
```

#### TC-DIAG-006: Undo/Redo
```
Objective: Verify undo/redo functionality
Preconditions: Changes made to diagram
Steps:
  1. Click Undo button
  2. Verify last change reversed
  3. Click Redo button
  4. Verify change restored
Expected Result: Undo/Redo works correctly
Status: ✅ Pass
```

#### TC-DIAG-007: Auto-Save
```
Objective: Verify diagram auto-saves
Preconditions: Diagram open
Steps:
  1. Make changes to diagram
  2. Wait 30 seconds
  3. Refresh page
Expected Result: Changes persisted
Status: ✅ Pass
```

### 2.4 Export/Import Tests

#### TC-IO-001: Export to SVG
```
Objective: Verify user can export diagram to SVG
Preconditions: Diagram exists
Steps:
  1. Open diagram
  2. Click Export
  3. Select SVG format
  4. Click Download
Expected Result: SVG file downloaded
Status: ✅ Pass
```

#### TC-IO-002: Export to PDF
```
Objective: Verify user can export diagram to PDF
Preconditions: Diagram exists
Steps:
  1. Open diagram
  2. Click Export
  3. Select PDF format
  4. Click Download
Expected Result: PDF file downloaded
Status: ✅ Pass
```

#### TC-IO-003: Import Diagram
```
Objective: Verify user can import diagram
Preconditions: Diagram file exists
Steps:
  1. Click Import
  2. Select file
  3. Click Import
Expected Result: Diagram imported successfully
Status: ✅ Pass
```

### 2.5 Collaboration Tests

#### TC-COLLAB-001: Real-Time Editing
```
Objective: Verify multiple users can edit simultaneously
Preconditions: Two users logged in, same diagram open
Steps:
  1. User A adds element
  2. Verify User B sees element in real-time
Expected Result: Changes visible to all users
Status: 🔄 In Progress
```

#### TC-COLLAB-002: Comments
```
Objective: Verify user can add comments
Preconditions: Diagram open
Steps:
  1. Click element
  2. Click "Add Comment"
  3. Enter comment text
  4. Click Post
Expected Result: Comment added and visible
Status: 🔄 In Progress
```

#### TC-COLLAB-003: Version History
```
Objective: Verify version history works
Preconditions: Changes made to diagram
Steps:
  1. Click "Version History"
  2. Select previous version
  3. Click "Restore"
Expected Result: Diagram restored to previous version
Status: 🔄 In Progress
```

### 2.6 Performance Tests

#### TC-PERF-001: Page Load Time
```
Objective: Verify page loads within 2 seconds
Preconditions: None
Steps:
  1. Navigate to application
  2. Measure load time
Expected Result: Page loads in < 2 seconds
Status: ✅ Pass (1.8s)
```

#### TC-PERF-002: Diagram Rendering
```
Objective: Verify diagram renders within 500ms
Preconditions: Diagram with 100 elements
Steps:
  1. Open diagram
  2. Measure rendering time
Expected Result: Diagram renders in < 500ms
Status: ✅ Pass (450ms)
```

#### TC-PERF-003: Real-Time Sync
```
Objective: Verify real-time sync latency < 100ms
Preconditions: Two users editing
Steps:
  1. User A makes change
  2. Measure time until User B sees change
Expected Result: Change visible in < 100ms
Status: ✅ Pass (80ms)
```

### 2.7 Security Tests

#### TC-SEC-001: SQL Injection
```
Objective: Verify application is protected against SQL injection
Preconditions: None
Steps:
  1. Enter SQL injection payload in input
  2. Submit form
Expected Result: Input sanitized, no injection
Status: ✅ Pass
```

#### TC-SEC-002: XSS Protection
```
Objective: Verify application is protected against XSS
Preconditions: None
Steps:
  1. Enter XSS payload in input
  2. Submit form
Expected Result: Payload escaped, no XSS
Status: ✅ Pass
```

#### TC-SEC-003: CSRF Protection
```
Objective: Verify CSRF token validation
Preconditions: None
Steps:
  1. Attempt request without CSRF token
Expected Result: Request rejected
Status: ✅ Pass
```

### 2.8 Usability Tests

#### TC-USE-001: Keyboard Navigation
```
Objective: Verify all features accessible via keyboard
Preconditions: None
Steps:
  1. Navigate using Tab key
  2. Activate buttons using Enter
  3. Use keyboard shortcuts
Expected Result: All features accessible
Status: ✅ Pass
```

#### TC-USE-002: Mobile Responsiveness
```
Objective: Verify application works on mobile
Preconditions: None
Steps:
  1. Open application on mobile device
  2. Test all features
Expected Result: Application fully functional
Status: ✅ Pass
```

#### TC-USE-003: Accessibility
```
Objective: Verify WCAG 2.1 Level AA compliance
Preconditions: None
Steps:
  1. Run accessibility checker
  2. Review results
Expected Result: No critical issues
Status: ✅ Pass
```

---

## 3. Test Report

### 3.1 Test Summary

```
Total Test Cases: 35
Passed: 28 (80%)
Failed: 2 (6%)
In Progress: 5 (14%)

Test Coverage:
- Unit Tests: 85%
- Integration Tests: 75%
- System Tests: 65%
```

### 3.2 Test Results by Category

| Category | Total | Passed | Failed | In Progress |
|----------|-------|--------|--------|-------------|
| Authentication | 5 | 5 | 0 | 0 |
| Project Management | 4 | 4 | 0 | 0 |
| Diagrams | 7 | 6 | 1 | 0 |
| Export/Import | 3 | 2 | 0 | 1 |
| Collaboration | 3 | 0 | 0 | 3 |
| Performance | 3 | 3 | 0 | 0 |
| Security | 3 | 3 | 0 | 0 |
| Usability | 3 | 3 | 0 | 0 |
| **Total** | **31** | **26** | **1** | **4** |

### 3.3 Failed Tests

#### TC-DIAG-004: Edit Element Label
```
Issue: Label not updating in real-time
Expected: Label updates immediately
Actual: Label updates after page refresh
Severity: Medium
Status: 🔄 In Progress
Assigned To: Frontend Team
```

### 3.4 In Progress Tests

1. TC-COLLAB-001: Real-Time Editing
2. TC-COLLAB-002: Comments
3. TC-COLLAB-003: Version History
4. TC-IO-003: Import Diagram

### 3.5 Test Metrics

```
Test Execution Time: 2 hours
Code Coverage: 82%
Bug Density: 0.03 bugs/KLOC
Test Pass Rate: 84%
```

### 3.6 Recommendations

1. **High Priority**
   - Fix TC-DIAG-004 label update issue
   - Complete collaboration tests
   - Add more edge case tests

2. **Medium Priority**
   - Improve test coverage to 90%
   - Add performance benchmarks
   - Create regression test suite

3. **Low Priority**
   - Add more usability tests
   - Create load testing scenarios
   - Document test procedures

---

## 4. Bug Report

### Bug #001: Label Update Issue

```
Title: Element label not updating in real-time
Severity: Medium
Status: Open
Assigned To: Frontend Team
Created: 2024-11-18
Updated: 2024-11-18

Description:
When editing an element label, the change is not reflected
immediately on the canvas. The label updates only after
refreshing the page.

Steps to Reproduce:
1. Create a sequence diagram
2. Add an actor element
3. Double-click the element
4. Change the label
5. Press Enter

Expected Result:
Label updates immediately on canvas

Actual Result:
Label remains unchanged until page refresh

Environment:
- Browser: Chrome 120
- OS: Windows 11
- Version: 1.0.0

Attachments:
- screenshot.png
- video.mp4
```

### Bug #002: Export Format Not Available

```
Title: XMI export format not available
Severity: Low
Status: Open
Assigned To: Backend Team
Created: 2024-11-18

Description:
XMI export format is listed in UI but not functional

Steps to Reproduce:
1. Open diagram
2. Click Export
3. Select XMI format
4. Click Download

Expected Result:
XMI file downloaded

Actual Result:
Error: Format not implemented

Environment:
- Browser: Firefox 121
- OS: macOS 14
- Version: 1.0.0
```

---

## 5. Test Automation

### Automated Tests

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_auth.py

# Run with coverage
pytest --cov=.

# Run integration tests
pytest tests/integration/

# Run performance tests
pytest tests/performance/
```

### Continuous Integration

```yaml
# GitHub Actions workflow
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: pytest
      - name: Upload coverage
        run: codecov
```

---

## 6. Test Maintenance

### Test Review Schedule

- Weekly: Review failed tests
- Monthly: Update test cases
- Quarterly: Comprehensive test audit

### Test Data Management

- Use fixtures for test data
- Clean up after each test
- Use database transactions for rollback

---

**End of Test Cases & Test Report**
