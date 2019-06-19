import RequestManager from '../lib/RequestManager';

describe('RequestManager', () => {
  let requestManager;
  const requestId = 'REQUEST_ID'
  const requestGroup = 'REQUEST_GROUP'

  beforeEach(() => {
    requestManager = new RequestManager();
  });

  test('adds a request', () => {
    requestManager.addRequest({requestId});

    expect(requestManager.has(requestId)).toBeTruthy();
  });

  test('removes a request', () => {

    requestManager.addRequest({requestId});
    expect(requestManager.has(requestId)).toBeTruthy();

    requestManager.removeRequest(requestId);
    expect(requestManager.has(requestId)).toBeFalsy();
  });

  test('cancels a request with `requestId`', () => {
    const cancelFn = jest.fn();

    requestManager.addRequest({requestId, cancel: cancelFn});
    requestManager.cancelRequest(requestId);
    expect(cancelFn).toHaveBeenCalled();
    expect(requestManager.has(requestId)).toBeFalsy();
  });

  test('cancels a request with `requestGroup`', () => {
    const cancelFn = jest.fn();

    requestManager.addRequest({requestGroup, cancel: cancelFn});
    requestManager.cancelRequest(requestGroup);
    expect(cancelFn).toHaveBeenCalled();
    expect(requestManager.has(requestGroup)).toBeFalsy();
  });

  test('cancels a request with default `reason` message', () => {
    const cancelFn = jest.fn();
    const reason = `\`cancelRequest(${requestId})\` from \`RequestManager.cancelRequest\``;

    requestManager.addRequest({requestId, cancel: cancelFn});
    requestManager.cancelRequest(requestId);
    expect(cancelFn).toHaveBeenCalledWith(reason);
  });

  test('cancels a request with custom `reason` message', () => {
    const cancelFn = jest.fn();
    const reason = `some reason`;

    requestManager.addRequest({requestId, cancel: cancelFn});
    requestManager.cancelRequest(requestId, reason);
    expect(cancelFn).toHaveBeenCalledWith(reason);
  });


  test('cancels the precedent request if same `requestId` is sent before removal', () => {
    const cancelFn1 = jest.fn();
    const cancelFn2 = jest.fn();

    requestManager.addRequest({ requestId, cancel: cancelFn1 });
    requestManager.addRequest({ requestId, cancel: cancelFn2 });
    expect(cancelFn1).toHaveBeenCalled();

    requestManager.cancelRequest(requestId);
    expect(cancelFn2).toHaveBeenCalled();
  });

  test('cancels all requests', () => {
    const cancelFn1 = jest.fn();
    const cancelFn2 = jest.fn();
    const cancelFn3 = jest.fn();
    const reqId1 = 'REQUEST_ID_1';
    const reqId2 = 'REQUEST_ID_2';
    const reqId3 = 'REQUEST_ID_3';

    requestManager.addRequest({ requestId: reqId1, cancel: cancelFn1 });
    requestManager.addRequest({ requestId: reqId2, cancel: cancelFn2 });
    requestManager.addRequest({ requestId: reqId3, cancel: cancelFn3 });

    requestManager.cancelAllRequests();

    expect(cancelFn1).toHaveBeenCalledWith(`\`cancelRequest(${reqId1})\` from \`RequestManager.cancelAllRequests\``);
    //expect(cancelFn2).toHaveBeenCalledWith(`\`cancelRequest(${reqId2})\` from \`RequestManager.cancelAllRequests\``);
    expect(cancelFn3).toHaveBeenCalledWith(`\`cancelRequest(${reqId3})\` from \`RequestManager.cancelAllRequests\``);
  });
});
