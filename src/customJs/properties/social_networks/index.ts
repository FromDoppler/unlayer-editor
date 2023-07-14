import { ReactPropertyDefinition, SocialNetworkId } from '../../types';
import { SocialNetworksValue } from './SocialNetworksValue';
import { SocialNetworksWidget } from './SocialNetworksWidget';

export const socialNetworksPropertyEditorDefinition: ReactPropertyDefinition<
  'social_networks',
  SocialNetworksValue,
  void,
  { options?: { id: SocialNetworkId; name: string }[] }
> = {
  name: 'social_networks',
  Widget: SocialNetworksWidget,
};
