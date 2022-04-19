import { getSocialShareToolConfig } from '.';
import { setLocale } from '../localization';

describe(getSocialShareToolConfig.name, () => {
  it.each([
    { lang: 'es-ES', expected_social_share_size_title: 'Tamaño' },
    { lang: 'en-US', expected_social_share_size_title: 'Size' },
    { lang: 'fr-FR', expected_social_share_size_title: 'Tamaño' },
  ])(
    'should return localized object using $lang language',
    ({ lang, expected_social_share_size_title }) => {
      // Arrange
      prepareUnlayerGlobalObject();
      setLocale(lang);

      // Act
      const result = getSocialShareToolConfig();

      // Assert
      expect(result).toBeDefined();
      expect(result.options).toBeDefined();
      expect(result.options.social_share_size).toEqual(
        expect.objectContaining({
          title: expected_social_share_size_title,
        }),
      );
    },
  );
});

function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}
