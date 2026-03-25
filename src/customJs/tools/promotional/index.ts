import { $t } from '../../localization';
import { PromotionalViewer } from './PromotionalViewer';
import { ReactToolDefinitionFrom } from '../../types';
import { PromotionalBase, PromotionalValues } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import {
  alignmentProperty,
  borderProperty,
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
import { Border } from '../../types';

const DEFAULT_PROMOTIONAL_BACKGROUND = '#620071';
const DEFAULT_INITIAL_BUTTON_COLOR = '#620071';
const DEFAULT_FINAL_BUTTON_COLOR = '#620071';
const DEFAULT_FIELD_BACKGROUND_COLOR = '#FFFFFF';
const DEFAULT_FIELD_TEXT_COLOR = '#333333';
const DEFAULT_INIT_DESCRIPTION = `
  <p style="text-align: center; margin: 0 0 6px; line-height: 1.15;"><span style="color: rgb(255, 255, 255);"><strong><span style="font-size: 32px; font-family: 'Open Sans', sans-serif;"><span style="color: rgb(254, 230, 0);"><span style="font-size: 28px;">&iexcl;No te vayas sin obtener tu descuento</span>!<br></span></span></strong></span><span style="font-size: 16px; color: rgb(255, 255, 255);"><br>Ingresa tu Email y accede a un 20% OFF </span></p>
  <p style="text-align: center; margin: 0 0 6px; line-height: 1.15;"><span style="font-size: 16px; color: rgb(255, 255, 255);">en tu pr&oacute;xima compra.<br><br></span></p>`;

const DEFAULT_END_DESCRIPTION = `
  <p style="text-align: center; margin: 0 0 6px; line-height: 1.15;"><span style="color: rgb(254, 230, 0); font-size: 28px;"><strong><span style="font-family: 'Open Sans', sans-serif;">&iexcl;El descuento es tuyo!</span></strong></span></p>
  <p style="text-align: center; margin: 0; line-height: 1.35;"><span style="font-size: 16px; font-weight: 400; font-family: 'Open Sans', sans-serif;">Copia el siguiente c&oacute;digo de descuento </span></p>
  <p style="text-align: center; margin: 0; line-height: 1.35;"><span style="font-size: 16px; font-weight: 400; font-family: 'Open Sans', sans-serif;">y &uacute;salo en tu pr&oacute;xima compra.<br><br></span></p>`;

const DEFAULT_BUTTON_BORDER: Border = {
  borderTopWidth: '2px',
  borderTopStyle: 'solid',
  borderTopColor: '#FEE600',
  borderLeftWidth: '2px',
  borderLeftStyle: 'solid',
  borderLeftColor: '#FEE600',
  borderRightWidth: '2px',
  borderRightStyle: 'solid',
  borderRightColor: '#FEE600',
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  borderBottomColor: '#FEE600',
};

const DEFAULT_CARD_BORDER: Border = {
  borderTopWidth: '0px',
  borderTopStyle: 'solid',
  borderTopColor: '#CCC',
  borderLeftWidth: '0px',
  borderLeftStyle: 'solid',
  borderLeftColor: '#CCC',
  borderRightWidth: '0px',
  borderRightStyle: 'solid',
  borderRightColor: '#CCC',
  borderBottomWidth: '0px',
  borderBottomStyle: 'solid',
  borderBottomColor: '#CCC',
};

export const getPromotionalToolDefinition: () =>
  | ReactToolDefinitionFrom<PromotionalBase>
  | undefined = () => {
  return {
    name: 'promotional',
    label: $t('_dp.promotional.label'),
    icon: `${ASSETS_BASE_URL}/promotion_code_audit1.svg`,
    usageLimit: 1,
    Component: PromotionalViewer,
    values: {
      containerPadding: '0px',
    },
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
            defaultValue: '#FEE600',
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
              hidden: true,
            }),
            label: $t('_dp.promotional.button.border'),
            defaultValue: DEFAULT_BUTTON_BORDER,
          },
          buttonBorderRadius: {
            label: $t('_dp.promotional.button.border_radius'),
            defaultValue: '40px',
            hidden: true,
            widget: 'border_radius',
            overrideAllowed: true,
          },
          buttonPadding: {
            label: $t('_dp.promotional.button.padding'),
            defaultValue: '15px',
            hidden: true,
            widget: 'padding',
          },
          buttonMargin: {
            label: $t('_dp.promotional.button.margin'),
            defaultValue: '12px 0px 0px',
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
            defaultValue: '#FEE600',
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
              hidden: true,
            }),
            label: $t('_dp.promotional.button.border'),
            defaultValue: DEFAULT_BUTTON_BORDER,
          },
          congratsButtonBorderRadius: {
            label: $t('_dp.promotional.button.border_radius'),
            defaultValue: '40px',
            hidden: true,
            widget: 'border_radius',
            overrideAllowed: true,
          },
          congratsButtonPadding: {
            label: $t('_dp.promotional.button.padding'),
            defaultValue: '15px',
            hidden: true,
            widget: 'padding',
          },
          congratsButtonMargin: {
            label: $t('_dp.promotional.button.margin'),
            defaultValue: '12px 0px 12px 0px',
            hidden: true,
            widget: 'margin',
          },
        },
      },
      layout: {
        title: $t('_dp.layout'),
        options: {
          cardWidth: {
            defaultValue: { autoWidth: false, width: '100%' },
            widget: 'auto_width',
          },
          cardAlign: alignmentProperty(),
          cardBackgroundColor: colorProperty({
            label: $t('editor.background_color.label'),
            defaultValue: DEFAULT_PROMOTIONAL_BACKGROUND,
          }),
          cardBorder: {
            ...borderProperty(),
            defaultValue: DEFAULT_CARD_BORDER,
          },
          cardBorderRadius: {
            label: $t('editor.rounded_border.label'),
            defaultValue: '0px',
            widget: 'border_radius',
          },
          cardPadding: {
            label: 'Padding',
            defaultValue: '22px 18px 22px',
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
          icon: `${ASSETS_BASE_URL}/promotion_code_audit1.svg`,
          severity: 'ERROR',
          title: $t(
            'tabs.audit.rules.smart_form.subscription_list_undefined.title',
          ),
          description: $t(
            'tabs.audit.rules.smart_form.subscription_list_undefined.description',
          ),
        });
      }
      if (!values.discountCode || values.discountCode.trim() === '') {
        defaultErrors.push({
          id: 'PROMOTIONAL_DISCOUNT_CODE_REQUIRED_ERROR',
          icon: `${ASSETS_BASE_URL}/promotion_code_audit1.svg`,
          severity: 'ERROR',
          title: $t(
            'tabs.audit.rules.promotional.discount_code_undefined.title',
          ),
          description: $t(
            'tabs.audit.rules.promotional.discount_code_undefined.description',
          ),
        });
      }
      return defaultErrors;
    },
  };
};
