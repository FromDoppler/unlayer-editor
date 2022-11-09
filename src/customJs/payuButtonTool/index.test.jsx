import { setLocale } from '../localization';
import { PayuButtonTool } from './PayuButtonTool';
import * as React from 'react';
import { render, screen } from '@testing-library/react';

describe(PayuButtonTool.name, () => {
  it.each([
    {
      expectedImageUrl:
        'https://cdn.fromdoppler.com/unlayer-editor/assets/payu-button-small-es.png',
      size: 'small',
      lang: 'es-ES',
      align: 'left',
    },
    {
      expectedImageUrl:
        'https://cdn.fromdoppler.com/unlayer-editor/assets/payu-button-medium-es.png',
      size: 'medium',
      lang: 'es-ES',
      align: 'center',
    },
    {
      expectedImageUrl:
        'https://cdn.fromdoppler.com/unlayer-editor/assets/payu-button-large-es.png',
      size: 'large',
      lang: 'es-ES',
      align: 'right',
    },
    {
      expectedImageUrl:
        'https://cdn.fromdoppler.com/unlayer-editor/assets/payu-button-small-en.png',
      size: 'small',
      lang: 'en-US',
      align: 'left',
    },
    {
      expectedImageUrl:
        'https://cdn.fromdoppler.com/unlayer-editor/assets/payu-button-medium-en.png',
      size: 'medium',
      lang: 'en-US',
      align: 'center',
    },
    {
      expectedImageUrl:
        'https://cdn.fromdoppler.com/unlayer-editor/assets/payu-button-large-en.png',
      size: 'large',
      lang: 'en-US',
      align: 'right',
    },
  ])(
    'must be render with $size size and language $lang',
    ({ expectedImageUrl, size, lang, align }) => {
      prepareUnlayerGlobalObject();
      setLocale(lang);

      const arbitraryLink = `https://test.com/#`;
      const values = {
        size,
        paymentURL: arbitraryLink,
        alignment: align,
      };
      render(<PayuButtonTool values={values} />);
      const payuImage = screen.getByAltText('payu_button');

      expect(screen.getByRole('container').align).toEqual(align);
      expect(screen.getByRole('link').href).toEqual(arbitraryLink);
      expect(payuImage.src).toEqual(expectedImageUrl);
    },
  );
});

// TODO: this is a shared code, make it a common helper
function prepareUnlayerGlobalObject() {
  window.unlayer = {
    setLocale: jest.fn(),
    setTranslations: jest.fn(),
  };
  return window.unlayer;
}
