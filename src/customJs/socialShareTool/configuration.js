import { intl } from '../localization';

export const getSocialSetting = () => {
  const { baseAssetsUrl } = window['unlayer-extensions-configuration'];
  let suffixLang = intl.formatMessage({ id: 'social_share_suffix' });

  // TODO: remove this validation when rename the server images using the _es prefix only for spanish
  if (suffixLang === '_es') {
    suffixLang = '';
  }

  return [
    {
      link: '[[shareInFacebookLink]]',
      srcBig: `${baseAssetsUrl}/color_big_facebook${suffixLang}.png`,
      srcSmall: `${baseAssetsUrl}/color_small_facebook${suffixLang}.png`,
      name: 'Facebook',
      id: 'facebook_shared_property',
    },
    {
      link: '[[shareInLinkedinLink]]',
      srcBig: `${baseAssetsUrl}/color_big_linkedin${suffixLang}.png`,
      srcSmall: `${baseAssetsUrl}/color_small_linkedin${suffixLang}.png`,
      name: 'Linkedin',
      id: 'linkedin_shared_property',
    },
    {
      link: '[[shareInTwitterLink]]',
      srcBig: `${baseAssetsUrl}/color_big_twitter${suffixLang}.png`,
      srcSmall: `${baseAssetsUrl}/color_small_twitter${suffixLang}.png`,
      name: 'Twitter',
      id: 'twitter_shared_property',
    },
    {
      link: '[[shareInPinterestLink]]',
      srcBig: `${baseAssetsUrl}/color_big_pinterest${suffixLang}.png`,
      srcSmall: `${baseAssetsUrl}/color_small_pinterest${suffixLang}.png`,
      name: 'Pinterest',
      id: 'pinterest_shared_property',
    },
    {
      link: '[[shareInWhatsappLink]]',
      srcBig: `${baseAssetsUrl}/color_big_whatsapp${suffixLang}.png`,
      srcSmall: `${baseAssetsUrl}/color_small_whatsapp${suffixLang}.png`,
      name: 'Whatsapp',
      id: 'whatsapp_shared_property',
    },
  ];
};
