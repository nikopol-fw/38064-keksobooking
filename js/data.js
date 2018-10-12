'use strict';

(function () {
  var PinCoord = {
    X: 130,
    Y: 630
  };
  var ESC_KEYCODE = 27;

  var page = {
    active: false,
    pinLoaded: false
  };

  var realtyTypeToDesc = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };


  // Main node основное содержимое страницы
  var mainNode = document.body.querySelector('main');

  // Блок карты
  var mapNode = document.querySelector('.map');

  // Контейнер для pin'ов
  var pinPoolNode = mapNode.querySelector('.map__pins');

  // Основной pin, который перетаскивается
  var mainPinNode = document.querySelector('.map__pin--main');

  // Начальные координаты основного pin
  var beginCoordsMainPin = {
    y: mainPinNode.offsetTop,
    x: mainPinNode.offsetLeft
  };

  // Форма фильтров
  var filterFormNode = document.querySelector('.map__filters');

  // Контейнер для формы с фильтрами
  var filterFormWrapperNode = mapNode.querySelector('.map__filters-container');

  window.data = {
    ESC_KEYCODE: ESC_KEYCODE,
    PinCoord: PinCoord,
    page: page,
    realtyTypeToDesc: realtyTypeToDesc,

    mainNode: mainNode,
    mapNode: mapNode,
    pinPoolNode: pinPoolNode,
    mainPinNode: mainPinNode,
    beginCoordsMainPin: beginCoordsMainPin,
    filterFormNode: filterFormNode,
    filterFormWrapperNode: filterFormWrapperNode,

    // Объявления
    adverts: undefined
  };
})();
