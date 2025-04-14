import { React } from '../../../unlayer-react';

export const ProductLayoutViewer02 = ({ values }: { values: any }) => {
  const footerSectionStyle = {
    display: values.button.style.display,
  };

  return (
    <div>
      <section
        style={values.section.description.style}
        data-testid="description-container"
      >
        <span
          style={values.title.style}
          dangerouslySetInnerHTML={{ __html: values.title.value }}
          {...(values.title.isDynamic && { 'data-dc-type': 'DC:TITLE' })}
        />
        <span
          style={values.description.style}
          dangerouslySetInnerHTML={{ __html: values.description.value }}
          {...(values.description.isDynamic && {
            'data-dc-type': 'DC:DESCRIPTION',
          })}
        />
        <span
          style={values.info.style}
          dangerouslySetInnerHTML={{ __html: values.info.value }}
          {...(values.info.isDynamic && { 'data-dc-type': 'DC:INFO' })}
        />
        <span style={values.prices.style} data-testid="prices-container">
          <span
            style={values.prices.default.style}
            dangerouslySetInnerHTML={{ __html: values.prices.default.value }}
            {...(values.prices.default.isDynamic && {
              'data-dc-type': 'DC:PRICES_DEFAULT',
            })}
          />
          <span
            style={values.prices.discount.style}
            dangerouslySetInnerHTML={{ __html: values.prices.discount.value }}
            {...(values.prices.discount.isDynamic && {
              'data-dc-type': 'DC:PRICES_DISCOUNT',
            })}
          />
        </span>
        <span
          style={values.discount.style}
          {...(values.discount.isDynamic && { 'data-dc-type': 'DC:DISCOUNT' })}
        >
          {values.discount.value}
        </span>
      </section>
      <section style={values.section.image.style} data-testid="image-container">
        <img
          style={values.image.style}
          src={values.image.value}
          alt="Product image"
          {...(values.image.isDynamic && { 'data-dc-type': 'DC:IMAGE' })}
        />
      </section>
      <section style={footerSectionStyle}>
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
