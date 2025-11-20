import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './localeMetadata';

export class LanguageDetector {
  static detect() {
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang && SUPPORTED_LOCALES.includes(urlLang)) {
      return urlLang;
    }

    const savedLang = localStorage.getItem('ascend_language');
    if (savedLang && SUPPORTED_LOCALES.includes(savedLang)) {
      return savedLang;
    }

    const browserLang = navigator.language.split('-')[0];
    if (SUPPORTED_LOCALES.includes(browserLang)) {
      return browserLang;
    }

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
