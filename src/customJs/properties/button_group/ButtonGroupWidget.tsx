import { React, useState } from '../../unlayer-react';
import { WidgetComponent } from '../../types';
import { BtnGroup } from '.';

export const buttonGroupWidget: WidgetComponent<string, void, BtnGroup[]> = ({
  data,
  updateValue,
}) => {
  const [group, setGroup] = useState(Array.from(Object.values(data)));

  const setBtnActive = (value: string) => {
    updateValue(value);
    setGroup(
      group.map((val) => {
        return {
          ...val,
          active: val.value === value,
        };
      }),
    );
  };

  return (
    <div className="blockbuilder-widget blockbuilder-link-widget mb-2">
      <div className="field_container href_field flex">
        <div>
          {group &&
            group.map((btn) => (
              <button
                key={btn.value}
                type="button"
                style={{ height: '40px', width: `${100 / group.length}%` }}
                className={`btn btn-sm btn-${btn.active ? 'primary' : 'secondary'}`}
                onClick={() => setBtnActive(btn.value)}
              >
                {btn.label}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
