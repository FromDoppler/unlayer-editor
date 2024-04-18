import { $t } from '../../localization';
import { ASSETS_BASE_URL } from '../../constants';
import { SocialShareViewer } from './SocialShareViewer';
import { ReactToolDefinitionFrom } from '../../types';
import { SocialShareBase } from './types';
import {
  smallBigDropdownProperty,
  toggleShowProperty,
} from '../../properties/helpers';

export const getSocialShareToolDefinition: () => ReactToolDefinitionFrom<SocialShareBase> =
  () => ({
    name: 'social_share_tool',
    label: $t('_dp.social_share_title'),
    icon: `${ASSETS_BASE_URL}/share-node.svg`,
    Component: SocialShareViewer,
    options: {
      social_share_size: {
        title: $t('_dp.appearance'),
        position: 1,
        options: {
          social_share_size: smallBigDropdownProperty({
            label: $t('_dp.size'),
            defaultValue: 'big',
          }),
        },
      },
      social_share_network: {
        title: $t('_dp.social_networks'),
        position: 2,
        options: {
          facebook_shared_property: toggleShowProperty({
            label: 'Facebook',
            defaultValue: true,
          }),
          linkedin_shared_property: toggleShowProperty({
            label: 'Linkedin',
            defaultValue: true,
          }),
          twitter_shared_property: toggleShowProperty({
            label: 'Twitter',
            defaultValue: true,
          }),
          pinterest_shared_property: toggleShowProperty({
            label: 'Pinterest',
            defaultValue: true,
          }),
          whatsapp_shared_property: toggleShowProperty({
            label: 'Whatsapp',
            defaultValue: true,
          }),
        },
      },
      social_share_align: {
        title: $t('_dp.alignment'),
        position: 3,
        options: {
          social_share_align_option: {
            label: $t('_dp.alignment'),
            defaultValue: 'center',
            widget: 'alignment',
          },
        },
      },
    },
  });
