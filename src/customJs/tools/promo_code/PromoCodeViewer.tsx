import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { PromoCodeValues } from './PromoCodeValues';

export const PromoCodeViewer: ViewerComponent<PromoCodeValues> = ({
  values,
}) => (
  <code>
    <pre>{JSON.stringify(values, undefined, 2)}</pre>
  </code>
);
