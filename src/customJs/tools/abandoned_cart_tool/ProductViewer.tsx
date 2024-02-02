import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { ASSETS_BASE_URL } from '../../constants';
import { ProductValues } from './types';

export const ProductViewer: ViewerComponent<ProductValues> = ({ values }) => {
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

  const image = `${ASSETS_BASE_URL}/cart_v3.svg`;

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
  } as const;

  const titleStyle = {
    display: values.titleShown ? 'block' : 'none',
    fontSize: values.titleFontSize || '24px',
    fontFamily: values.titleFont?.value || 'inherit',
    fontWeight: values.titleFontWeight,
    color: values.titleColor,
  };

  const pricesStyle = {
    display: values.priceShown ? 'block' : 'none',
    fontFamily: values.priceFont?.value || 'inherit',
    fontWeight: values.priceFontWeight,
    fontSize: values.priceFontSize,
    marginTop: '15px',
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
    marginTop: '15px',
    minHeight: '20px',
    padding: '13px 0px',
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
      href: '[[[DC:URL]]]',
      style: buttonStyle,
    },
  };

  const arrayStructure = new Array([1, 1, 2, 3][values.structure]).fill('item');

  return (
    <div>
      {arrayStructure.map((_, i) => (
        <div style={containerStyle} role="container" key={i}>
          <section
            style={productToolElement.section.image.style}
            data-testid="image-container"
          >
            <a
              role="link"
              href={productToolElement.button.href}
              target="_blank"
              rel="noreferrer"
            >
              <img
                style={imageStyle}
                src={productToolElement.image.value}
                alt="product image"
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
            <span style={productToolElement.price.style}>
              {productToolElement.price.value}
            </span>
            <a
              style={productToolElement.button.style}
              role="link"
              href={productToolElement.button.href}
              target="_blank"
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
