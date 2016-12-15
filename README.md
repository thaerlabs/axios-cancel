# axios-cancel

[![travis build](https://img.shields.io/travis/thaerlabs/axios-cancel/master.svg?style=flat-square)](https://travis-ci.org/thaerlabs/axios-cancel)

Simplify cancellation of http requests when using the awesome [axios](https://github.com/mzabriskie/axios) library

## Installation

Using npm:

`npm install axios-cancel --save`

## Getting started

`axios-cancel` simplifies the interface of the [Cancel](https://github.com/mzabriskie/axios#cancellation) api introducted in axios v1.5, 
which is based on the [cancelable promises proposal](https://github.com/tc39/proposal-cancelable-promises)

```javascript
import axios from 'axios';
import axiosCancel from 'axios-cancel';

axiosCancel(axios, {
  debug: false // default
});

...

// Single request cancellation
const requestId = 'my_sample_request';
const promise = axios.get(url, {
  requestId: requestId
})
  .then((res) => {
    console.log('resolved');
  }).catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled');
    } else {
      console.log('some other reason');
    }
  });

axios.cancel(requestId);
// aborts the HTTP request and logs `request cancelled`

```

## Examples

Multiple subsequent requests with same `requestId`

```javascript
...

const requestId = 'my_sample_request';
const promise1 = axios.get(url, {
  requestId: requestId
})
  .then((res) => {
    console.log('resolved promise 1');
  }).catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log('request 1 cancelled');
    } else {
      console.log('some other reason');
    }
  });

// another request with same `requestId`, before `promise1` resolution
const promise2 = axios.get(url, {
  requestId: requestId
})
  .then((res) => {
    console.log('resolved promise 2');
  }).catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log('request 2 cancelled');
    } else {
      console.log('some other reason');
    }
  });

// aborts the first HTTP request, and cancels the first promise 
// logs `request 1 cancelled`
// logs `resolved promise 2`
```

Multiple requests with different `requestId`, cancell all
```javascript
...

const requestId1 = 'my_sample_request_1';
const promise1 = axios.get(url, {
  requestId: requestId1
})
  .then((res) => {
    console.log('resolved promise 1');
  }).catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log('request 1 cancelled');
    } else {
      console.log('some other reason');
    }
  });

const requestId2 = 'my_sample_request_2';
const promise2 = axios.get(url, {
  requestId: requestId2
})
  .then((res) => {
    console.log('resolved promise 1');
  }).catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log('request 2 cancelled');
    } else {
      console.log('some other reason');
    }
  });

axios.cancelAll();

// aborts all HTTP request, and cancels all promises
// logs `request 1 cancelled`
// logs `request 2 cancelled`

```

## Methods

*axiosCancel(instance: axios[, options])*

*options*
- debug _(enables logging)_

*axios.cancel(requestId: string[, reason: string])*

*axios.cancelAll([reason: string])*

## License

MIT
