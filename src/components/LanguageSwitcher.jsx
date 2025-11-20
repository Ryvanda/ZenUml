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
        aria-label="Change language"
      >
        {LOCALE_METADATA[i18n.language]?.flag} {i18n.language.toUpperCase()}
      </button>

      {isOpen && (
        <div className="lang-menu" role="menu">
          {Object.entries(LOCALE_METADATA).map(([code, meta]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`lang-option ${i18n.language === code ? 'active' : ''}`}
              role="menuitem"
            >
              {meta.flag} {meta.nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
