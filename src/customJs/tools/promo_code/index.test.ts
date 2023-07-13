import { getPromoCodeToolDefinition } from '.';
import { messages_es } from '../../../i18n/es';
import { __invalidateConfigurationCache } from '../../configuration';
import { EMPTY_SELECTION } from '../../constants';
import { setLocale } from '../../localization';

// Required to initialize intl
setLocale('es-ES');

const sut = getPromoCodeToolDefinition;

describe(sut.name, () => {
  beforeEach(() => {
    __invalidateConfigurationCache();
  });

  it.each([
    undefined,
    [],
    [
      { name: 'MercadoShop', promotionCodeEnabled: false },
      { name: 'Magento', promotionCodeEnabled: false },
      { name: 'TiendaNube', promotionCodeEnabled: false },
    ],
  ])(
    'should return undefined when there are no stores with promotion code',
    (stores) => {
      // Arrange
      (window as any)['unlayer-extensions-configuration'] = { stores };

      // Act
      const result = sut();

      // Assert
      expect(result).toBeUndefined();
    },
  );

  it('should return alignment property in the default property group', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        { name: 'MercadoShop', promotionCodeEnabled: true },
        { name: 'Magento', promotionCodeEnabled: false },
        { name: 'TiendaNube', promotionCodeEnabled: false },
      ],
    };

    // Act
    const result = sut();

    // Assert
    expect(result?.options.default.options.alignment).toEqual({
      label: messages_es['editor.align.label'],
      defaultValue: 'center',
      widget: 'alignment',
    });
  });

  it('should return right store property when there is only a store with promotion code', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        { name: 'MercadoShop', promotionCodeEnabled: true },
        { name: 'Magento', promotionCodeEnabled: false },
        { name: 'TiendaNube', promotionCodeEnabled: false },
      ],
    };

    // Act
    const result = sut();

    // Assert
    const propertyGroup = result?.options.promo_code;
    expect(propertyGroup.title).toBe(messages_es['_dp.promo_code']);
    const property = result?.options.promo_code.options.store;
    expect(property.label).toBe(messages_es['_dp.store']);
    expect(property.widget).toBe('dropdown');
    expect(property.data.options.length).toBe(2);
    expect(property.data.options).toContainEqual({
      label: messages_es['_dp.select_option'],
      value: EMPTY_SELECTION,
    });
    expect(property.data.options).toContainEqual({
      label: 'MercadoShop',
      value: 'MercadoShop',
    });
    // When there is only one store, it is selected as default option
    expect(property.defaultValue).toBe('MercadoShop');
  });

  it('should return right store property when there are more than a store with promotion code', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        { name: 'MercadoShop', promotionCodeEnabled: true },
        { name: 'Magento', promotionCodeEnabled: true },
        { name: 'TiendaNube', promotionCodeEnabled: false },
      ],
    };

    // Act
    const result = sut();

    // Assert
    const propertyGroup = result?.options.promo_code;
    expect(propertyGroup.title).toBe(messages_es['_dp.promo_code']);
    const property = result?.options.promo_code.options.store;
    expect(property.label).toBe(messages_es['_dp.store']);
    expect(property.widget).toBe('dropdown');
    expect(property.data.options.length).toBe(3);
    expect(property.data.options).toContainEqual({
      label: messages_es['_dp.select_option'],
      value: EMPTY_SELECTION,
    });
    expect(property.data.options).toContainEqual({
      label: 'MercadoShop',
      value: 'MercadoShop',
    });
    expect(property.data.options).toContainEqual({
      label: 'Magento',
      value: 'Magento',
    });
    // When there is only one store, it is selected as default option
    expect(property.defaultValue).toBe(EMPTY_SELECTION);
  });
});
