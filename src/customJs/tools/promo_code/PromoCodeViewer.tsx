import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { PromoCodeValues } from './types';
import { EmptyViewer } from '../../components/EmptyViewer';
import { EMPTY_SELECTION } from '../../constants';

export const PromoCodeViewer: ViewerComponent<PromoCodeValues> = ({
  values,
  ...rest
}) => {
  const promoCodeValue = values.isDynamic
    ? '[[[DC:COUPON_CODE]]]'
    : values.code;
  return !values.isDynamic && values.code === EMPTY_SELECTION ? (
    <EmptyViewer {...rest} />
  ) : (
    <div>
      <section
        style={{
          display: 'block',
          padding: '5px',
          textAlign: values.alignment,
          backgroundColor: values.backgroundColor,
        }}
        role="container"
      >
        <span
          style={{
            color: values.textColor,
            fontSize: values.fontSize,
            width: '100%',
          }}
        >
          {promoCodeValue}
        </span>
      </section>
    </div>
  );
};
