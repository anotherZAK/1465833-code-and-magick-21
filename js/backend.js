'use strict';

(function () {
  const TIMEOUT_MS = 2500;
  const StatusCode = {
    OK: 200
  };

  /**
   * отправляет данные формы на сервер
   * @param {Object} data - данные формы
   * @param {Object} onLoad - функция успешной обработки данных
   * @param {Object} onError - функция неуспешной обработки данных
   */
  const save = function (data, onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_MS;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(`Данные успешно отправлены!`);
      } else {
        onError(`Данные не отправлены. Статус ответа: ${xhr.status} ${xhr.statusText}.`);
      }
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Данные не отправлены. Запрос не выполнился за ${xhr.timeout} мс.`);
    });

    let URL = `https://21.javascript.pages.academy/code-and-magick`;
    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  /**
   * получает данные от сервера
   * @param {Object} onLoad - функция успешной обработки данных
   * @param {Object} onError - функция неуспешной обработки данных
   */
  const load = function (onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT_MS;

    let URL = `https://21.javascript.pages.academy/code-and-magick/data`;
    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Данные не загружены. Статус ответа: ${xhr.status} ${xhr.statusText}.`);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Данные не загружены. Произошла ошибка соединения.`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Данные не загружены. Запрос не выполнился за ${xhr.timeout} мс.`);
    });

    xhr.send();
  };
  window.backend = {
    save: save,
    load: load
  };
}());
