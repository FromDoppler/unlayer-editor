import { ProductGalleryValue } from '../../properties/product_gallery/ProductGalleryValue';
import {
  AutoWidth,
  Border,
  BorderRadius,
  ButtonColors,
  Color,
  FontFamily,
  FontWeight,
  Image,
  Margin,
  Padding,
  PixelSize,
  PropertyGroupsFrom,
  ReactToolDefinitionFrom,
  ToolValuesFrom,
} from '../../types';

export type ProductLayout = '00_horizontal' | '01_vertical';
export type ProductArrangement =
  | '01_layout'
  | '02_layout'
  | '03_layout'
  | '04_layout'
  | '05_layout';

export type ProductBase = Readonly<{
  product: {
    productGallery: ProductGalleryValue | undefined;
    productUrl: string;
  };
  layout: {
    backgroundColor: Color;
    layout: ProductLayout;
    arrangement: ProductArrangement;
  };
  image: {
    imageShown: boolean;
    imageIsDynamic: boolean;
    image: Image | undefined;
  };
  title: {
    titleShown: boolean;
    titleIsDynamic: boolean;
    titleText: string;
    titleFont: FontFamily;
    titleFontWeight: FontWeight;
    titleFontSize: PixelSize;
    titleColor: Color;
  };
  prices: {
    pricesShown: boolean;
    pricesFont: FontFamily;
    pricesFontWeight: FontWeight;

    pricesDefaultPriceShown: boolean;
    pricesDefaultPriceIsDynamic: boolean;
    pricesDefaultPriceText: string;
    pricesDefaultPriceFontSize: PixelSize;
    pricesDefaultPriceColor: Color;

    pricesDiscountPriceShown: boolean;
    pricesDiscountPriceIsDynamic: boolean;
    pricesDiscountPriceText: string;
    pricesDiscountPriceFontSize: PixelSize;
    pricesDiscountPriceColor: Color;
  };
  discount: {
    discountShown: boolean;
    discountIsDynamic: boolean;
    discountText: string;
    discountFont: FontFamily;
    discountFontWeight: FontWeight;
    discountFontSize: PixelSize;
    discountColor: Color;
  };
  description: {
    descriptionShown: boolean;
    descriptionIsDynamic: boolean;
    descriptionHtml: string;
    descriptionFont: FontFamily;
    descriptionFontSize: PixelSize;
  };
  button: {
    buttonShown: boolean;
    buttonText: string;
    buttonFont: FontFamily;
    buttonFontWeight: FontWeight;
    buttonFontSize: PixelSize;
    buttonColors: ButtonColors;
    buttonAutoWith: AutoWidth;
    buttonBorder: Border;
    buttonBorderRadius: BorderRadius;
    buttonPadding: Padding;
    buttonMargin: Margin;
  };
}>;

export type ProductDynamicInfo = Readonly<{
  info: {
    infoShown: boolean;
    infoIsDynamic: boolean;
    infoFont?: { value: string };
    infoFontSize?: string;
    infoHtml: string;
    reference: string;
  };
}>;

export type ProductPropertyGroups = PropertyGroupsFrom<ProductBase>;

export type ProductValues = ToolValuesFrom<ProductBase>;

export type ProductToolDefinition = ReactToolDefinitionFrom<ProductBase>;

export type ProductDynamicValues = ToolValuesFrom<
  ProductBase & ProductDynamicInfo
>;
