import { ReactProperty, ReactPropertyDefinition } from '../../types';
import { PromoCodesValue, StoreDependentToolValues } from './types';
import { PromoCodesWidget } from './PromoCodesWidget';
import { EMPTY_SELECTION } from '../../constants';
import { intl } from '../../localization';

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
}) => ReactProperty<promoCodesPropertyEditor, PromoCodesValue> = ({
  label,
}: {
  label?: string;
} = {}) => ({
  label: label ?? intl.formatMessage({ id: '_dp.promo_codes' }),
  defaultValue: EMPTY_SELECTION,
  widget: promoCodesPropertyEditor,
});
