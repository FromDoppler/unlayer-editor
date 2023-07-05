import { intl } from '../localization';

export const getSocialSetting = () => {
  const translateNetworkIconUrl = (network, size) =>
    intl.formatMessage({ id: `_dp.social_share_url_${size}_${network}` });

  return [
    {
      link: '[[shareInFacebookLink]]',
      getSrc: (size) => translateNetworkIconUrl('facebook', size),
      name: 'Facebook',
      id: 'facebook_shared_property',
    },
    {
      link: '[[shareInLinkedinLink]]',
      getSrc: (size) => translateNetworkIconUrl('linkedin', size),
      name: 'Linkedin',
      id: 'linkedin_shared_property',
    },
    {
      link: '[[shareInTwitterLink]]',
      getSrc: (size) => translateNetworkIconUrl('twitter', size),
      name: 'Twitter',
      id: 'twitter_shared_property',
    },
    {
      link: '[[shareInPinterestLink]]',
      getSrc: (size) => translateNetworkIconUrl('pinterest', size),
      name: 'Pinterest',
      id: 'pinterest_shared_property',
    },
    {
      link: '[[shareInWhatsappLink]]',
      getSrc: (size) => translateNetworkIconUrl('whatsapp', size),
      name: 'Whatsapp',
      id: 'whatsapp_shared_property',
    },
  ];
};
