import pytest
from backend.i18n.translator import Translator
from backend.i18n.error_codes import ErrorCode
from backend.i18n.locale_config import SUPPORTED_LOCALES, DEFAULT_LOCALE

class TestTranslator:
    @pytest.fixture
    def translator(self):
        return Translator('en')
    
    def test_get_error_message_english(self, translator):
        message = translator.get_error_message('AUTH_001')
        assert message is not None
        assert 'Invalid' in message or 'AUTH_001' in message
    
    def test_get_error_message_fallback(self, translator):
        translator.set_locale('id')
        message = translator.get_error_message('AUTH_001')
        assert message is not None
    
    def test_set_locale(self, translator):
        translator.set_locale('id')
        assert translator.locale == 'id'
    
    def test_get_supported_locales(self, translator):
        locales = translator.get_supported_locales()
        assert 'en' in locales
    
    def test_supported_locales_constant(self):
        assert 'en' in SUPPORTED_LOCALES
        assert 'id' in SUPPORTED_LOCALES
        assert 'zh' in SUPPORTED_LOCALES
        assert 'ja' in SUPPORTED_LOCALES
        assert 'pt' in SUPPORTED_LOCALES
        assert 'es' in SUPPORTED_LOCALES
    
    def test_default_locale(self):
        assert DEFAULT_LOCALE == 'en'

class TestErrorCodes:
    def test_auth_error_codes(self):
        assert ErrorCode.AUTH_INVALID_CREDENTIALS == "AUTH_001"
        assert ErrorCode.AUTH_SESSION_EXPIRED == "AUTH_002"
        assert ErrorCode.AUTH_INVALID_TOKEN == "AUTH_003"
    
    def test_validation_error_codes(self):
        assert ErrorCode.VAL_INVALID_EMAIL == "VAL_001"
        assert ErrorCode.VAL_INVALID_PASSWORD == "VAL_002"
        assert ErrorCode.VAL_MISSING_FIELD == "VAL_003"
    
    def test_resource_error_codes(self):
        assert ErrorCode.RES_NOT_FOUND == "RES_001"
        assert ErrorCode.RES_ALREADY_EXISTS == "RES_002"
        assert ErrorCode.RES_PERMISSION_DENIED == "RES_003"
    
    def test_server_error_codes(self):
        assert ErrorCode.SRV_INTERNAL_ERROR == "SRV_001"
        assert ErrorCode.SRV_DATABASE_ERROR == "SRV_002"
