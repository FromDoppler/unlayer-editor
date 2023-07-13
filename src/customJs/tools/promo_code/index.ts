import { intl } from '../../localization';
import { PromoCodeViewer } from './PromoCodeViewer';
import { ReactToolDefinition } from '../../types';
import { PromoCodeValues } from './PromoCodeValues';
import { getConfiguration } from '../../configuration';
import { EMPTY_SELECTION } from '../../constants';
import { promoCodesProperty } from '../../properties/promo_codes';

export const getPromoCodeToolDefinition: () =>
  | ReactToolDefinition<PromoCodeValues>
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
    label: intl.formatMessage({ id: '_dp.promo_code' }),
    icon: 'fa-share-alt',
    Component: PromoCodeViewer,
    options: {
      promo_code: {
        title: intl.formatMessage({ id: '_dp.promo_code' }),
        options: {
          store: dropdownProperty({
            label: intl.formatMessage({ id: '_dp.store' }),
            items: storesWithPromoCode,
            map: ({ name }) => ({
              value: name,
              label: name,
            }),
          }),
          promo_code: promoCodesProperty({
            label: intl.formatMessage({ id: '_dp.promo_codes' }),
          }),
        },
      },
      default: {
        options: {
          alignment: alignmentProperty(),
        },
      },
    },
    // See https://docs.unlayer.com/docs/property-states
    propertyStates: (values: PromoCodeValues) => ({
      promo_code: { enabled: values.store !== EMPTY_SELECTION },
    }),
    },
  };
};

function createOptions(items: { value: string; label: string }[]) {
  const defaultValue = items.length === 1 ? items[0].value : EMPTY_SELECTION;
  const emptyOption = {
    value: EMPTY_SELECTION,
    label: intl.formatMessage({ id: '_dp.select_option' }),
  };
  const options = [emptyOption, ...items];
  return [options, defaultValue];
}

// TODO: consider moving this to properties folder
function dropdownProperty<T>({
  label,
  items,
  map,
}: {
  label: string;
  items: T[];
  map: (item: T) => { value: string; label: string };
}) {
  const mappedItems = items.map(map);
  const [options, defaultValue] = createOptions(mappedItems);
  return {
    label,
    defaultValue,
    widget: 'dropdown',
    data: {
      options,
    },
  };
}

// TODO: Consider moving this to properties folder
function alignmentProperty() {
  return {
    label: intl.formatMessage({ id: 'editor.align.label' }),
    defaultValue: 'center',
    widget: 'alignment',
  };
}
