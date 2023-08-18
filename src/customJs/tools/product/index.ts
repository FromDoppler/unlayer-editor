import { $t } from '../../localization';
import { ProductViewer } from './ProductViewer';
import { ProductToolDefinition, ProductLayout } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import { urlProperty } from '../../properties/url';
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
  imageProperty,
  richTextProperty,
  textProperty,
  toggleProperty,
  toggleShowProperty,
} from '../../properties/helpers';
import { UnlayerProperty } from '../../types';

const productLayoutProperty: () => UnlayerProperty<ProductLayout> = () =>
  // TODO: replace this dropdown by a nice component
  dropdownProperty({
    label: undefined,
    options: [
      { label: $t('_dp.layout_00_horizontal'), value: '00_horizontal' },
      { label: $t('_dp.layout_01_vertical'), value: '01_vertical' },
    ],
  } as const);

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
          image: imageProperty({
            label: $t('_dp.product_image'),
          }),
        },
      },
      title: {
        title: $t('_dp.title'),
        options: {
          titleShown: toggleShowProperty(),
          titleText: textProperty({
            label: $t('_dp.product_title'),
          }),
          titleFont: fontFamilyProperty(),
          titleFontWeight: fontWeightProperty(),
          titleFontSize: fontSizeProperty(),
          titleColor: colorProperty(),
        },
      },
      prices: {
        title: $t('_dp.prices'),
        options: {
          pricesShown: toggleShowProperty(),
          pricesFont: fontFamilyProperty(),
          pricesFontWeight: fontWeightProperty(),

          pricesDefaultPriceShown: toggleProperty({
            label: $t('_dp.price_default_shown'),
            defaultValue: true,
          }),
          pricesDefaultPriceText: textProperty({
            label: $t('_dp.price_default'),
          }),
          pricesDefaultPriceFontSize: fontSizeProperty({
            label: $t('_dp.price_default_size'),
          }),
          pricesDefaultPriceColor: colorProperty({
            label: $t('_dp.price_default_color'),
          }),

          pricesDiscountPriceShown: toggleProperty({
            label: $t('_dp.price_discount_shown'),
            defaultValue: true,
          }),
          pricesDiscountPriceText: textProperty({
            label: $t('_dp.price_discount'),
          }),
          pricesDiscountPriceFontSize: fontSizeProperty({
            label: $t('_dp.price_discount_size'),
          }),
          pricesDiscountPriceColor: colorProperty({
            label: $t('_dp.price_discount_color'),
          }),
        },
      },
      discount: {
        title: $t('_dp.discount'),
        options: {
          discountShown: toggleShowProperty(),
          discountText: textProperty({
            label: $t('_dp.discount_text'),
          }),
          discountFont: fontFamilyProperty(),
          discountFontWeight: fontWeightProperty(),
          discountFontSize: fontSizeProperty(),
          discountColor: colorProperty(),
        },
      },
      description: {
        title: $t('_dp.description'),
        options: {
          descriptionShown: toggleShowProperty(),
          descriptionHtml: richTextProperty(),
          descriptionFont: fontFamilyProperty(),
          descriptionFontSize: fontSizeProperty(),
        },
      },
      button: {
        title: $t('_dp.product_button'),
        options: {
          buttonShown: toggleShowProperty(),
          buttonText: textProperty({
            label: $t('_dp.product_button_text'),
          }),
          buttonFont: fontFamilyProperty(),
          buttonFontWeight: fontWeightProperty(),
          buttonFontSize: fontSizeProperty(),
          buttonColors: buttonColorsProperty(),
          buttonAutoWith: autoWidthProperty(),
          buttonBorder: borderProperty(),
          buttonBorderRadius: borderRadiusProperty(),
        },
      },
    },
  };
};
