import { PayuButtonTool } from './PayuButtonTool';

const React = window.unlayer.React;
import ReactDOMServer from 'react-dom/server';
import { intl } from '../localization';

export const getPayuButtonToolConfig = () => ({
  name: 'payu_button_tool',
  label: intl.formatMessage({ id: 'payu_button' }),
  icon: 'fa-share-alt',
  category: 'contents',
  type: 'whatever',
  values: {},
  options: {
    default: {
      title: null,
    },
    basic_configuration_section: {
      title: intl.formatMessage({ id: 'configuration' }),
      position: 3,
      options: {
        paymentURL: {
          widget: 'link_property',
          data: {
            label: intl.formatMessage({ id: 'pay_button_link' }),
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
      email: function (values) {
        return ReactDOMServer.renderToStaticMarkup(
          <PayuButtonTool values={values} />,
        );
      },
    },
  },
});
