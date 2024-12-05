import { $t } from '../../localization';
import { SmartFormViewer } from './smartFormViewer';
import {
  CustomField,
  ReactToolDefinitionFrom,
  SubscriptionList,
  UnlayerProperty,
} from '../../types';
import { ListOption, SmartFormBase } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import { getConfiguration } from '../../configuration';
import {
  alignmentProperty,
  autoWidthProperty,
  borderProperty,
  borderRadiusProperty,
  colorProperty,
  dropdownProperty,
  fontSizeProperty,
  richTextProperty,
} from '../../properties/helpers';

const DEFAULT_GREEN_COLOR = '#64BF91';
const behaviorListProperty: () => UnlayerProperty<string> = () =>
  dropdownProperty({
    label: $t('_dp.smart_forms.behavior.label'),
    defaultValue: '2',
    options: [
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: $t('_dp.smart_forms.behavior.option_0'), value: '0' },
    ],
  } as const);

const congratsBehaviorListProperty: () => UnlayerProperty<string> = () =>
  dropdownProperty({
    label: $t('_dp.smart_forms.behavior.action.label'),
    defaultValue: '0',
    options: [
      { label: $t('_dp.smart_forms.behavior.action.option_0'), value: '0' },
    ],
  } as const);

const mapListOption = (list: SubscriptionList): ListOption => {
  return { label: list.name, value: list.id };
};

/*
TODO Create a custom property for list manager
*/
const emptySubscriptionList = [{ label: 'Seleccione una lista', value: '-1' }];
const subscriptionList =
  getConfiguration().subscritionsList?.map(mapListOption);
const subscriptionOptionList = (
  subscriptionList.length == 0 ? emptySubscriptionList : subscriptionList
) as [ListOption, ...ListOption[]];

const SubscriptionListProperty: () => UnlayerProperty<string> = () =>
  dropdownProperty({
    label: $t('_dp.smart_forms.action.label'),
    options: subscriptionOptionList,
  } as const);

const getFieldCompatibleType = (type: CustomField['type']): string => {
  switch (type) {
    case 'text':
    case 'date':
    case 'number':
    case 'email':
      return type;
    case 'select':
    case 'radio':
      return 'dropdown';
    default:
      return 'undefined';
  }
};

const optionToString = (options: ListOption[] | undefined) => {
  return options
    ?.reduce((stringOptions, option: ListOption) => {
      return stringOptions.concat(
        option.label.concat('|').concat(option.value).concat('\n'),
      );
    }, '')
    ?.slice(0, -1);
};

const availableFields = getConfiguration().customFields?.map(
  (field: CustomField) => {
    return {
      name: field.id,
      type: getFieldCompatibleType(field.type),
      label: field.label,
      required: field.required,
      show_label: true,
      options: optionToString(field.options),
    };
  },
);

export const getSmartFormToolDefinition: () =>
  | ReactToolDefinitionFrom<SmartFormBase>
  | undefined = () => {
  return {
    name: 'smart_form',
    label: $t('_dp.smart_forms.label'),
    icon: `${ASSETS_BASE_URL}/form1.svg`,
    usageLimit: 1,
    Component: SmartFormViewer,
    options: {
      behavior: {
        title: $t('_dp.smart_forms.behavior.title'),
        options: {
          display: behaviorListProperty(),
          congratBehavior: congratsBehaviorListProperty(),
          descriptionHtml: richTextProperty({
            label: $t('_dp.smart_forms.behavior.message'),
          }),
        },
      },
      formAction: {
        title: $t('_dp.smart_forms.action.title'),
        options: {
          list: SubscriptionListProperty(),
        },
      },
      form_manager: {
        title: $t('_dp.smart_forms.field.title'),
        options: {
          fields: {
            data: {
              allowAddNewField: false,
              defaultFields: availableFields,
            },

            label: $t('_dp.smart_forms.field.label'),
            defaultValue: [
              {
                name: 'email',
                type: 'email',
                label: 'Email',
                placeholder_text: `${$t('_dp.smart_forms.field.placeholder.enter')} email`,
                show_label: !0,
                required: !0,
              },
              {
                name: 'name',
                type: 'text',
                label: 'Nombre',
                placeholder_text: `${$t('_dp.smart_forms.field.placeholder.enter')} nombre`,
                show_label: !0,
                required: !0,
              },
            ],
            widget: 'fields',
          },
          fieldBorder: borderProperty({
            defaultValue: '1px',
            hidden: !0,
          }),
          fieldBorderRadius: borderRadiusProperty({
            hidden: !0,
          }),
          fieldPadding: {
            label: 'Padding',
            defaultValue: '10px',
            widget: 'padding',
            hidden: !0,
          },
          fieldBackgroundColor: colorProperty({
            label: 'Background Color',
            defaultValue: '#FFF',
            hidden: !0,
          }),
          fieldColor: colorProperty({
            label: 'Text Color',
            defaultValue: '#000',
            hidden: !0,
          }),
          fieldFontSize: fontSizeProperty({
            label: 'Font Size',
            defaultValue: '12px',
            hidden: !0,
          }),
        },
      },
      layout: {
        title: 'Layout',
        options: {
          formWidth: autoWidthProperty(),

          formAlign: alignmentProperty(),
          fieldDistance: {
            label: 'Space Between Fields',
            defaultValue: '10px',
            widget: 'px',
            hidden: !0,
          },
        },
      },
      labels: {
        title: 'Labels',
        options: {
          labelFontSize: fontSizeProperty({
            label: 'Font Size',
            defaultValue: '14px',
          }),

          labelColor: {
            label: 'Color',
            defaultValue: '#444',
            widget: 'color_picker',
          },
          labelAlign: {
            label: 'Alignment',
            defaultValue: 'left',
            widget: 'alignment',
            overrideAllowed: !0,
          },
          labelPadding: {
            label: 'Padding',
            defaultValue: '0px 0px 3px',
            widget: 'padding',
            hidden: !0,
          },
        },
      },

      button: {
        title: 'Button',
        options: {
          buttonText: {
            label: 'Text',
            defaultValue: $t('_dp.smart_forms.submit.value'),
            widget: 'text',
          },
          buttonBackgroundColor: colorProperty({
            label: 'Background Color',
            defaultValue: DEFAULT_GREEN_COLOR,
            hidden: !0,
          }),
          buttonColor: colorProperty({
            label: 'Text Color',
            defaultValue: '#FFF',
            hidden: !0,
          }),
          buttonAlign: alignmentProperty({
            hidden: !0,
          }),
          buttonWidth: {
            defaultValue: {
              autoWidth: !1,
              width: '100%',
            },
            label: 'Width',
            widget: 'auto_width',
            overrideAllowed: !0,
          },
          buttonFontSize: {
            label: 'Font Size',
            defaultValue: '14px',
            widget: 'font_size',
            overrideAllowed: !0,
            hidden: !0,
          },
          buttonBorder: borderProperty({
            defaultValue: '0px',
            hidden: !0,
          }),
          buttonBorderRadius: {
            label: 'Rounded Border',
            defaultValue: '4px',
            widget: 'border_radius',
            overrideAllowed: !0,
            hidden: !0,
          },
          buttonPadding: {
            label: 'Padding',
            defaultValue: '10px',
            widget: 'padding',
            hidden: !0,
          },
          buttonMargin: {
            label: 'Margin',
            defaultValue: '5px 0px 0px',
            widget: 'margin',
            hidden: !0,
          },
        },
      },
    },
  };
};
