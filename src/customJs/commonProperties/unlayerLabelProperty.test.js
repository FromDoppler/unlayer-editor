import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { UnlayerLabelProperty } from './unlayerLabelProperty';

describe(UnlayerLabelProperty.name, () => {
  it('must be render the label text', async () => {
    const labelText = 'unlayer label text';
    render(<UnlayerLabelProperty label={labelText} />);

    const renderedProperties = await screen.findAllByText(labelText);
    expect(renderedProperties).toHaveLength(1);
  });
});
