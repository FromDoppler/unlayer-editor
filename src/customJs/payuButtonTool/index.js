import { PayuButtonTool } from './PayuButtonTool';

export const getPayuButtonToolConfig = () => ({
  name: 'payu_button_tool',
  label: 'payu_button',
  icon: 'fa-smile',
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
            label: 'pay_button_link',
          },
        },
        size: {
          label: 'size',
          defaultValue: 'medium',
          widget: 'dropdown',
          data: {
            options: [
              { label: 'small', value: 'small' },
              { label: 'medium', value: 'medium' },
              { label: 'big', value: 'large' },
            ],
          },
        },
        alignment: {
          label: 'alignment',
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
        return JSON.stringify(values);
        // return ReactDOMServer.renderToStaticMarkup(
        //   <PayuButtonTool values={values} />,
        // );
      },
      email: function (values) {
        return JSON.stringify(values);
        // return ReactDOMServer.renderToStaticMarkup(
        //   <PayuButtonTool values={values} />,
        // );
      },
    },
  },
});
