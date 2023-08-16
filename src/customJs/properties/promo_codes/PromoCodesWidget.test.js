import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { PromoCodesWidget } from './PromoCodesWidget';
import { EMPTY_SELECTION } from '../../constants';
import { requestDopplerApp } from '../../utils/dopplerAppBridge';

jest.mock('../../utils/dopplerAppBridge');

// TODO: this is a shared code, make it a common helper
function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}

describe('Promocode widget', () => {
  it('must be render no options for EMPTY_SELECTION value', async () => {
    const unlayerPropertyProps = {
      values: {
        store: EMPTY_SELECTION,
      },
    };

    prepareUnlayerGlobalObject();
    render(<PromoCodesWidget {...unlayerPropertyProps} />);

    const container = await screen.findByRole('container');
    expect(container).toBeDefined();

    const radioInput = screen.queryByText('promoCodeRadioInput');
    expect(radioInput).toBeNull();
  });

  const unlayerPropertyProps = {
    value: 'promoCodeTest',
    values: {
      store: 'mercadoshops',
      promo_code: 'promoCodeTest',
    },
  };

  it('must be render options by a radio button input for MercadoShop value', async () => {
    requestDopplerApp.mockImplementation((params) => {
      params.callback([
        {
          code: 'abc-1',
          type: 'money',
          value: 1000,
        },
      ]);
      const destructor = () => {};
      return destructor;
    });

    prepareUnlayerGlobalObject();
    render(<PromoCodesWidget {...unlayerPropertyProps} />);

    const container = await screen.findByRole('container');
    expect(container).toBeDefined();

    const labelSpan = screen.queryByText('1000');
    expect(labelSpan).toBeDefined;

    const labelCodeSpan = await screen.findAllByText('abc-1');
    expect(labelCodeSpan).toHaveLength(1);

    const radioInput = await screen.findByRole('radio');
    expect(radioInput).toBeDefined();
    expect(radioInput.checked).toEqual(false);
  });

  it('must be render 2 options by a radio button input for MercadoShop value', async () => {
    requestDopplerApp.mockImplementation((params) => {
      params.callback([
        {
          code: 'abc-1',
          type: 'money',
          value: 1000,
        },
        {
          code: 'abc-2',
          type: 'money',
          value: 1000,
        },
      ]);
      const destructor = () => {};
      return destructor;
    });

    prepareUnlayerGlobalObject();
    render(<PromoCodesWidget {...unlayerPropertyProps} />);

    const radioInput = await screen.findAllByRole('radio');
    expect(radioInput).toHaveLength(2);
  });

  it('must be render promo code type money with $ at the begin', async () => {
    requestDopplerApp.mockImplementation((params) => {
      params.callback([
        {
          code: 'abc-1',
          type: 'money',
          value: 1000,
        },
      ]);
      const destructor = () => {};
      return destructor;
    });

    prepareUnlayerGlobalObject();
    render(<PromoCodesWidget {...unlayerPropertyProps} />);

    const labelSpan = await screen.findByText('$1000');
    expect(labelSpan).toBeDefined();
  });

  it('must be render promo code type percen with % at the end', async () => {
    requestDopplerApp.mockImplementation((params) => {
      params.callback([
        {
          code: 'abc-1',
          type: 'percen',
          value: 100,
        },
      ]);
      const destructor = () => {};
      return destructor;
    });

    prepareUnlayerGlobalObject();
    render(<PromoCodesWidget {...unlayerPropertyProps} />);

    const labelSpan = await screen.findByText('100%');
    expect(labelSpan).toBeDefined();
  });

  it('must be render promo code checked', async () => {
    requestDopplerApp.mockImplementation((params) => {
      params.callback([
        {
          code: 'promoCodeTest',
          type: 'percen',
          value: 100,
          useLimit: 1,
          minPaymentAmount: 1,
        },
      ]);
      const destructor = () => {};
      return destructor;
    });

    prepareUnlayerGlobalObject();
    render(<PromoCodesWidget {...unlayerPropertyProps} />);

    const radioInput = await screen.findByRole('radio');
    expect(radioInput.checked).toEqual(true);
  });
});
