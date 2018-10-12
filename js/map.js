'use strict';

(function () {
  var moveMainPin = function (shift) {
    var newCoords = {
      x: window.data.mainPinNode.offsetLeft - shift.x,
      y: window.data.mainPinNode.offsetTop - shift.y
    };

    var xMin = 0 - window.data.mainPinNode.clientWidth / 2;
    var xMax = window.data.pinPoolNode.clientWidth - window.data.mainPinNode.clientWidth / 2;
    if (newCoords.x < xMin) {
      newCoords.x = xMin;
    }
    if (newCoords.x > xMax) {
      newCoords.x = xMax;
    }

    var yMin = window.data.PinCoord.X - window.data.mainPinNode.clientHeight;
    var yMax = window.data.PinCoord.Y - window.data.mainPinNode.clientHeight;

    if (newCoords.y < yMin) {
      newCoords.y = yMin;
    }

    if (newCoords.y > yMax) {
      newCoords.y = yMax;
    }

    window.data.mainPinNode.style.top = (newCoords.y) + 'px';
    window.data.mainPinNode.style.left = (newCoords.x) + 'px';
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


      var loadSuccessHandler = function (response) {
        window.data.page.pinLoaded = true;
        window.data.adverts = response;

        // Добавляем индексы каждому объявлению
        window.data.adverts.forEach(function (item, index) {
          item.id = index;
        });

        window.pin.renderPins(window.data.adverts);
      };

      var loadErrorHandler = window.message.error;

      if (!window.data.page.active) {
        window.form.activatePage();

        window.backend.load(loadSuccessHandler, loadErrorHandler);
      } else if (!window.data.page.pinLoaded) {
        window.backend.load(loadSuccessHandler, loadErrorHandler);
      }

      window.form.setAddress();


      window.data.pinPoolNode.addEventListener('click', function (clickEvt) {
        var obj = clickEvt.currentTarget;
        var item = clickEvt.target;

        while (item !== obj) {
          if (item.classList.contains('map__pin') && !item.classList.contains('map__pin--main')) {
            var pinIndex = item.getAttribute('data-pin-index');
            window.card.showCard(pinIndex);

            document.addEventListener('keydown', window.card.cardEscPressHandler);

            return;
          }

          item = item.parentNode;
        }
      });
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  window.data.mainPinNode.addEventListener('mousedown', mouseDownMainPinHandler);


  window.card.pinClose.addEventListener('click', function () {
    window.card.closeCard();
  });
})();
