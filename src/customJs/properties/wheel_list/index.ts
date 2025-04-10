import { WheelSlice } from '../../tools/wheel/types';
import { ReactPropertyDefinition } from '../../types';
import { wheelListWidget } from './wheelListWidget';

export const wheelListPropertyEditor = 'wheel_slide_list';
type wheelListPropertyEditor = typeof wheelListPropertyEditor;

export const wheelListPropertyEditorDefinition: ReactPropertyDefinition<
  wheelListPropertyEditor,
  WheelSlice[],
  void
> = {
  name: wheelListPropertyEditor,
  Widget: wheelListWidget,
};

export const wheelListProperty = ({
  defaultValue,
}: {
  defaultValue?: WheelSlice[];
  label?: string;
} = {}) =>
  ({
    defaultValue,
    widget: wheelListPropertyEditor,
  }) as const;
