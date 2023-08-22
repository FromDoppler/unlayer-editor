import { React } from '../../unlayer-react';
import { ViewerComponent } from '../../types';
import { ProductValues } from './types';

export const ProductViewer: ViewerComponent<ProductValues> = ({ values }) => {
  return (
    <code>
      <pre>{JSON.stringify(values, undefined, 2)}</pre>
    </code>
  );
};
