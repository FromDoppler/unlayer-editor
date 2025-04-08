import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { WheelSlide } from './types';
import { SmartFormViewer } from '../smartforms/smartFormViewer';
import { getPosicionParaProbabilidad, getWheelLabelStyle } from './viewHelper';
import { $t } from '../../localization';

export const WheelFortuneViewer: ViewerComponent<any> = (rest) => {
  const values = rest.values;

  /* SMART FORM set default values */

  const formRest = {
    ...rest,
    values: {
      ...rest.values,

      fieldBackgroundColor: '#FFF',
      fieldBorder: {
        borderBottomColor: '#CCCCCC',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderLeftColor: '#CCCCCC',
        borderLeftStyle: 'solid',
        borderLeftWidth: '1px',
        borderRightColor: '#CCCCCC',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderTopColor: '#CCCCCC',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
      },
      ferRadius: '4px',
      fieldColor: '#000',
      fieldDistance: '10px',
      fieldFontSize: '12px',
      fieldPadding: '10px',
      formWidth: { autoWidth: false, width: '100%' },
      formAlign: 'center',
      labelAlign: 'left',
      labelColor: '#444',
      labelFontSize: '14px',
      labelPadding: '0px 0px 3px',
      buttonBorder: {
        borderBottomColor: '#CCCCCC',
        borderBottomStyle: 'solid',
        borderBottomWidth: '0px',
        borderLeftColor: '#CCCCCC',
        borderLeftStyle: 'solid',
        borderLeftWidth: '0px',
        borderRightColor: '#CCCCCC',
        borderRightStyle: 'solid',
        borderRightWidth: '0px',
        borderTopColor: '#CCCCCC',
        borderTopStyle: 'solid',
        borderTopWidth: '0px',
      },
      buttonBorderRadius: '4px',
      buttonFontSize: '14px',
      buttonFontWeight: 700,
      buttonMargin: '5px 0px 0px',
      buttonPadding: '10px',
      buttonWidth: { autoWidth: false, width: '100%' },
    },
  };

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
    display: values.viewPanel === 'init' ? 'block' : 'none',
    margin: '10px auto',
  } as const;

  const wheelStyle = {
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: '50%',
    backgroundColor: values.wheelBorderColor,
    overflow: 'hidden',
    border: `8px solid ${values.wheelBorderColor}`,
    transition: 'transform 5s ease-in-out',
  } as const;

  const wheelCenterStyle = {
    position: 'relative',
    height: '15%',
    width: '15%',
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
    fontSize: '18px',
    fontFamily: 'inherit',
    fontWeight: '900',
    color: '#000',
  } as const;

  const slides = values.wheelList;
  const slidePercent = 100 / slides.length;

  const spanStylesArray = slides.map((slide: WheelSlide, i: number) => {
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

  const congratysBtnStyle = {
    border: 'none',
    borderRadius: formRest.values.buttonBorderRadius,
    display: 'inline-block',
    textAlign: formRest.values.buttonAlign,
    overflow: 'hidden',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: formRest.values.buttonFontWeight,
    padding: formRest.values.buttonPadding,
    margin: '5px 10px',
    fontSize: formRest.values.buttonFontSize,
    width: '100%',
    color: values.congratsButtonColor,
    backgroundColor: values.congratsButtonBackgroundColor,
    height: '35px',
  } as const;

  const customCss = `
  @media (max-width: 400px) {
    .dp-roulette {
       display: block;
     }
    .dp-wheel-roulette {
      width: 324px;
    }
    .dp-roulette-congrats,
      .dp-roulette-description {
      width: 95%;
    }
    .dp-wheel-segment-label {
      font-size: 12px;
      max-width: 75px;
    }
    .dp-roulette-congrats-copy-icon {
      right: -60px;
    }
  }

  @media  (min-width: 420px) {
    .dp-roulette {
      display: inline-flex;
    }
    .dp-roulette-congrats,
    .dp-roulette-description,
    .dp-wheel-roulette {
      width: 350px;
    }
    .dp-wheel-roulette {
      height: 350px;
    }

    .dp-wheel-segment-label {
      font-size: 14px;
      max-width: 120px;
    }
    .dp-roulette-congrats-copy-icon {
      right: -80px;
    }
  }

  @media  (min-width: 768px) {
    .dp-roulette-congrats,
    .dp-roulette-description,
    .dp-wheel-roulette {
      width: 400px;
    }
    .dp-wheel-roulette {
      height: 400px;
    }
      .dp-roulette-congrats-copy-icon {
      right: -100px;
    }
  }`;

  return (
    <div>
      <style>{customCss}</style>
      <div
        className="dp-roulette"
        style={{
          backgroundColor: values.wheelBackgroudColor,
        }}
      >
        <section style={wheelContainerStyle} className="dp-wheel-roulette">
          <div style={wheelSelectorStyle}></div>
          <div style={wheelCenterStyle}></div>
          <div
            id="dp-wheel"
            style={wheelStyle}
            data-slides={JSON.stringify(values.wheelList)}
          >
            {slides.map((slide: WheelSlide, i: number) => (
              <span key={i} style={spanStylesArray[i]}>
                <span style={spanLabelStyle} className="dp-wheel-segment-label">
                  {slide.label}
                </span>
              </span>
            ))}
          </div>
        </section>
        <section
          className="dp-roulette-description"
          style={descriptionContainerStyle}
        >
          <span
            style={{ display: 'block', marginBottom: '5px' }}
            dangerouslySetInnerHTML={{ __html: values.descriptionHtml }}
          />
          <SmartFormViewer {...formRest} />
        </section>
        <section
          className="dp-roulette-congrats"
          style={{
            display: values.viewPanel === 'end' ? 'block' : 'none',
            alignContent: 'center',
            margin: '10px auto',
            paddingBottom: '20px',
          }}
        >
          <span
            style={{ display: 'block', margin: values.congratsHtmlMargin }}
            dangerouslySetInnerHTML={{ __html: values.congratsHtml }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #000',
              backgroundColor: '#fff',
              margin: '10px',
              padding: '10px',
            }}
          >
            <span style={giftCodeStyle}>[[GIFT CODE]]</span>
            <i
              className="dp-roulette-congrats-copy-icon"
              style={{
                display: 'flex',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.57265 15.7677H12.2823C13.6931 15.7677 14.938 14.6058 14.938 13.1121V2.57262C14.938 1.16183 13.7761 0 12.3653 0H2.57265C1.16184 0 0 1.16183 0 2.57262V13.1121C0 14.6058 1.16184 15.7677 2.57265 15.7677ZM4.81335 4.89628H10.1246C10.6226 4.89628 10.9545 5.31121 10.9545 5.72615C10.9545 6.22408 10.6226 6.55603 10.1246 6.55603H4.81335C4.31541 6.55603 3.98346 6.22408 3.98346 5.72615C3.98346 5.22823 4.31541 4.89628 4.81335 4.89628ZM4.81335 9.21164H10.1246C10.6226 9.21164 10.9545 9.54359 10.9545 10.0415C10.9545 10.4565 10.6226 10.8714 10.1246 10.8714H4.81335C4.31541 10.8714 3.98346 10.4565 3.98346 10.0415C3.98346 9.62657 4.31541 9.21164 4.81335 9.21164Z"
                  fill="#999999"
                />
                <path
                  d="M17.3448 4.14917H16.5979V13.1948C16.5979 15.6015 14.6892 17.5102 12.2825 17.5102H4.97949C5.06248 18.921 6.22432 19.9998 7.63513 19.9998H17.3448C18.7556 19.9998 20.0005 18.838 20.0005 17.3442V6.72179C19.9175 5.311 18.7556 4.14917 17.3448 4.14917Z"
                  fill="#999999"
                />
              </svg>
            </i>
          </div>
          <div style={{ display: 'flex' }}>
            <button type="button" style={congratysBtnStyle}>
              {values.congratsButtonText}
            </button>
          </div>
          <div
            id="dp_copy_code_message"
            style={{
              display: 'none',
              backgroundColor: '#eaf5f9',
              borderTop: '1px solid #abc9f9',
              borderBottom: '1px solid #abc9f9',
              borderRight: '1px solid #abc9f9',
              borderLeft: '4px solid #669df3',
              margin: '10px',
              padding: '18px',
              fontFamily: '"proxima-nova", Helvetica, Arial, sans-serif',
              fontSize: '15px',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                height: '20px',
                width: '30px',
                backgroundImage:
                  'url("https://cdn.fromdoppler.com/doppler-style-guide//static/media/de522f11257cc031e637.svg")',
                backgroundRepeat: 'no-repeat',
              }}
            ></span>
            <p>{$t('_dp.wheel_fortune.congrats.copy.message')}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
