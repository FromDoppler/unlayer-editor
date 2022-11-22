const React = window.unlayer.React;
import { SocialShareTool } from './SocialShareTool';
import ReactDOMServer from 'react-dom/server';
import { intl } from '../localization';

export const getSocialShareToolConfig = () => ({
  name: 'social_share_tool',
  label: intl.formatMessage({ id: 'social_share_title' }),
  icon: 'fa-share-alt',
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
          defaultValue: '90',
          widget: 'dropdown',
          data: {
            options: [
              { label: intl.formatMessage({ id: 'medium' }), value: '90' },
              { label: intl.formatMessage({ id: 'small' }), value: '70' },
              { label: intl.formatMessage({ id: 'big' }), value: '120' },
            ],
          },
        },
      },
    },
    social_share_network: {
      title: intl.formatMessage({ id: 'social_networks' }),
      position: 2,
      options: {
        social_share_network_facebook: {
          label: 'Facebook',
          defaultValue: true,
          widget: 'toggle',
        },
        social_share_network_linkedin: {
          label: 'Linkedin',
          defaultValue: true,
          widget: 'toggle',
        },
        social_share_network_twitter: {
          label: 'Twitter',
          defaultValue: true,
          widget: 'toggle',
        },
        social_share_network_pinterest: {
          label: 'Pinterest',
          defaultValue: true,
          widget: 'toggle',
        },
        social_share_network_whatsapp: {
          label: 'Whatsapp',
          defaultValue: true,
          widget: 'toggle',
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
      email: function (values) {
        return ReactDOMServer.renderToStaticMarkup(
          <SocialShareTool values={values} />,
        );
      },
    },
  },
});
