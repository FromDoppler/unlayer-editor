import { $t } from '../../localization';
import { PromoCodeViewer } from './PromoCodeViewer';
import { ReactToolDefinitionFrom, UnlayerProperty } from '../../types';
import { PromoCodeBase, PromoCodeValues, PromoCodeTypes } from './types';
import { getConfiguration } from '../../configuration';
import { ASSETS_BASE_URL, EMPTY_SELECTION } from '../../constants';
import { promoCodesProperty } from '../../properties/promo_codes';
import {
  alignmentProperty,
  dropdownProperty,
  storesDropdownProperty,
  textProperty,
  toggleShowProperty,
} from '../../properties/helpers';

export const getPromoCodeToolDefinition: () =>
  | ReactToolDefinitionFrom<PromoCodeBase>
  | undefined = () => {
  const { stores, previewMode } = getConfiguration();
  const storesWithPromoCode = stores.filter(
    ({ promotionCodeEnabled }) => promotionCodeEnabled,
  );

  /* WARN: remove preview mode when promotionCodeDynamicEnabled is Working */
  const storesWithPromoCodeDynamic = stores.filter(
    ({ promotionCodeDynamicEnabled }) =>
      promotionCodeDynamicEnabled || previewMode,
  );

  if (storesWithPromoCode.length === 0) {
    return undefined;
  }

  const PromoCodeTypeProperty: () => UnlayerProperty<PromoCodeTypes> = () =>
    dropdownProperty({
      label: $t('_dp.promo_code_type'),
      defaultValue: 'percent',
      options: [
        { label: $t('_dp.promo_code_type_percent'), value: 'percent' },
        { label: $t('_dp.promo_code_type_amount'), value: 'money' },
        { label: $t('_dp.promo_code_type_shipping'), value: 'shipping' },
      ],
    } as const);

  return {
    name: 'promo_code',
    label: $t('_dp.promo_code'),
    icon: `${ASSETS_BASE_URL}/promotion_code_v2.svg`,
    Component: PromoCodeViewer,
    options: {
      store_promo_code: {
        title: $t('_dp.promo_code'),
        options: {
          store: storesDropdownProperty({ stores: storesWithPromoCode }),
          isDynamic: toggleShowProperty({
            defaultValue: false,
            label: $t('_dp.promo_code_coupon_type'),
          }),
        },
      },
      promo_code: {
        title: $t('_dp.promo_code'),
        options: {
          code: promoCodesProperty(),
        },
      },
      dynamic_code: {
        title: $t('_dp.promo_code_dynamic_type_title'),
        options: {
          type: PromoCodeTypeProperty(),
          amount: textProperty({
            label: $t('_dp.promo_code_dynamic_value'),
            defaultValue: '5',
          }),
          expire_days: textProperty({
            label: $t('_dp.promo_code_dynamic_validate_days'),
            defaultValue: '45',
          }),
          min_price: textProperty({
            label: $t('_dp.promo_code_dynamic_min_price'),
            defaultValue: '0',
          }),
          advanced_options: toggleShowProperty({
            defaultValue: false,
            label: $t('_dp.promo_code_dynamic_advance_setting'),
          }),
        },
      },
      promo_code_advance: {
        title: $t('_dp.promo_code_dynamic_advance'),
        options: {
          prefixe_code: textProperty({
            label: $t('_dp.promo_code_dynamic_prefixe'),
          }),
          includes_shipping: toggleShowProperty({
            defaultValue: false,
            label: $t('_dp.promo_code_dynamic_includes_shipping'),
          }),
          first_consumer_purchase: toggleShowProperty({
            defaultValue: false,
            label: $t('_dp.promo_code_dynamic_first_consumer_purchase'),
          }),
          combines_with_other_discounts: toggleShowProperty({
            defaultValue: false,
            label: $t('_dp.promo_code_dynamic_combines_with_other_discounts'),
          }),
        },
      },
      default: {
        options: {
          alignment: alignmentProperty(),
          backgroundColor: {
            label: $t('editor.background_color.label'),
            defaultValue: 'rgba(255,255,255, 0)',
            widget: 'color_picker',
          },
          textColor: {
            label: $t('editor.color.label'),
            defaultValue: '#333333',
            widget: 'color_picker',
          },
          fontSize: {
            label: $t('editor.font_size.label'),
            defaultValue: '36px',
            widget: 'font_size',
          },
        },
      },
    },
    // See https://docs.unlayer.com/docs/property-states
    propertyStates: (values: PromoCodeValues) => ({
      isDynamic: {
        enabled:
          storesWithPromoCodeDynamic.filter(({ name }) => name == values.store)
            .length > 0,
      },
      code: {
        enabled: !values.isDynamic && values.store !== EMPTY_SELECTION,
      },
      type: { enabled: values.isDynamic },
      amount: {
        enabled: values.isDynamic && values.type !== 'shipping',
      },
      min_price: { enabled: values.isDynamic },
      expire_days: { enabled: values.isDynamic },
      advanced_options: {
        enabled: values.isDynamic && values.type !== 'shipping',
      },
      prefixe_code: { enabled: values.isDynamic && values.advanced_options },
      includes_shipping: {
        enabled:
          values.isDynamic &&
          values.advanced_options &&
          values.type !== 'shipping',
      },
      first_consumer_purchase: {
        enabled: values.isDynamic && values.advanced_options,
      },
      combines_with_other_discounts: {
        enabled: values.isDynamic && values.advanced_options,
      },
    }),
    // See https://docs.unlayer.com/docs/transform-property-values
    transformer: (values: PromoCodeValues) => {
      return values;
    },
  };
};
