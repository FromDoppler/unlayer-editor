import { React } from '../../../unlayer-react';

export const ProductLayoutViewer03 = ({ values }: { values: any }) => {
  const headerSectionStyle = {
    display: values.title.style.display,
    with: '100%',
  };

  return (
    <div>
      <section style={headerSectionStyle} data-testid="title-container">
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
        <span style={values.discount.style}>{values.discount.value}</span>
        <span style={values.prices.style} data-testid="prices-container">
          <span style={values.prices.default.style}>
            {values.prices.default.value}
          </span>
          <span style={values.prices.discount.style}>
            {values.prices.discount.value}
          </span>
        </span>

        <a
          style={values.button.style}
          role="link"
          href={values.button.href}
          target="_blank"
          rel="noreferrer"
        >
          {values.button.value}
        </a>
      </section>
    </div>
  );
};
