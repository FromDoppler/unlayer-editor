import { React } from '../../unlayer-react';
import { intl } from '../../localization';
import { PayuButtonViewer } from './PayuButtonViewer';
import { ASSETS_BASE_URL } from '../../constants';

export const getPayuButtonToolDefinition = () => ({
  name: 'payu_button_tool',
  label: intl.formatMessage({ id: '_dp.payu_button' }),
  icon: `${ASSETS_BASE_URL}/payu_button.svg`,
  Component: PayuButtonViewer,
  options: {
    basic_configuration_section: {
      title: intl.formatMessage({ id: 'option_groups.button_options.title' }),
      options: {
        paymentURL: {
          widget: 'url',
          data: {
            label: intl.formatMessage({ id: '_dp.pay_button_link' }),
            help: (
              <div
                style={{
                  fontStyle: 'italic',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#525252',
                  fontFamily: 'Roboto,sans-serif',
                }}
              >
                {intl.formatMessage({ id: '_dp.payu_help' })}
                <a
                  target="_blank"
                  style={{ color: '#33AC72', textDecoration: 'none' }}
                  href={intl.formatMessage({ id: '_dp.payu_help_link' })}
                >
                  &nbsp;{intl.formatMessage({ id: '_dp.help' })}
                </a>
              </div>
            ),
          },
        },
        size: {
          label: intl.formatMessage({ id: '_dp.size' }),
          defaultValue: 'medium',
          widget: 'dropdown',
          data: {
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
          },
        },
        alignment: {
          label: intl.formatMessage({ id: '_dp.alignment' }),
          defaultValue: 'center',
          widget: 'alignment',
        },
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
