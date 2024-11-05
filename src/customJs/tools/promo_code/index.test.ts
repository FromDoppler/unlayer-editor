import { getPromoCodeToolDefinition } from '.';
import { messages_es } from '../../../i18n/es';
import { __invalidateConfigurationCache } from '../../configuration';
import { EMPTY_SELECTION } from '../../constants';
import { setLocale } from '../../localization';
import { PromoCodeValues } from './types';

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
      { name: 'MercadoShops', promotionCodeEnabled: false },
      { name: 'Magento', promotionCodeEnabled: false },
      { name: 'Tiendanube', promotionCodeEnabled: false },
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
        { name: 'MercadoShops', promotionCodeEnabled: true },
        { name: 'Magento', promotionCodeEnabled: false },
        { name: 'Tiendanube', promotionCodeEnabled: false },
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

    expect(result?.options.default.options.backgroundColor).toEqual({
      label: messages_es['editor.background_color.label'],
      defaultValue: 'rgba(255,255,255, 0)',
      widget: 'color_picker',
    });

    expect(result?.options.default.options.textColor).toEqual({
      label: messages_es['editor.color.label'],
      defaultValue: '#333333',
      widget: 'color_picker',
    });

    expect(result?.options.default.options.fontSize).toEqual({
      label: messages_es['editor.font_size.label'],
      defaultValue: '36px',
      widget: 'font_size',
    });
  });

  it('should return right store property when there is only a store with promotion code', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        { name: 'MercadoShops', promotionCodeEnabled: true },
        { name: 'Magento', promotionCodeEnabled: false },
        { name: 'Tiendanube', promotionCodeEnabled: false },
      ],
    };

    // Act
    const result = sut();

    // Assert
    const propertyGroup = result!.options.store_promo_code;
    expect(propertyGroup.title).toBe(messages_es['_dp.promo_code']);
    const property = result!.options.store_promo_code.options.store;
    expect(property.label).toBe(messages_es['_dp.store']);
    expect(property.widget).toBe('dropdown');
    expect(property.data.options.length).toBe(2);
    expect(property.data.options).toContainEqual({
      label: messages_es['_dp.select_option'],
      value: EMPTY_SELECTION,
    });
    expect(property.data.options).toContainEqual({
      label: 'MercadoShops',
      value: 'MercadoShops',
    });
    // When there is only one store, it is selected as default option
    expect(property.defaultValue).toBe('MercadoShops');
  });

  it('should return right store property when there are more than a store with promotion code', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        { name: 'MercadoShops', promotionCodeEnabled: true },
        { name: 'Magento', promotionCodeEnabled: true },
        { name: 'Tiendanube', promotionCodeEnabled: false },
      ],
    };

    // Act
    const result = sut();

    // Assert
    const propertyGroup = result!.options.store_promo_code;
    expect(propertyGroup.title).toBe(messages_es['_dp.promo_code']);
    const property = result!.options.store_promo_code.options.store;
    expect(property.label).toBe(messages_es['_dp.store']);
    expect(property.widget).toBe('dropdown');
    expect(property.data.options.length).toBe(3);
    expect(property.data.options).toContainEqual({
      label: messages_es['_dp.select_option'],
      value: EMPTY_SELECTION,
    });
    expect(property.data.options).toContainEqual({
      label: 'MercadoShops',
      value: 'MercadoShops',
    });
    expect(property.data.options).toContainEqual({
      label: 'Magento',
      value: 'Magento',
    });
    // When there is only one store, it is selected as default option
    expect(property.defaultValue).toBe(EMPTY_SELECTION);
  });

  it('should return right store property when there is only a store with dynamic promotion code', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        {
          name: 'MercadoShops',
          promotionCodeEnabled: false,
          promotionCodeDynamicEnabled: false,
        },
        { name: 'Magento', promotionCodeEnabled: false },
        {
          name: 'Tiendanube',
          promotionCodeEnabled: true,
          promotionCodeDynamicEnabled: true,
        },
      ],
    };

    // Act
    const result = sut();

    // Assert
    const propertyGroup = result!.options.store_promo_code;
    expect(propertyGroup.title).toBe(messages_es['_dp.promo_code']);
    const property = result!.options.store_promo_code.options.store;

    expect(property.data.options).toContainEqual({
      label: messages_es['_dp.select_option'],
      value: EMPTY_SELECTION,
    });
    expect(property.data.options).toContainEqual({
      label: 'Tiendanube',
      value: 'Tiendanube',
    });
    // When there is only one store, it is selected as default option
    expect(property.defaultValue).toBe('Tiendanube');
  });

  it('should view isDynamic property when a store is enabled to create a dynamic code', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        {
          name: 'MercadoShops',
          promotionCodeEnabled: false,
          promotionCodeDynamicEnabled: false,
        },
        {
          name: 'Tiendanube',
          promotionCodeEnabled: true,
          promotionCodeDynamicEnabled: true,
        },
      ],
    };

    // Act
    const result = sut();
    const states: any = result!.propertyStates!({
      store: 'Tiendanube',
    } as PromoCodeValues);
    //Assert
    expect(states.isDynamic.enabled).toEqual(true);

    // act
    const states2: any = result!.propertyStates!({
      store: 'MercadoShops',
    } as PromoCodeValues);
    //Assert
    expect(states2.isDynamic.enabled).toEqual(false);
  });

  it('should not view dynamic properties when is disabled isDynamic property', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        {
          name: 'MercadoShops',
          promotionCodeEnabled: false,
          promotionCodeDynamicEnabled: false,
        },
        {
          name: 'Tiendanube',
          promotionCodeEnabled: true,
          promotionCodeDynamicEnabled: true,
        },
      ],
    };

    // Act
    const result = sut();
    const states: any = result!.propertyStates!({
      store: 'Tiendanube',
    } as PromoCodeValues);
    //Assert

    expect(states.code.enabled).toEqual(true);
    expect(states.type.enabled).toEqual(false || undefined);
    expect(states.amount.enabled).toEqual(false || undefined);
    expect(states.min_price.enabled).toEqual(false || undefined);
    expect(states.expire_days.enabled).toEqual(false || undefined);
    expect(states.advanced_options.enabled).toEqual(false || undefined);
    expect(states.prefixe_code.enabled).toEqual(false || undefined);
    expect(states.includes_shipping.enabled).toEqual(false || undefined);
    expect(states.first_consumer_purchase.enabled).toEqual(false || undefined);
    expect(states.combines_with_other_discounts.enabled).toEqual(
      false || undefined,
    );
  });

  it('should view dynamic properties when is enabled isDynamic property', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        {
          name: 'MercadoShops',
          promotionCodeEnabled: false,
          promotionCodeDynamicEnabled: false,
        },
        {
          name: 'Tiendanube',
          promotionCodeEnabled: true,
          promotionCodeDynamicEnabled: true,
        },
      ],
    };

    const mockPromoCodeValues = {
      store: 'Tiendanube',
      isDynamic: true,
    };
    // Act
    const result = sut();
    const states: any = result!.propertyStates!(
      mockPromoCodeValues as PromoCodeValues,
    );
    //Assert

    expect(states.code.enabled).toEqual(false);
    expect(states.type.enabled).toEqual(true);
    expect(states.amount.enabled).toEqual(true);
    expect(states.min_price.enabled).toEqual(true);
    expect(states.expire_days.enabled).toEqual(true);
    expect(states.advanced_options.enabled).toEqual(true);
    expect(states.prefixe_code.enabled).toEqual(false || undefined);
    expect(states.includes_shipping.enabled).toEqual(false || undefined);
    expect(states.first_consumer_purchase.enabled).toEqual(false || undefined);
    expect(states.combines_with_other_discounts.enabled).toEqual(
      false || undefined,
    );
  });

  it('should view dynamic properties when is enabled isDynamic and advanced_options property', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        {
          name: 'Tiendanube',
          promotionCodeEnabled: true,
          promotionCodeDynamicEnabled: true,
        },
      ],
    };

    const mockPromoCodeValues = {
      store: 'Tiendanube',
      isDynamic: true,
      advanced_options: true,
    };
    // Act
    const result = sut();
    const states: any = result!.propertyStates!(
      mockPromoCodeValues as PromoCodeValues,
    );
    //Assert
    expect(states.prefixe_code.enabled).toEqual(true);
    expect(states.includes_shipping.enabled).toEqual(true);
    expect(states.first_consumer_purchase.enabled).toEqual(true);
    expect(states.combines_with_other_discounts.enabled).toEqual(true);
  });

  it('should return dynamic properties in the default property group', () => {
    // Arrange
    (window as any)['unlayer-extensions-configuration'] = {
      stores: [
        {
          name: 'Tiendanube',
          promotionCodeEnabled: true,
          promotionCodeDynamicEnabled: true,
        },
      ],
    };

    // Act
    const result = sut();

    // Assert
    expect(result?.options.store_promo_code.options.isDynamic).toEqual({
      label: messages_es['_dp.promo_code_coupon_type'],
      defaultValue: false,
      widget: 'toggle',
    });

    expect(result?.options.promo_code.options.code).toEqual({
      label: messages_es['_dp.promo_codes'],
      defaultValue: EMPTY_SELECTION,
      widget: 'promo_codes',
    });

    expect(result?.options.dynamic_code.options.type).toEqual({
      data: {
        options: [
          {
            label: messages_es['_dp.promo_code_type_percent'],
            value: 'percent',
          },
          { label: messages_es['_dp.promo_code_type_amount'], value: 'money' },
          {
            label: messages_es['_dp.promo_code_type_shipping'],
            value: 'shipping',
          },
        ],
      },
      label: messages_es['_dp.promo_code_type'],
      defaultValue: 'percent',
      widget: 'dropdown',
    });

    expect(result?.options.dynamic_code.options.amount).toEqual({
      label: messages_es['_dp.promo_code_dynamic_value'],
      defaultValue: '5',
      widget: 'text',
    });

    expect(result?.options.dynamic_code.options.expire_days).toEqual({
      label: messages_es['_dp.promo_code_dynamic_validate_days'],
      defaultValue: '45',
      widget: 'text',
    });

    expect(result?.options.dynamic_code.options.min_price).toEqual({
      label: messages_es['_dp.promo_code_dynamic_min_price'],
      defaultValue: '0',
      widget: 'text',
    });

    expect(result?.options.dynamic_code.options.dynamic_id).toEqual({
      defaultValue: undefined,
      widget: 'promo_dynamic_id',
    });

    expect(result?.options.dynamic_code.options.advanced_options).toEqual({
      label: messages_es['_dp.promo_code_dynamic_advance_setting'],
      defaultValue: false,
      widget: 'toggle',
    });

    expect(result?.options.promo_code_advance.options.prefixe_code).toEqual({
      label: messages_es['_dp.promo_code_dynamic_prefixe'],
      defaultValue: undefined,
      widget: 'text',
    });

    expect(
      result?.options.promo_code_advance.options.includes_shipping,
    ).toEqual({
      label: messages_es['_dp.promo_code_dynamic_includes_shipping'],
      defaultValue: false,
      widget: 'toggle',
    });

    expect(
      result?.options.promo_code_advance.options.first_consumer_purchase,
    ).toEqual({
      label: messages_es['_dp.promo_code_dynamic_first_consumer_purchase'],
      defaultValue: false,
      widget: 'toggle',
    });

    expect(
      result?.options.promo_code_advance.options.combines_with_other_discounts,
    ).toEqual({
      label:
        messages_es['_dp.promo_code_dynamic_combines_with_other_discounts'],
      defaultValue: false,
      widget: 'toggle',
    });
  });
});
