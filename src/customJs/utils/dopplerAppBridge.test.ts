import { requestDopplerApp } from './dopplerAppBridge';

describe(requestDopplerApp.name, () => {
  // It is not a unit test 🤦‍♂️
  it('should call postMessage, setup evenListener, clean up listener on unmount and auto-increment requestId', async () => {
    // Arrange
    const store = 'myDummyStore';
    const action = 'getPromoCodes';
    const callback = jest.fn();

    const addEventListener = jest.spyOn(window, 'addEventListener');
    const removeEventListener = jest.spyOn(window, 'removeEventListener');
    const postMessage = jest
      .spyOn(window.top!, 'postMessage')
      .mockImplementation(() => {});

    // Act
    const { destructor } = requestDopplerApp({
      action,
      store,
      callback,
    });

    // Assert
    expect(addEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
    const listener = addEventListener.mock.calls[0][1] as (
      message: any,
    ) => void;

    expect(postMessage).toHaveBeenCalledWith(
      { requestId: expect.any(Number), action, store },
      { targetOrigin: '*' },
    );
    const requestId = postMessage.mock.calls[0][0].requestId;

    expect(removeEventListener).not.toHaveBeenCalled();
    expect(destructor).toEqual(expect.any(Function));

    // Arrange
    // The response of another request
    const anotherResponse = {
      isResponse: true,
      requestId: 'another response',
      value: {},
    };
    // Act
    listener({ data: anotherResponse });
    // Assert
    expect(callback).not.toHaveBeenCalled();

    // Arrange
    // The response of our request
    const expectedResponseValue = 'expectedResponseValue';
    const expectedResponse = {
      isResponse: true,
      requestId,
      value: expectedResponseValue,
    };
    // Act
    listener({ data: expectedResponse });
    // Assert
    expect(callback).toHaveBeenCalledWith(expectedResponseValue);

    // Act
    // Unmounting the component
    destructor();
    // Assert
    expect(removeEventListener).toHaveBeenCalledWith('message', listener);

    // Act
    // Another call
    requestDopplerApp({
      action,
      store,
      callback,
    });
    // Assert
    const secondRequestId = postMessage.mock.calls[1][0].requestId;
    expect(secondRequestId).toBe(requestId + 1);
  });
});
