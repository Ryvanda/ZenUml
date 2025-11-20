import { useTranslation } from 'react-i18next';
import { LOCALE_METADATA, SUPPORTED_LOCALES } from '../i18n/localeMetadata';
import { LanguageDetector } from '../i18n/languageDetector';

export function useLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = (locale) => {
    if (!SUPPORTED_LOCALES.includes(locale)) {
      console.warn(`Unsupported locale: ${locale}`);
      return;
    }
    i18n.changeLanguage(locale);
    LanguageDetector.setLanguage(locale);
  };

  const getCurrentLanguage = () => i18n.language;

  const getLanguageMetadata = (locale) => LOCALE_METADATA[locale];

  const getSupportedLanguages = () => 
    Object.entries(LOCALE_METADATA).map(([code, meta]) => ({
      code,
      ...meta
    }));

  return {
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    getLanguageMetadata,
    getSupportedLanguages,
    isLanguageSupported: (locale) => SUPPORTED_LOCALES.includes(locale)
  };
}
