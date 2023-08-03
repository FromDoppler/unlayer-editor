import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { PromoCodeViewer } from './PromoCodeViewer';
import { EMPTY_SELECTION } from '../../constants';

describe(PromoCodeViewer.name, () => {
  const rest = {
    isViewer: true,
    toolInfo: {
      icon: 'toolIconPath',
      label: 'toolLabel',
      name: 'toolName',
    },
  };

  it('should render the empty content when promotion code is not selected', async () => {
    const values = {
      promo_code: EMPTY_SELECTION,
    };

    render(<PromoCodeViewer values={values} {...rest} />);
    const span = await screen.findByText(rest.toolInfo.label);
    expect(span).toBeDefined();

    const img = await screen.findByAltText(rest.toolInfo.name);
    expect(img).toBeDefined();
  });

  it('should not render the empty content when any promotion code is selected', async () => {
    const values = {
      promo_code: 'PROMO CODE 1',
    };

    render(<PromoCodeViewer values={values} {...rest} />);

    const labelSpan = screen.queryByText(rest.toolInfo.label);
    expect(labelSpan).toBeNull();

    const img = screen.queryByText(rest.toolInfo.name);
    expect(img).toBeNull();
  });
});
