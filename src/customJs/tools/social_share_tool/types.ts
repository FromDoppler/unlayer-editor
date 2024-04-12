import {
  Alignment,
  PropertyGroupsFrom,
  SocialNetworkId,
  ToolValuesFrom,
} from '../../types';

export type SocialShareBase = {
  social_share_size: {
    social_share_size: 'big' | 'small';
  };
  social_share_network: {
    facebook_shared_property: boolean;
    linkedin_shared_property: boolean;
    twitter_shared_property: boolean;
    pinterest_shared_property: boolean;
    whatsapp_shared_property: boolean;
  };
  social_share_align: {
    social_share_align_option: Alignment;
  };
};

export type SocialSharePropertyGroups = PropertyGroupsFrom<SocialShareBase>;

export type SocialShareValues = ToolValuesFrom<SocialShareBase>;
