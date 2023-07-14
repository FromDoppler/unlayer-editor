import { ReactPropertyDefinition, SocialNetworkId } from '../../types';
import { SocialNetworksValue } from './SocialNetworksValue';
import { SocialNetworksWidget } from './SocialNetworksWidget';

export const socialNetworksPropertyEditor = 'social_networks';

export const socialNetworksPropertyEditorDefinition: ReactPropertyDefinition<
  typeof socialNetworksPropertyEditor,
  SocialNetworksValue,
  void,
  { options?: { id: SocialNetworkId; name: string }[] }
> = {
  name: socialNetworksPropertyEditor,
  Widget: SocialNetworksWidget,
};
