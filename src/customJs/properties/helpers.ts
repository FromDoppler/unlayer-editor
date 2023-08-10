import { EMPTY_SELECTION } from '../constants';
import { intl } from '../localization';
import { Store } from '../types';

const createOptions = (items: { value: string; label: string }[]) => {
  const defaultValue = items.length === 1 ? items[0].value : EMPTY_SELECTION;
  const emptyOption = {
    value: EMPTY_SELECTION,
    label: intl.formatMessage({ id: '_dp.select_option' }),
  };
  const options = [emptyOption, ...items];
  return [options, defaultValue] as const;
};

export const dropdownProperty = <T>({
  label,
  items,
  map,
}: Readonly<{
  label: string;
  items: Readonly<T[]>;
  map: (item: T) => { value: string; label: string };
}>) => {
  const mappedItems = items.map(map);
  const [options, defaultValue] = createOptions(mappedItems);
  return {
    label,
    defaultValue,
    widget: 'dropdown',
    data: {
      options,
    },
  } as const;
};

export const alignmentProperty = () => ({
  label: intl.formatMessage({ id: 'editor.align.label' }),
  defaultValue: 'center',
  widget: 'alignment',
});

export const storesDropdownProperty = ({ stores }: { stores: Store[] }) =>
  dropdownProperty({
    label: intl.formatMessage({ id: '_dp.store' }),
    items: stores,
    map: ({ name }) => ({
      value: name,
      label: name,
    }),
  });
