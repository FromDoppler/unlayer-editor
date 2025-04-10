import { $t } from '../../localization';
import { WheelFortuneViewer } from './wheelFortuneViewer';
import { ASSETS_BASE_URL } from '../../constants';
import {
  colorProperty,
  fontFamilyProperty,
  richTextProperty,
} from '../../properties/helpers';
import { subscriptionListProperty } from '../../properties/subscription_list';
import { wheelListProperty } from '../../properties/wheel_list';
import { availableFields } from '../smartforms/helper';
import { WheelFortuneValues, WheelSlice } from './types';
import { buttonGroupProperty } from '../../properties/button_group';

/* Replace the mock values with empty values */
const mockWheelValues: WheelSlice[] = [
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
    gift: 'premio 6',
    chance: 0,
    percent: '0%',
    color: '#83cfd0',
  },
];

const mockWheelDescription = `<div></div><p><span style="font-size: 28px; font-family: impact, chicago;">Gira la ruleta y obtené tu descuento!</span></p><p></p><p><span></span><span></span><span style="font-size: 20px;">Ingresa tu nombre y correo electrónico, haz girar la ruleta y desbloquea un descuento exclusivo. </span></p>`;
const mockcongratsDescription = `<p style="text-align: center;"><span></span><span></span><span style="font-size: 34px;"><strong>¡Gracias por participar!</strong></span></p>
                            <p></p>
                            <p style="text-align: center;"><span style="font-size: 16px;">Copia el siguiente código de descuento y úsalo en tu próxima compra</span></p>`;

export const getWheelFortuneToolDefinition: () =>
  | any //ReactToolDefinitionFrom<any>
  | undefined = () => {
  return {
    name: 'wheel_fortune',
    label: $t('_dp.wheel_fortune.label'),
    icon: `${ASSETS_BASE_URL}/roulette2.svg`,
    usageLimit: 1,

    Component: WheelFortuneViewer,
    options: {
      wheel: {
        title: $t('_dp.wheel_fortune.settings'),
        options: {
          wheelList: wheelListProperty({
            defaultValue: mockWheelValues,
          }),
          wheelFontColor: colorProperty({
            label: 'Text Color',
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
        title: $t('_dp.wheel_fortune.messages'),
        options: {
          viewPanel: buttonGroupProperty({
            defaultValue: 'init',
            data: [
              {
                label: $t('_dp.wheel_fortune.messages.init'),
                value: 'init',
                active: true,
              },
              {
                label: $t('_dp.wheel_fortune.messages.end'),
                value: 'end',
                active: false,
              },
            ],
          }),
          descriptionHtml: richTextProperty({
            label: $t('_dp.wheel_fortune.messages.description'),
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
          congratsHtml: richTextProperty({
            label: $t('_dp.wheel_fortune.messages.description'),
            defaultValue: mockcongratsDescription,
          }),
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
    propertyStates: (values: WheelFortuneValues) => ({
      congratsButtonColor: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonBackgroundColor: {
        enabled: values.viewPanel === 'end',
      },
      congratsButtonText: {
        enabled: values.viewPanel === 'end',
      },
      congratsHtml: {
        enabled: values.viewPanel === 'end',
      },
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
      }
      return values;
    },
    validator: ({ defaultErrors, values }) => {
      if (values.list === '-1') {
        defaultErrors.push({
          id: 'SMART_FORM_TARGET_LIST_REQUIRED_ERROR',
          icon: `${ASSETS_BASE_URL}/roulette2.svg`,
          severity: 'ERROR',
          title: $t(
            'tabs.audit.rules.smart_form.subscription_list_undefined.title',
          ),
          description: $t(
            'tabs.audit.rules.smart_form.subscription_list_undefined.description',
          ),
        });
      }
      const wheelListIncomplete = values.wheelList.some(
        (WheelSlice: WheelSlice) => {
          return (
            WheelSlice.label.trim() === '' || WheelSlice.gift.trim() === ''
          );
        },
      );

      const wheelChancesSum = values.wheelList.reduce(
        (sum: number, WheelSlice: WheelSlice) => sum + WheelSlice.chance,
        0,
      );
      if (wheelListIncomplete || wheelChancesSum === 0) {
        defaultErrors.push({
          id: 'ROULETTE_WHEEL_LIST_INCOMPLETED_ERROR',
          icon: `${ASSETS_BASE_URL}/roulette2.svg`,
          severity: 'ERROR',
          title: $t('tabs.audit.rules.roulette.wheel_list_incomplete.title'),
          description: $t(
            'tabs.audit.rules.roulette.wheel_list_incomplete.description',
          ),
        });
      }

      return defaultErrors;
    },
  };
};
