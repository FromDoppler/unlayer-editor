// DUMMY DATA

const promoCodesDummyValues = [
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
];

// END DUMMY DATA

const UNLAYER_ORIGIN = 'https://editor.unlayer.com';

const registerListener = <TParameters, TResult>(
  listenedAction: string,
  workerFunction: (parameters: TParameters) => Promise<TResult>,
) => {
  const listener = async ({
    origin,
    data,
  }: MessageEvent<{ action: string; requestId: number } & TParameters>) => {
    console.log('3333');
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
  // TODO: simulate using store parameter
  registerListener('getPromoCodes', async ({ store }: { store: string }) => {
    // TODO: add timeout
    return promoCodesDummyValues;
  });
};
