import json
import os
from typing import Dict, Any, Optional
from .error_codes import ErrorCode

class Translator:
    """Handles all server-side translations"""
    
    _instance = None
    _translations: Dict[str, Dict[str, Any]] = {}
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self, locale: str = "en"):
        if self._initialized:
            return
        self.locale = locale
        self.translations = self._load_all_translations()
        self._initialized = True
    
    def _load_all_translations(self) -> Dict[str, Dict[str, Any]]:
        """Load all translation files"""
        translations = {}
        locales_path = os.path.join(os.path.dirname(__file__), '..', 'locales')
        
        if os.path.exists(locales_path):
            for locale_dir in os.listdir(locales_path):
                locale_path = os.path.join(locales_path, locale_dir)
                if os.path.isdir(locale_path):
                    translations[locale_dir] = self._load_locale_translations(locale_dir)
        
        return translations
    
    def _load_locale_translations(self, locale: str) -> Dict[str, Any]:
        """Load translation files for a specific locale"""
        locale_translations = {}
        locales_path = os.path.join(os.path.dirname(__file__), '..', 'locales', locale)
        
        if not os.path.exists(locales_path):
            return {}
        
        for filename in os.listdir(locales_path):
            if filename.endswith('.json'):
                file_path = os.path.join(locales_path, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        locale_translations.update(json.load(f))
                except Exception as e:
                    print(f"Error loading {file_path}: {e}")
        
        return locale_translations
    
    def get_error_message(self, error_code: str, locale: Optional[str] = None) -> str:
        """Get translated error message by code"""
        if locale is None:
            locale = self.locale
        
        # Fallback chain: requested locale -> English -> error code
        for fallback_locale in [locale, 'en']:
            if fallback_locale in self.translations:
                errors = self.translations[fallback_locale].get('errors', {})
                if error_code in errors:
                    return errors[error_code]
        
        return f"Error: {error_code}"
    
    def get(self, key: str, locale: Optional[str] = None, **kwargs) -> str:
        """Get translated string with variable substitution"""
        if locale is None:
            locale = self.locale
        
        # Fallback chain
        for fallback_locale in [locale, 'en']:
            if fallback_locale in self.translations:
                text = self._get_nested_value(self.translations[fallback_locale], key)
                if text:
                    return text.format(**kwargs) if kwargs else text
        
        return key
    
    def _get_nested_value(self, obj: Dict, key: str) -> Optional[str]:
        """Get nested dictionary value using dot notation"""
        keys = key.split('.')
        current = obj
        
        for k in keys:
            if isinstance(current, dict) and k in current:
                current = current[k]
            else:
                return None
        
        return current if isinstance(current, str) else None
    
    def set_locale(self, locale: str) -> None:
        """Change the current locale"""
        if locale in self.translations:
            self.locale = locale
    
    def get_supported_locales(self) -> list:
        """Get list of supported locales"""
        return list(self.translations.keys())
