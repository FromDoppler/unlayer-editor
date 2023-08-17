import { intl } from '../../localization';
import { ASSETS_BASE_URL, SOCIAL_NETWORKS } from '../../constants';
import { SocialShareViewer } from './SocialShareViewer';
import { ReactToolDefinitionFrom } from '../../types';
import { SocialShareBase } from './types';
import { socialNetworksPropertyEditor } from '../../properties/social_networks';
import { smallBigDropdownProperty } from '../../properties/helpers';

export const getSocialShareToolDefinition: () => ReactToolDefinitionFrom<SocialShareBase> =
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
          social_share_size: smallBigDropdownProperty({
            label: undefined,
            defaultValue: 'big',
          }),
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
