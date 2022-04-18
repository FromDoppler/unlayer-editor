import { intl, setLocale } from './localization';

describe(setLocale.name, () => {
  it.each([
    { lang: 'es-ES', expected_size_translation: 'Tamaño' },
    { lang: 'en-US', expected_size_translation: 'Size' },
    { lang: 'fr-FR', expected_size_translation: 'Tamaño' },
  ])(
    'should prepare intl with right language',
    ({ lang, expected_size_translation }) => {
      // Arrange
      setLocale(lang);

      // Act
      const result = intl.formatMessage({ id: 'size' });

      // Assert
      expect(result).toEqual(expected_size_translation);
    },
  );
});
