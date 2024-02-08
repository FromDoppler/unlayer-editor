import {
  AutoWidth,
  Border,
  BorderRadius,
  ButtonColors,
  Color,
  FontFamily,
  FontWeight,
  PixelSize,
  PropertyGroupsFrom,
  ReactToolDefinitionFrom,
  ToolValuesFrom,
} from '../../types';

export type ItemsStructure = '0' | '1' | '2' | '3';
export type ProductLayout = '00_horizontal' | '01_vertical';

export type ProductBase = Readonly<{
  product: {
    structure: ItemsStructure;
  };
  layout: {
    backgroundColor: Color;
    layout: ProductLayout;
  };
  image: {
    imageShown: boolean;
    imageAutoWith: AutoWidth;
  };
  title: {
    titleShown: boolean;
    titleFont: FontFamily;
    titleFontWeight: FontWeight;
    titleFontSize: PixelSize;
    titleColor: Color;
  };
  price: {
    priceShown: boolean;
    priceFont: FontFamily;
    priceFontWeight: FontWeight;
    priceFontSize: PixelSize;
    priceColor: Color;
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