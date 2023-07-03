import { getConfiguration, parseConfigurationDTO } from './configuration';

describe(getConfiguration.name, () => {
  it('should take information from the global variable', () => {
    // Arrange
    const controlValue = 'controlValue';
    window['unlayer-extensions-configuration'] = {
      baseAssetsUrl: controlValue,
    };

    // Act
    const result = getConfiguration();

    // Assert
    expect(result.baseAssetsUrl).toBe(controlValue);
  });
});

const defaultConfiguration = { baseAssetsUrl: '', locale: 'es', stores: [] };

describe(parseConfigurationDTO.name, () => {
  it('should return default configuration when DTO is an empty object', () => {
    // Arrange
    const input = {};

    // Act
    const result = parseConfigurationDTO(input);

    // Assert
    expect(result).toEqual(defaultConfiguration);
  });

  it('should return default configuration when DTO is not defined', () => {
    // Arrange
    const input = undefined;

    // Act
    const result = parseConfigurationDTO(input);

    // Assert
    expect(result).toEqual(defaultConfiguration);
  });

  it('should make honor to DTO values', () => {
    // Arrange
    const baseAssetsUrl = 'https://cdn.fromdoppler.com';
    const locale = 'en';
    const input = { baseAssetsUrl, locale };

    // Act
    const result = parseConfigurationDTO(input);

    // Assert
    expect(result).toEqual({ baseAssetsUrl, locale, stores: [] });
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
});
