import { $t } from '../../localization';
import { PromoCodeViewer } from './PromoCodeViewer';
import { ReactToolDefinitionFrom } from '../../types';
import { PromoCodeBase, PromoCodeValues } from './types';
import { getConfiguration } from '../../configuration';
import { ASSETS_BASE_URL, EMPTY_SELECTION } from '../../constants';
import { promoCodesProperty } from '../../properties/promo_codes';
import {
  alignmentProperty,
  storesDropdownProperty,
} from '../../properties/helpers';

export const getPromoCodeToolDefinition: () =>
  | ReactToolDefinitionFrom<PromoCodeBase>
  | undefined = () => {
  const { stores } = getConfiguration();
  const storesWithPromoCode = stores.filter(
    ({ promotionCodeEnabled }) => promotionCodeEnabled,
  );

  if (storesWithPromoCode.length === 0) {
    return undefined;
  }

  return {
    name: 'promo_code',
    label: $t('_dp.promo_code'),
    icon: `${ASSETS_BASE_URL}/promotion_code.svg`,
    Component: PromoCodeViewer,
    options: {
      promo_code: {
        title: $t('_dp.promo_code'),
        options: {
          store: storesDropdownProperty({ stores: storesWithPromoCode }),
          promo_code: promoCodesProperty(),
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
      promo_code: { enabled: values.store !== EMPTY_SELECTION },
    }),
    // See https://docs.unlayer.com/docs/transform-property-values
    transformer: (values: PromoCodeValues) => {
      return values;
    },
  };
};
