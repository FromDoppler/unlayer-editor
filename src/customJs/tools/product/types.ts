import {
  AutoWidth,
  Border,
  BorderRadius,
  ButtonColors,
  Color,
  FontFamily,
  FontWeight,
  Image,
  PixelSize,
  PropertyGroupsFrom,
  ReactToolDefinitionFrom,
  ToolValuesFrom,
} from '../../types';

export type ProductBase = Readonly<{
  product: {
    productUrl: string;
  };
  image: {
    imageShown: boolean;
    image: Image;
  };
  title: {
    titleShown: boolean;
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
    pricesDefaultPriceText: string;
    pricesDefaultPriceFontSize: PixelSize;
    pricesDefaultPriceColor: Color;

    pricesDiscountPriceShown: boolean;
    pricesDiscountPriceText: string;
    pricesDiscountPriceFontSize: PixelSize;
    pricesDiscountPriceColor: Color;
  };
  discount: {
    discountShown: boolean;
    discountText: string;
    discountFont: FontFamily;
    discountFontWeight: FontWeight;
    discountFontSize: PixelSize;
    discountColor: Color;
  };
  description: {
    descriptionShown: boolean;
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
  };
}>;

export type ProductPropertyGroups = PropertyGroupsFrom<ProductBase>;

export type ProductValues = ToolValuesFrom<ProductBase>;

export type ProductToolDefinition = ReactToolDefinitionFrom<ProductBase>;
