import { PayuButtonTool } from './PayuButtonTool';

const React = window.unlayer.React;
import ReactDOMServer from 'react-dom/server';
import { intl } from '../localization';

export const getPayuButtonToolConfig = () => ({
  name: 'payu_button_tool',
  label: intl.formatMessage({ id: 'payu_button' }),
  icon: process.env.PUBLIC_URL + '/assets/payu_button.svg',
  supportedDisplayModes: ['web', 'email'],
  category: 'contents',
  type: 'whatever',
  values: {},
  options: {
    default: {
      title: null,
    },
    basic_configuration_section: {
      title: intl.formatMessage({ id: 'option_groups.button_options.title' }),
      position: 3,
      options: {
        paymentURL: {
          widget: 'link_property',
          data: {
            label: intl.formatMessage({ id: 'pay_button_link' }),
            help: `
              <div
                style="font-style: italic; font-size: 13px; line-height: 1.6; color: #525252;
                font-family: Roboto,sans-serif;">
                ${intl.formatMessage({ id: 'payu_help' })}
                <a target="_blank"
                    style="color: #33AC72; text-decoration: none;"
                    href="${intl.formatMessage({ id: 'payu_help_link' })}">
                    ${intl.formatMessage({ id: 'help' })}
                </a>
              </div>`,
          },
        },
        size: {
          label: intl.formatMessage({ id: 'size' }),
          defaultValue: 'medium',
          widget: 'dropdown',
          data: {
            options: [
              { label: intl.formatMessage({ id: 'small' }), value: 'small' },
              { label: intl.formatMessage({ id: 'medium' }), value: 'medium' },
              { label: intl.formatMessage({ id: 'big' }), value: 'large' },
            ],
          },
        },
        alignment: {
          label: intl.formatMessage({ id: 'alignment' }),
          defaultValue: 'center',
          widget: 'alignment',
        },
      },
    },
  },
  renderer: {
    Viewer: PayuButtonTool,
    exporters: {
      web: function (values) {
        return ReactDOMServer.renderToStaticMarkup(
          <PayuButtonTool values={values} />,
        );
      },
      email: function (values) {
        return ReactDOMServer.renderToStaticMarkup(
          <PayuButtonTool values={values} />,
        );
      },
    },
  },
  validator: ({ defaultErrors, values }) => {
    if (!values.paymentURL) {
      defaultErrors.push({
        id: 'CUSTOM_ERROR',
        icon: process.env.PUBLIC_URL + '/assets/payu_button.svg',
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
