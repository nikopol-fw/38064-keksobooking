'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * Возвразает domElement balloon'а
   *
   * @param  {object} template node (разметка balloon'а)
   * @param  {object} advert Объект типа объявление, созданный функцией createAd
   * @param  {number} index Индекс-номер balloon'а
   * @return {object} domElement balloon'а
   */
  var createPin = function (template, advert, index) {
    var newNode = template.cloneNode(true);
    var newNodeImg = newNode.querySelector('img');

    newNode.style.left = advert.location.x.toString() + 'px';
    newNode.style.top = advert.location.y.toString() + 'px';

    newNodeImg.src = advert.author.avatar;
    newNodeImg.alt = advert.offer.title;

    newNode.dataset.pinIndex = index;

    return newNode;
  };

  var renderPins = function (adverts) {
    var pinLimit = 5;

    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length && i < pinLimit; i++) {
      pinFragment.appendChild(createPin(pinTemplate, adverts[i], adverts[i].id));
    }
    window.data.pinPoolNode.appendChild(pinFragment);
  };

  var clearPins = function () {
    var pins = window.data.pinPoolNode.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  // Устанавливает главный pin в стартовую позицию
  var resetPosMainPin = function () {
    window.data.mainPinNode.style.top = window.data.beginCoordsMainPin.y + 'px';
    window.data.mainPinNode.style.left = window.data.beginCoordsMainPin.x + 'px';
  };


  window.pin = {
    createPin: createPin,
    clearPins: clearPins,
    renderPins: renderPins,
    resetPosMainPin: resetPosMainPin
  };
})();
