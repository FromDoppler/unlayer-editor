import { React } from '../../../unlayer-react';

export const ProductLayoutViewer01 = ({ values }: { values: any }) => {
  return (
    <div>
      <section style={values.section.image.style} data-testid="image-container">
        <img
          style={values.image.style}
          src={values.image.value}
          alt="product image"
          {...(values.image.isDynamic && { 'data-dc-type': 'DC:IMAGE' })}
        />
      </section>
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
          dangerouslySetInnerHTML={{ __html: values.info.value ?? '' }}
          {...(values.info.isDynamic && { 'data-dc-type': 'DC:INFO' })}
        />
        <span style={values.prices.style} data-testid="prices-container">
          <span
            style={values.prices.default.style}
            dangerouslySetInnerHTML={{ __html: values.prices.default.value }}
            {...(values.prices.default.isDynamic && {
              'data-dc-type': 'DC:PRICE',
            })}
          />
          <span
            style={values.prices.discount.style}
            dangerouslySetInnerHTML={{ __html: values.prices.discount.value }}
            {...(values.prices.discount.isDynamic && {
              'data-dc-type': 'DC:PRICE_DISCOUNT',
            })}
          />
        </span>
        <span
          style={values.discount.style}
          {...(values.discount.isDynamic && { 'data-dc-type': 'DC:DISCOUNT' })}
        >
          {values.discount.value}
        </span>
        <a
          style={values.button.style}
          role="link"
          href={values.product.url.value}
          target="_blank"
          rel="noreferrer"
          {...(values.product.url.isDynamic && { 'data-dc-type': 'DC:URL' })}
        >
          {values.button.value}
        </a>
      </section>
    </div>
  );
};
