import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { SmartFormViewer } from '../smartforms/smartFormViewer';
import { PromotionalValues } from './types';
import { $t } from '../../localization';

const DEFAULT_FORM_BORDER = {
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
} as const;

export const PromotionalViewer: ViewerComponent<PromotionalValues> = (rest) => {
  const { values } = rest;

  const formRest = {
    ...rest,
    values: {
      ...rest.values,
      fieldBackgroundColor: values.fieldBackgroundColor,
      fieldBorder: DEFAULT_FORM_BORDER,
      fieldBorderRadius: '2px',
      fieldColor: values.fieldColor,
      fieldDistance: '12px',
      fieldFontSize: '16px',
      fieldPadding: '14px 16px',
      formWidth: { autoWidth: false, width: '86%' },
      formAlign: 'center',
      labelAlign: 'left',
      labelColor: '#444',
      labelFontSize: '14px',
      labelPadding: '0px',
      buttonAlign: values.buttonAlign,
      buttonBorder: values.buttonBorder,
      buttonBorderRadius: values.buttonBorderRadius,
      buttonFontSize: values.buttonFontSize,
      buttonFontWeight: values.buttonFontWeight,
      buttonMargin: values.buttonMargin,
      buttonPadding: values.buttonPadding,
      buttonWidth: values.buttonWidth,
    },
  };

  const descriptionContainerStyle = {
    display: values.viewPanel === 'init' ? 'block' : 'none',
  } as const;

  const cardStyle = {
    backgroundColor: values.cardBackgroundColor,
    borderColor: `${values.cardBorder.borderTopColor} ${values.cardBorder.borderRightColor} ${values.cardBorder.borderBottomColor} ${values.cardBorder.borderLeftColor}`,
    borderRadius: values.cardBorderRadius,
    borderStyle: `${values.cardBorder.borderTopStyle} ${values.cardBorder.borderRightStyle} ${values.cardBorder.borderBottomStyle} ${values.cardBorder.borderLeftStyle}`,
    borderWidth: `${values.cardBorder.borderTopWidth} ${values.cardBorder.borderRightWidth} ${values.cardBorder.borderBottomWidth} ${values.cardBorder.borderLeftWidth}`,
    boxSizing: 'border-box',
    display: 'inline-block',
    padding: values.cardPadding,
    width: values.cardWidth.autoWidth ? '100%' : values.cardWidth.width,
  } as const;

  const congratsButtonStyle = {
    backgroundColor: values.congratsButtonBackgroundColor,
    borderColor: `${values.congratsButtonBorder.borderTopColor} ${values.congratsButtonBorder.borderRightColor} ${values.congratsButtonBorder.borderBottomColor} ${values.congratsButtonBorder.borderLeftColor}`,
    borderRadius: values.congratsButtonBorderRadius,
    borderStyle: `${values.congratsButtonBorder.borderTopStyle} ${values.congratsButtonBorder.borderRightStyle} ${values.congratsButtonBorder.borderBottomStyle} ${values.congratsButtonBorder.borderLeftStyle}`,
    borderWidth: `${values.congratsButtonBorder.borderTopWidth} ${values.congratsButtonBorder.borderRightWidth} ${values.congratsButtonBorder.borderBottomWidth} ${values.congratsButtonBorder.borderLeftWidth}`,
    color: values.congratsButtonColor,
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: values.congratsButtonFontSize,
    fontWeight: values.congratsButtonFontWeight,
    margin: values.congratsButtonMargin,
    overflow: 'hidden',
    padding: values.congratsButtonPadding,
    textAlign: values.congratsButtonAlign,
    textDecoration: 'none',
    width: values.congratsButtonWidth.autoWidth
      ? '100%'
      : values.congratsButtonWidth.width,
  } as const;

  const discountCodeStyle = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'inherit',
    fontSize: '18px',
    fontWeight: '900',
    textAlign: 'center',
    width: '100%',
    wordBreak: 'break-word',
  } as const;

  const customCss = `
    #dp_promotional_form input,
    #dp_promotional_form select,
    #dp_promotional_form textarea,
    #dp_promotional_form button {
      box-sizing: border-box;
      font-family: inherit;
    }

    #dp_promotional_form input::placeholder,
    #dp_promotional_form textarea::placeholder {
      color: #a8a8a8;
      font-size: 16px;
    }
  `;

  return (
    <div>
      <style>{customCss}</style>
      <section
        style={{
          display: 'block',
          padding: '5px',
          textAlign: values.cardAlign,
        }}
        role="container"
      >
        <section style={cardStyle} data-giftcode={values.discountCode}>
          <section id="dp_promotional_init" style={descriptionContainerStyle}>
            <span
              style={{ display: 'block' }}
              dangerouslySetInnerHTML={{ __html: values.descriptionHtml }}
            />
            <div id="dp_promotional_form">
              <SmartFormViewer {...formRest} />
            </div>
          </section>

          <section
            id="dp_promotional_congrats"
            style={{
              display: values.viewPanel === 'end' ? 'block' : 'none',
            }}
          >
            <span
              style={{ display: 'block' }}
              dangerouslySetInnerHTML={{ __html: values.congratsHtml }}
            />

            <div
              style={{
                alignItems: 'center',
                backgroundColor: '#fff',
                border: '1px solid #D9D9D9',
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                margin: '10px 0 16px',
                padding: '10px',
              }}
            >
              <span style={discountCodeStyle}>{values.discountCode}</span>
              <i
                className="dp-promotional-copy-icon dp-click-button"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexShrink: 0,
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

            <div
              style={{
                textAlign: values.congratsButtonAlign,
              }}
            >
              <button
                type="button"
                className="dp-click-button"
                style={congratsButtonStyle}
              >
                {values.congratsButtonText}
              </button>
            </div>

            <div
              id="dp_copy_code_message"
              style={{
                alignItems: 'center',
                backgroundColor: '#eaf5f9',
                borderBottom: '1px solid #abc9f9',
                borderLeft: '4px solid #669df3',
                borderRight: '1px solid #abc9f9',
                borderTop: '1px solid #abc9f9',
                display: 'none',
                fontFamily: '"proxima-nova", Helvetica, Arial, sans-serif',
                fontSize: '15px',
                fontWeight: '100',
                margin: '10px 0 0',
                padding: '10px',
              }}
            >
              <span
                style={{
                  backgroundImage:
                    'url("https://cdn.fromdoppler.com/doppler-style-guide//static/media/de522f11257cc031e637.svg")',
                  backgroundRepeat: 'no-repeat',
                  height: '20px',
                  width: '30px',
                }}
              ></span>
              <p>{$t('_dp.promotional.congrats.copy.message')}</p>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};
