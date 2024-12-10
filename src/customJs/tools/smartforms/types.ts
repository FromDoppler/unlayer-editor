import {
  Alignment,
  AutoWidth,
  Border,
  BorderRadius,
  Color,
  Margin,
  Padding,
  PixelSize,
  PropertyGroupsFrom,
  ToolValuesFrom,
} from '../../types';

export type ListOption = { value: string; label: string };

export type CustomField = {
  predefined: boolean;
  name: string;
  sample: string;
  type:
    | 'string'
    | 'phone'
    | 'email'
    | 'number'
    | 'date'
    | 'gender'
    | 'boolean'
    | 'permission'
    | 'country'
    | 'text'
    | 'checkbox'
    | 'select'
    | 'radio';
  required: boolean;
  allowedValues?: string[];
};

export type SubscriptionList = {
  listId: string;
  name: string;
};

export type UnlayerField = {
  name: string;
  type: string;
  label: string;
  placeholder_text: string;
  options?: string;
  show_label: boolean;
  required: boolean;
};

export type SmartFormBase = {
  behavior: {
    display: string;
    congratBehavior: string;
    descriptionHtml: string;
  };
  formAction: {
    list: string;
  };
  form_manager: {
    fields: UnlayerField[];
    fieldBorder: Border;
    fieldBorderRadius: BorderRadius;
    fieldPadding: Padding;
    fieldBackgroundColor: Color;
    fieldColor: Color;
    fieldFontSize: PixelSize;
  };
  layout: {
    formWidth: AutoWidth;
    formAlign: Alignment;
    fieldDistance: PixelSize;
  };
  labels: {
    labelFontSize: PixelSize;
    labelColor: Color;
    labelAlign: Alignment;
    labelPadding: Padding;
  };
  button: {
    buttonText: string;
    buttonBackgroundColor: Color;
    buttonColor: Color;
    buttonAlign: Alignment;
    buttonWidth: AutoWidth;
    buttonFontSize: PixelSize;
    buttonBorder: Border;
    buttonBorderRadius: BorderRadius;
    buttonPadding: Padding;
    buttonMargin: Margin;
  };
};

export type SmartFormPropertyGroups = PropertyGroupsFrom<SmartFormBase>;

export type SmartFormValues = ToolValuesFrom<SmartFormBase>;
