import { DynamicPromoCodeDependentToolValues } from './customJs/properties/dynamic_promo_code/types';
import { timeout } from './customJs/utils/promises';

const UNLAYER_ORIGIN = 'https://editor.unlayer.com';

// DUMMY DATA

const subscriptionListDummyValues = [
  {
    listId: '1',
    name: 'Lista 1',
  },
  {
    listId: '2',
    name: 'Lista 2',
  },
  {
    listId: '3',
    name: 'Hot Leads',
  },
  {
    listId: '4',
    name: 'Comercial List ',
  },
  {
    listId: '5',
    name: 'Meli List',
  },
];

const promoCodesDummyValues = {
  mercadoshops: [
    {
      code: 'meli-1',
      type: 'money',
      value: 1000,
      formattedValue: '$ 1,000.00',
    },
    {
      code: 'meli-2',
      type: 'money',
      value: 1500,
      formattedValue: '$ 1,500.00',
    },
    {
      code: 'meli-3',
      type: 'percen',
      value: 15,
      formattedValue: '15 %',
    },
  ],
  tiendanube: [
    {
      code: 'nube-1-code',
      type: 'money',
      value: 1000,
      formattedValue: '$ 250,000.00',
    },
    {
      code: 'nube-2',
      type: 'shipping',
      value: 0,
      formattedValue: '-',
    },
    {
      code: 'nube-3-percent',
      type: 'percen',
      formattedValue: '15 %',
      value: 15,
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
    return promoCodesDummyValues[store.toLocaleLowerCase()] || [];
  });

  registerListener(
    'getPromoCodeDynamicId',
    async (values: DynamicPromoCodeDependentToolValues) => {
      await timeout(1000);
      console.log('getPromoCodeDynamicId', values);
      return { promoCodeId: 10102024 };
    },
  );

  registerListener('getImageUrlFile', async (qrImageFile) => {
    console.log(qrImageFile);
    await timeout(500);
    return 'http://www.pngall.com/wp-content/uploads/2/QR-Code-PNG-HD-Image-180x180.png';
  });

  registerListener('getSubscriptionList', async () => {
    console.log('getSubscriptionList');
    await timeout(500);
    return {
      success: true,
      subscriptionList: subscriptionListDummyValues,
    };
  });

  registerListener('CreateSubscriptionList', async (listName: string) => {
    console.log('CreateSubscriptionList ', listName);
    await timeout(500);
    const list = {
      success: true,
      listId: (subscriptionListDummyValues.length + 1).toString(),
      name: listName,
    };
    return list;
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
