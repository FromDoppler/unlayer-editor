import { getConfiguration, parseConfigurationDTO } from './configuration';

describe(getConfiguration.name, () => {
  it('should take information from the global variable', () => {
    // Arrange
    const controlValue = 'controlValue';
    window['unlayer-extensions-configuration'] = {
      locale: controlValue,
    };

    // Act
    const result = getConfiguration();

    // Assert
    expect(result.locale).toBe(controlValue);
  });
});

const expectedDefaultConfiguration = {
  locale: 'es',
  stores: [],
  promotionCodeEnabled: false,
  abandonedCartCampaign: false,
  visitedProductsCampaign: false,
  confirmationOrderCampaign: false,
  pendingOrderCampaign: false,
  bestSellingEnabled: false,
  newProductsEnabled: false,
  crossSellingEnabled: false,
  previewMode: false,
  dopplerExternalUrls: {
    automation: '#',
    campaigns: '#',
    controlPanel: '#',
    home: '#',
    integrations: '#',
    lists: '#',
    templates: '#',
  },
};

describe(parseConfigurationDTO.name, () => {
  it('should return default configuration when DTO is an empty object', () => {
    // Arrange
    const input = {};

    // Act
    const result = parseConfigurationDTO(input);

    // Assert
    expect(result).toEqual(expectedDefaultConfiguration);
  });

  it('should return default configuration when DTO is not defined', () => {
    // Arrange
    const input = undefined;

    // Act
    const result = parseConfigurationDTO(input);

    // Assert
    expect(result).toEqual(expectedDefaultConfiguration);
  });

  it('should make honor to DTO values', () => {
    // Arrange
    const locale = 'en';
    const previewMode = true;
    const abandonedCartCampaign = true;
    const visitedProductsCampaign = false;
    const confirmationOrderCampaign = false;
    const pendingOrderCampaign = false;
    const bestSellingEnabled = false;
    const newProductsEnabled = false;
    const crossSellingEnabled = false;
    const input = {
      locale,
      previewMode,
      abandonedCartCampaign,
      visitedProductsCampaign,
      confirmationOrderCampaign,
      pendingOrderCampaign,
    };

    // Act
    const result = parseConfigurationDTO(input);

    // Assert
    expect(result).toEqual({
      locale,
      stores: [],
      promotionCodeEnabled: false,
      abandonedCartCampaign: true,
      visitedProductsCampaign: false,
      confirmationOrderCampaign: false,
      pendingOrderCampaign: false,
      bestSellingEnabled: false,
      newProductsEnabled: false,
      crossSellingEnabled: false,
      previewMode,
      dopplerExternalUrls: {
        automation: '#',
        campaigns: '#',
        controlPanel: '#',
        home: '#',
        integrations: '#',
        lists: '#',
        templates: '#',
      },
    });
  });

  it('should parse stores', () => {
    // Arrange
    const inputStores = [
      {},
      { promotionCodeEnabled: true },
      { name: 'store1', promotionCodeEnabled: false },
      { name: 'store2', promotionCodeEnabled: true },
    ];
    const expectedStores = [
      { name: '', promotionCodeEnabled: false },
      { name: '', promotionCodeEnabled: true },
      { name: 'store1', promotionCodeEnabled: false },
      { name: 'store2', promotionCodeEnabled: true },
    ];

    // Act
    const result = parseConfigurationDTO({ stores: inputStores });

    // Assert
    expect(result).toEqual(expect.objectContaining({ stores: expectedStores }));
  });

  it('should set promotionCodeEnabled = true when there is at least one store with promotionCodeEnabled', () => {
    // Arrange
    const inputStores = [
      { name: 'store1', promotionCodeEnabled: false },
      { name: 'store2', promotionCodeEnabled: true },
    ];

    // Act
    const result = parseConfigurationDTO({ stores: inputStores });

    // Assert
    expect(result).toEqual(
      expect.objectContaining({ promotionCodeEnabled: true }),
    );
  });

  it('should set promotionCodeEnabled = false when there are not stores with promotionCodeEnabled', () => {
    // Arrange
    const inputStores = [
      { name: 'store1' },
      { name: 'store2', promotionCodeEnabled: false },
    ];

    // Act
    const result = parseConfigurationDTO({ stores: inputStores });

    // Assert
    expect(result).toEqual(
      expect.objectContaining({ promotionCodeEnabled: false }),
    );
  });
});
