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
    var pinFragment = document.createDocumentFragment();
    adverts.forEach(function (item) {
      pinFragment.appendChild(createPin(pinTemplate, item, item.id));
    });
    window.data.pinMap.appendChild(pinFragment);
  };

  var clearPins = function () {
    var pins = window.data.pinMap.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  // Устанавливает главный pin в стартовую позицию
  var resetPosMainPin = function () {
    window.data.mainPin.style.top = window.data.beginCoordsMainPin[0] + 'px';
    window.data.mainPin.style.left = window.data.beginCoordsMainPin[1] + 'px';
  };


  window.pin = {
    createPin: createPin,
    clearPins: clearPins,
    renderPins: renderPins,
    resetPosMainPin: resetPosMainPin
  };
})();
