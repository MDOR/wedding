!function i(c,u,a){function l(n,e){if(!u[n]){if(!c[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(d)return d(n,!0);var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}var o=u[n]={exports:{}};c[n][0].call(o.exports,function(e){return l(c[n][1][e]||e)},o,o.exports,i,c,u,a)}return u[n].exports}for(var d="function"==typeof require&&require,e=0;e<a.length;e++)l(a[e]);return l}({1:[function(e,n,t){"use strict";e("./polyfill/array-from");function r(r,e){var o,i=1<arguments.length&&void 0!==e?e:100;return function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];clearTimeout(o),o=setTimeout(function(){return o=null,r.apply(void 0,n)},i)}}var o=document.querySelector("#home");Array.from(document.querySelectorAll("img")),document.body||document.documentElement;function i(){var e=window.innerHeight||document.document.documentElement.clientHeight||document.body.clientHeight;o.style.height="".concat(1080<e?1080:e,"px")}var c=r(i);i(),window.addEventListener("resize",c);var u=function(){return document.scrollTop||document.documentElement.scrollTop||document.body.scrollTop};function a(e){var n,t=0<arguments.length&&void 0!==e?e:0,r=u(),o=(t-r)/100,i=t;function c(){var e=u();window.scrollTo(0,e+o),e===t||r<i&&t<e||i<r&&e<t||(n=setTimeout(function(){return window.requestAnimationFrame(c)},10))}window.addEventListener("resize",function(){return clearTimeout(n),window.cancelAnimationFrame(c)}),window.requestAnimationFrame(c)}var l=document.querySelectorAll("[data-move-to]");Array.from(l).forEach(function(e){e.addEventListener("click",function(e){e.preventDefault();var n=e.currentTarget.dataset.moveTo;a(document.querySelector(n).scrollHeight)})});function d(){return(15*Math.random()+10)*(.5<Math.random()?1:-1)}var f=Array.from(document.querySelectorAll(".points"));window.addEventListener("scroll",r(function(){return f.forEach(function(e){return function(e){var n=d(),t=d(),r=e.style,o=r.backgroundPositionY,i=(r.backgroundPositionX,parseFloat(o.replace("px","")||0)+t),c=parseFloat(o.replace("px","")||0)+n;e.style.backgroundPositionY="".concat(i||0,"px"),e.style.backgroundPositionX="".concat(c||0,"px")}(e)})},20));var m=document.querySelector(".back-top");function s(){var e=window.innerHeight||document.document.documentElement.clientHeight||document.body.clientHeight,n=u()<e/2;m.style.opacity=n?0:1,setTimeout(function(){return m.style.display=n?"none":"block"},500)}window.addEventListener("scroll",r(function(){return s()}),30),s(),m.addEventListener("click",function(e){e.preventDefault(),a(0)})},{"./polyfill/array-from":2}],2:[function(e,n,t){"use strict";function d(e){return"function"==typeof e||"[object Function]"===r.call(e)}function f(e){var n=function(e){var n=Number(e);return isNaN(n)?0:0!==n&&isFinite(n)?(0<n?1:-1)*Math.floor(Math.abs(n)):n}(e);return Math.min(Math.max(n,0),o)}var r,o;Array.from||(Array.from=(r=Object.prototype.toString,o=Math.pow(2,53)-1,function(e,n,t){var r=Object(e);if(null==e)throw new TypeError("Array.from requires an array-like object - not null or undefined");var o,i=1<arguments.length?n:void 0;if(void 0!==i){if(!d(i))throw new TypeError("Array.from: when provided, the second argument must be a function");2<arguments.length&&(o=t)}for(var c,u=f(r.length),a=d(this)?Object(new this(u)):new Array(u),l=0;l<u;)c=r[l],a[l]=i?void 0===o?i(c,l):i.call(o,c,l):c,l+=1;return a.length=u,a}))},{}]},{},[1]);
//# sourceMappingURL=main.js.map
