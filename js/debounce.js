'use strict';

(function () {
  let DEBOUNCE_INTERVAL = 500;

  let lastTimeout;

  /**
   * устраняет дребезг при смене похожих вошебников
   * @param {Objest} cb - функция - коллбэк
   */
  const debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    debounce: debounce
  };
}());
