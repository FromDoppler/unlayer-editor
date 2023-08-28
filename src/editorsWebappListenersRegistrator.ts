import { timeout } from './customJs/utils/promises';

const UNLAYER_ORIGIN = 'https://editor.unlayer.com';

// DUMMY DATA

const promoCodesDummyValues = {
  MercadoShops: [
    {
      code: 'abc-1',
      type: 'money',
      value: 1000,
      useLimit: 1,
      minPaymentAmount: 1,
    },
    {
      code: 'cde-2',
      type: 'money',
      value: 1500,
      useLimit: 1,
      minPaymentAmount: 1,
    },
    {
      code: 'efg-3',
      type: 'percen',
      value: 15,
      useLimit: 1,
      minPaymentAmount: 1,
    },
  ],
};

// END DUMMY DATA

const registerListener = <TParameters, TResult>(
  listenedAction: string,
  workerFunction: (parameters: TParameters) => Promise<TResult>,
) => {
  const listener = async ({
    origin,
    data,
  }: MessageEvent<{ action: string; requestId: number } & TParameters>) => {
    if (origin !== UNLAYER_ORIGIN) {
      return;
    }

    if (data.action !== listenedAction) {
      return;
    }

    const result = await workerFunction(data);

    window.frames[0].postMessage(
      {
        isResponse: true,
        requestId: data.requestId,
        value: result,
      },
      { targetOrigin: '*' },
    );
  };

  window.addEventListener('message', listener);
};

export const registerListeners = () => {
  registerListener('getPromoCodes', async ({ store }: { store: string }) => {
    await timeout(1000);
    return store.toLocaleLowerCase() === 'mercadoshops'
      ? promoCodesDummyValues.MercadoShops
      : [];
  });

  registerListener('searchProduct', async () => {
    alert('Product Gallery');
    return {
      productUrl: 'https://www.google.com',
      imageUrl: 'https://webappint.fromdoppler.net/images/login-en.png',
      title: 'Product!',
      defaultPriceText: '$50.00',
      discountPriceText: '$40.00',
      discountText: '20%',
      descriptionHtml: '<p>The <b>best</b> product!<p>',
    };
  });
};
