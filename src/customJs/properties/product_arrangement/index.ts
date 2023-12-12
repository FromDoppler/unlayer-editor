import { ProductArrangementWidget } from './ProductArrangementWidget';

export const ProductArrangementPropertyEditor = 'product_scroll_arrangement';

export const productArrangementPropertyEditorDefinition = {
  name: ProductArrangementPropertyEditor,
  Widget: ProductArrangementWidget,
};

export const productArrangementProperty = () =>
  ({
    widget: ProductArrangementPropertyEditor,
  }) as const;
