import { requestDopplerApp } from './dopplerAppBridge';

describe(requestDopplerApp.name, () => {
  const createTestContext = () => {
    const parameter1 = 'someParameter1';
    const action = 'someAction';
    const callbackMock = jest.fn();

    const windowMocks = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      top: {
        postMessage: jest.fn(),
      },
    };

    const getRequestIdFromFirstCallAndFirstParameter = () =>
      windowMocks.top.postMessage.mock.calls[0][0].requestId;

    const getRequestIdFromSecondCallAndFirstParameter = () =>
      windowMocks.top.postMessage.mock.calls[1][0].requestId;

    const getListenerFromFirstCallAndSecondParameter = () =>
      windowMocks.addEventListener.mock.calls[0][1] as (message: any) => void;

    const executeRequest = () =>
      requestDopplerApp({
        global: windowMocks as any,
        action,
        parameter1,
        callback: callbackMock,
      });

    return {
      windowMocks,
      executeRequest,
      requestParameters: {
        action,
        parameter1,
        callbackMock,
      },
      getRequestIdFromFirstCallAndFirstParameter,
      getRequestIdFromSecondCallAndFirstParameter,
      getListenerFromFirstCallAndSecondParameter,
    };
  };

  it('should call to "postMessage" with the proper parameters', async () => {
    // Arrange
    const { windowMocks, executeRequest, requestParameters } =
      createTestContext();

    // Act
    executeRequest();

    // Assert
    expect(windowMocks.top.postMessage).toHaveBeenCalledWith(
      {
        requestId: expect.any(Number),
        action: requestParameters.action,
        parameter1: requestParameters.parameter1,
      },
      { targetOrigin: '*' },
    );
  });

  it('should call to "addEventListener"', async () => {
    // Arrange
    const { windowMocks, executeRequest } = createTestContext();

    // Act
    executeRequest();

    // Assert
    expect(windowMocks.addEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
  });

  it('should return a function to invoke "destructor"', async () => {
    // Arrange
    const { executeRequest } = createTestContext();

    // Act
    const { destructor } = executeRequest();

    // Assert
    expect(destructor).toEqual(expect.any(Function));
  });

  it('should not call to "removeEventListener" when "destructor" is not invoked', async () => {
    // Arrange
    const { windowMocks, executeRequest } = createTestContext();

    // Act
    executeRequest();

    // Assert
    expect(windowMocks.removeEventListener).not.toHaveBeenCalled();
  });

  it('should call "removeEventListener" when invoke "destructor"', async () => {
    // Arrange
    const {
      windowMocks,
      executeRequest,
      getListenerFromFirstCallAndSecondParameter,
    } = createTestContext();

    const { destructor } = executeRequest();
    const listener = getListenerFromFirstCallAndSecondParameter();

    // Act
    // Unmounting the component
    destructor();

    // Assert
    expect(windowMocks.removeEventListener).toHaveBeenCalledWith(
      'message',
      listener,
    );
  });

  it('should not call the "callback" fn when the response belongs to another request (different requestId)', async () => {
    // Arrange
    const {
      executeRequest,
      requestParameters,
      getListenerFromFirstCallAndSecondParameter,
    } = createTestContext();

    executeRequest();
    const listener = getListenerFromFirstCallAndSecondParameter();

    // The response of another request (with another requestId)
    const anotherResponseWithDifferentRequestId = {
      isResponse: true,
      requestId: 9876543210, // ensure a requestId different to the previous one
      value: {},
    };

    // Act
    listener({ data: anotherResponseWithDifferentRequestId });

    // Assert
    expect(requestParameters.callbackMock).not.toHaveBeenCalled();
  });

  it('should call the "callback" fn when the response belongs to our request (same requestId)', async () => {
    // Arrange
    const {
      executeRequest,
      requestParameters,
      getRequestIdFromFirstCallAndFirstParameter,
      getListenerFromFirstCallAndSecondParameter,
    } = createTestContext();

    executeRequest();

    const listener = getListenerFromFirstCallAndSecondParameter();
    const requestId = getRequestIdFromFirstCallAndFirstParameter();

    // The response of our request (the same requestId)
    const expectedResponseValue = 'expectedResponseValue';
    const expectedResponse = {
      isResponse: true,
      requestId,
      value: expectedResponseValue,
    };

    // Act
    listener({ data: expectedResponse });

    // Assert
    expect(requestParameters.callbackMock).toHaveBeenCalled();
  });

  it('should increment the "requestId" when execute a new request', async () => {
    // Arrange
    const {
      executeRequest,
      getRequestIdFromFirstCallAndFirstParameter,
      getRequestIdFromSecondCallAndFirstParameter,
    } = createTestContext();

    // Act
    // Execute firt request
    executeRequest();
    // Execute a new request
    executeRequest();

    // Arrange
    const requestId = getRequestIdFromFirstCallAndFirstParameter();
    const secondRequestId = getRequestIdFromSecondCallAndFirstParameter();

    // Assert
    expect(secondRequestId).toBe(requestId + 1);
  });
});
