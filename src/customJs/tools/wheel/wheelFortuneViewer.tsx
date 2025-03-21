import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { WheelSlide } from './types';
import { SmartFormViewer } from '../smartforms/smartFormViewer';
import { getPosicionParaProbabilidad, getWheelLabelStyle } from './viewHelper';

export const WheelFortuneViewer: ViewerComponent<any> = (rest) => {
  const values = rest.values;

  const wheelContainerStyle = {
    aspectRatio: 1,
    position: 'relative',
    display: 'flex',
    margin: '10px auto',
    justifyContent: 'center',
    alignItems: 'center',
  } as const;

  const descriptionContainerStyle = {
    position: 'relative',
    margin: '10px auto',
  } as const;

  const wheelStyle = {
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: '50%',
    overflow: 'hidden',
    border: `8px solid ${values.wheelBorderColor}`,
    transition: 'transform 5s ease-in-out',
  } as const;

  const wheelCenterStyle = {
    position: 'relative',
    height: '12%',
    width: '12%',
    backgroundColor: values.wheelBorderColor,
    borderRadius: '50%',
    display: 'flex',
    zIndex: '10',
    userSelect: 'none',
  } as const;

  const wheelSelectorStyle = {
    position: 'absolute',
    top: '-5px',
    height: '15%',
    width: '12%',
    backgroundColor: values.wheelBorderColor,
    clipPath: 'polygon(50% 70%, 0 0, 100% 0)',
    display: 'flex',
    zIndex: '10',
    userSelect: 'none',
  } as const;

  const giftCodeStyle = {
    display: 'flex',
    textAlign: 'center',
    fontSize: values.congratsGiftFontSize || '24px',
    fontFamily: values.congratsGiftFont?.value || 'inherit',
    fontWeight: '900',
    color: values.congratsGiftColor,
  } as const;

  const slides = values.wheelList;
  const slidePercent = 100 / slides.length;

  const spanStylesArray = slides.map((slide: WheelSlide, i) => {
    return {
      position: 'absolute',
      width: ' 100%',
      height: '100%',
      backgroundColor: slide.color,
      transform: `rotate(calc(${360 / slides.length}deg * ${i}))`,
      clipPath: getPosicionParaProbabilidad(slidePercent),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none',
    } as const;
  });

  const spanLabelDynamic = getWheelLabelStyle(slides.length);
  const spanLabelStyle = {
    ...spanLabelDynamic,
    position: 'relative',
    fontFamily: values.wheelFontFamily?.value || 'inherit',
    fontWeight: '700',
    font: values.wheelFontFamily,
    color: values.wheelFontColor,
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: '2',
    textAlign: 'center',
    WebkitBoxOrient: 'vertical',
  } as const;
  return (
    <div>
      <div
        style={{
          display: !values.congratShow ? 'inline-flex' : 'none',
          backgroundColor: values.wheelBackgroudColor,
        }}
      >
        <section style={wheelContainerStyle}>
          {slides.length >= 2 ? (
            <>
              <div style={wheelSelectorStyle}></div>
              <div style={wheelCenterStyle}></div>
              <div
                id="dp-wheel"
                style={wheelStyle}
                data-slides={JSON.stringify(values.wheelList)}
              >
                {slides.map((slide: WheelSlide, i: number) => (
                  <span key={i} style={spanStylesArray[i]}>
                    <span
                      style={spanLabelStyle}
                      className="dp-wheel-segment-label"
                    >
                      {slide.label}
                    </span>
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div>El minimo de segmento para mostrar la ruleta es 2</div>
          )}
        </section>
        <section style={descriptionContainerStyle}>
          <span
            style={{ display: 'block' }}
            dangerouslySetInnerHTML={{ __html: values.descriptionHtml }}
          />
          <SmartFormViewer {...rest} />
        </section>
      </div>
      <div
        style={{
          display: values.congratShow ? 'block' : 'none',
          backgroundColor: values.congratsBackgroudColor,
        }}
      >
        <span
          style={{ display: 'block', margin: values.congratsHtmlMargin }}
          dangerouslySetInnerHTML={{ __html: values.congratsHtml }}
        />
        <div
          style={{
            display: values.congratsGiftShown ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #000',
            backgroundColor: '#fff',
            margin: values.congratsGiftMargin,
            padding: values.congratsGiftPadding,
          }}
        >
          <span style={giftCodeStyle}>[[GIFT CODE]]</span>
          <i style={{ display: 'flex', position: 'relative', right: '-100px' }}>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8126 0.979187H14.9164V11.8338C14.9164 14.7218 12.6259 17.0122 9.738 17.0122H0.974609C1.07419 18.7051 2.46837 19.9997 4.1613 19.9997H15.8126C17.5056 19.9997 18.9993 18.6056 18.9993 16.8131V4.06629C18.8997 2.37336 17.5056 0.979187 15.8126 0.979187Z"
                fill="#999999"
              />
            </svg>
          </i>
        </div>
      </div>
    </div>
  );
};
