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
