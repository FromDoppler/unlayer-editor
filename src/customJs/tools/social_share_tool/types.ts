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
    social_share_available: SocialNetworkId[];
  };
  social_share_align: {
    social_share_align_option: Alignment;
  };
};

export type SocialSharePropertyGroups = PropertyGroupsFrom<SocialShareBase>;

export type SocialShareValues = ToolValuesFrom<SocialShareBase>;
