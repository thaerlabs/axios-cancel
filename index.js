import { CancelToken } from 'axios';
import RequestManager from './lib/RequestManager';
import extend from './lib/extend';

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
   *  - added to the `pendingRequests` hash if not, with a cancel function
   */
  axios.interceptors.request.use((config) => {
    const { requestId } = config;
    if (requestId) {
      const source = CancelToken.source();
      config.cancelToken = source.token;
      requestManager.addRequest(requestId, source.cancel);
    }
    return config;
  });

  /**
   * Global response interceptor
   * Check for the `requestId` and remove it from the `pendingRequests` hash
   */
  axios.interceptors.response.use((response) => {
    const { requestId } = response.config;
    if (requestId) {
      requestManager.removeRequest(requestId);
    }
    return response;
  });

  /**
   * Global axios method to cancel a single request by ID
   * @param requestId: string
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
