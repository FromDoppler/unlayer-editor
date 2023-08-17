import { $t } from '../../localization';
import { ProductViewer } from './ProductViewer';
import { ProductToolDefinition } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import { urlProperty } from '../../properties/url';

export const getProductToolDefinition: () =>
  | ProductToolDefinition
  | undefined = () => {
  return {
    name: 'product',
    label: $t('_dp.product'),
    icon: `${ASSETS_BASE_URL}/product_v2.svg`,
    Component: ProductViewer,
    options: {
      product: {
        title: $t('_dp.product'),
        options: {
          productUrl: urlProperty({
            label: $t('_dp.product_link'),
          }),
        },
      },
    },
  };
};
