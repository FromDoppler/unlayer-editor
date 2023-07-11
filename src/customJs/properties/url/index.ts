import { ReactPropertyDefinition } from '../../types';
import { UrlValue } from './UrlValue';
import { UrlWidget } from './UrlWidget';

export const urlPropertyEditorDefinition: ReactPropertyDefinition<UrlValue> = {
  name: 'url',
  Widget: UrlWidget,
};
