import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { PromoCodeValues } from './PromoCodeValues';
import { EmptyViewer } from '../../components/EmptyViewer';
import { EMPTY_SELECTION } from '../../constants';

export const PromoCodeViewer: ViewerComponent<PromoCodeValues> = ({
  values,
  ...rest
}) => {
  return values.promo_code === EMPTY_SELECTION ? (
    <EmptyViewer {...rest} />
  ) : (
    <code>
      <pre>{JSON.stringify(values, undefined, 2)}</pre>
    </code>
  );
};
