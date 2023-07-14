import { ReactNode } from '../../unlayer-react';
import { ReactPropertyDefinition } from '../../types';
import { UrlValue } from './UrlValue';
import { UrlWidget } from './UrlWidget';

export const urlPropertyEditorDefinition: ReactPropertyDefinition<
  'url',
  UrlValue,
  void,
  { label?: string; help?: ReactNode }
> = {
  name: 'url',
  Widget: UrlWidget,
};
