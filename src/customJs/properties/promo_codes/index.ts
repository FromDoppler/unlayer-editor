import { ReactProperty, ReactPropertyDefinition } from '../../types';
import { PromoCodesValue, StoreDependentToolValues } from './types';
import { PromoCodesWidget } from './PromoCodesWidget';
import { EMPTY_SELECTION } from '../../constants';

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

export const promoCodesProperty: ({
  label,
}: {
  label: string;
}) => ReactProperty<promoCodesPropertyEditor, PromoCodesValue> = ({
  label,
}: {
  label: string;
}) => ({
  label,
  defaultValue: EMPTY_SELECTION,
  widget: promoCodesPropertyEditor,
});
