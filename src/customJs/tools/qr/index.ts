import { $t } from '../../localization';
import { QrViewer } from './QrViewer';

import { QrToolDefinition } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import { alignmentProperty, colorProperty } from '../../properties/helpers';
import { urlProperty } from '../../properties/url';
import { UnlayerProperty } from '../../types';

export const sizeProperty: () => UnlayerProperty<number> = () => ({
  label: $t('_dp.size'),
  defaultValue: 100,
  widget: 'counter',
});

export const getQrToolDefinition: () => QrToolDefinition | undefined = () => {
  return {
    name: 'qr',
    label: 'QR',
    icon: `${ASSETS_BASE_URL}/QR_v4.svg`,

    Component: QrViewer,
    options: {
      layout: {
        title: $t('_dp.layout'),
        options: {
          backgroundColor: colorProperty({
            label: $t('editor.background_color.label'),
          }),
        },
      },
      content: {
        title: $t('_dp.qr_content'),
        options: {
          qrValue: urlProperty({
            label: $t('_dp.qr_link'),
          }),
        },
      },
      format: {
        title: $t('_dp.layout'),
        options: {
          qrSize: sizeProperty(),
          qrColor: colorProperty(),
          qrAlignment: alignmentProperty(),
        },
      },
    },
  };
};
