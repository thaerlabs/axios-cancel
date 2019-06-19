export default class RequestManager {

  constructor(options = {}) {
    this.options = options;
    this.pendingRequests = [];
  }

  addRequest(request) {
    const { requestId } = request
    this.log(`adding request \`${requestId}\``);

    if (this.has(requestId)) {
      this.cancelRequest(requestId, `\`cancelRequest(${requestId})\` from \`RequestManager.addRequest\`.
      Found duplicate pending request.`);
    }

    this.pendingRequests.push(request);

  }

  removeRequest(requestId) {
    this.log(`removing request \`${requestId}\``);

    this.pendingRequests = this.pendingRequests.filter(request => (request.requestId !== requestId && request.requestGroup !== requestId))
  }

  cancelRequest(requestId, reason = `\`cancelRequest(${requestId})\` from \`RequestManager.cancelRequest\``) {
    this.log(`cancelling request \`${requestId}\``);

    const pendingRequests = this.pendingRequests.filter(request => (request.requestId === requestId || request.requestGroup === requestId))

    if (!pendingRequests.length) return;

    this.removeRequest(requestId);

    pendingRequests.forEach(request => {
      if (typeof request.cancel === 'function') {
        request.cancel(reason)
      }
    });
  }

  cancelAllRequests(reason) {
    this.pendingRequests.forEach(request => {
      let _reason = reason || `\`cancelRequest(${request.requestId})\` from \`RequestManager.cancelAllRequests\``
      if (typeof request.cancel === 'function') {
        request.cancel(_reason)
      }
    });
    this.pendingRequests = []
  }

  has(requestId) {
    return !!this.pendingRequests.filter(request => (request.requestId === requestId || request.requestGroup === requestId)).length
  }

  log(message) {
    if (this.options.debug === true) {
      console.log(message);
    }
  }
}
