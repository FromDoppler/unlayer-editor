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

export const urlProperty = ({
  label,
  help,
  enabled,
}: {
  label?: string;
  help?: ReactNode;
  enabled?: boolean;
} = {}) =>
  ({
    label,
    widget: urlPropertyEditor,
    data: { help },
    enabled,
  }) as const;
