!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("axios")):"function"==typeof define&&define.amd?define(["axios"],t):"object"==typeof exports?exports.axiosCancel=t(require("axios")):e.axiosCancel=t(e.axios)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var r={debug:!1},n=(0,i.default)({},r,t),o=new s.default(n);e.interceptors.request.use(function(e){var t=e.requestId,r=e.requestGroup,n=t?t:r?(0,l.default)():null;if(n){var a=u.CancelToken.source(),s=a.token,c=a.cancel;e.cancelToken=s,e.requestId=n,r?o.addRequest({requestId:n,cancel:c,requestGroup:r}):o.addRequest({requestId:n,cancel:c})}return e}),e.interceptors.response.use(function(e){var t=e.config.requestId;return t&&o.removeRequest(t),e}),e.cancel=function(e,t){e&&o.cancelRequest(e,t)},e.cancelAll=function(e){o.cancelAllRequests(e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var u=r(10),a=r(2),s=n(a),c=r(3),i=n(c),f=r(9),l=n(f)},function(e,t){"use strict";function r(e,t){var r=t||0,o=n;return[o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]]].join("")}for(var n=[],o=0;o<256;++o)n[o]=(o+256).toString(16).substr(1);e.exports=r},function(e,t){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};r(this,e),this.options=t,this.pendingRequests=[]}return n(e,[{key:"addRequest",value:function(e){var t=e.requestId;this.log("adding request `"+t+"`"),this.has(t)&&this.cancelRequest(t,"`cancelRequest("+t+")` from `RequestManager.addRequest`.\n      Found duplicate pending request."),this.pendingRequests.push(e)}},{key:"removeRequest",value:function(e){this.log("removing request `"+e+"`"),this.pendingRequests=this.pendingRequests.filter(function(t){return t.requestId!==e&&t.requestGroup!==e})}},{key:"cancelRequest",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"`cancelRequest("+e+")` from `RequestManager.cancelRequest`";this.log("cancelling request `"+e+"`");var r=this.pendingRequests.filter(function(t){return t.requestId===e||t.requestGroup===e});r.length&&(this.removeRequest(e),r.forEach(function(e){"function"==typeof e.cancel&&e.cancel(t)}))}},{key:"cancelAllRequests",value:function(e){this.pendingRequests.forEach(function(t){var r=e||"`cancelRequest("+t.requestId+")` from `RequestManager.cancelAllRequests`";"function"==typeof t.cancel&&t.cancel(r)}),this.pendingRequests=[]}},{key:"has",value:function(e){return!!this.pendingRequests.filter(function(t){return t.requestId===e||t.requestGroup===e}).length}},{key:"log",value:function(e){this.options.debug===!0&&console.log(e)}}]),e}();t.default=o},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e={};for(var t in arguments){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}},function(e,t){"use strict";var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(r){var n=new Uint8Array(16);e.exports=function(){return r(n),n}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t){"use strict";function r(e,t,r,n){switch(e){case 0:return t&r^~t&n;case 1:return t^r^n;case 2:return t&r^t&n^r&n;case 3:return t^r^n}}function n(e,t){return e<<t|e>>>32-t}function o(e){var t=[1518500249,1859775393,2400959708,3395469782],o=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){var u=unescape(encodeURIComponent(e));e=new Array(u.length);for(var a=0;a<u.length;a++)e[a]=u.charCodeAt(a)}e.push(128);for(var s=e.length/4+2,c=Math.ceil(s/16),i=new Array(c),a=0;a<c;a++){i[a]=new Array(16);for(var f=0;f<16;f++)i[a][f]=e[64*a+4*f]<<24|e[64*a+4*f+1]<<16|e[64*a+4*f+2]<<8|e[64*a+4*f+3]}i[c-1][14]=8*(e.length-1)/Math.pow(2,32),i[c-1][14]=Math.floor(i[c-1][14]),i[c-1][15]=8*(e.length-1)&4294967295;for(var a=0;a<c;a++){for(var l=new Array(80),d=0;d<16;d++)l[d]=i[a][d];for(var d=16;d<80;d++)l[d]=n(l[d-3]^l[d-8]^l[d-14]^l[d-16],1);for(var p=o[0],v=o[1],y=o[2],g=o[3],h=o[4],d=0;d<80;d++){var q=Math.floor(d/20),R=n(p,5)+r(q,v,y,g)+h+t[q]+l[d]>>>0;h=g,g=y,y=n(v,30)>>>0,v=p,p=R}o[0]=o[0]+p>>>0,o[1]=o[1]+v>>>0,o[2]=o[2]+y>>>0,o[3]=o[3]+g>>>0,o[4]=o[4]+h>>>0}return[o[0]>>24&255,o[0]>>16&255,o[0]>>8&255,255&o[0],o[1]>>24&255,o[1]>>16&255,o[1]>>8&255,255&o[1],o[2]>>24&255,o[2]>>16&255,o[2]>>8&255,255&o[2],o[3]>>24&255,o[3]>>16&255,o[3]>>8&255,255&o[3],o[4]>>24&255,o[4]>>16&255,o[4]>>8&255,255&o[4]]}e.exports=o},function(e,t,r){"use strict";function n(e){var t=[];return e.replace(/[a-fA-F0-9]{2}/g,function(e){t.push(parseInt(e,16))}),t}function o(e){e=unescape(encodeURIComponent(e));for(var t=new Array(e.length),r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}var u=r(1);e.exports=function(e,t,r){var a=function(e,a,s,c){var i=s&&c||0;if("string"==typeof e&&(e=o(e)),"string"==typeof a&&(a=n(a)),!Array.isArray(e))throw TypeError("value must be an array of bytes");if(!Array.isArray(a)||16!==a.length)throw TypeError("namespace must be uuid string or an Array of 16 byte values");var f=r(a.concat(e));if(f[6]=15&f[6]|t,f[8]=63&f[8]|128,s)for(var l=0;l<16;++l)s[i+l]=f[l];return s||u(f)};try{a.name=e}catch(e){}return a.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",a.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",a}},function(e,t,r){"use strict";function n(e,t,r){var n=t&&r||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null),e=e||{};var a=e.random||(e.rng||o)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var s=0;s<16;++s)t[n+s]=a[s];return t||u(a)}var o=r(4),u=r(1);e.exports=n},function(e,t,r){"use strict";var n=r(6),o=r(5);e.exports=n("v5",80,o)},function(e,t,r){"use strict";var n=r(7),o=r(8),u=function(){return n()};u.regex={v4:/^([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})|(0{8}-0{4}-0{4}-0{4}-0{12})$/,v5:/^([a-f0-9]{8}-[a-f0-9]{4}-5[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12})|(0{8}-0{4}-0{4}-0{4}-0{12})$/},u.is=function(e){return!!e&&(u.regex.v4.test(e)||u.regex.v5.test(e))},u.empty=function(){return"00000000-0000-0000-0000-000000000000"},u.fromString=function(e){if(!e)throw new Error("Text is missing.");var t="bb5d0ffa-9a4c-4d7c-8fc2-0a7d2220ba45",r=o(e,t);return r},e.exports=u},function(t,r){t.exports=e}])});