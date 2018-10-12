'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var inputTitle = form.querySelector('#title');
  var inputAddress = form.querySelector('#address');
  var inputPrice = form.querySelector('#price');
  var inputDesc = form.querySelector('#description');
  var selectType = form.querySelector('#type');
  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');
  var selectRooms = form.querySelector('#room_number');
  var selectCapacity = form.querySelector('#capacity');
  var inputAvatar = form.querySelector('#avatar');
  var inputImages = form.querySelector('#images');
  var checkBoxsFeatures = form.querySelectorAll('.features input[name=features]');

  var filters = window.data.filters.children;

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  /**
   * Заполняет поле адреса
   * Использует координаты .map__pin
   */
  var setAddress = function () {
    var xCoords = window.data.mainPin.offsetLeft + window.data.mainPin.offsetWidth / 2;
    var yCoords = window.data.mainPin.offsetTop + window.data.mainPin.offsetHeight;
    var coordsText = xCoords.toString() + ', ' + yCoords.toString();
    inputAddress.value = coordsText;
  };

  setAddress();


  // Активирует страницу
  var activatePage = function () {
    window.data.page.active = true;

    window.data.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    formFieldsets.forEach(function (item) {
      item.disabled = false;
    });

    for (var i = 0; i < filters.length; i++) {
      filters[i].disabled = false;
    }
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


  /**
   * Привеодит форму в неактивное состояние и сбрасывает значения
   */
  var resetForm = function () {
    form.classList.add('ad-form--disabled');
    formFieldsets.forEach(function (item) {
      item.disabled = true;
    });
    inputTitle.value = '';
    inputAddress.value = '';
    inputDesc.value = '';
    selectType.value = 'flat';
    setInputPrice(selectType.value);
    inputPrice.value = '';
    selectTimeIn.value = '12:00';
    selectRooms.value = '1';
    selectCapacity.value = '3';
    inputAvatar.value = '';
    inputImages.value = '';

    checkBoxsFeatures.forEach(function (item) {
      item.checked = false;
    });
  };


  var deactivatePage = function () {
    resetForm();
    window.pin.resetPosMainPin();
    setAddress();
    window.pin.clearPins();
    window.card.closeCard();
    window.data.map.classList.add('map--faded');
    window.data.page.active = false;
  };


  var submitSuccessHandler = function () {
    deactivatePage();

    var successNode = successTemplate.cloneNode(true);
    window.data.mainNode.appendChild(successNode);

    var closeSuccessMessage = function (node) {
      node.remove();
      node = null;

      document.removeEventListener('click', successNodeClickHandler);
      document.removeEventListener('keydown', successNodeEscPressHandler);
    };

    var successNodeClickHandler = function () {
      closeSuccessMessage(successNode);
    };

    var successNodeEscPressHandler = function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeSuccessMessage(successNode);
      }
    };

    document.addEventListener('click', successNodeClickHandler);
    document.addEventListener('keydown', successNodeEscPressHandler);
  };


  var submitErrorHandler = function (response, description) {
    var errorNode = errorTemplate.cloneNode(true);
    var errorTextNode = errorNode.querySelector('.error__message');
    var message = response;

    if (description) {
      message += '<br>' + description;
    }
    errorTextNode.innerHTML = message;
    window.data.mainNode.appendChild(errorNode);

    var closeErrorMessage = function () {
      document.removeEventListener('click', errorMessageClickHandler);
      document.removeEventListener('keydown', errorMessageEscPressHandler);

      window.data.mainNode.removeChild(errorNode);
      errorNode = null;
    };

    var errorMessageClickHandler = function () {
      closeErrorMessage();
    };

    var errorMessageEscPressHandler = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeErrorMessage();
      }
    };

    document.addEventListener('click', errorMessageClickHandler);
    document.addEventListener('keydown', errorMessageEscPressHandler);
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


  form.addEventListener('reset', function () {
    deactivatePage();
  });


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(form), submitSuccessHandler, submitErrorHandler);
  });


  window.form = {
    setAddress: setAddress,
    activatePage: activatePage
  };
})();
