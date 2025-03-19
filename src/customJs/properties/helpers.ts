import { EMPTY_SELECTION } from '../constants';
import { $t } from '../localization';
import {
  Alignment,
  AutoWidth,
  Border,
  BorderRadius,
  ButtonColors,
  Color,
  FontFamily,
  FontWeight,
  Image,
  Percentage,
  PixelSize,
  Store,
  UnlayerProperty,
} from '../types';

const createOptions = <TValue extends string>(
  items: { value: TValue; label: string }[],
) => {
  const defaultValue = items.length === 1 ? items[0].value : EMPTY_SELECTION;
  const emptyOption = {
    value: EMPTY_SELECTION,
    label: $t('_dp.select_option'),
  } as const;
  const options = [emptyOption, ...items] as [
    { value: TValue | EMPTY_SELECTION; label: string },
    ...{ value: TValue | EMPTY_SELECTION; label: string }[],
  ];
  return [options, defaultValue] as const;
};

export const mappedDropdownProperty = <TInputItem, TValue extends string>({
  label,
  items,
  map,
}: Readonly<{
  label: string;
  items: Readonly<TInputItem[]>;
  map: (item: TInputItem) => { value: TValue; label: string };
}>) => {
  const mappedItems = items.map(map);
  const [options, defaultValue] = createOptions(mappedItems);
  return dropdownProperty({
    label,
    options,
    defaultValue,
  });
};

export const dropdownProperty = <TValue extends string>({
  label,
  options,
  defaultValue,
}: Readonly<{
  label: string | undefined;
  options: Readonly<
    [{ value: TValue; label: string }, ...{ value: TValue; label: string }[]]
  >;
  defaultValue?: TValue;
}>) =>
  ({
    label,
    defaultValue: defaultValue ?? options[0].value,
    widget: 'dropdown',
    data: {
      options,
    },
  }) as const;

export const smallBigDropdownProperty = ({
  label,
  defaultValue,
}: {
  label: string | undefined;
  defaultValue?: 'small' | 'big';
}) =>
  dropdownProperty({
    label,
    defaultValue,
    options: [
      {
        label: $t('_dp.small'),
        value: 'small',
      },
      { label: $t('_dp.big'), value: 'big' },
    ] as const,
  });

export const smallMediumLargeDropdownProperty = ({
  label,
  defaultValue,
}: {
  label: string | undefined;
  defaultValue?: 'small' | 'medium' | 'large';
}) =>
  dropdownProperty({
    label,
    defaultValue,
    options: [
      {
        label: $t('_dp.small'),
        value: 'small',
      },
      {
        label: $t('_dp.medium'),
        value: 'medium',
      },
      { label: $t('_dp.big'), value: 'large' },
    ] as const,
  });

export const alignmentProperty: (param?: {
  defaultValue?: Alignment;
  hidden?: boolean;
}) => UnlayerProperty<Alignment> = ({
  defaultValue = 'center' as Alignment,
  hidden = false,
}: {
  defaultValue?: Alignment;
  hidden?: boolean;
} = {}) => ({
  label: $t('editor.align.label'),
  defaultValue,
  hidden,
  widget: 'alignment',
});

export const toggleProperty: ({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: boolean;
}) => UnlayerProperty<boolean> = ({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: boolean;
}) => ({
  label,
  defaultValue,
  widget: 'toggle',
});

export const toggleShowProperty: (param?: {
  defaultValue?: boolean;
  label?: string;
}) => UnlayerProperty<boolean> = ({
  defaultValue = true,
  label = $t('_dp.show'),
}: {
  defaultValue?: boolean;
  label?: string;
} = {}) => ({
  label,
  defaultValue,
  widget: 'toggle',
});

export const imageProperty: ({
  label,
}: {
  label: string;
}) => UnlayerProperty<Image> = ({ label }: { label: string }) => ({
  label,
  widget: 'image',
});

export const textProperty: ({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) => UnlayerProperty<string> = ({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) => ({
  label,
  defaultValue,
  widget: 'text',
});

export const fontFamilyProperty: (param?: {
  label?: string;
  hidden?: boolean;
}) => UnlayerProperty<FontFamily> = ({
  label,
  hidden,
}: {
  label?: string;
  hidden?: boolean;
} = {}) => ({
  label: label ?? $t('editor.font_family.label'),
  widget: 'font_family',
  hidden: hidden ?? false,
});

export const fontWeightProperty: (param?: {
  label?: string;
  defaultValue?: FontWeight;
  hidden?: boolean;
}) => UnlayerProperty<FontWeight> = ({
  label,
  defaultValue,
  hidden,
}: {
  label?: string;
  defaultValue?: FontWeight;
  hidden?: boolean;
} = {}) => ({
  label: label ?? $t('editor.font_weight.label'),
  defaultValue: defaultValue,
  hidden: hidden ?? false,
  widget: 'font_weight',
});

export const fontSizeProperty: (param?: {
  label?: string;
  defaultValue?: PixelSize;
  hidden?: boolean;
}) => UnlayerProperty<PixelSize> = ({
  label,
  defaultValue,
  hidden,
}: {
  label?: string;
  defaultValue?: PixelSize;
  hidden?: boolean;
} = {}) => ({
  label: label ?? $t('editor.font_size.label'),
  widget: 'font_size',
  defaultValue: defaultValue || '12px',
  hidden: hidden ?? false,
});

export const colorProperty: (param?: {
  label?: string;
  defaultValue?: Color;
  hidden?: boolean;
  overrideAllowed?: boolean;
}) => UnlayerProperty<Color> = ({
  label,
  defaultValue,
  hidden,
  overrideAllowed,
}: {
  label?: string;
  defaultValue?: Color;
  hidden?: boolean;
  overrideAllowed?: boolean;
} = {}) => ({
  label: label ?? $t('editor.color.label'),
  defaultValue: defaultValue,
  widget: 'color_picker',
  hidden: hidden ?? false,
  overrideAllowed: overrideAllowed ?? false,
});

export const buttonColorsProperty: () => UnlayerProperty<ButtonColors> =
  () => ({
    defaultValue: {
      color: '#FFFFFF',
      backgroundColor: 'rgb(109, 196, 151)',
    },
    widget: 'button_color',
  });

export const autoWidthProperty: (param?: {
  defaultValue?: Percentage;
  hidden?: boolean;
}) => UnlayerProperty<AutoWidth> = ({
  defaultValue = '100%',
  hidden = false,
}: {
  defaultValue?: Percentage;
  hidden?: boolean;
} = {}) => ({
  defaultValue: { autoWidth: true, width: defaultValue },
  hidden: hidden,
  widget: 'auto_width',
});

export const borderProperty: (param?: {
  defaultValue?: PixelSize;
  hidden?: boolean;
}) => UnlayerProperty<Border> = ({
  defaultValue = '0px',
  hidden,
}: {
  defaultValue?: PixelSize;
  hidden?: boolean;
} = {}) => ({
  label: $t('editor.border.label'),
  hidden: hidden ?? false,
  defaultValue: {
    borderTopWidth: defaultValue,
    borderTopStyle: 'solid',
    borderTopColor: '#CCCCCC',
    borderLeftWidth: defaultValue,
    borderLeftStyle: 'solid',
    borderLeftColor: '#CCCCCC',
    borderRightWidth: defaultValue,
    borderRightStyle: 'solid',
    borderRightColor: '#CCCCCC',
    borderBottomWidth: defaultValue,
    borderBottomStyle: 'solid',
    borderBottomColor: '#CCCCCC',
  },
  widget: 'border',
});

export const borderRadiusProperty: (param?: {
  hidden?: boolean;
}) => UnlayerProperty<BorderRadius> = ({
  hidden,
}: {
  hidden?: boolean;
} = {}) => ({
  label: $t('editor.rounded_border.label'),
  defaultValue: '4px',
  widget: 'border_radius',
  hidden: hidden ?? false,
});

export const richTextProperty: (param?: {
  label?: string;
  defaultValue?: string;
}) => UnlayerProperty<string> = ({
  label,
  defaultValue = '',
}: {
  label?: string;
  defaultValue?: string;
} = {}) => ({
  label,
  defaultValue,
  widget: 'rich_text',
});

export const storesDropdownProperty = ({ stores }: { stores: Store[] }) =>
  mappedDropdownProperty({
    label: $t('_dp.store'),
    items: stores,
    map: ({ name }) => ({
      value: name,
      label: name,
    }),
  });
