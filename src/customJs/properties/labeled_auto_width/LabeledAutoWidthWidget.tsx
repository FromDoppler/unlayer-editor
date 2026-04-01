import { React } from '../../unlayer-react';
import type { ChangeEvent } from 'react';
import { AutoWidth, WidgetComponent } from '../../types';
import { $t } from '../../localization';

type LabeledAutoWidthData = {
  min?: number;
  max?: number;
  step?: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const parseWidth = (width?: string) => {
  const parsed = Number.parseInt(width || '100%', 10);
  return Number.isFinite(parsed) ? parsed : 100;
};

export const labeledAutoWidthWidget: WidgetComponent<
  AutoWidth,
  void,
  LabeledAutoWidthData
> = ({ value, updateValue, data, label }) => {
  const min = data?.min ?? 10;
  const max = data?.max ?? 100;
  const step = data?.step ?? 1;
  const autoWidth = value?.autoWidth ?? false;
  const currentWidth = clamp(parseWidth(value?.width), min, max);

  const updateWidth = (nextWidth: number) => {
    updateValue({
      autoWidth: false,
      width: `${clamp(nextWidth, min, max)}%`,
    });
  };

  return (
    <div role="container" className="blockbuilder-widget row">
      <div className="col-12">
        {label ? (
          <label style={{ display: 'block', marginBottom: '8px' }}>
            {label}
          </label>
        ) : null}

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          <label
            style={{
              alignItems: 'center',
              cursor: 'pointer',
              display: 'flex',
              gap: '8px',
              margin: 0,
            }}
          >
            <input
              type="checkbox"
              checked={autoWidth}
              onChange={() =>
                updateValue({
                  autoWidth: !autoWidth,
                  width: `${currentWidth}%`,
                })
              }
            />
            <span>{$t('editor.image.auto_width')}</span>
          </label>
          <span>
            {autoWidth ? $t('labels.size.unit.auto') : `${currentWidth}%`}
          </span>
        </div>

        <div style={{ opacity: autoWidth ? 0.5 : 1 }}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentWidth}
            disabled={autoWidth}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateWidth(Number(e.currentTarget.value))
            }
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};
