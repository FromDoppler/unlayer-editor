import { $t } from '../../localization';
import { ProductViewer } from './ProductViewer';
import { ProductToolDefinition, ProductLayout, ProductValues } from './types';
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
import { productGalleryProperty } from '../../properties/product_gallery';
import { ProductGalleryValue } from '../../properties/product_gallery/ProductGalleryValue';
import { productArrangementProperty } from '../../properties/product_arrangement';

const productLayoutProperty: () => UnlayerProperty<ProductLayout> = () =>
  // TODO: replace this dropdown by a nice component
  dropdownProperty({
    label: undefined,
    defaultValue: '01_vertical',
    options: [
      { label: $t('_dp.layout_00_horizontal'), value: '00_horizontal' },
      { label: $t('_dp.layout_01_vertical'), value: '01_vertical' },
    ],
  } as const);

const isEmptyOrZero = (value: string) => {
  if (value === '') return true;
  const numberValue = value.split(' ')[1] || '0';
  return (parseFloat(numberValue) || 0) === 0;
};

const stripHtml = (html: string | undefined): string => {
  const tmp = document.createElement('DIV');
  if (!html) return '';
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const DEFAULT_GREY_COLOR = '#999';
const DEFAULT_GREEN_COLOR = '#64BF91';
const DEFAULT_FONT_SIZE = '20px';

const transformValuesBasedOnProductGallery: (
  productValues: ProductValues,
  productGalleryValue: ProductGalleryValue,
) => ProductValues = (
  productValues: ProductValues,
  {
    productUrl,
    imageUrl,
    title,
    defaultPriceText,
    discountPriceText,
    discountText,
    descriptionHtml,
  }: ProductGalleryValue,
) => ({
  ...productValues,
  productGallery: undefined,
  productUrl: productUrl,
  image: imageUrl
    ? {
        url: imageUrl,
      }
    : undefined,
  imageShown: !!imageUrl,
  titleText: title ?? '',
  titleShown: !!title,
  pricesDefaultPriceText: defaultPriceText ?? '',
  pricesDefaultPriceShown: !!defaultPriceText,
  pricesDiscountPriceText: discountPriceText ?? '',
  pricesDiscountPriceShown:
    !!discountPriceText && !isEmptyOrZero(discountPriceText),
  pricesDefaultPriceColor:
    !!discountPriceText && !isEmptyOrZero(discountPriceText)
      ? DEFAULT_GREY_COLOR
      : DEFAULT_GREEN_COLOR,
  discountText: discountText ?? '',
  discountShown: !!discountText,
  descriptionHtml: stripHtml(descriptionHtml) ?? '',
  descriptionShown: !!descriptionHtml,
});

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
          productGallery: productGalleryProperty(),
          productUrl: urlProperty({
            label: $t('_dp.product_link'),
          }),
        },
      },
      layout: {
        title: $t('_dp.layout'),
        options: {
          layout: productLayoutProperty(),
          arrangement: productArrangementProperty(),
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
            defaultValue: $t('_dp.product_title_default_value'),
            label: $t('_dp.product_title'),
          }),
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
            defaultValue: $t('_dp.product_prices_default_default_value'),
          }),
          pricesDefaultPriceFontSize: fontSizeProperty({
            label: $t('_dp.price_default_size'),
            defaultValue: DEFAULT_FONT_SIZE,
          }),
          pricesDefaultPriceColor: colorProperty({
            label: $t('_dp.price_default_color'),
            defaultValue: DEFAULT_GREEN_COLOR,
          }),

          pricesDiscountPriceShown: toggleProperty({
            label: $t('_dp.price_discount_shown'),
            defaultValue: false,
          }),
          pricesDiscountPriceText: textProperty({
            label: $t('_dp.price_discount'),
            defaultValue: $t('_dp.product_prices_discount_default_value'),
          }),
          pricesDiscountPriceFontSize: fontSizeProperty({
            label: $t('_dp.price_discount_size'),
            defaultValue: DEFAULT_FONT_SIZE,
          }),
          pricesDiscountPriceColor: colorProperty({
            label: $t('_dp.price_discount_color'),
            defaultValue: DEFAULT_GREEN_COLOR,
          }),
        },
      },
      discount: {
        title: $t('_dp.discount'),
        options: {
          discountShown: toggleShowProperty({
            defaultValue: false,
          }),
          discountText: textProperty({
            label: $t('_dp.discount_text'),
            defaultValue: $t('_dp.product_discount_default_value'),
          }),
          discountFont: fontFamilyProperty(),
          discountFontWeight: fontWeightProperty(),
          discountFontSize: fontSizeProperty({
            defaultValue: '16px',
          }),
          discountColor: colorProperty(),
        },
      },
      description: {
        title: $t('_dp.description'),
        options: {
          descriptionShown: toggleShowProperty({
            defaultValue: false,
          }),
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
    transformer(values, source) {
      if (source.name === 'productGallery') {
        values = transformValuesBasedOnProductGallery(values, source.value);
      }
      return values;
    },
  };
};
