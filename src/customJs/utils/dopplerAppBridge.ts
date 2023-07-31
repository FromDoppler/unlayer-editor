let lastRequestId = 0;

export const requestDopplerApp = <TParameters extends object, TResult>({
  action,
  callback,
  ...parameters
}: { action: string; callback: (value: TResult) => void } & TParameters) => {
  const requestId = lastRequestId++;

  window.top!.postMessage(
    {
      requestId,
      action,
      ...parameters,
    },
    { targetOrigin: '*' },
  );

  const listener = ({ data }: MessageEvent) => {
    if (data?.isResponse && requestId === data.requestId) {
      callback(data.value);
    }
  };

  window.addEventListener('message', listener);

  const destructor = () => {
    window.removeEventListener('message', listener);
  };
  return { destructor };
};
