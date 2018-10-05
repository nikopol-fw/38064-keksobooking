'use strict';

(function () {
  // Выгружает pin'ы
  var renderPins = function () {
    window.data.pinMap.appendChild(window.pin.balloons);
  };

  /**
   * Заполняет карточку объявления данными и отображает ее
   *
   * @param {number} index Целое число, итератор элемента в массиве js-объектов объявлений advertisements
   */
  var showAdCard = function (index) {
    window.card.cardPanel.classList.add('hidden');
    window.card.setCard(window.data.adverts[index]);
    window.card.cardPanel.classList.remove('hidden');
  };

  // Скрывает карточку объявления
  var closeCard = function () {
    window.card.cardPanel.classList.add('hidden');

    document.removeEventListener('keydown', cardEscPressHandler);
  };


  var cardEscPressHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeCard();
    }
  };

  var moveMainPin = function (shift) {
    var newCoords = {
      x: window.data.mainPin.offsetLeft - shift.x,
      y: window.data.mainPin.offsetTop - shift.y
    };

    var xMin = 0 - window.data.mainPin.clientWidth / 2;
    var xMax = window.data.pinMap.clientWidth - window.data.mainPin.clientWidth / 2;
    if (newCoords.x < xMin) {
      newCoords.x = xMin;
    }
    if (newCoords.x > xMax) {
      newCoords.x = xMax;
    }

    var yMin = window.data.Y_BALLOON_CHOORDINATES[0] - window.data.mainPin.clientHeight;
    var yMax = window.data.Y_BALLOON_CHOORDINATES[1] - window.data.mainPin.clientHeight;

    if (newCoords.y < yMin) {
      newCoords.y = yMin;
    }

    if (newCoords.y > yMax) {
      newCoords.y = yMax;
    }

    window.data.mainPin.style.top = (newCoords.y) + 'px';
    window.data.mainPin.style.left = (newCoords.x) + 'px';
  };

  var mouseDownMainPinHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (movEvt) {
      var shift = {
        x: startCoords.x - movEvt.clientX,
        y: startCoords.y - movEvt.clientY
      };

      startCoords = {
        x: movEvt.clientX,
        y: movEvt.clientY
      };

      moveMainPin(shift);
    };

    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      window.form.activatePage();
      window.form.setAddress();
      renderPins();

      window.data.pinMap.addEventListener('click', function (clickEvt) {
        var obj = clickEvt.currentTarget;
        var item = clickEvt.target;

        while (item !== obj) {
          if (item.classList.contains('map__pin') && !item.classList.contains('map__pin--main')) {
            var pinIndex = item.getAttribute('data-pin-index');
            showAdCard(pinIndex);

            document.addEventListener('keydown', cardEscPressHandler);

            return;
          }

          item = item.parentNode;
        }
      });
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.data.mainPin.addEventListener('mousedown', mouseDownMainPinHandler);


  window.card.pinClose.addEventListener('click', function () {
    closeCard();
  });
})();
