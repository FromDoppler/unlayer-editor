import { ReactPropertyDefinition } from '../../types';
import { buttonGroupWidget } from './ButtonGroupWidget';

export const buttonGroupPropertyEditor = 'buttonGroup';

export const buttonGroupPropertyEditorDefinition: ReactPropertyDefinition<
  typeof buttonGroupPropertyEditor,
  string,
  void,
  BtnGroup[]
> = {
  name: buttonGroupPropertyEditor,
  Widget: buttonGroupWidget,
};

export type BtnGroup = {
  label: string;
  value: string;
  active: boolean;
};

export const buttonGroupProperty = ({
  label,
  defaultValue,
  data,
}: {
  label?: string;
  defaultValue?: string;
  data?: BtnGroup[];
} = {}) =>
  ({
    defaultValue,
    label,
    data,
    widget: buttonGroupPropertyEditor,
  }) as const;
