import { React, useEffect, useState } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import {
  PromoCodesValue,
  StoresValue,
  StoreDependentToolValues,
} from './types';
import { EMPTY_SELECTION } from '../../constants';
import { timeout } from '../../utils/promises';
import { addUnlayerLabel } from '../../components/UnlayerLabel';

type CodeOption = { value: string; label: string };

export const PromoCodesWidget: WidgetComponent<
  PromoCodesValue,
  StoreDependentToolValues
> = addUnlayerLabel(({ value, updateValue, values: { store } }) => {
  const [loading, setLoading] = useState(false);
  const [codeOptions, setCodeOptions] = useState<CodeOption[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const promoCodes = await loadPromoCodes({ store });
        setCodeOptions(promoCodes);
      } finally {
        setLoading(false);
      }
    })();
  }, [store]);

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

// TODO: bring the promo codes from the backend
const loadPromoCodes: ({
  store,
}: {
  store: StoresValue;
}) => Promise<CodeOption[]> = async ({ store }) => {
  if (store === EMPTY_SELECTION) {
    return [];
  }
  await timeout(3000);
  return [
    {
      label: `10% off (${store})`,
      value: `${store}-10abc`,
    },
    {
      label: `20% off (${store})`,
      value: `${store}-20cde`,
    },
    {
      label: `30% off (${store})`,
      value: `${store}-30efg`,
    },
  ];
};
