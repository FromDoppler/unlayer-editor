import { $t } from '../localization';
import { React } from '../unlayer-react';

export type DropdownOption = {
  value: string | number;
  label: string;
};

export const UnlayerDropdown = ({
  label,
  options,
  updateValue,
  value,
}: {
  value?: string;
  label?: string;
  options: DropdownOption[];
  updateValue?: (e) => void;
}) => {
  return (
    <div className="blockbuilder-widget-label mb-2">
      {label && (
        <label className="blockbuilder-label-primary">
          <div>
            <span className="has-value same-value">{label}</span>
          </div>
        </label>
      )}
      <select
        onChange={updateValue}
        value={value}
        style={{
          display: 'flex',
          width: '100%',
          height: '40px',
          paddingLeft: '10px',
          lineHeight: '1rem',
          fontSize: '13px',
          fontWeight: '400',
          color: 'rgb(0, 0, 0)',
          backgroundColor: 'rgb(249, 249, 249)',
          border: '1px solid rgb(212, 212, 212)',
          textWrap: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {value === '-1' && (
          <option value="-1" disabled>
            {' '}
            -- {$t('_dp.select_option')} --{' '}
          </option>
        )}
        {options.map((x) => (
          <option key={x.value} value={x.value}>
            {x.label}
          </option>
        ))}
      </select>
    </div>
  );
};
