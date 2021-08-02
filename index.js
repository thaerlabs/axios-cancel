import { CancelToken } from 'axios';
import RequestManager from './lib/RequestManager';
import extend from './lib/extend';
import uuid from 'uuidv4'

export default function patchAxios(axios, options) {

  const defaults = {
    debug: false,
  };
  const settings = extend({}, defaults, options);

  const requestManager = new RequestManager(settings);

  /**
   * Global request interceptor
   * Any request with a `requestId` key in the config will be:
   *  - cancelled if already sent
   *  - added to the `pendingRequests` with a cancel function
   * Any request with a `requestGroup` key in config will be:
   *  - added to the `pendingRequests` with a generated requestId and cancel function
   */
  axios.interceptors.request.use((config) => {
    const { requestId, requestGroup } = config;
    const cancelableId = requestId ? requestId : requestGroup ? uuid() : null

    if (cancelableId) {
      const { token, cancel } = CancelToken.source();
      config.cancelToken = token;
      config.requestId = cancelableId
      if (requestGroup) {
        requestManager.addRequest({ requestId: cancelableId, cancel, requestGroup })
      } else {
        requestManager.addRequest({ requestId: cancelableId, cancel })
      }
    }

    return config;
  });

  /**
   * Global response interceptor
   * Check for the `requestId` or `requestGroup` and remove it from the `pendingRequests` hash (or it's `requestGroup` sub hash)
   */
  axios.interceptors.response.use((response) => {
    const { requestId } = response.config;
    if (requestId) {
      requestManager.removeRequest(requestId);
    }
    return response;
  });

  /**
   * Global axios method to cancel a single request by ID or the whole group by it's name
   * @param requestId: string Single request ID or group name
   * @param reason
   */
  axios.cancel = (requestId, reason) => {
    if (requestId) {
      requestManager.cancelRequest(requestId, reason);
    }
  };

  /**
   * Global axios method to cancel all requests
   */
  axios.cancelAll = (reason) => {
    requestManager.cancelAllRequests(reason)
  };
}
