import { React } from '../unlayer-react';
import { render, screen } from '@testing-library/react';
import { UnlayerLabel } from './UnlayerLabel';

describe(UnlayerLabel.name, () => {
  it('must be render the label text', async () => {
    const labelText = 'unlayer label text';
    render(<UnlayerLabel label={labelText} />);

    const renderedProperties = await screen.findAllByText(labelText);
    expect(renderedProperties).toHaveLength(1);
  });
});
