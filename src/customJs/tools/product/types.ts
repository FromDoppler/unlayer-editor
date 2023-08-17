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
  title: {
    titleShown: boolean;
    titleText: string;
  };
}>;

export type ProductPropertyGroups = PropertyGroupsFrom<ProductBase>;

export type ProductValues = ToolValuesFrom<ProductBase>;

export type ProductToolDefinition = ReactToolDefinitionFrom<ProductBase>;
