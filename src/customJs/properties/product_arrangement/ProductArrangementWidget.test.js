import { React } from '../../unlayer-react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProductArrangementWidget } from './ProductArrangementWidget';

// TODO: this is a shared code, make it a common helper
function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}

describe(ProductArrangementWidget.name, () => {
  it('must be render 5 buttons to set diferent layout', async () => {
    const unlayerPropertyProps = {};

    prepareUnlayerGlobalObject();
    render(<ProductArrangementWidget {...unlayerPropertyProps} />);

    const container = await screen.findByRole('container');
    expect(container).toBeDefined();

    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(5);

    const images = await screen.findAllByRole('img');
    expect(images).toHaveLength(5);
  });

  it('must be update productArrangement value', async () => {
    prepareUnlayerGlobalObject();
    const unlayerPropertyProps = {};
    const updateValueFn = jest.fn();

    render(
      <ProductArrangementWidget
        {...unlayerPropertyProps}
        updateValue={updateValueFn}
      />,
    );

    const buttons = await screen.findAllByRole('button');
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(updateValueFn).toHaveBeenCalled();
    });
  });
});
