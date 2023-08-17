import { UnlayerProperty, ReactPropertyDefinition } from '../../types';
import { PromoCodesValue, StoreDependentToolValues } from './types';
import { PromoCodesWidget } from './PromoCodesWidget';
import { EMPTY_SELECTION } from '../../constants';
import { $t } from '../../localization';

export const promoCodesPropertyEditor = 'promo_codes';
type promoCodesPropertyEditor = typeof promoCodesPropertyEditor;

export const promoCodesPropertyEditorDefinition: ReactPropertyDefinition<
  promoCodesPropertyEditor,
  PromoCodesValue,
  StoreDependentToolValues,
  void
> = {
  name: promoCodesPropertyEditor,
  Widget: PromoCodesWidget,
};

export const promoCodesProperty: (parameters?: {
  label?: string;
}) => UnlayerProperty<PromoCodesValue, promoCodesPropertyEditor> = ({
  label,
}: {
  label?: string;
} = {}) => ({
  label: label ?? $t('_dp.promo_codes'),
  defaultValue: EMPTY_SELECTION,
  widget: promoCodesPropertyEditor,
});
