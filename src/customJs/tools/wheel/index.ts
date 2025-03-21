import { $t } from '../../localization';
import { WheelFortuneViewer } from './wheelFortuneViewer';
import { ReactToolDefinitionFrom } from '../../types';
import { ASSETS_BASE_URL } from '../../constants';
import {
  colorProperty,
  fontFamilyProperty,
  fontSizeProperty,
  richTextProperty,
  toggleShowProperty,
} from '../../properties/helpers';
import { subscriptionListProperty } from '../../properties/subscription_list';
import { wheelListProperty } from '../../properties/wheel_list';
import { availableFields } from '../smartforms/helper';
import { WheelSlide } from './types';

/* Replace the mock values with empty values */
const mockWheelValues: WheelSlide[] = [
  {
    label: 'segmento 1',
    gift: 'premio 1',
    chance: 10,
    percent: '20%',
    color: '#bad2f8',
  },
  {
    label: 'segmento 2',
    gift: 'premio 2',
    chance: 10,
    percent: '20%',
    color: '#83cfd0',
  },
  {
    label: 'segmento 3',
    gift: 'premio 3',
    chance: 10,
    percent: '20%',
    color: '#bad2f8',
  },
  {
    label: 'segmento 4',
    gift: 'premio 4',
    chance: 10,
    percent: '20%',
    color: '#83cfd0',
  },
  {
    label: 'segmento 5',
    gift: 'premio 5',
    chance: 10,
    percent: '20%',
    color: '#bad2f8',
  },
  {
    label: 'segmento 6',
    gift: 'premio 4',
    chance: 0,
    percent: '20%',
    color: '#83cfd0',
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
          wheelFontColor: colorProperty({
            label: 'Font Color',
            defaultValue: '#116869',
          }),
          wheelBackgroudColor: colorProperty({
            label: 'Background Color',
            defaultValue: '#8893e3',
          }),
          wheelBorderColor: {
            label: $t('_dp.wheel_fortune.border.color'),
            defaultValue: '#fff',
            widget: 'color_picker',
          },
          wheelFontFamily: fontFamilyProperty({
            hidden: !0,
          }),
        },
      },
      description: {
        title: 'Descripcion Ruleta',
        options: {
          descriptionHtml: richTextProperty({
            label: 'Descripcion',
            defaultValue: mockWheelDescription,
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
                show_label: true,
                required: true,
              },
            ],
            widget: 'fields',
          },
          buttonText: {
            label: 'Text',
            defaultValue: $t('_dp.wheel_fortune.button.label'),
            widget: 'text',
          },
          buttonBackgroundColor: colorProperty({
            label: 'Background Color',
            defaultValue: '#2a75db',
            hidden: !0,
          }),
          buttonColor: colorProperty({
            label: 'Text Color',
            defaultValue: '#FFF',
            hidden: !0,
          }),
        },
      },
      congrats: {
        title: 'Finalizacion',
        options: {
          congratShow: toggleShowProperty({
            defaultValue: false,
          }),
          congratsHtml: richTextProperty({
            label: $t('_dp.smart_forms.behavior.message'),
            defaultValue: `<p style="text-align: center;"><span></span><span></span><span style="font-size: 34px;"><strong>¡Gracias por participar!</strong></span></p>
                            <p></p>
                            <p style="text-align: center;"><span style="font-size: 16px;">Copia el siguiente código de descuento y úsalo en tu próxima compra</span></p>`,
          }),
          }),
          congratsGiftFontSize: fontSizeProperty({
            defaultValue: '18px',
          }),
          congratsGiftColor: colorProperty(),
            hidden: !0,
          congratsButtonText: {
            label: 'Text',
            defaultValue: $t('_dp.wheel_fortune.congrats.button.label'),
            widget: 'text',
          },
          congratsButtonBackgroundColor: colorProperty({
            label: 'Background Color',
            defaultValue: '#2a75db',
            hidden: !0,
          }),
          congratsButtonColor: colorProperty({
            label: 'Text Color',
            defaultValue: '#FFF',
            hidden: !0,
          }),
        },
      },
    },
  };
};
