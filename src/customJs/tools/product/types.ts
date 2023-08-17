import {
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
}>;

export type ProductPropertyGroups = PropertyGroupsFrom<ProductBase>;

export type ProductValues = ToolValuesFrom<ProductBase>;

export type ProductToolDefinition = ReactToolDefinitionFrom<ProductBase>;
