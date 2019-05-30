export default class RequestManager {

  constructor(options = {}) {
    this.options = options;
    this.pendingRequests = {};
  }

  addRequest(requestId, cancelFn) {

    this.log(`adding request \`${requestId}\``);

    if (this.has(requestId)) {
      this.cancelRequest(requestId, `\`cancelRequest(${requestId})\` from \`RequestManager.addRequest\`.
      Found duplicate pending request.`);
    }

    this.pendingRequests[requestId] = cancelFn;

  }

  addGroupRequest(requestGroup, cancelFn) {

    this.log(`adding group request \`${requestGroup}\``);

    if (!this.has(requestGroup)) this.pendingRequests[requestGroup] = [];

    this.pendingRequests[requestGroup].push(cancelFn);

    return this.pendingRequests[requestGroup].indexOf(cancelFn)
  }

  removeRequest(requestId) {
    this.log(`removing request \`${requestId}\``);

    delete this.pendingRequests[requestId];
  }

  removeGroupRequest(requestGroup, requestGroupIndex) {
    this.log(`removing group request \`${requestGroup}[${requestGroupIndex}]\``);

    delete this.pendingRequests[requestGroup][requestGroupIndex];
  }

  cancelRequest(requestId, reason = `\`cancelRequest(${requestId})\` from \`RequestManager.cancelRequest\``) {
    this.log(`cancelling request \`${requestId}\``);

    if (this.has(requestId)) {
      if (typeof this.pendingRequests[requestId] === 'function') {
        this.pendingRequests[requestId](reason);
        this.removeRequest(requestId);

        this.log(`request \`${requestId}\` cancelled`);
      } else if (Array.isArray(this.pendingRequests[requestId])) {
        this.pendingRequests[requestId].forEach((cancel)=> {
          if (typeof cancel === 'function') {
            cancel(reason)
          }
        });
        this.removeRequest(requestId);

        this.log(`request group \`${requestId}\` cancelled`);
      }
    }
  }

  cancelAllRequests(reason) {
    for (let requestId in this.pendingRequests) {
      let _reason = reason || `\`cancelRequest(${requestId})\` from \`RequestManager.cancelAllRequests\``;
      this.cancelRequest(requestId, _reason);
    }
  }

  has(requestId) {
    return !!this.pendingRequests[requestId];
  }

  log(message) {
    if (this.options.debug === true) {
      console.log(message);
    }
  }
}
