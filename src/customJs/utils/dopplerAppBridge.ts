export const getPromoCodes = (
  requestId: number,
  store: string,
  responseListener: (message: any) => void,
) => {
  window.top?.postMessage(
    {
      requestId,
      action: 'getPromoCodes',
      store,
    },
    { targetOrigin: '*' },
  );

  window.addEventListener('message', responseListener);
};
