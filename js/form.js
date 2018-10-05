'use strict';

(function () {

  /**
   * Заполняет поле адреса
   * Использует координаты .map__pin
   */
  var setAddress = function () {
    var xCoords = window.data.mainPin.offsetLeft + window.data.mainPin.offsetWidth / 2;
    var yCoords = window.data.mainPin.offsetTop + window.data.mainPin.offsetHeight;
    var coordsText = xCoords.toString() + ', ' + yCoords.toString();
    window.data.formAdvInputAddress.value = coordsText;
  };

  // Активирует страницу
  var activatePage = function () {
    window.data.map.classList.remove('map--faded');
    window.data.formAdv.classList.remove('ad-form--disabled');

    window.data.formAdvFieldsets.forEach(function (item) {
      item.disabled = false;
    });

    for (var j = 0; j < window.data.filters; j++) {
      window.data.filters[j].disabled = false;
    }
  };


  // Задать начальный адрес в input address
  setAddress();


  var selectTypeRealty = window.data.formAdv.querySelector('#type');
  var inputPrice = window.data.formAdv.querySelector('#price');

  var selectTimeIn = window.data.formAdv.querySelector('#timein');
  var selectTimeOut = window.data.formAdv.querySelector('#timeout');

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
    if (+selectRoomNumber.value < +selectCapacity.value) {
      message = 'Количество гостей не должно превышать количество комнат';
    }

    if ((selectRoomNumber.value === '100' && selectCapacity.value !== '0') || (selectRoomNumber.value !== '100' && selectCapacity.value === '0')) {
      message = '100 комнат предназначены не для гостей';
    }

    selectCapacity.setCustomValidity(message);
  };


  setInputPrice(selectTypeRealty.value);

  selectTypeRealty.addEventListener('change', function (evt) {
    setInputPrice(evt.target.value);
  });


  selectTimeIn.addEventListener('change', function (evt) {
    setTimeInOut(selectTimeOut, evt.target.value);
  });

  selectTimeOut.addEventListener('change', function (evt) {
    setTimeInOut(selectTimeIn, evt.target.value);
  });


  var selectRoomNumber = window.data.formAdv.querySelector('#room_number');
  var selectCapacity = window.data.formAdv.querySelector('#capacity');


  checkRooms();

  selectRoomNumber.addEventListener('change', function () {
    checkRooms();
  });

  selectCapacity.addEventListener('change', function () {
    checkRooms();
  });


  window.form = {
    setAddress: setAddress,
    activatePage: activatePage
  };
})();
