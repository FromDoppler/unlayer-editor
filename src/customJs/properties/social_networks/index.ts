import { ReactPropertyDefinition } from '../../types';
import { SocialNetworksValue } from './SocialNetworksValue';
import { SocialNetworksWidget } from './SocialNetworksWidget';

export const socialNetworksPropertyEditorDefinition: ReactPropertyDefinition<
  'social_networks',
  SocialNetworksValue
> = {
  name: 'social_networks',
  Widget: SocialNetworksWidget,
};
