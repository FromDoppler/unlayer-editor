import { EMPTY_SELECTION } from '../constants';
import { intl } from '../localization';
import { Store } from '../types';

const createOptions = <TValue extends string>(
  items: { value: TValue; label: string }[],
) => {
  const defaultValue = items.length === 1 ? items[0].value : EMPTY_SELECTION;
  const emptyOption = {
    value: EMPTY_SELECTION,
    label: intl.formatMessage({ id: '_dp.select_option' }),
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

export const alignmentProperty = () => ({
  label: intl.formatMessage({ id: 'editor.align.label' }),
  defaultValue: 'center' as const,
  widget: 'alignment',
});

export const storesDropdownProperty = ({ stores }: { stores: Store[] }) =>
  mappedDropdownProperty({
    label: intl.formatMessage({ id: '_dp.store' }),
    items: stores,
    map: ({ name }) => ({
      value: name,
      label: name,
    }),
  });
