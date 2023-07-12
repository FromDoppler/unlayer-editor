import { SOCIAL_NETWORKS } from './constants';
import { ReactNode } from './unlayer-react';

export type SocialNetworkId = (typeof SOCIAL_NETWORKS)[number]['id'];

export type Alignment = 'center' | 'justify' | 'left' | 'right';

export type DisplayMode = 'email' | 'web';

export type LinkType = 'phone' | 'email' | 'sms';

export type ObjectWithStringProps = Record<string, any>;

export type ToolData = { name: string; label: string; icon: string };

export type WidgetComponent<TPropertyValue, TToolValues = void> = (props: {
  value: TPropertyValue;
  updateValue: (v: TPropertyValue) => void;
  // TODO: make d property generic, void by default
  data: any;
  values: TToolValues;
}) => ReactNode;

export type ReactPropertyDefinition<TPropertyValue, TToolValues = void> = {
  name: string;
  Widget: WidgetComponent<TPropertyValue, TToolValues>;
};

export type ViewerComponent<TToolValues> = (props: {
  values: TToolValues;
  displayMode: DisplayMode;
  isViewer: boolean;
  toolData: ToolData;
}) => ReactNode;

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
