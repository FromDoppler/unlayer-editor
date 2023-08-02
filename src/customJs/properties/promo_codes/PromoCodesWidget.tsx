import { React, useEffect, useState } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import {
  PromoCodesValue,
  StoreDependentToolValues,
  PromoCodeItem,
} from './types';
import { EMPTY_SELECTION } from '../../constants';
import { addUnlayerLabel } from '../../components/UnlayerLabel';
import { requestDopplerApp } from '../../utils/dopplerAppBridge';

type CodeOption = { value: string; label: string };

export const PromoCodesWidget: WidgetComponent<
  PromoCodesValue,
  StoreDependentToolValues
> = addUnlayerLabel(({ value, updateValue, values: { store } }) => {
  const { loading, codeOptions } = usePromoCodes({ store });

  // TODO: show a spinner or something
  if (loading) {
    return <div>LOADING...</div>;
  }

  // TODO: show the options as radio buttons
  return (
    <ul>
      {codeOptions.map((x) => (
        <li key={x.value} onClick={() => updateValue(x.value)}>
          {x.value === value ? '[x]' : '[ ]'} {x.label}
        </li>
      ))}
    </ul>
  );
});

const usePromoCodes = ({ store }: { store: string }) => {
  const [loading, setLoading] = useState(false);
  const [codeOptions, setCodeOptions] = useState<CodeOption[]>([]);

  useEffect(() => {
    if (store === EMPTY_SELECTION) {
      setLoading(false);
      setCodeOptions([]);
      return;
    }

    setLoading(true);

    const { destructor } = requestDopplerApp({
      action: 'getPromoCodes',
      store,
      callback: (value: PromoCodeItem[]) => {
        const itemsMapped = value.map((v) => mapCodeOption(v));
        setCodeOptions(itemsMapped);
        setLoading(false);
      },
    });

    return destructor;
  }, [store]);

  return {
    loading,
    codeOptions,
  };
};

const mapCodeOption = (item: PromoCodeItem): CodeOption => {
  const label = item.type === 'money' ? `$${item.value}` : `${item.value}%`;
  return { label: label, value: item.code };
};
