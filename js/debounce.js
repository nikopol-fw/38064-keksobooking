'use strict';

(function () {
  window.debounce = function (interval, func) {
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
