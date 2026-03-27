import { ReactPropertyDefinition, AutoWidth, Percentage } from '../../types';
import { labeledAutoWidthWidget } from './LabeledAutoWidthWidget';

export const labeledAutoWidthPropertyEditor = 'labeled_auto_width';

type LabeledAutoWidthData = {
  min?: number;
  max?: number;
  step?: number;
};

export const labeledAutoWidthPropertyEditorDefinition: ReactPropertyDefinition<
  typeof labeledAutoWidthPropertyEditor,
  AutoWidth,
  void,
  LabeledAutoWidthData
> = {
  name: labeledAutoWidthPropertyEditor,
  Widget: labeledAutoWidthWidget,
};

export const labeledAutoWidthProperty = ({
  label,
  defaultValue = '100%',
  autoWidth = false,
  hidden = false,
  data,
}: {
  label?: string;
  defaultValue?: Percentage;
  autoWidth?: boolean;
  hidden?: boolean;
  data?: LabeledAutoWidthData;
} = {}) =>
  ({
    defaultValue: { autoWidth, width: defaultValue },
    hidden,
    label,
    data,
    widget: labeledAutoWidthPropertyEditor,
  }) as const;
