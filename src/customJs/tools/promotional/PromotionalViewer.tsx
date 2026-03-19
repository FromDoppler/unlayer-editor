import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { PromotionalValues } from './types';

const PROMOTIONAL_BADGE_STYLES = {
  backgroundColor: '#1F2937',
  color: '#FFFFFF',
  borderRadius: '999px',
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.04em',
  marginBottom: '12px',
  padding: '6px 10px',
  textTransform: 'uppercase',
} as const;

export const PromotionalViewer: ViewerComponent<PromotionalValues> = ({
  values,
}) => {
  const cardStyle = {
    backgroundColor: values.cardBackgroundColor,
    borderColor: `${values.cardBorder.borderTopColor} ${values.cardBorder.borderRightColor} ${values.cardBorder.borderBottomColor} ${values.cardBorder.borderLeftColor}`,
    borderRadius: values.cardBorderRadius,
    borderStyle: `${values.cardBorder.borderTopStyle} ${values.cardBorder.borderRightStyle} ${values.cardBorder.borderBottomStyle} ${values.cardBorder.borderLeftStyle}`,
    borderWidth: `${values.cardBorder.borderTopWidth} ${values.cardBorder.borderRightWidth} ${values.cardBorder.borderBottomWidth} ${values.cardBorder.borderLeftWidth}`,
    boxSizing: 'border-box',
    display: 'inline-block',
    padding: values.cardPadding,
    textAlign: 'left',
    width: values.cardWidth.autoWidth ? '100%' : values.cardWidth.width,
  } as const;

  const buttonStyle = {
    backgroundColor: values.buttonBackgroundColor,
    borderColor: `${values.buttonBorder.borderTopColor} ${values.buttonBorder.borderRightColor} ${values.buttonBorder.borderBottomColor} ${values.buttonBorder.borderLeftColor}`,
    borderRadius: values.buttonBorderRadius,
    borderStyle: `${values.buttonBorder.borderTopStyle} ${values.buttonBorder.borderRightStyle} ${values.buttonBorder.borderBottomStyle} ${values.buttonBorder.borderLeftStyle}`,
    borderWidth: `${values.buttonBorder.borderTopWidth} ${values.buttonBorder.borderRightWidth} ${values.buttonBorder.borderBottomWidth} ${values.buttonBorder.borderLeftWidth}`,
    boxSizing: 'border-box',
    color: values.buttonColor,
    display: 'inline-block',
    fontSize: values.buttonFontSize,
    fontWeight: values.buttonFontWeight,
    margin: values.buttonMargin,
    padding: values.buttonPadding,
    textAlign: 'center',
    textDecoration: 'none',
    width: values.buttonWidth.autoWidth ? 'auto' : values.buttonWidth.width,
  } as const;

  return (
    <div>
      <section
        style={{
          display: 'block',
          padding: '5px',
          textAlign: values.cardAlign,
        }}
        role="container"
      >
        <section style={cardStyle}>
          {values.badgeText ? (
            <span style={PROMOTIONAL_BADGE_STYLES}>{values.badgeText}</span>
          ) : null}

          <h2
            style={{
              color: values.titleColor,
              fontSize: values.titleFontSize,
              fontWeight: values.titleFontWeight,
              lineHeight: '1.2',
              margin: '0 0 12px',
            }}
          >
            {values.titleText}
          </h2>

          <div
            style={{
              color: values.descriptionColor,
              fontSize: values.descriptionFontSize,
              lineHeight: '1.5',
              marginBottom: values.buttonText ? '20px' : '0',
            }}
            dangerouslySetInnerHTML={{ __html: values.descriptionHtml }}
          />

          {values.buttonText ? (
            <div style={{ textAlign: values.buttonAlign }}>
              <a
                href={values.buttonUrl || '#'}
                rel="noreferrer"
                role="link"
                style={buttonStyle}
                target="_blank"
              >
                {values.buttonText}
              </a>
            </div>
          ) : null}
        </section>
      </section>
    </div>
  );
};
