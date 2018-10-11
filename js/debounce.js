'use strict';

(function () {
  window.debounce = function (func, interval) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        func.apply(null, args);
      }, interval);
    };
  };
})();
