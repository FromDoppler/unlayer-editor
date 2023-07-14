import { ReactNode } from '../../unlayer-react';
import { ReactPropertyDefinition } from '../../types';
import { UrlValue } from './UrlValue';
import { UrlWidget } from './UrlWidget';

export const urlPropertyEditor = 'url';

export const urlPropertyEditorDefinition: ReactPropertyDefinition<
  typeof urlPropertyEditor,
  UrlValue,
  void,
  { help?: ReactNode }
> = {
  name: urlPropertyEditor,
  Widget: UrlWidget,
};
