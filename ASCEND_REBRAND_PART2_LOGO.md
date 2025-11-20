# Ascend Rebrand: Part 2 - Logo Replacement Strategy

**Version:** 1.0  
**Date:** November 2025  
**Status:** Production Implementation Guide

---

## 1. New Logo Overview

**Logo Details:**
- **Name:** Ascend Logo Mark
- **Style:** Modern, gradient, flowing design
- **Colors:** Purple (#6B46C1) to Dark Navy (#1E1B4B) gradient
- **Format:** SVG (scalable, lightweight)
- **Variants:** Full logo, mark only, dark mode, light mode, monochrome

---

## 2. Asset Folder Structure

**Recommended Structure:**

```
frontend/
├── public/
│   ├── assets/
│   │   ├── logos/
│   │   │   ├── v2/                          # New Ascend logo
│   │   │   │   ├── ascend-logo-full.svg
│   │   │   │   ├── ascend-logo-mark.svg
│   │   │   │   ├── ascend-logo-dark.svg
│   │   │   │   ├── ascend-logo-light.svg
│   │   │   │   ├── ascend-logo-mono.svg
│   │   │   │   └── metadata.json
│   │   │   │
│   │   │   └── v1/                          # Old ZenUML logo (deprecated)
│   │   │       ├── zenuml-logo-full.svg
│   │   │       └── zenuml-logo-mark.svg
│   │   │
│   │   ├── favicons/
│   │   │   ├── favicon-v2-16.ico
│   │   │   ├── favicon-v2-32.ico
│   │   │   ├── favicon-v2-64.ico
│   │   │   ├── favicon-v2-apple-180.png
│   │   │   └── favicon-v2.svg
│   │   │
│   │   └── branding/
│   │       ├── color-palette.json
│   │       └── typography.json
│   │
│   ├── favicon.ico                          # Symlink to v2
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── branding/
│   │   │   ├── AscendLogo.jsx
│   │   │   ├── AscendLogoMark.jsx
│   │   │   ├── LogoSwitcher.jsx
│   │   │   └── __tests__/
│   │   │       └── AscendLogo.test.jsx
│   │   │
│   │   └── legacy/
│   │       ├── ZenUMLLogo.jsx
│   │       └── ZenUMLIcon.jsx
│   │
│   ├── hooks/
│   │   └── useLogo.js
│   │
│   └── constants/
│       └── branding.js
```

---

## 3. Logo Metadata

**frontend/public/assets/logos/v2/metadata.json:**

```json
{
  "name": "Ascend",
  "version": "2.0.0",
  "releaseDate": "2025-11-20",
  "variants": {
    "full": {
      "file": "ascend-logo-full.svg",
      "description": "Full logo with mark and text",
      "minWidth": 128,
      "aspectRatio": "4:1"
    },
    "mark": {
      "file": "ascend-logo-mark.svg",
      "description": "Logo mark only",
      "minWidth": 32,
      "aspectRatio": "1:1"
    },
    "dark": {
      "file": "ascend-logo-dark.svg",
      "description": "Dark mode variant",
      "minWidth": 128,
      "aspectRatio": "4:1"
    },
    "light": {
      "file": "ascend-logo-light.svg",
      "description": "Light mode variant",
      "minWidth": 128,
      "aspectRatio": "4:1"
    },
    "monochrome": {
      "file": "ascend-logo-mono.svg",
      "description": "Monochrome for printing",
      "minWidth": 128,
      "aspectRatio": "4:1"
    }
  },
  "colors": {
    "primary": "#6B46C1",
    "secondary": "#1E1B4B",
    "gradient": "linear-gradient(135deg, #6B46C1 0%, #1E1B4B 100%)"
  }
}
```

---

## 4. Logo Components

### 4.1 Full Logo Component

**frontend/src/components/branding/AscendLogo.jsx:**

```jsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export function AscendLogo({ size = 'normal', variant = 'full' }) {
  const { isDarkMode } = useTheme();
  
  const sizeMap = {
    small: 24,
    normal: 32,
    large: 40
  };
  
  const logoPath = isDarkMode 
    ? '/assets/logos/v2/ascend-logo-dark.svg'
    : '/assets/logos/v2/ascend-logo-light.svg';
  
  return (
    <img
      src={logoPath}
      alt="Ascend"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className="logo-ascend"
      data-testid="ascend-logo"
    />
  );
}
```

### 4.2 Logo Mark Component

**frontend/src/components/branding/AscendLogoMark.jsx:**

```jsx
import React from 'react';

export function AscendLogoMark({ size = 32 }) {
  return (
    <img
      src="/assets/logos/v2/ascend-logo-mark.svg"
      alt="Ascend"
      width={size}
      height={size}
      className="logo-mark"
      data-testid="ascend-logo-mark"
    />
  );
}
```

### 4.3 Feature Flag Component (Gradual Rollout)

**frontend/src/components/branding/LogoSwitcher.jsx:**

```jsx
import React from 'react';
import { AscendLogo } from './AscendLogo';
import { ZenUMLLogo } from '../legacy/ZenUMLLogo';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';

export function LogoSwitcher({ size = 'normal' }) {
  const { isEnabled: useNewLogo } = useFeatureFlag('ascend_rebrand');
  
  return useNewLogo 
    ? <AscendLogo size={size} />
    : <ZenUMLLogo size={size} />;
}
```

---

## 5. Update Logo References

### 5.1 Navigation Bar

**Before:**
```jsx
import ZenUMLLogo from './components/branding/ZenUMLLogo';

export function TopNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <ZenUMLLogo size="normal" />
      </div>
    </nav>
  );
}
```

**After:**
```jsx
import { AscendLogo } from './components/branding/AscendLogo';

export function TopNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <AscendLogo size="normal" />
      </div>
    </nav>
  );
}
```

### 5.2 Favicon Updates

**frontend/public/index.html:**

```html
<!-- Old -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

<!-- New -->
<link rel="icon" href="/assets/favicons/favicon-v2.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/assets/favicons/favicon-v2-apple-180.png" />
<link rel="icon" type="image/x-icon" href="/assets/favicons/favicon-v2-16.ico" />
```

### 5.3 Search & Replace Checklist

**Files to Update:**

| File | Search | Replace |
|------|--------|---------|
| `src/components/TopNavbar.jsx` | `ZenUMLLogo` | `AscendLogo` |
| `src/components/Footer.jsx` | `zenuml-logo` | `ascend-logo` |
| `src/App.js` | `ZenUML` | `Ascend` |
| `src/index.js` | `ZenUML` | `Ascend` |
| `public/index.html` | `ZenUML` | `Ascend` |
| `public/manifest.json` | `ZenUML` | `Ascend` |
| `README.md` | `ZenUML` | `Ascend` |

**Search Command:**
```bash
grep -r "zenuml-logo\|ZenUMLLogo\|ZenUML" frontend/src --include="*.jsx" --include="*.js"
```

---

## 6. Cache Busting Strategy

### 6.1 Asset Versioning

**Approach 1: Query Parameter (Simple)**
```jsx
<img src="/assets/logos/v2/ascend-logo.svg?v=2.0.0" alt="Ascend" />
```

**Approach 2: Content Hash (Recommended)**
```jsx
// webpack.config.js
output: {
  filename: '[name].[contenthash].js',
  assetModuleFilename: 'assets/[name].[hash][ext]'
}
```

### 6.2 CDN Cache Invalidation

**For Netlify:**
```bash
# Invalidate specific path
netlify deploy --prod --dir=build

# Or use Netlify UI to purge cache
```

**For AWS CloudFront:**
```bash
aws cloudfront create-invalidation \
  --distribution-id E1234ABCD \
  --paths "/assets/logos/*" "/favicon.ico"
```

### 6.3 Service Worker Update

**frontend/src/serviceWorker.js:**
```javascript
// Increment version on logo update
const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `ascend-${CACHE_VERSION}`;

// Clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => !name.includes(CACHE_VERSION))
          .map(name => caches.delete(name))
      );
    })
  );
});
```

---

## 7. Dark/Light Mode Support

### 7.1 Theme-Aware Logo Component

**frontend/src/components/branding/AscendLogo.jsx (Enhanced):**

```jsx
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

export function AscendLogo({ size = 'normal' }) {
  const { isDarkMode } = useTheme();
  const [logoPath, setLogoPath] = useState('');

  useEffect(() => {
    // Determine logo based on theme
    const path = isDarkMode
      ? '/assets/logos/v2/ascend-logo-dark.svg'
      : '/assets/logos/v2/ascend-logo-light.svg';
    
    setLogoPath(path);
  }, [isDarkMode]);

  const sizeMap = {
    small: 24,
    normal: 32,
    large: 40
  };

  return (
    <img
      src={logoPath}
      alt="Ascend"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className="logo-ascend"
      data-testid="ascend-logo"
    />
  );
}
```

### 7.2 CSS-based Theme Support

**frontend/src/styles/branding.css:**

```css
.logo-ascend {
  transition: opacity 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  .logo-ascend {
    filter: brightness(1.1);
  }
}

@media (prefers-color-scheme: light) {
  .logo-ascend {
    filter: brightness(0.9);
  }
}
```

---

## 8. Fallback & Error Handling

### 8.1 Image Fallback

```jsx
export function AscendLogo({ size = 'normal' }) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.error('Failed to load Ascend logo');
    setHasError(true);
  };

  if (hasError) {
    return <div className="logo-fallback">Ascend</div>;
  }

  return (
    <img
      src="/assets/logos/v2/ascend-logo-full.svg"
      alt="Ascend"
      onError={handleError}
      width={32}
      height={32}
    />
  );
}
```

### 8.2 Preload Critical Assets

**frontend/public/index.html:**

```html
<link rel="preload" as="image" href="/assets/logos/v2/ascend-logo-full.svg" />
<link rel="preload" as="image" href="/assets/favicons/favicon-v2.svg" />
```

---

## 9. Backend Logo References

### 9.1 Update API Responses

**Before:**
```python
# backend/routes/status.py
@router.get("/api/status")
async def get_status():
    return {
        "app_name": "ZenUML",
        "logo_url": "/assets/logos/v1/zenuml-logo.svg"
    }
```

**After:**
```python
# backend/routes/status.py
@router.get("/api/status")
async def get_status():
    return {
        "app_name": "Ascend",
        "logo_url": "/assets/logos/v2/ascend-logo-full.svg",
        "logo_mark_url": "/assets/logos/v2/ascend-logo-mark.svg"
    }
```

### 9.2 Update Configuration Files

**backend/.env:**
```
APP_NAME=Ascend
LOGO_URL=/assets/logos/v2/ascend-logo-full.svg
FAVICON_URL=/assets/favicons/favicon-v2.svg
```

---

## 10. Testing Logo Changes

### 10.1 Unit Tests

**frontend/src/components/branding/__tests__/AscendLogo.test.jsx:**

```jsx
import { render, screen } from '@testing-library/react';
import { AscendLogo } from '../AscendLogo';

describe('AscendLogo', () => {
  test('should render logo with correct alt text', () => {
    render(<AscendLogo size="normal" />);
    expect(screen.getByAltText('Ascend')).toBeInTheDocument();
  });

  test('should apply correct size', () => {
    render(<AscendLogo size="large" />);
    const img = screen.getByAltText('Ascend');
    expect(img).toHaveAttribute('width', '40');
  });

  test('should handle missing image gracefully', () => {
    render(<AscendLogo size="normal" />);
    const img = screen.getByAltText('Ascend');
    
    // Simulate image load error
    fireEvent.error(img);
    
    expect(screen.getByText('Ascend')).toBeInTheDocument();
  });
});
```

### 10.2 Visual Regression Tests

**e2e/logo.spec.js:**

```javascript
import { test, expect } from '@playwright/test';

test('should display Ascend logo correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const logo = page.locator('[data-testid="ascend-logo"]');
  await expect(logo).toBeVisible();
  
  // Visual comparison
  await expect(logo).toHaveScreenshot('ascend-logo.png');
});

test('should show correct logo in dark mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('http://localhost:3000');
  
  const logo = page.locator('[data-testid="ascend-logo"]');
  await expect(logo).toHaveScreenshot('ascend-logo-dark.png');
});
```

---

## 11. Rollout Plan

### Phase 1: Preparation (Days 1-2)
- [ ] Create new logo SVG files
- [ ] Create logo components
- [ ] Set up feature flag
- [ ] Create tests

### Phase 2: Internal Testing (Days 3-4)
- [ ] Test on all browsers
- [ ] Test dark/light modes
- [ ] Test mobile responsiveness
- [ ] Verify cache busting

### Phase 3: Gradual Rollout (Days 5-7)
- [ ] Enable feature flag for 10% of users
- [ ] Monitor for issues
- [ ] Increase to 50%
- [ ] Monitor for issues
- [ ] Roll out to 100%

### Phase 4: Monitoring (Ongoing)
- [ ] Monitor error logs
- [ ] Collect user feedback
- [ ] Track performance metrics
- [ ] Document any issues

---

## 12. Rollback Plan

**If issues occur:**

1. **Disable Feature Flag:**
   ```bash
   # Revert to old logo immediately
   FEATURE_FLAG_ASCEND_REBRAND=false
   ```

2. **Clear Cache:**
   ```bash
   # Invalidate CDN cache
   npm run cache:clear
   ```

3. **Revert Code:**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

---

## Next Steps

1. Create SVG logo files (v2 variants)
2. Create logo components
3. Set up feature flag
4. Create tests
5. Begin gradual rollout

See **ASCEND_REBRAND_PART3_SYSTEM_UPDATES.md** for system-wide updates.
