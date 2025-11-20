import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageDetector } from '../i18n/languageDetector';
import { SUPPORTED_LOCALES } from '../i18n/localeMetadata';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const detectedLanguage = LanguageDetector.detect();
    if (detectedLanguage !== i18n.language) {
      setIsLoading(true);
      i18n.changeLanguage(detectedLanguage).then(() => {
        setCurrentLanguage(detectedLanguage);
        setIsLoading(false);
      });
    }
  }, [i18n]);

  const changeLanguage = async (locale) => {
    if (!SUPPORTED_LOCALES.includes(locale)) {
      console.warn(`Unsupported locale: ${locale}`);
      return false;
    }
    
    setIsLoading(true);
    try {
      await i18n.changeLanguage(locale);
      LanguageDetector.setLanguage(locale);
      setCurrentLanguage(locale);
      return true;
    } catch (error) {
      console.error(`Failed to change language to ${locale}:`, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentLanguage,
    isLoading,
    changeLanguage,
    supportedLanguages: SUPPORTED_LOCALES
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider');
  }
  return context;
}
