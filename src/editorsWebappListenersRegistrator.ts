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
      imageUrl:
        'https://s3.amazonaws.com/unroll-images-production/projects%2F6553%2F1604576441796-339575',
      title: 'Product!',
      defaultPriceText: '$ 50.00',
      discountPriceText: '$ 1.00',
      discountText: '20%',
      descriptionHtml:
        '<p style="font-size: 20px;font-family: "Lobster Two;"> <b>Lorem ipsum dolor</b> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>',
    };
  });
};
