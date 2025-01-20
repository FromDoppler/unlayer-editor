import { $t } from '../../localization';
import { SmartFormViewer } from './smartFormViewer';
import { ReactToolDefinitionFrom } from '../../types';
import { SmartFormBase, SmartFormValues, UnlayerField } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import {
  alignmentProperty,
  autoWidthProperty,
  borderProperty,
  borderRadiusProperty,
  colorProperty,
  fontSizeProperty,
  fontWeightProperty,
  richTextProperty,
} from '../../properties/helpers';
import {
  behaviorListProperty,
  congratsBehaviorListProperty,
  SubscriptionListProperty,
  availableFields,
  isValidUrl,
} from './helper';
import { urlProperty } from '../../properties/url';

const DEFAULT_GREEN_COLOR = '#64BF91';

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
          congratUrl: urlProperty({
            label: $t('_dp.smart_forms.behavior.congratsUrl.label'),
          }),
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
              defaultFields: availableFields || [],
            },

            label: $t('_dp.smart_forms.field.label'),
            defaultValue: [
              {
                name: 'EMAIL',
                meta_data: {
                  name: 'EMAIL',
                },
                type: 'email',
                label: 'Email',
                placeholder_text: `${$t('_dp.smart_forms.field.placeholder.enter')} email`,
                show_label: true,
                required: true,
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
          buttonFontWeight: fontWeightProperty({
            defaultValue: 700,
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
    propertyStates: (values: SmartFormValues) => ({
      congratUrl: {
        enabled: values.congratBehavior === 'url',
      },
      descriptionHtml: {
        enabled: values.congratBehavior === 'message',
      },
    }),

    transformer: (values, source) => {
      const { name, value } = source;
      if (name === 'fields') {
        const emailIndex = value.findIndex(({ name }) => name === 'EMAIL');
        if (emailIndex > 0) {
          const emailField = value[emailIndex];
          value.splice(emailIndex, 1);
          value.splice(0, 0, emailField);
        }
        addEventListener('click', getClick, true);
      }
      return values;
    },
    validator: ({ defaultErrors, values }) => {
      if (values.list === '') {
        defaultErrors.push({
          id: 'SMART_FORM_TARGET_LIST_REQUIRED_ERROR',
          icon: `${ASSETS_BASE_URL}/form1.svg`,
          severity: 'ERROR',
          title: $t(
            'tabs.audit.rules.smart_form.subscription_list_undefined.title',
          ),
          description: $t(
            'tabs.audit.rules.smart_form.subscription_list_undefined.description',
          ),
        });
      }

      if (
        values.congratBehavior === 'message' &&
        values.descriptionHtml === ''
      ) {
        defaultErrors.push({
          id: 'SMART_FORM_CONGRATS_MESSAGE_REQUIRED_ERROR',
          icon: `${ASSETS_BASE_URL}/form1.svg`,
          severity: 'ERROR',
          title: $t(
            'tabs.audit.rules.smart_form.congrats_message_undefined.title',
          ),
          description: $t(
            'tabs.audit.rules.smart_form.congrats_message_undefined.description',
          ),
        });
      } else if (values.congratBehavior === 'url' && !values.congratUrl) {
        defaultErrors.push({
          id: 'SMART_FORM_CONGRATS_URL_REQUIRED_ERROR',
          icon: `${ASSETS_BASE_URL}/form1.svg`,
          severity: 'ERROR',
          title: $t('tabs.audit.rules.smart_form.congrats_url_undefined.title'),
          description: $t(
            'tabs.audit.rules.smart_form.congrats_url_undefined.description',
          ),
        });
      } else if (
        values.congratBehavior === 'url' &&
        values.congratUrl &&
        !isValidUrl(values.congratUrl)
      ) {
        defaultErrors.push({
          id: 'SMART_FORM_CONGRATS_URL_INVALID_ERROR',
          icon: `${ASSETS_BASE_URL}/form1.svg`,
          severity: 'ERROR',
          title: $t('tabs.audit.rules.smart_form.congrats_url_invalid.title'),
          description: $t(
            'tabs.audit.rules.smart_form.congrats_url_invalid.description',
          ),
        });
      }
      return defaultErrors;
    },
  };
};

/* Note: temporal function for manipulating UNLAYER field edit modal */
const getClick = (event: any) => {
  if (event.target.className == 'col-12') {
    const modalBody = document.querySelectorAll(
      '.blockbuilder-fields-widget-modal > div > div ',
    )[1];
    if (!modalBody) {
      return;
    }
    const modalfooter = document.querySelectorAll(
      '.blockbuilder-fields-widget-modal > div > div ',
    )[2];
    const forms = modalBody.getElementsByTagName('form');
    const inputs = modalBody.getElementsByTagName('input');
    const inputName = inputs[0].value;
    const currentField = availableFields.find((field: UnlayerField) => {
      return field.name == inputName;
    });

    //disabled change type update
    const buttonType = modalBody.getElementsByTagName('button')[0];
    buttonType['disabled'] = currentField.type !== 'text';

    //disabled dropdown values update
    const inputOption = modalBody.getElementsByTagName('textarea')[0];
    if (inputOption) inputOption['disabled'] = currentField.type !== 'text';

    const buttonEliminate = modalfooter.getElementsByTagName('button')[1];
    buttonEliminate['disabled'] = inputName === 'EMAIL';

    //remove name fieldset
    forms[0].remove();
  }
};
