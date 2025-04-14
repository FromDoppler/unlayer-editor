import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { ProductDynamicValues, ProductValues } from './types';
import { ASSETS_BASE_URL } from '../../constants';
import { ProductLayoutViewer01 } from './layout/layoutPosition01';
import { ProductLayoutViewer02 } from './layout/layoutPosition02';
import { ProductLayoutViewer03 } from './layout/layoutPosition03';
import { ProductLayoutViewer04 } from './layout/layoutPosition04';
import { ProductLayoutViewer05 } from './layout/layoutPosition05';

export const ProductViewer: ViewerComponent<
  ProductValues | ProductDynamicValues
> = ({ values }) => {
  /* TODO: refact style in case to add more layout */
  const containerStyle = {
    display: 'block',
    backgroundColor: values.backgroundColor,
    padding: '5px',
    margin: '10px',
  } as const;

  const imageSectionWidth = `${values.layout === '00_horizontal' ? 40 : 100}%`;
  const descriptionSectionWidth = `${
    values.imageShown && values.layout === '00_horizontal' ? 55 : 100
  }%`;

  const sectionDisplay: string =
    values.layout === '00_horizontal' ? 'inline-block' : 'block';
  const descriptionSectionStyle = {
    display: sectionDisplay,
    width: descriptionSectionWidth,
    verticalAlign: 'top',
  };

  const imageSectionStyle = {
    width: imageSectionWidth,
    display: values.imageShown ? sectionDisplay : 'none',
    marginRight: `${values.layout === '00_horizontal' ? 5 : 0}%`,
    verticalAlign: 'top',
  };

  const imageStyle = {
    width: values.image?.maxWidth || '100%',
    objectFit: 'contain',
    height: 'auto',
    padding: '5px',
  } as const;

  const titleStyle = {
    display: values.titleShown ? 'block' : 'none',
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
    display: values.pricesShown ? 'block' : 'none',
    fontFamily: values.pricesFont?.value || 'inherit',
    fontWeight: values.pricesFontWeight,
    marginTop: '15px',
    flexDirection: 'column',
  } as const;

  const priceDefaultStyle = {
    display: values.pricesDefaultPriceShown ? 'block' : 'none',
    textDecoration: values.pricesDiscountPriceShown ? 'line-through' : 'none',
    marginRight: '20px',
    fontSize: values.pricesDefaultPriceFontSize,
    color: values.pricesDefaultPriceColor,
  };

  const priceDiscountStyle = {
    display: values.pricesDiscountPriceShown ? 'block' : 'none',
    fontSize: values.pricesDiscountPriceFontSize,
    color: values.pricesDiscountPriceColor,
  };

  const discountStyle = {
    display: values.discountShown ? 'block' : 'none',
    fontWeight: values.discountFontWeight,
    fontFamily: values.discountFont?.value || 'inherit',
    fontSize: values.discountFontSize,
    color: values.discountColor,
  };

  const buttonStyle = {
    display: values.buttonShown ? 'block' : 'none',
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
    padding: values.buttonPadding,
    margin: values.buttonMargin,
    minHeight: '20px',
    lineHeight: '20px',
    textAlign: 'center',
  } as const;

  const infoStyle = {
    display: 'infoShown' in values && values.infoShown ? 'block' : 'none',
    fontSize: 'infoFontSize' in values ? values.infoFontSize : undefined,
    fontFamily: ('infoFont' in values && values.infoFont?.value) || 'inherit',
    fontWeight: 'infoFontWeight' in values ? values.infoFontWeight : undefined,
    color: 'infoColor' in values ? values.infoColor : undefined,
  };

  const image =
    values.image?.url || `${ASSETS_BASE_URL}/product_transparent.svg`;

  const productToolElement = {
    section: {
      image: {
        style: imageSectionStyle,
      },
      description: {
        style: descriptionSectionStyle,
      },
    },
    title: {
      value: values.titleText,
      isDynamic: values.titleIsDynamic,
      style: titleStyle,
    },
    image: {
      value: image,
      isDynamic: values.imageIsDynamic,
      style: imageStyle,
    },
    prices: {
      default: {
        value: values.pricesDefaultPriceText,
        isDynamic: values.pricesDefaultPriceIsDynamic,
        style: priceDefaultStyle,
      },
      discount: {
        value: values.pricesDiscountPriceText,
        isDynamic: values.pricesDiscountPriceIsDynamic,
        style: priceDiscountStyle,
      },
      style: pricesStyle,
    },
    discount: {
      value: values.discountText,
      isDynamic: values.discountIsDynamic,
      style: discountStyle,
    },
    description: {
      value: values.descriptionHtml,
      isDynamic: values.descriptionIsDynamic,
      style: descriptionStyle,
    },
    button: {
      value: values.buttonText,
      href: values.productUrl ? values.productUrl : '#',
      style: buttonStyle,
    },
    info: {
      value: 'infoHtml' in values ? values.infoHtml : '',
      isDynamic: 'infoIsDynamic' in values ? values.infoIsDynamic : '',
      style: infoStyle,
    },
  };

  const getLayout = () => {
    switch (values.arrangement) {
      case '01_layout':
        return <ProductLayoutViewer01 values={productToolElement} />;
      case '02_layout':
        return <ProductLayoutViewer02 values={productToolElement} />;
      case '03_layout':
        return <ProductLayoutViewer03 values={productToolElement} />;
      case '04_layout':
        return <ProductLayoutViewer04 values={productToolElement} />;
      case '05_layout':
        return <ProductLayoutViewer05 values={productToolElement} />;
      default:
        return <ProductLayoutViewer01 values={productToolElement} />;
    }
  };

  return (
    <div style={containerStyle} role="container">
      {getLayout()}
    </div>
  );
};
