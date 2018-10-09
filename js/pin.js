'use strict';

(function () {
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

  // Устанавливает главный pin в стартовую позицию
  var resetPosMainPin = function () {
    window.data.mainPin.style.top = window.data.beginCoordsMainPin[0] + 'px';
    window.data.mainPin.style.left = window.data.beginCoordsMainPin[1] + 'px';
  };


  // Получаем шаблон balloon'а
  // Создаем фрагмент. Наполняем его элементами и размещаем в контейнере
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  //  var balloonFragment = document.createDocumentFragment();
  //  for (var i = 0; i < window.data.adverts.length; i++) {
  //    balloonFragment.appendChild(createPin(balloonTemplate, window.data.adverts[i], i));
  //  }


  window.pin = {
    pinTemplate: pinTemplate,
    createPin: createPin,
    resetPosMainPin: resetPosMainPin
  };
})();
