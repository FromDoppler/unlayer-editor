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
}>;

export type ProductPropertyGroups = PropertyGroupsFrom<ProductBase>;

export type ProductValues = ToolValuesFrom<ProductBase>;

export type ProductToolDefinition = ReactToolDefinitionFrom<ProductBase>;
