import { React, useRef, useState } from '../../unlayer-react';
import { Color, WidgetComponent } from '../../types';
import debounce from 'lodash.debounce';

import { $t } from '../../localization';
import { Modal } from '../../components/Modal';
import { WheelSlice } from '../../tools/wheel/types';

export const wheelListWidget: WidgetComponent<WheelSlice[], void> = ({
  value,
  updateValue,
}) => {
  const MAX_SLICES = 9;

  const [slices, setSlices] = useState([...value]);
  const [modalOpen, setModalOpen] = useState(false);
  const emptyWheelSlice: WheelSlice = {
    label: '',
    gift: '',
    chance: 0,
    percent: '0%',
    color: '#AAA',
  };
  const [saving, setSaving] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const debounceUpdate = (slices: WheelSlice[]) => {
    if (saving) return;
    setSaving(true);
    const update = debounce(
      () => {
        updateValue(slices);
        setSlices(slices);
        setSaving(false);
      },
      500,
      { maxWait: 1000 },
    );
    update();
  };

  const setSegmentChance = (chanceValue: string, index: number) => {
    const chance = parseInt(chanceValue);
    const totalChances = slices.reduce(
      (acu: number, slice: WheelSlice, i: number) =>
        acu + (i === index ? chance : slice.chance),
      0,
    );
    const aux = slices.map((slice: WheelSlice, i: number) => {
      return {
        ...slice,
        chance: i === index ? chance : slice.chance,
        percent: `${totalChances > 0 ? Number.parseFloat((((i === index ? chance : slice.chance) * 100) / totalChances).toFixed(2)) : 0}%`,
      };
    });
    setSlices(aux as WheelSlice[]);
  };

  const updateChances = (_slices: WheelSlice[]) => {
    const totalChances = _slices.reduce(
      (acu: number, slide: WheelSlice) => acu + slide.chance,
      0,
    );
    _slices.forEach((slide: WheelSlice, i: number) => {
      _slices[i].percent =
        `${totalChances > 0 ? Number.parseFloat(((slide.chance * 100) / totalChances).toFixed(2)) : 0}%`;
    });
    return _slices;
  };

  const createNewSegment = () => {
    const _slices = [...slices, emptyWheelSlice];
    setSlices(_slices);
  };

  const eliminateSegment = (slideIndex: number) => {
    const _slices = [...slices];
    _slices.splice(slideIndex, 1);
    debounceUpdate(updateChances(_slices));
    setModalOpen(false);
  };

  const updateColor = (color: Color, index: number) => {
    const slices = [...value];
    slices[index] = {
      ...slices[index],
      color: color,
    };
    debounceUpdate(slices);
  };

  const updateWheelList = () => {
    const data = formRef.current?.elements;
    const size = data?.length ? (data?.length - 1) / 4 : 0;
    const labels = data?.namedItem('label') as HTMLInputElement;
    const gifts = data?.namedItem('gift') as HTMLInputElement;
    const chances = data?.namedItem('chance') as HTMLInputElement;
    const colors = data?.namedItem('color') as HTMLInputElement;
    const slices = Array(size)
      .fill(emptyWheelSlice)
      .map((slide, i) => {
        return {
          ...slide,
          label: labels[i].value,
          gift: gifts[i].value,
          chance: parseInt(chances[i].value),
          color: colors[i].value,
        };
      });
    debounceUpdate(updateChances(slices));
    setModalOpen(false);
  };

  const inputModalStyle = {
    display: 'flex',
    width: '90%',
    marginTop: '6px',
    lineHeight: '1.25rem',
    fontSize: '13px',
    padding: '0.75rem 1rem',
    color: 'rgb(125, 125, 125)',
    backgroundColor: 'white',
    border: '1px solid rgb(212, 212, 212)',
  };

  const segmentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
    border: '1px solid #D4D4D4',
    backgroundColor: '#F4F4F4',
    borderRadius: '2px',
    margin: '8px 2px',
    cursor: 'pointer',
  };

  const headerStyle = {
    textAlign: 'left',
  } as const;

  const cellStyle = {
    textAlign: 'center',
  } as const;

  return (
    <div role="container" className="blockbuilder-widget row">
      {$t('_dp.wheel_fortune.segment.config')}
      <div className="col-12">
        <Modal
          open={modalOpen}
          size="M"
          titleContent={$t('_dp.wheel_fortune.segment.config')}
          primaryAction={{
            label: $t('buttons.save'),
            primaryFn: () => updateWheelList(),
            style: { color: 'white', backgroundColor: 'rgb(0, 0, 0)' },
          }}
          cancelAction={{
            label: $t('buttons.cancel'),
            cancelFn: () => {
              setSlices(value);
              setModalOpen(false);
            },
            style: {
              backgroundColor: 'transparent',
              dispay: 'block',
            },
          }}
          content={
            <div style={{ maxHeight: '400px', overflow: 'hidden auto' }}>
              <form id="slideFom" ref={formRef}>
                <table className="table ">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th style={headerStyle}>
                        {$t('_dp.wheel_fortune.segment.modal.name')}
                      </th>
                      <th style={headerStyle}>
                        {$t('_dp.wheel_fortune.segment.modal.gift')}
                      </th>
                      <th style={headerStyle}>
                        {$t('_dp.wheel_fortune.segment.modal.chance')}
                      </th>
                      <th>{$t('_dp.wheel_fortune.segment.modal.stat')}</th>
                      <th>{$t('_dp.wheel_fortune.segment.modal.color')}</th>
                      <th>{$t('_dp.wheel_fortune.segment.modal.action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slices.map((x, i) => (
                      <tr key={i} style={{ height: '30px' }}>
                        <td
                          scope="row"
                          className="col-1"
                          style={{ fontWeight: 'bold', textAlign: 'center' }}
                        >
                          {i + 1}
                        </td>
                        <td className="col-3">
                          <input
                            type="text"
                            className="col-10"
                            style={inputModalStyle}
                            name="label"
                            defaultValue={x.label}
                          />
                        </td>
                        <td className="col-3">
                          <input
                            type="text"
                            className="col-10"
                            style={inputModalStyle}
                            name="gift"
                            defaultValue={x.gift}
                          />
                        </td>
                        <td className="col-2">
                          <input
                            type="number"
                            className="col-10"
                            style={{ ...inputModalStyle, textAlign: 'center' }}
                            name="chance"
                            defaultValue={x.chance}
                            step="10"
                            min="0"
                            max="100"
                            onChange={(e) => {
                              setSegmentChance(e.target.value, i);
                            }}
                          />
                        </td>
                        <td className="col-2" style={cellStyle}>
                          {x.percent}
                        </td>

                        <td className="col-1" style={cellStyle}>
                          <input
                            type="color"
                            style={{
                              marginTop: '6px',
                              height: '40px',
                              width: '40px',
                            }}
                            name="color"
                            defaultValue={x.color}
                          />
                        </td>

                        <td className="col-1" style={cellStyle}>
                          <span
                            style={{
                              cursor: value.length > 2 ? 'pointer' : 'default',
                            }}
                            onClick={() => {
                              if (value.length < 3) return;
                              eliminateSegment(i);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              style={{ marginTop: '10px' }}
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.5 1.5V0H9V1.5H3.8715C3.39 1.5 3 1.89 3 2.3715V4.5H9H16.5H22.5V2.3715C22.5 1.89 22.11 1.5 21.6285 1.5H16.5ZM4.5 6V22.962C4.5 23.535 4.965 24 5.538 24H19.962C20.535 24 21 23.535 21 22.962V6H4.5ZM18 21H16.5V9H18V21ZM12 21H13.5V9H12V21ZM9 21H7.5V9H9V21Z"
                                fill={value.length > 2 ? '#999' : '#eee'}
                              />
                            </svg>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  style={{
                    display: value.length < MAX_SLICES ? 'flex' : 'none',
                    justifyContent: 'end',
                    marginTop: '30px',
                    paddingTop: '10px',
                    borderTop: '1px solid rgb(238, 238, 238)',
                  }}
                >
                  <button
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'none',
                      border: 'none',
                      appearance: 'none',
                      fontFamily: '"proxima-nova",Helvetica,Arial,sans-serif',
                      color: '#33ad73',
                      background: 'none',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      createNewSegment();
                    }}
                  >
                    + {$t('_dp.wheel_fortune.segment.modal.add')}
                  </button>
                </div>
              </form>
            </div>
          }
        />

        <div>
          {value.map((x, i) => (
            <div
              key={i}
              style={segmentStyle}
              onClick={() => setModalOpen(true)}
            >
              <span>
                <input
                  style={{ width: '27px', marginRight: '5px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    updateColor(e.target.value, i);
                  }}
                  type="color"
                  value={x.color}
                />
                {i + 1}. {x.label}
              </span>
              <legend style={{ display: 'contents' }}>({x.percent})</legend>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
            type="button"
            style={{ height: '40px', width: '100%' }}
            className="btn btn-primary btn-sm"
            onClick={() => setModalOpen(true)}
          >
            {$t('_dp.wheel_fortune.segment.admin')}
          </button>
        </div>
      </div>
    </div>
  );
};
