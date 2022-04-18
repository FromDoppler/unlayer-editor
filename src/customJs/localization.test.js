import { intl, setLocale } from './localization';

describe(setLocale.name, () => {
  it.each([{ lang: 'es-ES' }, { lang: 'en-US' }, { lang: 'fr-FR' }])(
    'should call Unlayer.setLocale using $lang language',
    ({ lang }) => {
      // Arrange
      const unlayerDouble = prepareUnlayerGlobalObject();

      // Act
      setLocale(lang);

      // Assert
      expect(unlayerDouble.setLocale).toHaveBeenCalledWith(lang);
    },
  );

  it.each([
    { lang: 'es-ES', expected_size_translation: 'Tamaño' },
    { lang: 'en-US', expected_size_translation: 'Size' },
    { lang: 'fr-FR', expected_size_translation: 'Tamaño' },
  ])(
    'should prepare intl using $lang language',
    ({ lang, expected_size_translation }) => {
      // Arrange
      const unlayerDouble = prepareUnlayerGlobalObject();
      setLocale(lang);

      // Act
      const result = intl.formatMessage({ id: 'size' });

      // Assert
      expect(result).toEqual(expected_size_translation);
    },
  );
});

function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
  };
  return window.unlayer;
}
