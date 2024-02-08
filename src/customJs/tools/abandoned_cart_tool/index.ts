import { $t } from '../../localization';
import { ProductViewer } from './ProductViewer';
import { ProductToolDefinition, ProductLayout, ItemsStructure } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import {
  autoWidthProperty,
  borderProperty,
  borderRadiusProperty,
  buttonColorsProperty,
  colorProperty,
  dropdownProperty,
  fontFamilyProperty,
  fontSizeProperty,
  fontWeightProperty,
  textProperty,
  toggleShowProperty,
} from '../../properties/helpers';
import { UnlayerProperty } from '../../types';

const productLayoutProperty: () => UnlayerProperty<ProductLayout> = () =>
  dropdownProperty({
    label: undefined,
    defaultValue: '00_horizontal',
    options: [
      { label: $t('_dp.layout_00_horizontal'), value: '00_horizontal' },
      { label: $t('_dp.layout_01_vertical'), value: '01_vertical' },
    ],
  } as const);

const itemStructuretProperty: () => UnlayerProperty<ItemsStructure> = () =>
  dropdownProperty({
    label: undefined,
    defaultValue: '1',
    options: [
      { label: $t('_dp.cart_item_structure_option_0'), value: '0' },
      { label: $t('_dp.cart_item_structure_option_1'), value: '1' },
      { label: $t('_dp.cart_item_structure_option_2'), value: '2' },
      { label: $t('_dp.cart_item_structure_option_3'), value: '3' },
    ],
  } as const);

const DEFAULT_GREEN_COLOR = '#64BF91';
const DEFAULT_FONT_SIZE = '20px';
const icon = `${ASSETS_BASE_URL}/cart_v3.svg`;

export const getAbandonedCartToolDefinition: () =>
  | ProductToolDefinition
  | undefined = () => {
  return {
    name: 'dynamic',
    label: $t('_dp.cart'),
    icon: icon,
    is_dynamic: true,
    usageLimit: 1,
    Component: ProductViewer,
    options: {
      product: {
        title: $t('_dp.cart_item_structure'),
        options: {
          structure: itemStructuretProperty(),
        },
      },
      layout: {
        title: $t('_dp.layout'),
        options: {
          layout: productLayoutProperty(),
          backgroundColor: colorProperty({
            label: $t('editor.background_color.label'),
          }),
        },
      },
      image: {
        title: $t('editor.image.label'),
        options: {
          imageShown: toggleShowProperty(),
          imageAutoWith: autoWidthProperty(),
        },
      },
      title: {
        title: $t('_dp.title'),
        options: {
          titleShown: toggleShowProperty(),
          titleFont: fontFamilyProperty(),
          titleFontWeight: fontWeightProperty({
            defaultValue: 700,
          }),
          titleFontSize: fontSizeProperty({
            defaultValue: DEFAULT_FONT_SIZE,
          }),
          titleColor: colorProperty(),
        },
      },
      price: {
        title: $t('_dp.price'),
        options: {
          priceShown: toggleShowProperty(),
          priceFont: fontFamilyProperty(),
          priceFontWeight: fontWeightProperty(),
          priceFontSize: fontSizeProperty({
            label: $t('editor.font_size.label'),
            defaultValue: DEFAULT_FONT_SIZE,
          }),
          priceColor: colorProperty({
            label: $t('editor.text_color.label'),
            defaultValue: DEFAULT_GREEN_COLOR,
          }),
        },
      },

      button: {
        title: $t('_dp.product_button'),
        options: {
          buttonShown: toggleShowProperty(),
          buttonText: textProperty({
            label: $t('_dp.product_button_text'),
            defaultValue: $t('_dp.product_button_default_value'),
          }),
          buttonFont: fontFamilyProperty(),
          buttonFontWeight: fontWeightProperty({
            defaultValue: 700,
          }),
          buttonFontSize: fontSizeProperty({
            defaultValue: '15px',
          }),
          buttonColors: buttonColorsProperty(),
          buttonAutoWith: autoWidthProperty(),
          buttonBorder: borderProperty(),
          buttonBorderRadius: borderRadiusProperty(),
        },
      },
    },
    createDynamicContet(htmlComponent: string, values: any) {
      const htmlDinamicComponent = htmlComponent
        .replace(
          /^.[div]*/,
          `<DynamicContent action="abandoned_cart" items="${values.structure}"`,
        )
        .replace(/<\/div>$/, '</DynamicContent>');
      return htmlDinamicComponent;
    },
  };
};