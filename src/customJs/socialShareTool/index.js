const React = window.unlayer.React;
import { SocialShareTool } from './SocialShareTool';
import ReactDOMServer from 'react-dom/server';

export const getSocialShareToolConfig = () => ({
  name: 'social_share_tool',
  label: 'Social Share',
  icon: 'fa-share-alt',
  category: 'contents',
  type: 'whatever',
  values: {},
  options: {
    default: {
      title: null,
    },
    social_share_size: {
      title: 'Tamaño',
      position: 1,
      options: {
        social_share_size: {
          defaultValue: '90',
          widget: 'dropdown',
          data: {
            options: [
              { label: 'Normal', value: '90' },
              { label: 'Pequeño', value: '70' },
              { label: 'Grande', value: '120' },
            ],
          },
        },
      },
    },
    social_share_network: {
      title: 'Redes',
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
      title: 'Alineación',
      position: 3,
      options: {
        social_share_align_option: {
          label: 'Alineación',
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
