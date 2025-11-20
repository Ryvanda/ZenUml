# Ascend Rebrand: Part 1 - Multi-Language (i18n) Architecture

**Version:** 1.0  
**Date:** November 2025  
**Status:** Production Implementation Guide

---

## 1. Overview & Goals

**Objectives:**
- Support 6 languages: English, Indonesian, Chinese (Simplified), Japanese, Portuguese, Spanish
- Gradual migration from hard-coded strings
- Auto-detection with manual override capability
- Easy addition of new languages
- Complete test coverage across all supported languages

**Supported Languages:**
| Code | Language | Region | Priority |
|------|----------|--------|----------|
| `en` | English | Global | P0 (Base) |
| `id` | Indonesian | Indonesia | P1 |
| `zh` | Chinese (Simplified) | China | P1 |
| `ja` | Japanese | Japan | P2 |
| `pt` | Portuguese | Brazil/Portugal | P2 |
| `es` | Spanish | Spain/Latin America | P2 |

---

## 2. Architecture Design

### 2.1 Frontend i18n Architecture

**Technology Stack:**
- **Library:** `i18next` (industry standard)
- **React Binding:** `react-i18next`
- **Backend Sync:** `i18next-http-backend`
- **Language Detection:** `i18next-browser-languagedetector`

**Installation:**
```bash
npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector
```

**Directory Structure:**
```
frontend/
├── public/
│   └── locales/
│       ├── en/
│       │   ├── common.json
│       │   ├── auth.json
│       │   ├── editor.json
│       │   ├── errors.json
│       │   └── branding.json
│       ├── id/
│       ├── zh/
│       ├── ja/
│       ├── pt/
│       └── es/
│
├── src/
│   ├── i18n/
│   │   ├── config.js
│   │   ├── localeMetadata.js
│   │   └── languageDetector.js
│   │
│   ├── hooks/
│   │   ├── useLanguage.js
│   │   └── useTranslation.js
│   │
│   ├── context/
│   │   └── LanguageContext.js
│   │
│   └── components/
│       └── LanguageSwitcher.js
```

### 2.2 Translation File Structure

**Base English File (en/common.json):**
```json
{
  "common": {
    "appName": "Ascend",
    "appDescription": "Modern UML Diagramming Tool",
    "loading": "Loading...",
    "error": "An error occurred",
    "retry": "Retry",
    "close": "Close"
  },
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "settings": "Settings",
    "logout": "Sign Out"
  },
  "errors": {
    "404": {
      "title": "Page Not Found",
      "message": "The page you're looking for doesn't exist."
    },
    "500": {
      "title": "Server Error",
      "message": "Something went wrong. Please try again later."
    },
    "auth": {
      "invalidCredentials": "Invalid email or password",
      "sessionExpired": "Your session has expired. Please log in again."
    }
  }
}
```

### 2.3 i18n Configuration

**frontend/src/i18n/config.js:**
```javascript
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    fallbackNS: 'common',
    ns: ['common', 'auth', 'editor', 'errors', 'branding'],
    defaultNS: 'common',
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: false
    }
  });

export default i18next;
```

### 2.4 Language Metadata

**frontend/src/i18n/localeMetadata.js:**
```javascript
export const LOCALE_METADATA = {
  en: {
    name: "English",
    nativeName: "English",
    direction: "ltr",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: "en-US",
    region: "Global",
    flag: "🇺🇸"
  },
  id: {
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    direction: "ltr",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: "id-ID",
    region: "Indonesia",
    flag: "🇮🇩"
  },
  zh: {
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    direction: "ltr",
    dateFormat: "YYYY/MM/DD",
    timeFormat: "HH:mm:ss",
    numberFormat: "zh-CN",
    region: "China",
    flag: "🇨🇳"
  },
  ja: {
    name: "Japanese",
    nativeName: "日本語",
    direction: "ltr",
    dateFormat: "YYYY/MM/DD",
    timeFormat: "HH:mm:ss",
    numberFormat: "ja-JP",
    region: "Japan",
    flag: "🇯🇵"
  },
  pt: {
    name: "Portuguese",
    nativeName: "Português",
    direction: "ltr",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: "pt-BR",
    region: "Brazil",
    flag: "🇧🇷"
  },
  es: {
    name: "Spanish",
    nativeName: "Español",
    direction: "ltr",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: "es-ES",
    region: "Spain",
    flag: "🇪🇸"
  }
};

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = Object.keys(LOCALE_METADATA);
```

### 2.5 Language Detection

**frontend/src/i18n/languageDetector.js:**
```javascript
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './localeMetadata';

export class LanguageDetector {
  static detect() {
    // 1. Check URL parameter
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang && SUPPORTED_LOCALES.includes(urlLang)) {
      return urlLang;
    }

    // 2. Check localStorage
    const savedLang = localStorage.getItem('ascend_language');
    if (savedLang && SUPPORTED_LOCALES.includes(savedLang)) {
      return savedLang;
    }

    // 3. Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LOCALES.includes(browserLang)) {
      return browserLang;
    }

    // 4. Default to English
    return DEFAULT_LOCALE;
  }

  static setLanguage(locale) {
    if (!SUPPORTED_LOCALES.includes(locale)) {
      console.warn(`Unsupported locale: ${locale}`);
      return;
    }
    localStorage.setItem('ascend_language', locale);
    window.location.href = `?lang=${locale}`;
  }
}
```

### 2.6 Language Switcher Component

**frontend/src/components/LanguageSwitcher.jsx:**
```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LOCALE_METADATA } from '../i18n/localeMetadata';
import { LanguageDetector } from '../i18n/languageDetector';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    LanguageDetector.setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lang-button"
        data-testid="language-switcher"
      >
        {LOCALE_METADATA[i18n.language]?.flag} {i18n.language.toUpperCase()}
      </button>

      {isOpen && (
        <div className="lang-menu">
          {Object.entries(LOCALE_METADATA).map(([code, meta]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`lang-option ${i18n.language === code ? 'active' : ''}`}
            >
              {meta.flag} {meta.nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 2.7 Backend i18n Architecture

**Technology Stack:**
- **Framework:** FastAPI
- **Translation Library:** `babel`
- **Storage:** JSON files + MongoDB for user preferences

**Installation:**
```bash
pip install babel
```

**Directory Structure:**
```
backend/
├── locales/
│   ├── en/
│   │   └── errors.json
│   ├── id/
│   ├── zh/
│   ├── ja/
│   ├── pt/
│   └── es/
│
├── i18n/
│   ├── __init__.py
│   ├── translator.py
│   ├── locale_config.py
│   └── error_codes.py
│
└── routes/
    └── i18n.py
```

### 2.8 Backend Error Code System

**backend/i18n/error_codes.py:**
```python
from enum import Enum

class ErrorCode(str, Enum):
    """Centralized error codes for all backend errors"""
    
    # Auth errors (1000-1099)
    AUTH_INVALID_CREDENTIALS = "AUTH_001"
    AUTH_SESSION_EXPIRED = "AUTH_002"
    AUTH_INVALID_TOKEN = "AUTH_003"
    AUTH_REFRESH_FAILED = "AUTH_004"
    
    # Validation errors (2000-2099)
    VALIDATION_INVALID_EMAIL = "VAL_001"
    VALIDATION_INVALID_PASSWORD = "VAL_002"
    VALIDATION_MISSING_FIELD = "VAL_003"
    
    # Resource errors (3000-3099)
    RESOURCE_NOT_FOUND = "RES_001"
    RESOURCE_ALREADY_EXISTS = "RES_002"
    RESOURCE_PERMISSION_DENIED = "RES_003"
    
    # Server errors (5000-5099)
    SERVER_INTERNAL_ERROR = "SRV_001"
    SERVER_DATABASE_ERROR = "SRV_002"
```

### 2.9 Backend Translator Service

**backend/i18n/translator.py:**
```python
import json
import os
from typing import Dict, Any

class Translator:
    """Handles all server-side translations"""
    
    def __init__(self, locale: str = "en"):
        self.locale = locale
        self.translations = self._load_translations(locale)
    
    def _load_translations(self, locale: str) -> Dict[str, Any]:
        """Load translation file for given locale"""
        file_path = f"locales/{locale}/errors.json"
        
        if not os.path.exists(file_path):
            # Fallback to English
            file_path = "locales/en/errors.json"
        
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def get_error_message(self, error_code: str) -> str:
        """Get translated error message by code"""
        return self.translations.get(
            f"errors.{error_code}",
            "An error occurred"
        )
    
    def get(self, key: str, **kwargs) -> str:
        """Get translated string with variable substitution"""
        text = self.translations.get(key, key)
        return text.format(**kwargs) if kwargs else text
```

### 2.10 Backend i18n Endpoints

**backend/routes/i18n.py:**
```python
from fastapi import APIRouter, Depends, HTTPException
from ..i18n.translator import Translator
from ..i18n.locale_config import SUPPORTED_LOCALES
from ..core.dependencies import get_current_user

router = APIRouter(prefix="/api/i18n", tags=["i18n"])

@router.post("/language")
async def set_user_language(
    language: str,
    current_user = Depends(get_current_user)
):
    """Set user's preferred language"""
    if language not in SUPPORTED_LOCALES:
        raise HTTPException(status_code=400, detail="Unsupported language")
    
    # Update user in database
    # Implementation depends on your DB setup
    return {"language": language}

@router.get("/language")
async def get_user_language(current_user = Depends(get_current_user)):
    """Get user's preferred language"""
    # Fetch from database
    return {"language": current_user.get("language", "en")}

@router.get("/supported-languages")
async def get_supported_languages():
    """Get list of supported languages"""
    return {"languages": SUPPORTED_LOCALES}
```

---

## 3. Migration Plan: Hard-Coded Strings → i18n

### Phase 1: Setup (Week 1)
- [ ] Install i18n libraries (`npm install i18next react-i18next`)
- [ ] Create translation file structure
- [ ] Set up i18n configuration in `frontend/src/i18n/config.js`
- [ ] Create language detector
- [ ] Add language switcher UI component

### Phase 2: Frontend Migration (Weeks 2-3)
- [ ] Extract all UI strings from components
- [ ] Create English translation files (base language)
- [ ] Update components to use `useTranslation()` hook
- [ ] Test with pseudo-localization
- [ ] Create translation keys documentation

### Phase 3: Backend Migration (Week 3)
- [ ] Create error code system
- [ ] Extract all error messages
- [ ] Create translation files for backend errors
- [ ] Update error handlers to use translator
- [ ] Add i18n endpoints

### Phase 4: Translation & QA (Weeks 4-5)
- [ ] Hire professional translators or use Lokalise
- [ ] Translate to all 6 languages
- [ ] QA testing for each language
- [ ] Layout/overflow validation

### Phase 5: Deployment (Week 6)
- [ ] Feature flag for i18n
- [ ] Gradual rollout (10% → 50% → 100%)
- [ ] Monitor for issues
- [ ] Collect user feedback

---

## 4. Testing Strategy

### Unit Tests

**frontend/src/i18n/__tests__/translator.test.js:**
```javascript
import i18n from '../config';

describe('i18n Translator', () => {
  test('should load English translations', async () => {
    await i18n.changeLanguage('en');
    expect(i18n.t('common.appName')).toBe('Ascend');
  });

  test('should handle missing keys gracefully', async () => {
    const result = i18n.t('non.existent.key');
    expect(result).toBe('non.existent.key');
  });
});
```

### E2E Tests (Playwright)

```javascript
import { test, expect } from '@playwright/test';

test('should switch language', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Switch to Indonesian
  await page.click('[data-testid="language-switcher"]');
  await page.click('text=Bahasa Indonesia');
  
  // Verify language changed
  expect(await page.locator('text=Proyek')).toBeVisible();
});
```

---

## 5. Translation Management Tools

**Recommended:** Lokalise

| Tool | Cost | Best For |
|------|------|----------|
| Lokalise | $99-499/mo | Professional teams |
| Crowdin | Free-$499/mo | Community translations |
| Phrase | Custom | Enterprise |

---

## 6. Fallback Logic

**Priority Chain:**
1. Requested Language
2. English (fallback)
3. Key as string (last resort)

**Configuration:**
```javascript
i18next.init({
  fallbackLng: 'en',
  fallbackNS: 'common'
});
```

---

## Next Steps

1. Install i18n libraries
2. Create translation file structure
3. Extract English strings
4. Set up language switcher
5. Begin gradual migration

See **ASCEND_REBRAND_PART2_LOGO.md** for logo replacement strategy.
