'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var inputAddress = form.querySelector('#address');
  var inputPrice = form.querySelector('#price');
  var selectType = form.querySelector('#type');
  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');
  var selectRooms = form.querySelector('#room_number');
  var selectCapacity = form.querySelector('#capacity');
  var resetBtnNode = form.querySelector('.ad-form__reset');

  var filters = window.data.filterFormNode.children;

  /**
   * Заполняет поле адреса
   * Использует координаты .map__pin
   */
  var setAddress = function () {
    var xCoords = window.data.mainPinNode.offsetLeft + window.data.mainPinNode.offsetWidth / 2;
    var yCoords = window.data.mainPinNode.offsetTop + window.data.mainPinNode.offsetHeight;
    var coordsText = xCoords.toString() + ', ' + yCoords.toString();
    inputAddress.value = coordsText;
  };

  setAddress();


  // Активирует страницу
  var activatePage = function () {
    window.data.page.active = true;

    window.data.mapNode.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    formFieldsets.forEach(function (item) {
      item.disabled = false;
    });

    for (var i = 0; i < filters.length; i++) {
      filters[i].disabled = false;
    }
  };

  var deactivatePage = function () {
    resetForm();
    resetFilter();
    window.pin.resetPosMainPin();
    setAddress();
    window.pin.clearPins();
    window.card.closeCard();
    window.data.mapNode.classList.add('map--faded');
    window.data.page.active = false;
  };

  /**
   * Задает атрибут min и placeholder полю #price цена за ночь
   * В зависимости от переданного значения select'a #type Тип жилья
   *
   * @param {string} realty атрибут value select'a #type
   */
  var setInputPrice = function (realty) {
    var minPrices = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    inputPrice.min = minPrices[realty];
    inputPrice.placeholder = minPrices[realty];
  };

  setInputPrice(selectType.value);


  /**
   * Задает переданному select'у переданное значение
   * @param {object} select domElement select которому нужно задать такой же value
   * @param {string} val    value select'a который нужно задать другому select
   */
  var setTimeInOut = function (select, val) {
    select.value = val;
  };

  /**
   * Проверяет соответствие полей количества комнат и гостей и задает кастомную соответствующую валидацию
   */
  var checkRooms = function () {
    var message = '';
    if (+selectRooms.value < +selectCapacity.value) {
      message = 'Количество гостей не должно превышать количество комнат';
    }

    if ((selectRooms.value === '100' && selectCapacity.value !== '0') || (selectRooms.value !== '100' && selectCapacity.value === '0')) {
      message = '100 комнат предназначены не для гостей';
    }

    selectCapacity.setCustomValidity(message);
  };

  checkRooms();


  // Приводит форму в неактивное состояние и сбрасывает значения
  var resetForm = function () {
    form.reset();

    setInputPrice(selectType.value);
    form.classList.add('ad-form--disabled');

    formFieldsets.forEach(function (item) {
      item.disabled = true;
    });
  };

  // Сбрасывает фильтры
  var resetFilter = function () {
    window.data.filterFormNode.reset();

    for (var i = 0; i < filters.length; i++) {
      filters[i].disabled = true;
    }
  };


  selectType.addEventListener('change', function (evt) {
    setInputPrice(evt.target.value);
  });

  selectTimeIn.addEventListener('change', function (evt) {
    setTimeInOut(selectTimeOut, evt.target.value);
  });

  selectTimeOut.addEventListener('change', function (evt) {
    setTimeInOut(selectTimeIn, evt.target.value);
  });

  selectRooms.addEventListener('change', function () {
    checkRooms();
  });

  selectCapacity.addEventListener('change', function () {
    checkRooms();
  });


  resetBtnNode.addEventListener('click', function (evt) {
    evt.preventDefault();
    deactivatePage();
  });


  var submitSuccessHandler = window.message.success;
  var submitErrorHandler = window.message.error;

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), submitSuccessHandler, submitErrorHandler);
  });


  window.form = {
    setAddress: setAddress,
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };
})();
