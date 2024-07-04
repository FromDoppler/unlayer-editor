import { ReactPropertyDefinition } from '../../types';
import { $t } from '../../localization';
import { qrWidget } from './QRWidget';
import { QRProperty, QrDependentToolValues } from './types';

export const qrPropertyEditor = 'qr_value';

export const qrPropertyEditorDefinition: ReactPropertyDefinition<
  typeof qrPropertyEditor,
  QRProperty,
  QrDependentToolValues,
  void
> = {
  name: qrPropertyEditor,
  Widget: qrWidget,
};

export const qrProperty = ({
  label = $t('_dp.qr_link'),
  defaultValue,
}: {
  label?: string;
  defaultValue?: QRProperty;
} = {}) =>
  ({
    label,
    defaultValue,
    widget: qrPropertyEditor,
  }) as const;
