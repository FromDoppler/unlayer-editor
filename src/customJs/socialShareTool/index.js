const React = window.unlayer.React;
import { getSocialSetting } from './configuration';
import { SocialShareTool } from './SocialShareTool';
import ReactDOMServer from 'react-dom/server';
import { intl } from '../localization';

export const getSocialShareToolConfig = () => ({
  name: 'social_share_tool',
  label: intl.formatMessage({ id: '_dp.social_share_title' }),
  icon: 'fa-share-alt',
  options: {
    social_share_size: {
      title: intl.formatMessage({ id: '_dp.size' }),
      position: 1,
      options: {
        social_share_size: {
          defaultValue: 'big',
          widget: 'dropdown',
          data: {
            options: [
              {
                label: intl.formatMessage({ id: '_dp.small' }),
                value: 'small',
              },
              { label: intl.formatMessage({ id: '_dp.big' }), value: 'big' },
            ],
          },
        },
      },
    },
    social_share_network: {
      title: intl.formatMessage({ id: '_dp.social_networks' }),
      position: 2,
      options: {
        social_share_available: {
          data: {
            options: getSocialSetting(),
          },
          defaultValue: getSocialSetting().map(({ id }) => id),
          widget: 'enable_social_property',
        },
      },
    },
    social_share_align: {
      title: intl.formatMessage({ id: '_dp.alignment' }),
      position: 3,
      options: {
        social_share_align_option: {
          label: intl.formatMessage({ id: '_dp.alignment' }),
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
