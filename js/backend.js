'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';


  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Непредвиденная ошибка', 'Статус ответа: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL_GET);
    xhr.send();
  };


  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('При отправке данных произошла ошибка.', 'Статус ответа: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    upload: upload
  };
})();
