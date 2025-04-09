import { React } from '../../../unlayer-react';

export const ProductLayoutViewer01 = ({ values }: { values: any }) => {
  return (
    <div>
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
        <span style={values.title.style}>{values.title.value}</span>
        <span
          style={values.description.style}
          dangerouslySetInnerHTML={{ __html: values.description.value }}
        />
        <span style={values.prices.style} data-testid="prices-container">
          <span style={values.prices.default.style}>
            {values.prices.default.value}
          </span>
          <span style={values.prices.discount.style}>
            {values.prices.discount.value}
          </span>
        </span>
        <span style={values.discount.style}>{values.discount.value}</span>

        <span
          dc-data-type="DC:INFO"
          style={values.info.style}
          dangerouslySetInnerHTML={{ __html: values.info.value }}
        />

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
