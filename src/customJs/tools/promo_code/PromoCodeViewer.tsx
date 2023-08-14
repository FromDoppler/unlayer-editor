import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { PromoCodeValues } from './types';
import { EmptyViewer } from '../../components/EmptyViewer';
import { EMPTY_SELECTION } from '../../constants';

export const PromoCodeViewer: ViewerComponent<PromoCodeValues> = ({
  values,
  ...rest
}) => {
  return values.promo_code === EMPTY_SELECTION ? (
    <EmptyViewer {...rest} />
  ) : (
    <div
      style={{
        textAlign: values.alignment,
        backgroundColor: values.backgroundColor,
      }}
      role="container"
    >
      <span style={{ color: values.textColor, fontSize: values.fontSize }}>
        {values.promo_code}
      </span>
    </div>
  );
};
