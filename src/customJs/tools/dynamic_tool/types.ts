import {
  Alignment,
  AutoWidth,
  Border,
  BorderRadius,
  ButtonColors,
  Color,
  FontFamily,
  FontWeight,
  Margin,
  Padding,
  PixelSize,
  PropertyGroupsFrom,
  ReactToolDefinitionFrom,
  ToolValuesFrom,
} from '../../types';

export type ItemsStructure = '0' | '1' | '2' | '3';
export type RecommendedStructure = '1' | '2' | '3' | '4';
export type RecommendedType = 'best_selling' | 'cross_selling' | 'new_products';
export type ProductLayout = '00_horizontal' | '01_vertical';
export type OptionTool =
  | 'product'
  | 'recommendedType'
  | 'recommendedStructure'
  | 'recommendedProductStructure'
  | 'layout'
  | 'image'
  | 'title'
  | 'info'
  | 'quantity'
  | 'price'
  | 'button';

export type ProductBase = Readonly<{
  product: {
    structure: ItemsStructure;
  };
  recommendedProductStructure: {
    structure: RecommendedStructure;
  };
  recommendedStructure: {
    type: RecommendedType;
    structure: RecommendedStructure;
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
    titleAlignment: Alignment;
    titleFont: FontFamily;
    titleFontWeight: FontWeight;
    titleFontSize: PixelSize;
    titleColor: Color;
  };
  info: {
    infoShown: boolean;
    infoAlignment: Alignment;
    infoFont: FontFamily;
    infoFontWeight: FontWeight;
    infoFontSize: PixelSize;
    infoColor: Color;
  };
  quantity: {
    quantityShown: boolean;
    quantityAlignment: Alignment;
    quantityFont: FontFamily;
    quantityFontWeight: FontWeight;
    quantityFontSize: PixelSize;
    quantityColor: Color;
  };
  price: {
    priceShown: boolean;
    priceAlignment: Alignment;
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
    buttonPadding: Padding;
    buttonMargin: Margin;
  };
}>;

export type ProductPropertyGroups = PropertyGroupsFrom<ProductBase>;

export type ProductValues = ToolValuesFrom<Record<OptionTool, any>>;

export type ProductToolDefinition = ReactToolDefinitionFrom<ProductValues>;
