import { intl } from '../../localization';
import { ASSETS_BASE_URL, SOCIAL_NETWORKS } from '../../constants';
import { SocialShareViewer } from './SocialShareViewer';
import { ReactToolDefinition } from '../../types';
import { SocialShareValues } from './SocialShareValues';
import { socialNetworksPropertyEditor } from '../../properties/social_networks';

export const getSocialShareToolDefinition: () => ReactToolDefinition<SocialShareValues> =
  () => ({
    name: 'social_share_tool',
    label: intl.formatMessage({ id: '_dp.social_share_title' }),
    icon: `${ASSETS_BASE_URL}/share-node.svg`,
    Component: SocialShareViewer,
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
              options: SOCIAL_NETWORKS,
            },
            defaultValue: SOCIAL_NETWORKS.map(({ id }) => id),
            widget: socialNetworksPropertyEditor,
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
  });
