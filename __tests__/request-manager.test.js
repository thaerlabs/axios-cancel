import RequestManager from '../lib/RequestManager';

describe('RequestManager', () => {
  let requestManager;

  beforeEach(() => {
    requestManager = new RequestManager();
  });

  test('adds a request', () => {
    const reqId = 'request_id';

    requestManager.addRequest(reqId, () => { });
    expect(requestManager.has(reqId)).toBeTruthy();
  });

  test('removes a request', () => {
    const reqId = 'request_id';

    requestManager.addRequest(reqId, () => { });
    expect(requestManager.has(reqId)).toBeTruthy();
    
    requestManager.removeRequest(reqId);
    expect(requestManager.has(reqId)).toBeFalsy();
  });

  test('cancels a request', () => {
    const cancelFn = jest.fn();
    const reqId = 'request_id';

    requestManager.addRequest(reqId, cancelFn);
    requestManager.cancelRequest(reqId);
    expect(cancelFn).toHaveBeenCalled();
    expect(requestManager.has(reqId)).toBeFalsy();
  });

  test('cancels a request with default `reason` message', () => {
    const cancelFn = jest.fn();
    const reqId = 'request_id';
    const reason = `\`cancelRequest(${reqId})\` from \`RequestManager.cancelRequest\``;

    requestManager.addRequest(reqId, cancelFn);
    requestManager.cancelRequest(reqId);
    expect(cancelFn).toHaveBeenCalledWith(reason);
  });

  test('cancels a request with custom `reason` message', () => {
    const cancelFn = jest.fn();
    const reqId = 'request_id';
    const reason = `some reason`;

    requestManager.addRequest(reqId, cancelFn);
    requestManager.cancelRequest(reqId, reason);
    expect(cancelFn).toHaveBeenCalledWith(reason);
  });


  test('cancels the precedent request if same `requestId` is sent before removal', () => {
    const cancelFn1 = jest.fn();
    const cancelFn2 = jest.fn();
    const reqId = 'request_id';

    requestManager.addRequest(reqId, cancelFn1);
    requestManager.addRequest(reqId, cancelFn2);
    expect(cancelFn1).toHaveBeenCalled();

    requestManager.cancelRequest(reqId);
    expect(cancelFn2).toHaveBeenCalled();
  });

  test('cancels all requests', () => {
    const cancelFn1 = jest.fn();
    const cancelFn2 = jest.fn();
    const cancelFn3 = jest.fn();
    const reqId1 = 'request_id_1';
    const reqId2 = 'request_id_2';
    const reqId3 = 'request_id_3';

    requestManager.addRequest(reqId1, cancelFn1);
    requestManager.addRequest(reqId2, cancelFn2);
    requestManager.addRequest(reqId3, cancelFn3);
    
    requestManager.cancelAllRequests();

    expect(cancelFn1).toHaveBeenCalled();
    expect(cancelFn2).toHaveBeenCalled();
    expect(cancelFn3).toHaveBeenCalled();
  });
});