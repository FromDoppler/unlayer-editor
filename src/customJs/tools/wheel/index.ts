import { $t } from '../../localization';
import { WheelFortuneViewer } from './wheelFortuneViewer';
import { ReactToolDefinitionFrom } from '../../types';
import { ASSETS_BASE_URL } from '../../constants';
import {
  alignmentProperty,
  autoWidthProperty,
  borderProperty,
  borderRadiusProperty,
  colorProperty,
  fontFamilyProperty,
  fontSizeProperty,
  fontWeightProperty,
  richTextProperty,
  toggleShowProperty,
} from '../../properties/helpers';
import { subscriptionListProperty } from '../../properties/subscription_list';
import { wheelListProperty } from '../../properties/wheel_list';
import { availableFields } from '../smartforms/helper';
import { WheelSlide } from './types';

const DEFAULT_GREEN_COLOR = '#64BF91';

/* Replace the mock values with empty values */
const mockWheelValues: WheelSlide[] = [
  {
    label: 'segmento 1',
    gift: 'premio 1',
    percent: '20%',
    color: '#db7093',
  },
  {
    label: 'segmento 2',
    gift: 'premio 2',
    percent: '20%',
    color: '#70dbb2',
  },
  {
    label: 'segmento 3',
    gift: 'premio 3',
    percent: '20%',
    color: '#3f02b1',
  },
  {
    label: 'segmento 4',
    gift: 'premio 4',
    percent: '20%',
    color: '#e7810d',
  },
  {
    label: 'segmento 5',
    gift: 'premio 5',
    percent: '20%',
    color: '#1ada4a',
  },
];

const mockWheelDescription = `<div></div><p><span style="font-size: 28px; font-family: impact, chicago;">Gira la ruleta y obtené tu descuento!</span></p><p></p><p><span></span><span></span><span style="font-size: 20px;">Ingresa tu nombre y correo electrónico, haz girar la ruleta y desbloquea un descuento exclusivo. </span></p>`;

export const getWheelFortuneToolDefinition: () =>
  | ReactToolDefinitionFrom<any>
  | undefined = () => {
  return {
    name: 'wheel_fortune',
    label: $t('_dp.wheel_fortune.label'),
    icon: `${ASSETS_BASE_URL}/roulette2.svg`,
    usageLimit: 1,

    Component: WheelFortuneViewer,
    options: {
      wheel: {
        title: $t('_dp.wheel_fortune.label'),
        options: {
          wheelList: wheelListProperty({
            defaultValue: mockWheelValues,
          }),
          wheelSize: {
            label: $t('labels.size'),
            defaultValue: '400px',
            widget: 'px',
          },
          wheelFontColor: colorProperty({
            label: 'Font Color',
            defaultValue: '#fff',
          }),
          wheelBackgroudColor: colorProperty({
            label: 'Background Color',
            defaultValue: '#fff',
          }),
          wheelBorderColor: {
            label: $t('_dp.wheel_fortune.border.color'),
            defaultValue: '#444',
            widget: 'color_picker',
          },
          wheelBorderWidth: {
            label: $t('_dp.wheel_fortune.border.width'),
            defaultValue: '8px',
            widget: 'px',
            hidden: !0,
          },
          wheelFontFamily: fontFamilyProperty({
            hidden: !0,
          }),
          wheelFontSize: fontSizeProperty({
            label: 'Font Size',
            defaultValue: '12px',
            hidden: !0,
          }),
          wheelFontWeight: fontWeightProperty({
            defaultValue: 700,
            hidden: !0,
          }),
          wheelMargin: {
            label: 'Margin',
            defaultValue: '10px',
            widget: 'margin',
            hidden: !0,
          },
          wheelPadding: {
            label: 'Padding',
            defaultValue: '0px',
            widget: 'padding',
            hidden: !0,
          },
          wheelBorderShadow: {
            label: 'Sombra de Borde',
            defaultValue: 'none',
            widget: 'text',
            hidden: !0,
          },
        },
      },
      description: {
        title: 'Descripcion Ruleta',
        options: {
          descriptionWidth: {
            label: 'Tamaño',
            defaultValue: '400px',
            widget: 'px',
          },
          descriptionHtml: richTextProperty({
            label: 'Descripcion',
            defaultValue: mockWheelDescription,
          }),
          descriptionMargin: {
            label: 'Margin',
            defaultValue: '10px',
            widget: 'margin',
            hidden: !0,
          },
          descriptionPadding: {
            label: 'Padding',
            defaultValue: '0px',
            widget: 'padding',
            hidden: !0,
          },
        },
      },
      formAction: {
        title: $t('_dp.smart_forms.action.title'),
        options: {
          list: subscriptionListProperty({
            defaultValue: '-1',
          }),
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
                  type: 'email',
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
            defaultValue: $t('_dp.wheel_fortune.button.label'),
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
      congrats: {
        title: 'Finalizacion',
        options: {
          congratShow: toggleShowProperty({
            defaultValue: false,
          }),
          congratsBackgroudColor: colorProperty({
            label: 'Background Color',
            defaultValue: '#fff',
          }),
          congratsHtml: richTextProperty({
            label: $t('_dp.smart_forms.behavior.message'),
            defaultValue: `<p style="text-align: center;"><span></span><span></span><span style="font-size: 34px;"><strong>¡Gracias por participar!</strong></span></p>
                            <p></p>
                            <p style="text-align: center;"><span style="font-size: 16px;">Copia el siguiente código de descuento y úsalo en tu próxima compra</span></p>`,
          }),
          congratsHtmlMargin: {
            label: 'Margin',
            defaultValue: '30px',
            widget: 'margin',
          },
          congratsGiftShown: toggleShowProperty(),
          congratsGiftAlignment: alignmentProperty(),
          congratsGiftFont: fontFamilyProperty(),
          congratsGiftFontWeight: fontWeightProperty({
            defaultValue: 700,
          }),
          congratsGiftFontSize: fontSizeProperty({
            defaultValue: '18px',
          }),
          congratsGiftColor: colorProperty(),
          congratsGiftMargin: {
            label: 'Margin',
            defaultValue: '50px',
            widget: 'margin',
          },
          congratsGiftPadding: {
            label: 'Padding',
            defaultValue: '10px',
            widget: 'padding',
            hidden: !0,
          },
        },
      },
    },
  };
};
