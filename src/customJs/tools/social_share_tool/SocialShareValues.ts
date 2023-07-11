import { Alignment, SocialNetworkId } from '../../types';

export type SocialShareValues = {
  social_share_align_option: Alignment;
  social_share_available: SocialNetworkId[];
  social_share_size: 'big' | 'small';
};
