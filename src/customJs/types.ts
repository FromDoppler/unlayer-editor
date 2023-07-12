import { SOCIAL_NETWORKS } from './constants';
import { ReactNode } from './unlayer-react';

export type SocialNetworkId = (typeof SOCIAL_NETWORKS)[number]['id'];

export type Alignment = 'center' | 'justify' | 'left' | 'right';

export type DisplayMode = 'email' | 'web';

export type LinkType = 'phone' | 'email' | 'sms';

export type ObjectWithStringProps = Record<string, any>;

export type ToolData = { name: string; label: string; icon: string };

export type WidgetComponent<T> = (props: {
  value: T;
  updateValue: (v: T) => void;
  // TODO: make d property generic, void by default
  data: any;
}) => ReactNode;

export type ReactPropertyDefinition<T> = {
  name: string;
  Widget: WidgetComponent<T>;
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
  // T in ReactToolDefinition<T> should be the combination of the Ts of the widgets
  // of these options
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
