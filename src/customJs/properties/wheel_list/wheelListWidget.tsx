import { React, useRef, useState } from '../../unlayer-react';
import { Color, Percentage, WidgetComponent } from '../../types';
import debounce from 'lodash.debounce';

import { $t } from '../../localization';
import { Modal } from '../../components/Modal';
import { WheelSlide } from '../../tools/wheel/types';

export const wheelListWidget: WidgetComponent<WheelSlide[], void> = ({
  value,
  updateValue,
}) => {
  const MAX_SLIDES = 9;

  const [modalOpen, setModalOpen] = useState(false);
  const emptyWheelSlide: WheelSlide = {
    label: '',
    gift: '',
    percent: '0%',
    color: '#AAA',
  };
  const [saving, setSaving] = useState<boolean>(false);
  const [slide, setSlide] = useState<WheelSlide>(emptyWheelSlide);
  const [slideIndex, setSlideIndex] = useState<number>(-1);
  const [modalTitle, setModalTitle] = useState<string>('Nuevo Slide');
  const formRef = useRef<HTMLFormElement>(null);

  const debounceUpdate = (slides: WheelSlide[]) => {
    if (saving) return;
    setSaving(true);
    const update = debounce(
      () => {
        updateValue(slides);
        setSaving(false);
      },
      500,
      { maxWait: 1000 },
    );
    update();
  };

  const getSlideFormData = (): WheelSlide => {
    const data = formRef.current?.elements;
    const label = data?.namedItem('label') as HTMLInputElement;
    const gift = data?.namedItem('gift') as HTMLInputElement;
    const percent = data?.namedItem('percent') as HTMLInputElement;
    const color = data?.namedItem('color') as HTMLInputElement;
    return {
      label: label.value,
      gift: gift.value,
      percent: percent.value as Percentage,
      color: color.value,
    };
  };

  const createNewSegment = () => {
    setSlideIndex(-1);
    setSlide(emptyWheelSlide);
    setModalTitle(`Crear nuevo Segmento`);
    setModalOpen(true);
  };

  const eliminateSegment = () => {
    alert(`remover segmento ${slideIndex + 1}`);
    const slides = [...value];
    slides.splice(slideIndex, 1);
    debounceUpdate(slides);
    setModalOpen(false);
  };

  const updateSegment = (index: number) => {
    setSlideIndex(index);
    setSlide(value[index]);
    setModalTitle(`Actualizar Segmento ${index + 1}`);
    setModalOpen(true);
  };

  const updateColor = (color: Color, index: number) => {
    const slides = [...value];
    slides[index] = {
      ...slides[index],
      color: color,
    };
    debounceUpdate(slides);
  };

  const updateWheelList = () => {
    const data = getSlideFormData();
    const slides = [...value];
    if (slideIndex === -1) {
      debounceUpdate([...slides, data]);
    } else {
      slides[slideIndex] = data;
      debounceUpdate(slides);
    }
    setModalOpen(false);
  };

  const getPrimaryButtonLabel = () => {
    return slideIndex === -1 ? 'Crear' : 'actualizar';
  };

  const inputModalStyle = {
    display: 'flex',
    width: '100%',
    marginTop: '6px',
    lineHeight: '1.25rem',
    fontSize: '13px',
    padding: '0.75rem 1rem',
    color: 'rgb(125, 125, 125)',
    backgroundColor: 'rgb(249, 249, 249)',
    border: '1px solid rgb(212, 212, 212)',
  };

  const segmentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px',
    border: '1px solid #333',
    backgroundColor: '#eee',
    borderRadius: '2px',
    margin: '5px 2px',
    cursor: 'pointer',
  };

  return (
    <div role="container" className="blockbuilder-widget row">
      <div className="col-12">
        <Modal
          open={modalOpen}
          size="S"
          titleContent={modalTitle}
          primaryAction={{
            label: getPrimaryButtonLabel(),
            primaryFn: () => updateWheelList(),
            style: { color: 'white', backgroundColor: 'rgb(0, 0, 0)' },
          }}
          secondaryAction={{
            label: 'Eliminar',
            secondaryFn: () => eliminateSegment(),
            style: {
              color: 'white',
              backgroundColor: 'rgb(199, 29, 29)',
              display: slideIndex == -1 ? 'none' : 'block',
            },
          }}
          cancelAction={{
            label: $t('buttons.cancel'),
            cancelFn: () => {
              setModalOpen(false);
            },
            style: {
              backgroundColor: 'transparent',
            },
          }}
          content={
            <>
              <form
                style={{
                  width: '100%',
                  margin: '0 20px',
                }}
                id="slideFom"
                ref={formRef}
              >
                <div style={{ margin: '20px 0' }}>
                  <label>Texto</label>
                  <input
                    name="label"
                    style={inputModalStyle}
                    className="input"
                    defaultValue={slide.label}
                    placeholder="Ingrese la leyenda que se mostrara en la ruleta"
                    type="text"
                    aria-label="text-slide-name-input"
                  />
                </div>
                <div style={{ margin: '20px 0' }}>
                  <label>Código de descuento</label>
                  <input
                    name="gift"
                    style={inputModalStyle}
                    className="input"
                    defaultValue={slide.gift}
                    placeholder="Ingrese el código de promoción"
                    type="text"
                    aria-label="text-slide-name-input"
                  />
                </div>
                <div style={{ margin: '20px 0' }}>
                  <label>Porcentaje de probabilidad</label>
                  <input
                    name="percent"
                    style={inputModalStyle}
                    className="input"
                    defaultValue={slide.percent}
                    type="text"
                    aria-label="text-slide-name-input"
                  />
                </div>
                <div
                  style={{
                    margin: '20px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <label>Color</label>
                  <input
                    name="color"
                    defaultValue={slide.color}
                    type="color"
                    aria-label="color-slide-input"
                  />
                </div>
              </form>
            </>
          }
        />

        <div>
          {value.map((x, i) => (
            <div key={i} style={segmentStyle} onClick={() => updateSegment(i)}>
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
                Segmento {i + 1} - {x.label}
                <legend style={{ display: 'contents' }}>({x.percent})</legend>
              </span>
              <span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="pencil"
                  className="svg-inline--fa fa-pencil"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M395.8 39.6c9.4-9.4 24.6-9.4 33.9 0l42.6 42.6c9.4 9.4 9.4 24.6 0 33.9L417.6 171 341 94.4l54.8-54.8zM318.4 117L395 193.6l-219 219 0-12.6c0-8.8-7.2-16-16-16l-32 0 0-32c0-8.8-7.2-16-16-16l-12.6 0 219-219zM66.9 379.5c1.2-4 2.7-7.9 4.7-11.5L96 368l0 32c0 8.8 7.2 16 16 16l32 0 0 24.4c-3.7 1.9-7.5 3.5-11.6 4.7L39.6 472.4l27.3-92.8zM452.4 17c-21.9-21.9-57.3-21.9-79.2 0L60.4 329.7c-11.4 11.4-19.7 25.4-24.2 40.8L.7 491.5c-1.7 5.6-.1 11.7 4 15.8s10.2 5.7 15.8 4l121-35.6c15.4-4.5 29.4-12.9 40.8-24.2L495 138.8c21.9-21.9 21.9-57.3 0-79.2L452.4 17zM331.3 202.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-128 128c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l128-128z"
                  ></path>
                </svg>
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button
            type="button"
            style={{ height: '40px', width: '100%' }}
            className="btn btn-primary btn-sm"
            onClick={() => createNewSegment()}
            disabled={value.length >= MAX_SLIDES}
          >
            Crear nuevo segemento
          </button>
        </div>
      </div>
    </div>
  );
};
