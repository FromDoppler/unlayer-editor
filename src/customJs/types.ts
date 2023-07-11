import { SOCIAL_NETWORKS } from './constants';
import { ReactNode } from './unlayer-react';

export type SocialNetworkId = (typeof SOCIAL_NETWORKS)[number]['id'];

export type Alignment = 'center' | 'justify' | 'left' | 'right';

export type DisplayMode = 'email' | 'web';

export type LinkType = 'phone' | 'email' | 'sms';

export type ObjectWithStringProps = Record<string, any>;

// TODO: make Value type generic based on the property
export type Value = any;

export type ToolData = { name: string; label: string; icon: string };

export type WidgetComponent = (props: {
  // TODO: make value property generic
  value: Value;
  // TODO: make v parameter generic based on the same type of value
  updateValue: (v: any) => void;
  // TODO: make d property generic, void by default
  data: any;
}) => ReactNode;

export type ReactPropertyDefinition = {
  name: string;
  Widget: WidgetComponent;
};

export type ViewerComponent<T> = (props: {
  values: T;
  displayMode: DisplayMode;
  isViewer: boolean;
  toolData: ToolData;
}) => ReactNode;

export type ReactToolDefinition<T> = {
  name: string;
  label: string;
  icon: string;
  Component: ViewerComponent<T>;
  // TODO: typify options
  options: ObjectWithStringProps;
  // TODO: typify validator
  validator?: ({
    defaultErrors,
    values,
  }: {
    defaultErrors: any;
    values: T;
  }) => any;
  // TODO: add other properties and remove & Record<any, any>;
} & Record<any, any>;
