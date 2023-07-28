import { getPromoCodes } from '../utils/dopplerAppBridge';

describe(getPromoCodes.name, () => {
  it('must be called "window.postMessage" and "window.eventListener" with properly parameters', async () => {
    // arrange
    const requestId = 111;
    const storeName = 'myDummyStore';
    const responseListener = ({}) => {};

    jest.spyOn(window, 'addEventListener');
    jest
      .spyOn(window.top, 'postMessage')
      .mockImplementationOnce((message, targetOrigin) => {});

    // act
    getPromoCodes(requestId, storeName, responseListener);

    // assert
    expect(window.addEventListener).toBeCalledWith('message', responseListener);
    expect(window.top.postMessage).toBeCalledWith(
      { requestId, action: 'getPromoCodes', store: storeName },
      { targetOrigin: '*' },
    );
  });
});
