import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { ProductGalleryWidget } from './ProductGalleryWidget';
import { setLocale } from '../../localization';
import { getConfiguration } from '../../configuration';

jest.mock('../../configuration');

// TODO: this is a shared code, make it a common helper
function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}

prepareUnlayerGlobalObject();
setLocale('es-ES');

describe(ProductGalleryWidget.name, () => {
  const integrationsURL = 'https://integrations/';

  describe('when there are no stores', () => {
    // Arrange
    beforeEach(() => {
      getConfiguration.mockImplementation(() => ({
        stores: [],
        dopplerExternalUrls: {
          integrations: integrationsURL,
        },
      }));
    });

    it('should render a link to the Integrations page', async () => {
      // Act
      render(<ProductGalleryWidget />);

      // Assert
      const expectedLinkLabel = 'Agrega tu Integración aquí';
      const link = screen.getByText(expectedLinkLabel);
      expect(link).toHaveProperty('href', integrationsURL);
    });

    it('should disable the search button', async () => {
      // Act
      render(<ProductGalleryWidget />);

      // Assert
      const expectedButtonLabel = 'Buscar producto...';
      const button = screen.getByText(expectedButtonLabel);
      expect(button).toHaveProperty('disabled', true);
    });
  });

  describe('when there are stores', () => {
    // Arrange
    beforeEach(() => {
      getConfiguration.mockImplementation(() => ({
        stores: [
          {
            name: 'MercadoShops',
            promotionCodeEnabled: false,
          },
        ],
        dopplerExternalUrls: {
          integrations: integrationsURL,
        },
      }));
    });

    it('should not render a link to the Integrations page', async () => {
      // Act
      render(<ProductGalleryWidget />);

      // Assert
      const notExpectedLinkLabel = 'Agrega tu Integración aquí';
      expect(() => screen.getByText(notExpectedLinkLabel)).toThrow();
    });

    it('should enable the search button', async () => {
      // Act
      render(<ProductGalleryWidget />);

      // Assert
      const expectedButtonLabel = 'Buscar producto...';
      const button = screen.getByText(expectedButtonLabel);
      expect(button).toHaveProperty('disabled', false);
    });
  });
});
