import { ReactPropertyDefinition } from '../../types';
import { UrlValue } from './UrlValue';
import { UrlWidget } from './UrlWidget';

export const urlPropertyEditorDefinition: ReactPropertyDefinition<
  'url',
  UrlValue
> = {
  name: 'url',
  Widget: UrlWidget,
};
