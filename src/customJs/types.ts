import { SOCIAL_NETWORKS } from './constants';
import { ReactNode } from './unlayer-react';

export type SocialNetworkId = (typeof SOCIAL_NETWORKS)[number]['id'];

export type Alignment = 'center' | 'justify' | 'left' | 'right';

export type DisplayMode = 'email' | 'web';

export type LinkType = 'phone' | 'email' | 'sms';

export type Store = {
  name: string;
  promotionCodeEnabled: boolean;
};

export type Percentage = `${number}%`;

export type Image = {
  url: string;
  width: number;
  height: number;
  autoWidth: boolean;
  maxWidth: Percentage;
};

export type ObjectWithStringProps = Record<string, any>;

type WidgetComponentProps<
  TPropertyValue,
  TToolValues = void,
  TToolData = void,
> = {
  value: TPropertyValue;
  updateValue: (v: TPropertyValue) => void;
  data: TToolData;
  values: TToolValues;
  label?: string;
};

export type WidgetComponent<
  TPropertyValue,
  TToolValues = void,
  TToolData = void,
> = (
  props: WidgetComponentProps<TPropertyValue, TToolValues, TToolData>,
) => ReactNode;

export type ReactPropertyDefinition<
  TPropertyName extends string,
  TPropertyValue,
  TToolValues,
  TToolData,
> = {
  name: TPropertyName;
  Widget: WidgetComponent<TPropertyValue, TToolValues, TToolData>;
};

export type UnlayerProperty<
  TPropertyValue,
  TPropertyName extends string = string,
> = Readonly<
  {
    label?: string;
    defaultValue?: TPropertyValue;
    widget: TPropertyName;
    // TODO: add other properties and remove & Record<any, any>;
  } & Record<any, any>
>;

export type ToolInfo = { name: string; label: string; icon: string };

export type ViewerComponentProps<TToolValues> = {
  values: TToolValues;
  displayMode: DisplayMode;
  isViewer: boolean;
  toolInfo: ToolInfo;
};

export type ViewerComponent<TToolValues> = (
  props: ViewerComponentProps<TToolValues>,
) => ReactNode;

export type ToolValuesPropertyStates<TToolValues> = Readonly<
  Partial<Record<keyof TToolValues, { enabled: boolean }>>
>;

export type ReactToolDefinition<
  TToolValues,
  TToolOptions = ObjectWithStringProps,
> = {
  name: string;
  label: string;
  icon: string;
  Component: ViewerComponent<TToolValues>;
  options: TToolOptions;
  validator?: ({
    defaultErrors,
    values,
  }: {
    defaultErrors: ValidatorError[];
    values: TToolValues;
  }) => ValidatorError[];
  propertyStates?: (
    values: TToolValues,
  ) => ToolValuesPropertyStates<TToolValues>;
  transformer?: (
    values: TToolValues,
    source: {
      /** It is the name of updated property */
      name: keyof TToolValues;
      /** It is the new value of updated property */
      value: any;
    },
  ) => TToolValues;
  // TODO: add other properties and remove `& ObjectWithStringProps`;
} & ObjectWithStringProps;

export type ReactToolDefinitionFrom<TBase> = ReactToolDefinition<
  ToolValuesFrom<TBase>,
  PropertyGroupsFrom<TBase>
>;

/**
 * @description TBase is the type of an object with two levels of properties:
 * 1. Property group name
 * 2. Tool value property name / Type of the tool value property
 * @example
 * TBase = {
 *  product: {
 *    productUrl: string;
 *  };
 *  image: {
 *    imageShown: boolean;
 *    imageUrl: UnlayerImageUrlSetting;
 *    imageAutoWith: UnlayerAutoWithSetting;
 *  };
 *  default: {
 *    alignment: Alignment;
 *  }
 *  // . . .
 * };
 * PropertyGroupsFrom<TBase> = {
 *  product: {
 *    title: string;
 *    options: PropertyGroupFrom<{
 *      productUrl: string;
 *    }>;
 *  };
 *  image: {
 *    title: string;
 *    options: PropertyGroupFrom<{
 *      imageShown: boolean;
 *      imageUrl: UnlayerImageUrlSetting;
 *      imageAutoWith: UnlayerAutoWithSetting;
 *    }>;
 *  };
 *  default: {
 *    options: {
 *      alignment: Alignment;
 *    }
 *  }
 *  // . . .
 * };
 */
export type PropertyGroupsFrom<TBase> = Readonly<{
  [Property in keyof TBase]: PropertyGroupsItemFrom<Property, TBase[Property]>;
}>;

type PropertyGroupsItemFrom<Property, TProperty> = Property extends 'default'
  ? {
      options: PropertyGroupFrom<TProperty>;
    }
  : {
      title: string;
      options: PropertyGroupFrom<TProperty>;
    };

/**
 * @description TBaseGroup is the type of an object with the names and types of a group of properties of the tool value
 * @example
 * TBaseGroup = {
 *  titleShown: boolean;
 *  titleText: string;
 *  titleFont: UnlayerFontFamilySetting;
 *  // . . .
 * };
 * PropertyGroupFrom<TBaseGroup> = {
 *  titleShown: UnlayerProperty<boolean>;
 *  titleText: UnlayerProperty<string>;
 *  titleFont: UnlayerProperty<UnlayerFontFamilySetting>;
 *  // . . .
 * }
 */
type PropertyGroupFrom<TBaseGroup> = {
  [Property in keyof TBaseGroup]: UnlayerProperty<TBaseGroup[Property]>;
};

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/**
 * @description TBase is the type of an object with two levels of properties:
 * 1. Property group name
 * 2. Tool value property name / Type of the tool value property
 * @example
 * TBase = {
 *  product: {
 *    productUrl: string;
 *  };
 *  image: {
 *    imageShown: boolean;
 *    imageUrl: UnlayerImageUrlSetting;
 *    imageAutoWith: UnlayerAutoWithSetting;
 *  };
 *  // . . .
 * };
 * ToolValuesFrom<TBase> = {
 *  productUrl: string;
 *  imageShown: boolean;
 *  imageUrl: UnlayerImageUrlSetting;
 *  imageAutoWith: UnlayerAutoWithSetting;
 *  // . . .
 * };
 */
export type ToolValuesFrom<TBase> = Readonly<
  UnionToIntersection<TBase[keyof TBase]>
>;

type ValidatorError = {
  id: string;
  icon: string;
  severity: 'ERROR' | 'WARNING';
  title: string;
  description: string;
};
