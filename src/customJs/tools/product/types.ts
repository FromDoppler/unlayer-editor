import {
  Image,
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
}>;

export type ProductPropertyGroups = PropertyGroupsFrom<ProductBase>;

export type ProductValues = ToolValuesFrom<ProductBase>;

export type ProductToolDefinition = ReactToolDefinitionFrom<ProductBase>;
