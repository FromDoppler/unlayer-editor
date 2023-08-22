import { $t } from '../../localization';
import { ProductGalleryWidget } from './ProductGalleryWidget';

export const productGalleryPropertyEditor = 'product_gallery';

export const productGalleryPropertyEditorDefinition = {
  name: productGalleryPropertyEditor,
  Widget: ProductGalleryWidget,
};

export const productGalleryProperty = ({
  label = $t('_dp.product_gallery'),
}: {
  label?: string;
} = {}) =>
  ({
    label,
    widget: productGalleryPropertyEditor,
  }) as const;
