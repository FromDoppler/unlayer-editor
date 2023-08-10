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

export type ObjectWithStringProps = Record<string, any>;

export type WidgetComponentProps<
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

export type ReactProperty<TPropertyName extends string, TPropertyValue> = {
  label: string;
  defaultValue: TPropertyValue;
  widget: TPropertyName;
  // TODO: add other properties and remove & Record<any, any>;
} & Record<any, any>;

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

export type ReactToolDefinition<TToolValues> = {
  name: string;
  label: string;
  icon: string;
  Component: ViewerComponent<TToolValues>;
  // TODO: typify options
  // TToolValues should be the combination of the TPropertyValues of these options
  options: ObjectWithStringProps;
  // TODO: typify validator
  validator?: ({
    defaultErrors,
    values,
  }: {
    defaultErrors: any;
    values: TToolValues;
  }) => any;
  // TODO: add other properties and remove & Record<any, any>;
} & Record<any, any>;
