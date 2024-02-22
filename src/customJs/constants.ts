export const ASSETS_BASE_URL =
  'https://cdn.fromdoppler.com/unlayer-editor/assets';

export const HELP_BASE_URL = 'https://help.fromdoppler.com';

export const EMPTY_SELECTION = '__EMPTY__';
export type EMPTY_SELECTION = typeof EMPTY_SELECTION;

export type DYNAMIC_TOOL_TYPE =
  | 'abandoned_cart'
  | 'product_retargeting'
  | 'order_details';

export const SOCIAL_NETWORKS = [
  {
    link: '[[shareInFacebookLink]]',
    name: 'Facebook',
    id: 'facebook_shared_property',
  },
  {
    link: '[[shareInLinkedinLink]]',
    name: 'Linkedin',
    id: 'linkedin_shared_property',
  },
  {
    link: '[[shareInTwitterLink]]',
    name: 'Twitter',
    id: 'twitter_shared_property',
  },
  {
    link: '[[shareInPinterestLink]]',
    name: 'Pinterest',
    id: 'pinterest_shared_property',
  },
  {
    link: '[[shareInWhatsappLink]]',
    name: 'Whatsapp',
    id: 'whatsapp_shared_property',
  },
] as const;
