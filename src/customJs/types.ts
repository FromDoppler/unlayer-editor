export type DisplayMode = 'email' | 'web';

export type LinkType = 'phone' | 'email' | 'sms';

export type ObjectWithStringProps = Record<string, any>;

// TODO: make Value type generic based on the property
export type Value = any;

// TODO: make Values type generic based on the property/tool
export type ValueKey = string;

// TODO: make Values type generic based on the tool
export type Values = Record<ValueKey, Value>;

export type ToolData = { name: string; label: string; icon: string };

export type ReactPropertyDefinition = {
  name: string;
  Widget: (props: {
    // TODO: make value property generic
    value: Value;
    // TODO: make v parameter generic based on the same type of value
    updateValue: (v: any) => void;
    // TODO: make d property generic, void by default
    data: any;
  }) => JSX.Element;
};

export type ViewerComponent = (props: {
  values: Values;
  displayMode: DisplayMode;
  isViewer: boolean;
  toolData: ToolData;
}) => JSX.Element;

export type ReactToolDefinition = {
  name: string;
  label: string;
  icon: string;
  Component: ViewerComponent;
  // TODO: typify options
  options: ObjectWithStringProps;
  // TODO: typify validator
  validator?: ({
    defaultErrors,
    values,
  }: {
    defaultErrors: any;
    values: Values;
  }) => any;
  // TODO: add other properties and remove & Record<any, any>;
} & Record<any, any>;
