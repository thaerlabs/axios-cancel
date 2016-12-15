import axios, { Cancel }  from 'axios';
import MockAdapter from 'axios-mock-adapter';
import axiosCancel from '../index.js';

axiosCancel(axios, {
  debug: false // uncomment here to enable logging
});

const url = 'http://reddit.com';

const mock = new MockAdapter(axios, {delayResponse: 200});

mock.onGet(url).reply(200, {
  users: [
    {id: 1, name: 'John Smith'}
  ]
});

describe('axios cancel', () => {

  test('normal request', () => {
    return axios.get(url)
      .then((res) => {
        const {data} = res;
        expect(data.users).toBeTruthy();
      }).catch((thrown) => {
        expect(thrown).toBeNull();
      });
  });

  test('request with requestId', () => {

    const requestId = 'request_id';
    return axios.get(url, {
      requestId: requestId
    })
      .then((res) => {
        const {data} = res;
        expect(data.users).toBeTruthy();
      }).catch((thrown) => {
        expect(thrown).toBeNull();
      });
  });

  test('cancel a single request with requestId', () => {

    const successCallback = jest.fn();
    const cancelCallback = jest.fn();

    const requestId = 'request_id';
    const promise = axios.get(url, {
      requestId: requestId
    })
      .then(successCallback)
      .catch(cancelCallback);

    setTimeout(() => {
      axios.cancel(requestId);
      expect(successCallback).not.toHaveBeenCalled();
      expect(cancelCallback).toHaveBeenCalled();
    }, 100);

    return promise;
  });

  test('validate that cancellation err is of type axios.Cancel', () => {
    const requestId = 'request_id';
    const promise = axios.get(url, {
      requestId: requestId
    })
      .catch((thrown) => {
        expect(thrown).toBeInstanceOf(Cancel);
      });

    setTimeout(() => {
      axios.cancel(requestId);
    }, 100);

    return promise;
  });

  test('cancel a request with subsequent requests with same `requestId`', () => {

    const successCallback1 = jest.fn();
    const successCallback2 = jest.fn();
    const cancelCallback1 = jest.fn();
    const cancelCallback2 = jest.fn();

    const requestId = 'request_id';
    axios.get(url, {
      requestId: requestId
    })
      .then(successCallback1)
      .catch(cancelCallback1);

    const promise = axios.get(url, {
      requestId: requestId
    })
      .then(successCallback2)
      .catch(cancelCallback2);

    setTimeout(() => {
      expect(successCallback1).not.toHaveBeenCalled();
      expect(cancelCallback1).toHaveBeenCalled();

      expect(successCallback2).toHaveBeenCalled();
      expect(cancelCallback2).toHaveBeenCalled();
    }, 100);

    return promise;
  });

  test('cancel all requests', () => {

    const successCallback1 = jest.fn();
    const successCallback2 = jest.fn();
    const successCallback3 = jest.fn();
    const cancelCallback1 = jest.fn();
    const cancelCallback2 = jest.fn();
    const cancelCallback3 = jest.fn();

    const requestId1 = 'request_id_1';
    const requestId2 = 'request_id_2';
    const requestId3 = 'request_id_3';

    axios.get(url, {
      requestId: requestId1
    })
      .then(successCallback1)
      .catch(cancelCallback1);

    axios.get(url, {
      requestId: requestId2
    })
      .then(successCallback2)
      .catch(cancelCallback2);

    const promise = axios.get(url, {
      requestId: requestId3
    })
      .then(successCallback3)
      .catch(cancelCallback3);

    setTimeout(() => {

      axios.cancelAll();

      expect(successCallback1).not.toHaveBeenCalled();
      expect(cancelCallback1).toHaveBeenCalled();

      expect(successCallback2).not.toHaveBeenCalled();
      expect(cancelCallback2).toHaveBeenCalled();

      expect(successCallback3).not.toHaveBeenCalled();
      expect(cancelCallback3).toHaveBeenCalled();
    }, 100);

    return promise;
  });
});
