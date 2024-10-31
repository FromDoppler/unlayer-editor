import { ReactPropertyDefinition } from '../../types';
import { DynamicPromoCodeWidget } from './DynamicPromoCodeWidget';
import { DynamicPromoCodeDependentToolValues } from './types';

export const dynamicPromoCodePropertyEditor = 'promo_dynamic_id';

export const dynamicPromoCodePropertyEditorDefinition: ReactPropertyDefinition<
  typeof dynamicPromoCodePropertyEditor,
  string,
  DynamicPromoCodeDependentToolValues,
  void
> = {
  name: dynamicPromoCodePropertyEditor,
  Widget: DynamicPromoCodeWidget,
};

export const dynamicIdProperty = ({
  defaultValue,
}: {
  label?: string;
  defaultValue?: string;
} = {}) =>
  ({
    defaultValue,
    widget: dynamicPromoCodePropertyEditor,
  }) as const;
