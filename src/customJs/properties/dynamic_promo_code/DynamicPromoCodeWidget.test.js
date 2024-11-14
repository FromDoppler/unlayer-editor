import { React } from '../../unlayer-react';
import { render, screen } from '@testing-library/react';
import { DynamicPromoCodeWidget } from './DynamicPromoCodeWidget';

import { requestDopplerApp } from '../../utils/dopplerAppBridge';
import { setLocale } from '../../localization';

// Required to initialize intl
setLocale('es-ES');

jest.mock('../../utils/dopplerAppBridge');
jest.useFakeTimers();

// TODO: this is a shared code, make it a common helper
function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}

describe('Dynamic Promocode widget', () => {
  it('shoud call request and update the Id value ', async () => {
    let unlayerPropertyProps = {
      values: 'id',
      updateValue: jest.fn(),
      values: {
        type: 'percent',
        amount: '10',
        expire_days: '10',
        min_price: '10',
        prefixe_code: '',
        includes_shipping: false,
        first_consumer_purchase: false,
        combines_with_other_discounts: false,
      },
    };

    requestDopplerApp.mockImplementation((params) => {
      params.callback({
        promoCodeId: 2024,
      });
    });

    prepareUnlayerGlobalObject();
    render(<DynamicPromoCodeWidget {...unlayerPropertyProps} />);
    // valid wait rebounce
    expect(requestDopplerApp).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2000);
    // valid after rebounce time call the request
    expect(requestDopplerApp).toHaveBeenCalled();
    expect(unlayerPropertyProps.updateValue).toHaveBeenCalledTimes(1);

    render(<DynamicPromoCodeWidget {...unlayerPropertyProps} />);

    // valid wait rebounce 2nd time
    expect(unlayerPropertyProps.updateValue).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(2000);

    // valid after rebounce time call the request 2nd time
    expect(unlayerPropertyProps.updateValue).toHaveBeenCalledTimes(2);

    // valid without update no request
    jest.advanceTimersByTime(2000);
    expect(unlayerPropertyProps.updateValue).toHaveBeenCalledTimes(2);

    // valid update value with string
    expect(unlayerPropertyProps.updateValue).not.toHaveBeenCalledWith(2024);

    // valid update value with right data
    expect(unlayerPropertyProps.updateValue).toHaveBeenCalledWith('2024');
  });
});
