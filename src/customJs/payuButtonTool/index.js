import { PayuButtonTool } from './PayuButtonTool';

const React = window.unlayer.React;
import ReactDOMServer from 'react-dom/server';

export const getPayuButtonToolConfig = () => ({
  name: 'payu_button_tool',
  label: '_dp.payu_button',
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
      title: 'option_groups.button_options.title',
      position: 3,
      options: {
        paymentURL: {
          widget: 'link_property',
          data: {
            label: '_dp.pay_button_link',
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
                {'_dp.payu_help'}
                <a
                  target="_blank"
                  style={{ color: '#33AC72', textDecoration: 'none' }}
                  href={'_dp.payu_help_link'}
                >
                  &nbsp;{'_dp.help'}
                </a>
              </div>
            ),
          },
        },
        size: {
          label: '_dp.size',
          defaultValue: 'medium',
          widget: 'dropdown',
          data: {
            options: [
              {
                label: '_dp.small',
                value: 'small',
              },
              {
                label: '_dp.medium',
                value: 'medium',
              },
              { label: '_dp.big', value: 'large' },
            ],
          },
        },
        alignment: {
          label: '_dp.alignment',
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
    console.log({ defaultErrors });
    console.log({ values });
    if (!values.paymentURL) {
      defaultErrors.push({
        id: 'CUSTOM_ERROR',
        icon: process.env.PUBLIC_URL + '/assets/payu_button.svg',
        severity: 'WARNING',
        title: 'tabs.audit.rules.payu_button.empty_links.title',
        description: 'tabs.audit.rules.payu_button.empty_links.description',
        location: 'location',
        slug: 'slug',
      });
    }

    return defaultErrors;
  },
});
