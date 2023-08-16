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
import { intl } from '../../localization';

type CodeOption = { value: string; label: string };

export const PromoCodesWidget: WidgetComponent<
  PromoCodesValue,
  StoreDependentToolValues
> = addUnlayerLabel(({ value, updateValue, values: { store } }) => {
  const { loading, codeOptions } = usePromoCodes({ store });
  const changeValue = (e: any) => updateValue(e.target.value);

  const loadingStyle = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  } as const;

  const containerStyle = {
    margin: '5px',
    font: '400 1.2em Roboto,sans-serif',
    color: '#333',
  } as const;

  const spanCodeStyle = {
    margin: '0 5px',
    width: '70%',
    fontWeight: 600,
  } as const;

  const spanStyle = {
    marginLeft: '15px',
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div className="spinner-border text-secondary" role="status"></div>
        <span className="visually-hidden" style={containerStyle}>
          {intl.formatMessage({ id: 'labels.loading' })}...
        </span>
      </div>
    );
  }

  return (
    <div role="container">
      {codeOptions.map((x) => (
        <div className="form-check" style={containerStyle} key={x.value}>
          <input
            type="radio"
            className="form-check-input"
            value={x.value}
            name="promoCodeRadioInput"
            onChange={changeValue}
            checked={x.value === value}
          />
          <label
            className="form-check-label"
            onClick={() => updateValue(x.value)}
          >
            <span style={spanCodeStyle}>{x.value}</span>
            <span style={spanStyle}>{x.label}</span>
          </label>
        </div>
      ))}
    </div>
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
