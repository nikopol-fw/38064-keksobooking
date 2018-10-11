'use strict';

(function () {
  /*
  // Выгружает pin'ы
  var renderPins = function () {
    window.data.pinMap.appendChild(window.pin.balloons);
  };
  */


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

      var loadSuccessHandler = function (response) {
        window.data.page.pinLoaded = true;
        window.data.adverts = response;

        window.pin.renderPins(window.data.adverts);

        // console.log(window.data.adverts);
      };

      var loadErrorHandler = function () {
        // console.log(response);
      };

      if (!window.data.page.active) {
        window.form.activatePage();

        window.backend.load(loadSuccessHandler, loadErrorHandler);
      } else if (!window.data.page.pinLoaded) {
        window.backend.load(loadSuccessHandler, loadErrorHandler);
      }

      window.form.setAddress();


      window.data.pinMap.addEventListener('click', function (clickEvt) {
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

  window.data.mainPin.addEventListener('mousedown', mouseDownMainPinHandler);


  window.card.pinClose.addEventListener('click', function () {
    window.card.closeCard();
  });
})();
