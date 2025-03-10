import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { ProductValues } from './types';
import { $t } from '../../localization';

export const ProductViewer: ViewerComponent<ProductValues> = ({
  values,
  ...rest
}) => {
  const isRecommended =
    rest.toolInfo.name === 'dynamic_recommended' ||
    rest.toolInfo.name === 'dynamic_recommended_product';
  const mainContainerStyle = {
    textAlign: isRecommended ? 'center' : 'left',
  } as const;
  const containerStyle = {
    display: isRecommended ? 'inline-block' : 'block',
    backgroundColor: values.backgroundColor,
    padding: '5px',
    margin: isRecommended ? '0px' : '10px',
    width: isRecommended ? 90 / values.structure + '%' : '100%',
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

  const image = rest.toolInfo.icon;

  const imageSectionStyle = {
    width: imageSectionWidth,
    display: values.imageShown ? sectionDisplay : 'none',
    marginRight: `${values.layout === '00_horizontal' ? 5 : 0}%`,
    verticalAlign: 'top',
  };

  const imageStyle = {
    width:
      (values.imageAutoWith?.autoWidth
        ? '100%'
        : values.imageAutoWith?.width) || '100%',
    objectFit: 'contain',
    height: 'auto',
    padding: '5px',
    minHeight: isRecommended ? '150px' : '50px',
    maxHeight: isRecommended ? '150px' : '100%',
  } as const;

  const titlRecommendedStyle = isRecommended
    ? { height: '50px', overflow: 'hidden' }
    : {};

  const titleStyle = {
    ...titlRecommendedStyle,
    display: values.titleShown ? 'block' : 'none',
    textAlign: values.titleAlignment || 'inherit',
    fontSize: values.titleFontSize || '24px',
    fontFamily: values.titleFont?.value || 'inherit',
    fontWeight: values.titleFontWeight,
    color: values.titleColor,
  };

  const infoStyle = {
    display: values.infoShown ? 'block' : 'none',
    textAlign: values.infoAlignment || 'inherit',
    fontSize: values.infoFontSize || '16px',
    fontFamily: values.infoFont?.value || 'inherit',
    fontWeight: values.infoFontWeight,
    color: values.infoColor,
    margin: values.infoMargin,
  };

  const quantityStyle = {
    display: values.quantityShown ? 'block' : 'none',
    textAlign: values.quantityAlignment || 'inherit',
    fontSize: values.quantityFontSize || '18px',
    fontFamily: values.quantityFont?.value || 'inherit',
    fontWeight: values.quantityFontWeight,
    color: values.quantityColor,
    margin: values.quantityMargin,
  };

  const pricesStyle = {
    display: values.priceShown ? 'block' : 'none',
    textAlign: values.priceAlignment || 'inherit',
    fontFamily: values.priceFont?.value || 'inherit',
    fontWeight: values.priceFontWeight,
    fontSize: values.priceFontSize,
    margin: values.priceMargin,
    color: values.priceColor,
  } as const;

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
      value: '[[[DC:TITLE]]]',
      style: titleStyle,
    },
    quantity: {
      value: ` ${$t('_dp.quantity')}: [[[DC:QUANTITY]]]`,
      style: quantityStyle,
    },
    image: {
      dynamic_value: '[[[DC:IMAGE]]]',
      value: image,
      style: imageStyle,
    },
    price: {
      value: '[[[DC:PRICE]]]',
      style: pricesStyle,
    },
    button: {
      value: values.buttonText,
      target: values.buttonTarget || '_blank',
      href: '[[[DC:URL]]]',
      style: buttonStyle,
    },
    info: {
      value: '[[[DC:INFO]]]',
      style: infoStyle,
    },
  };

  const arrayStructure = new Array([1, 1, 2, 3, 4][values.structure]).fill(
    'item',
  );

  return (
    <div style={mainContainerStyle}>
      {arrayStructure.map((_, i) => (
        <div style={containerStyle} role="container" key={i}>
          <section
            style={productToolElement.section.image.style}
            data-testid="image-container"
          >
            <a
              role="link"
              href={productToolElement.button.href}
              target={productToolElement.button.target}
              rel="noreferrer"
            >
              <img
                style={imageStyle}
                src={productToolElement.image.value}
                alt="abandoned cart image"
              />
            </a>
          </section>
          <section
            style={productToolElement.section.description.style}
            data-testid="description-container"
          >
            <span style={productToolElement.title.style}>
              {productToolElement.title.value}
            </span>
            <span style={productToolElement.quantity.style}>
              {productToolElement.quantity.value}
            </span>
            <span style={productToolElement.price.style}>
              {productToolElement.price.value}
            </span>
            <span style={productToolElement.info.style}>
              {productToolElement.info.value}
            </span>
            <a
              style={productToolElement.button.style}
              role="link"
              href={productToolElement.button.href}
              target={productToolElement.button.target}
              rel="noreferrer"
            >
              {productToolElement.button.value}
            </a>
          </section>
        </div>
      ))}
    </div>
  );
};
