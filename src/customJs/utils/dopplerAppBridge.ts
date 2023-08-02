let lastRequestId = 0;

export const requestDopplerApp = <TParameters extends object, TResult>({
  global = window,
  action,
  callback,
  ...parameters
}: {
  global?: Window & typeof globalThis;
  action: string;
  callback: (value: TResult) => void;
} & TParameters) => {
  const requestId = lastRequestId++;

  global.top!.postMessage(
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

  global.addEventListener('message', listener);

  const destructor = () => {
    global.removeEventListener('message', listener);
  };
  return { destructor };
};
