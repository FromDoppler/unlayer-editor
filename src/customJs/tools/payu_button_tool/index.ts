import { intl } from '../../localization';
import { PayuButtonViewer } from './PayuButtonViewer';
import { ASSETS_BASE_URL } from '../../constants';
import { ReactToolDefinitionFrom } from '../../types';
import { PayuButtonHelp } from './PayuButtonHelp';
import { PayuButtonBase } from './types';
import { urlProperty } from '../../properties/url';
import { alignmentProperty, dropdownProperty } from '../../properties/helpers';

export const getPayuButtonToolDefinition: () => ReactToolDefinitionFrom<PayuButtonBase> =
  () => ({
    name: 'payu_button_tool',
    label: intl.formatMessage({ id: '_dp.payu_button' }),
    icon: `${ASSETS_BASE_URL}/payu_button.svg`,
    Component: PayuButtonViewer,
    options: {
      basic_configuration_section: {
        title: intl.formatMessage({ id: 'option_groups.button_options.title' }),
        options: {
          paymentURL: urlProperty({
            label: intl.formatMessage({ id: '_dp.pay_button_link' }),
            help: PayuButtonHelp(),
          }),
          size: dropdownProperty({
            label: intl.formatMessage({ id: '_dp.size' }),
            defaultValue: 'medium',
            options: [
              {
                label: intl.formatMessage({ id: '_dp.small' }),
                value: 'small',
              },
              {
                label: intl.formatMessage({ id: '_dp.medium' }),
                value: 'medium',
              },
              {
                label: intl.formatMessage({ id: '_dp.big' }),
                value: 'large',
              },
            ],
          } as const),
          alignment: alignmentProperty(),
        },
      },
    },
    validator: ({ defaultErrors, values }) => {
      if (!values.paymentURL) {
        defaultErrors.push({
          id: 'CUSTOM_ERROR',
          icon: `${ASSETS_BASE_URL}/payu_button.svg`,
          severity: 'WARNING',
          title: intl.formatMessage({
            id: 'tabs.audit.rules.payu_button.empty_links.title',
          }),
          description: intl.formatMessage({
            id: 'tabs.audit.rules.payu_button.empty_links.description',
          }),
        });
      }

      return defaultErrors;
    },
  });
