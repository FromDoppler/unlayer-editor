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
export type RecommendedStructure = '1' | '2' | '3' | '4';
export type RecommendedType = 'best_selling' | 'cross_selling' | 'new_products';
export type ProductLayout = '00_horizontal' | '01_vertical';
export type OptionTool =
  | 'product'
  | 'recommendedType'
  | 'recommendedStructure'
  | 'layout'
  | 'image'
  | 'title'
  | 'description'
  | 'quantity'
  | 'price'
  | 'button';

export type ProductBase = Readonly<{
  product: {
    structure: ItemsStructure;
  };
  recommendedType: {
    type: RecommendedType;
  };
  recommendedStructure: {
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
    titleFont: FontFamily;
    titleFontWeight: FontWeight;
    titleFontSize: PixelSize;
    titleColor: Color;
  };
  description: {
    descriptionShown: boolean;
    descriptionFont: FontFamily;
    descriptionFontWeight: FontWeight;
    descriptionFontSize: PixelSize;
    descriptionColor: Color;
  };
  quantity: {
    quantityShown: boolean;
    quantityFont: FontFamily;
    quantityFontWeight: FontWeight;
    quantityFontSize: PixelSize;
    quantityColor: Color;
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

export type ProductValues = ToolValuesFrom<Record<OptionTool, any>>;

export type ProductToolDefinition = ReactToolDefinitionFrom<ProductValues>;
