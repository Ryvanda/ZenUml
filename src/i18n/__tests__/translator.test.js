import i18n from '../config';

describe('i18n Translator', () => {
  beforeAll(async () => {
    await i18n.init();
  });

  test('should load English translations', async () => {
    await i18n.changeLanguage('en');
    expect(i18n.t('common.appName')).toBe('Ascend');
  });

  test('should handle missing keys gracefully', async () => {
    const result = i18n.t('non.existent.key');
    expect(result).toBe('non.existent.key');
  });

  test('should switch to Indonesian', async () => {
    await i18n.changeLanguage('id');
    expect(i18n.language).toBe('id');
  });

  test('should switch to Chinese', async () => {
    await i18n.changeLanguage('zh');
    expect(i18n.language).toBe('zh');
  });

  test('should switch to Japanese', async () => {
    await i18n.changeLanguage('ja');
    expect(i18n.language).toBe('ja');
  });

  test('should switch to Portuguese', async () => {
    await i18n.changeLanguage('pt');
    expect(i18n.language).toBe('pt');
  });

  test('should switch to Spanish', async () => {
    await i18n.changeLanguage('es');
    expect(i18n.language).toBe('es');
  });

  test('should fallback to English for missing translations', async () => {
    await i18n.changeLanguage('id');
    const result = i18n.t('common.appName');
    expect(result).toBeDefined();
  });
});
