const React = window.unlayer.React;
import { getSocialSetting } from './configuration';
import { SocialShareTool } from './SocialShareTool';
import ReactDOMServer from 'react-dom/server';
import { intl } from '../localization';

export const getSocialShareToolConfig = () => ({
  name: 'social_share_tool',
  label: intl.formatMessage({ id: 'social_share_title' }),
  icon: 'fa-share-alt',
  supportedDisplayModes: ['web', 'email'],
  category: 'contents',
  type: 'whatever',
  values: {},
  options: {
    default: {
      title: null,
    },
    social_share_size: {
      title: intl.formatMessage({ id: 'size' }),
      position: 1,
      options: {
        social_share_size: {
          defaultValue: 'big',
          widget: 'dropdown',
          data: {
            options: [
              { label: intl.formatMessage({ id: 'small' }), value: 'small' },
              { label: intl.formatMessage({ id: 'big' }), value: 'big' },
            ],
          },
        },
      },
    },
    social_share_network: {
      title: intl.formatMessage({ id: 'social_networks' }),
      position: 2,
      options: {
        social_share_available: {
          data: {
            options: getSocialSetting(),
          },
          defaultValue: getSocialSetting().map((config) => config.id),
          widget: 'enable_social_property',
        },
      },
    },
    social_share_align: {
      title: intl.formatMessage({ id: 'alignment' }),
      position: 3,
      options: {
        social_share_align_option: {
          label: intl.formatMessage({ id: 'alignment' }),
          defaultValue: 'center',
          widget: 'alignment',
        },
      },
    },
  },
  renderer: {
    Viewer: SocialShareTool,
    exporters: {
      web: function (values) {
        return ReactDOMServer.renderToStaticMarkup(
          <SocialShareTool values={values} />,
        );
      },
      email: function (values) {
        return ReactDOMServer.renderToStaticMarkup(
          <SocialShareTool values={values} />,
        );
      },
    },
  },
});
