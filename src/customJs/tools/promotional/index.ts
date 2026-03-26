import { $t } from '../../localization';
import { PromotionalViewer } from './PromotionalViewer';
import { ReactToolDefinitionFrom } from '../../types';
import { PromotionalBase, PromotionalValues } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import {
  alignmentProperty,
  autoWidthProperty,
  borderProperty,
  borderRadiusProperty,
  colorProperty,
  fontWeightProperty,
  richTextProperty,
  textProperty,
} from '../../properties/helpers';
import { availableFields } from '../smartforms/helper';
import { subscriptionListProperty } from '../../properties/subscription_list';
import { buttonGroupProperty } from '../../properties/button_group';
import { labeledAutoWidthProperty } from '../../properties/labeled_auto_width';
import { UnlayerField } from '../smartforms/types';

const DEFAULT_PROMOTIONAL_BACKGROUND = '#FFFFFF';
const DEFAULT_INITIAL_BUTTON_COLOR = '#2A75DB';
const DEFAULT_FINAL_BUTTON_COLOR = '#2A75DB';
const DEFAULT_FIELD_BACKGROUND_COLOR = '#FFFFFF';
const DEFAULT_FIELD_TEXT_COLOR = '#000000';
const DEFAULT_INIT_DESCRIPTION = `
  <p style="text-align: center; margin: 0 0 10px;">
    <span style="font-size: 34px;"><strong>¡No te vayas sin obtener tu descuento!</strong></span>
  </p>
  <p style="text-align: center; margin: 0;">
    <span style="font-size: 16px;">Ingresa tu Email y accede a un 20% OFF en tu próxima compra.</span>
  </p>`;

const DEFAULT_END_DESCRIPTION = `
  <p style="text-align: center; margin: 0 0 10px;">
    <span style="font-size: 34px;"><strong>El descuento ya es tuyo</strong></span>
  </p>
  <p style="text-align: center; margin: 0;">
    <span style="font-size: 16px;">Copia el siguiente código de descuento y úsalo en tu próxima compra.</span>
  </p>`;

export const getPromotionalToolDefinition: () =>
  | ReactToolDefinitionFrom<PromotionalBase>
  | undefined = () => {
  return {
    name: 'promotional',
    label: $t('_dp.promotional.label'),
    icon: `${ASSETS_BASE_URL}/promotion_code_v2.svg`,
    usageLimit: 1,
    Component: PromotionalViewer,
    options: {
      messages: {
        title: $t('_dp.promotional.messages'),
        options: {
          viewPanel: buttonGroupProperty({
            defaultValue: 'init',
            data: [
              {
                label: $t('_dp.promotional.messages.init'),
                value: 'init',
                active: true,
              },
              {
                label: $t('_dp.promotional.messages.end'),
                value: 'end',
                active: false,
              },
            ],
          }),
          descriptionHtml: richTextProperty({
            label: $t('_dp.promotional.messages.description'),
            defaultValue: DEFAULT_INIT_DESCRIPTION,
          }),
          list: subscriptionListProperty({
            defaultValue: '-1',
          }),
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
                  type: 'email',
                },
                type: 'email',
                label: 'Email',
                placeholder_text: `${$t('_dp.smart_forms.field.placeholder.enter')} email`,
                show_label: false,
                required: true,
              },
            ],
            widget: 'fields',
          },
          fieldBackgroundColor: colorProperty({
            label: $t('_dp.promotional.field.background_color'),
            defaultValue: DEFAULT_FIELD_BACKGROUND_COLOR,
          }),
          fieldColor: colorProperty({
            label: $t('_dp.promotional.field.text_color'),
            defaultValue: DEFAULT_FIELD_TEXT_COLOR,
          }),
          buttonText: {
            label: $t('_dp.promotional.button.text'),
            defaultValue: $t('_dp.promotional.button.text_default'),
            widget: 'text',
          },
          buttonBackgroundColor: colorProperty({
            label: $t('_dp.promotional.button.background_color'),
            defaultValue: DEFAULT_INITIAL_BUTTON_COLOR,
          }),
          buttonColor: colorProperty({
            label: $t('_dp.promotional.button.text_color'),
            defaultValue: '#FFF',
          }),
          buttonAlign: {
            label: $t('_dp.promotional.button.align'),
            defaultValue: 'center',
            hidden: true,
            widget: 'alignment',
          },
          buttonFontWeight: fontWeightProperty({
            label: $t('_dp.promotional.button.font_weight'),
            defaultValue: 700,
            hidden: true,
          }),
          buttonWidth: labeledAutoWidthProperty({
            label: $t('_dp.promotional.button.width'),
            defaultValue: '100%',
            autoWidth: true,
            hidden: true,
          }),
          buttonFontSize: {
            label: $t('_dp.promotional.button.font_size'),
            defaultValue: '16px',
            hidden: true,
            widget: 'font_size',
            overrideAllowed: true,
          },
          buttonBorder: {
            ...borderProperty({
              defaultValue: '0px',
              hidden: true,
            }),
            label: $t('_dp.promotional.button.border'),
          },
          buttonBorderRadius: {
            label: $t('_dp.promotional.button.border_radius'),
            defaultValue: '3px',
            hidden: true,
            widget: 'border_radius',
            overrideAllowed: true,
          },
          buttonPadding: {
            label: $t('_dp.promotional.button.padding'),
            defaultValue: '14px 16px 14px 16px',
            hidden: true,
            widget: 'padding',
          },
          buttonMargin: {
            label: $t('_dp.promotional.button.margin'),
            defaultValue: '8px 0px 0px 0px',
            hidden: true,
            widget: 'margin',
          },
          congratsHtml: richTextProperty({
            label: $t('_dp.promotional.messages.description'),
            defaultValue: DEFAULT_END_DESCRIPTION,
          }),
          discountCode: textProperty({
            label: $t('_dp.promotional.discount_code.label'),
            defaultValue: 'COD20%OFF',
          }),
          congratsButtonText: {
            label: $t('_dp.promotional.congrats.button.text'),
            defaultValue: $t('_dp.promotional.congrats.button.text_default'),
            widget: 'text',
          },
          congratsButtonBackgroundColor: colorProperty({
            label: $t('_dp.promotional.button.background_color'),
            defaultValue: DEFAULT_FINAL_BUTTON_COLOR,
          }),
          congratsButtonColor: colorProperty({
            label: $t('_dp.promotional.button.text_color'),
            defaultValue: '#FFF',
          }),
          congratsButtonAlign: {
            label: $t('_dp.promotional.button.align'),
            defaultValue: 'center',
            hidden: true,
            widget: 'alignment',
          },
          congratsButtonFontWeight: fontWeightProperty({
            label: $t('_dp.promotional.button.font_weight'),
            defaultValue: 700,
            hidden: true,
          }),
          congratsButtonWidth: labeledAutoWidthProperty({
            label: $t('_dp.promotional.button.width'),
            defaultValue: '100%',
            autoWidth: true,
            hidden: true,
          }),
          congratsButtonFontSize: {
            label: $t('_dp.promotional.button.font_size'),
            defaultValue: '14px',
            hidden: true,
            widget: 'font_size',
            overrideAllowed: true,
          },
          congratsButtonBorder: {
            ...borderProperty({
              defaultValue: '0px',
              hidden: true,
            }),
            label: $t('_dp.promotional.button.border'),
          },
          congratsButtonBorderRadius: {
            label: $t('_dp.promotional.button.border_radius'),
            defaultValue: '4px',
            hidden: true,
            widget: 'border_radius',
            overrideAllowed: true,
          },
          congratsButtonPadding: {
            label: $t('_dp.promotional.button.padding'),
            defaultValue: '10px',
            hidden: true,
            widget: 'padding',
          },
          congratsButtonMargin: {
            label: $t('_dp.promotional.button.margin'),
            defaultValue: '0px',
            hidden: true,
            widget: 'margin',
          },
        },
      },
      layout: {
        title: $t('_dp.layout'),
        options: {
          cardWidth: autoWidthProperty(),
          cardAlign: alignmentProperty(),
          cardBackgroundColor: colorProperty({
            label: $t('editor.background_color.label'),
            defaultValue: DEFAULT_PROMOTIONAL_BACKGROUND,
          }),
          cardBorder: borderProperty({
            defaultValue: '1px',
          }),
          cardBorderRadius: borderRadiusProperty(),
          cardPadding: {
            label: 'Padding',
            defaultValue: '24px 18px 22px',
            widget: 'padding',
          },
        },
      },
    },
    propertyStates: (values: PromotionalValues) => ({
      descriptionHtml: {
        enabled: values.viewPanel === 'init',
      },
      list: {
        enabled: values.viewPanel === 'init',
      },
      fields: {
        enabled: values.viewPanel === 'init',
      },
      buttonText: {
        enabled: values.viewPanel === 'init',
      },
      buttonBackgroundColor: {
        enabled: values.viewPanel === 'init',
      },
      buttonColor: {
        enabled: values.viewPanel === 'init',
      },
      fieldBackgroundColor: {
        enabled: values.viewPanel === 'init',
      },
      fieldColor: {
        enabled: values.viewPanel === 'init',
      },
      buttonAlign: {
        enabled: values.viewPanel === 'init',
      },
      buttonFontWeight: {
        enabled: values.viewPanel === 'init',
      },
      buttonWidth: {
        enabled: values.viewPanel === 'init',
      },
      buttonFontSize: {
        enabled: values.viewPanel === 'init',
      },
      buttonBorder: {
        enabled: values.viewPanel === 'init',
      },
      buttonBorderRadius: {
        enabled: values.viewPanel === 'init',
      },
      buttonPadding: {
        enabled: values.viewPanel === 'init',
      },
      buttonMargin: {
        enabled: values.viewPanel === 'init',
      },
      congratsHtml: {
        enabled: values.viewPanel === 'end',
      },
      discountCode: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonText: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonBackgroundColor: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonColor: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonAlign: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonFontWeight: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonWidth: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonFontSize: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonBorder: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonBorderRadius: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonPadding: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonMargin: {
        enabled: values.viewPanel === 'end',
      },
    }),
    transformer: (values, source) => {
      const { name, value } = source;
      if (name === 'fields') {
        const emailIndex = value.findIndex(
          ({ name }: UnlayerField) => name === 'EMAIL',
        );
        if (emailIndex > 0) {
          const emailField = value[emailIndex];
          value.splice(emailIndex, 1);
          value.splice(0, 0, emailField);
        }
      }
      return values;
    },
    validator: ({ defaultErrors, values }) => {
      if (values.list === '-1') {
        defaultErrors.push({
          id: 'PROMOTIONAL_TARGET_LIST_REQUIRED_ERROR',
          icon: `${ASSETS_BASE_URL}/promotion_code_v2.svg`,
          severity: 'ERROR',
          title: $t(
            'tabs.audit.rules.smart_form.subscription_list_undefined.title',
          ),
          description: $t(
            'tabs.audit.rules.smart_form.subscription_list_undefined.description',
          ),
        });
      }
      return defaultErrors;
    },
  };
};
