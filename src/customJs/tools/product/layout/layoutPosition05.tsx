import { React } from '../../../unlayer-react';

export const ProductLayoutViewer05 = ({ values }: { values: any }) => {
  const titleSectionStyle = {
    display: values.title.style.display,
    with: '100%',
    marginTop: '10px',
  };

  const footerStyle = {
    margin: '15px 0 -5px',
    borderTop: '1px solid rgba(0,0,0,.125)',
  };

  const isButtonHide = values.button.style.display === 'none';
  const isPricesHide = values.prices.style.display === 'none';

  const isButtonOrPricesHide = isButtonHide || isPricesHide;

  const footerChildPricesStyle = {
    display: isPricesHide ? 'none' : 'inline-block',
    width: isButtonOrPricesHide ? '100%' : '50%',
    textAlign: 'center',
  } as const;

  const footerChildButtonStyle = {
    display: isButtonHide ? 'none' : 'inline-block',
    width: isPricesHide ? '100%' : '50%',
    textAlign: 'center',
  } as const;

  const priceStyleOverwrite = {
    ...values.prices.style,
    display: values.button.style.display === 'none' ? 'inline-block' : 'block',
    margin: '0',
  };

  const buttonStyleOverwrite = {
    ...values.button.style,
    marginTop: '0',
    borderRadius: '0px',
  };

  const pricesDefaultStyleOverwrite = {
    ...values.prices.default.style,
    display:
      values.prices.discount.style.display === 'block' &&
      values.prices.default.style.display === 'block' &&
      isButtonHide
        ? 'inline-block'
        : values.prices.default.style.display,
  };

  const pricesDiscountStyleOverwrite = {
    ...values.prices.discount.style,
    display:
      values.prices.discount.style.display === 'block' &&
      values.prices.default.style.display === 'block' &&
      isButtonHide
        ? 'inline-block'
        : values.prices.discount.style.display,
  };

  return (
    <div>
      <section style={titleSectionStyle} data-testid="title-container">
        <span style={values.title.style}>{values.title.value}</span>
      </section>

      <section style={values.section.image.style} data-testid="image-container">
        <img
          style={values.image.style}
          src={values.image.value}
          alt="product image"
        />
      </section>
      <section
        style={values.section.description.style}
        data-testid="description-container"
      >
        <span
          style={values.description.style}
          dangerouslySetInnerHTML={{ __html: values.description.value }}
        />
        <span
          style={values.info.style}
          dangerouslySetInnerHTML={{ __html: values.info.value }}
        />
        <span style={values.discount.style}>{values.discount.value}</span>
      </section>
      <section style={footerStyle} data-testid="footer-container">
        <div style={footerChildPricesStyle}>
          <span style={priceStyleOverwrite} data-testid="prices-container">
            <span style={pricesDefaultStyleOverwrite}>
              {values.prices.default.value}
            </span>
            <span style={pricesDiscountStyleOverwrite}>
              {values.prices.discount.value}
            </span>
          </span>
        </div>
        <div style={footerChildButtonStyle}>
          <a
            style={buttonStyleOverwrite}
            role="link"
            href={values.button.href}
            target="_blank"
            rel="noreferrer"
          >
            {values.button.value}
          </a>
        </div>
      </section>
    </div>
  );
};
