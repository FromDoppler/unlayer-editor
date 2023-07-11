import { ReactPropertyDefinition } from '../../types';
import { SocialNetworksValue } from './SocialNetworksValue';
import { SocialNetworksWidget } from './SocialNetworksWidget';

export const socialNetworksPropertyEditorDefinition: ReactPropertyDefinition<SocialNetworksValue> =
  {
    name: 'social_networks',
    Widget: SocialNetworksWidget,
  };
