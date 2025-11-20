from typing import Dict, List

SUPPORTED_LOCALES: List[str] = ['en', 'id', 'zh', 'ja', 'pt', 'es']
DEFAULT_LOCALE: str = 'en'

LOCALE_DISPLAY_NAMES: Dict[str, str] = {
    'en': 'English',
    'id': 'Bahasa Indonesia',
    'zh': '简体中文',
    'ja': '日本語',
    'pt': 'Português',
    'es': 'Español'
}

LOCALE_NATIVE_NAMES: Dict[str, str] = {
    'en': 'English',
    'id': 'Bahasa Indonesia',
    'zh': '简体中文',
    'ja': '日本語',
    'pt': 'Português',
    'es': 'Español'
}

LOCALE_REGIONS: Dict[str, str] = {
    'en': 'Global',
    'id': 'Indonesia',
    'zh': 'China',
    'ja': 'Japan',
    'pt': 'Brazil',
    'es': 'Spain'
}

LOCALE_FLAGS: Dict[str, str] = {
    'en': '🇺🇸',
    'id': '🇮🇩',
    'zh': '🇨🇳',
    'ja': '🇯🇵',
    'pt': '🇧🇷',
    'es': '🇪🇸'
}
