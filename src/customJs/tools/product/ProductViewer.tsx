import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { ProductValues } from './types';
import { ASSETS_BASE_URL } from '../../constants';

export const ProductViewer: ViewerComponent<ProductValues> = ({ values }) => {
  /* TODO: refact style in case to add more layout */
  const containerStyle = {
    display: 'flex',
    flexDirection: values.layout === '00_horizontal' ? 'row' : 'column',
    backgroundColor: values.backgroundColor,
    padding: '5px',
  } as const;

  const imageSectionWidth = `${values.layout === '00_horizontal' ? 40 : 100}%`;
  const descriptionSectionWidth = `${
    values.imageShown && values.layout === '00_horizontal' ? 60 : 100
  }%`;

  const descriptionSectionStyle = {
    width: descriptionSectionWidth,
  };

  const imageSectionStyle = {
    width: imageSectionWidth,
    display: values.imageShown ? 'flex' : 'none',
    justifyContent: 'center',
  };

  const imageStyle = {
    width: values.image?.maxWidth || '100%',
    objectFit: 'contain',
    height: 'auto',
    padding: '5px',
  } as const;

  const titleStyle = {
    display: values.titleShown ? 'flex' : 'none',
    fontSize: values.titleFontSize || '24px',
    fontFamily: values.titleFont?.value || 'inherit',
    fontWeight: values.titleFontWeight,
    color: values.titleColor,
  };

  const descriptionStyle = {
    display: values.descriptionShown ? 'block' : 'none',
    fontFamily: values.descriptionFont?.value || 'inherit',
    fontSize: values.descriptionFontSize,
  };

  const pricesStyle = {
    display: values.pricesShown ? 'flex' : 'none',
    fontFamily: values.pricesFont?.value || 'inherit',
    fontWeight: values.pricesFontWeight,
    marginTop: '15px',
    flexDirection: 'column',
  } as const;

  const priceDefaultStyle = {
    display: values.pricesDefaultPriceShown ? 'flex' : 'none',
    textDecoration: values.pricesDiscountPriceShown ? 'line-through' : 'none',
    marginRight: '20px',
    fontSize: values.pricesDefaultPriceFontSize,
    color: values.pricesDefaultPriceColor,
  };

  const priceDiscountStyle = {
    display: values.pricesDiscountPriceShown ? 'flex' : 'none',
    fontSize: values.pricesDiscountPriceFontSize,
    color: values.pricesDiscountPriceColor,
  };

  const discountStyle = {
    display: values.discountShown ? 'flex' : 'none',
    fontWeight: values.discountFontWeight,
    fontFamily: values.discountFont?.value || 'inherit',
    fontSize: values.discountFontSize,
    color: values.discountColor,
  };

  const buttonStyle = {
    display: values.buttonShown ? 'flex' : 'none',
    justifyContent: 'center',
    fontSize: values.buttonFontSize || '14px',
    fontFamily: values.buttonFont?.value || 'inherit',
    fontWeight: values.buttonFontWeight,
    color: values.buttonColors?.color || 'inherit',
    backgroundColor: values.buttonColors?.backgroundColor || 'inherit',
    textDecoration: 'none',
    borderStyle: `${values.buttonBorder?.borderTopStyle} ${values.buttonBorder?.borderRightStyle} ${values.buttonBorder?.borderBottomStyle} ${values.buttonBorder?.borderLeftStyle}`,
    borderColor: `${values.buttonBorder?.borderTopColor} ${values.buttonBorder?.borderRightColor} ${values.buttonBorder?.borderBottomColor} ${values.buttonBorder?.borderLeftColor}`,
    borderWidth: `${values.buttonBorder?.borderTopWidth} ${values.buttonBorder?.borderRightWidth} ${values.buttonBorder?.borderBottomWidth} ${values.buttonBorder?.borderLeftWidth}`, //9px 4px 3px 2px,
    borderRadius: values.buttonBorderRadius,
    width: values.buttonAutoWith?.autoWidth
      ? '100%'
      : values.buttonAutoWith?.width,
    marginTop: '15px',
    minHeight: '47px',
    padding: '13px 20px',
    lineHeight: '20px',
  };

  const image =
    values.image?.url || `${ASSETS_BASE_URL}/product_transparent.svg`;

  return (
    <div style={containerStyle} role="container">
      <section style={imageSectionStyle} data-testid="image-container">
        <img style={imageStyle} src={image} alt="product image" />
      </section>
      <section
        style={descriptionSectionStyle}
        data-testid="description-container"
      >
        <span style={titleStyle}>{values.titleText}</span>
        <span
          style={descriptionStyle}
          dangerouslySetInnerHTML={{ __html: values.descriptionHtml }}
        />
        <span style={pricesStyle} data-testid="prices-container">
          <span style={priceDefaultStyle}>{values.pricesDefaultPriceText}</span>
          <span style={priceDiscountStyle}>
            {values.pricesDiscountPriceText}
          </span>
        </span>
        <span style={discountStyle}>{values.discountText}</span>
        <a
          style={buttonStyle}
          role="link"
          href={values.productUrl ? values.productUrl : '#'}
          target="_blank"
          rel="noreferrer"
        >
          {values.buttonText}
        </a>
      </section>
    </div>
  );
};
