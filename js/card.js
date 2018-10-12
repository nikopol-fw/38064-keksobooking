'use strict';

(function () {
  // Получаем шаблон карточки объявления
  // Создаем карточку на основе шаблона и скрываем ее
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardPanel = cardTemplate.cloneNode(true);
  cardPanel.classList.add('hidden');

  /**
   * Возвращаем domElement <li> с соответствующим удобству css-классом
   *
   * @param  {strung} feature Строка, название удобства из списка FEATURES
   * @return {object} domElement <li>
   */
  var createFeaturesItemNode = function (feature) {
    var item = document.createElement('li');
    item.classList.add('popup__feature');

    var classModify = 'popup__feature--' + feature;

    item.classList.add(classModify);

    return item;
  };

  /**
   * Возвращает domElement <img>, фотография жилья с необходимым scr
   *
   * @param  {string} photoSrc Строка, url картинки
   * @return {object} domElement img
   */
  var createPhoto = function (photoSrc) {
    var item = document.createElement('img');
    item.src = photoSrc;
    item.classList.add('popup__photo');
    item.alt = 'Фотография жилья';
    item.width = 45;
    item.height = 40;

    return item;
  };

  /**
   * Возвращает очищенный (без дочерних элементов) domElement
   *
   * @param  {object} node domElement, у которого необходимо удалить все дочерние элементы
   * @return {object} domElement
   */
  var eraseNode = function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    return node;
  };

  /**
   * Заполняет данные в блок объявления .cardPanel
   *
   * @param {object} adv Объект, содержащий информацию объявления, созданный функцией createAd
   */
  var setCard = function (adv) {
    cardPanel.querySelector('.popup__title').textContent = adv.offer.title;
    cardPanel.querySelector('.popup__text--address').textContent = adv.offer.address;
    cardPanel.querySelector('.popup__text--price').textContent = adv.offer.price.toString() + ' ₽/ночь';
    cardPanel.querySelector('.popup__type').textContent = window.data.realtyTypeToDesc[adv.offer.type];
    cardPanel.querySelector('.popup__text--capacity').textContent = adv.offer.rooms.toString() + ' комнаты для ' + adv.offer.guests.toString() + ' гостей';
    cardPanel.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;

    var featuresFragment = document.createDocumentFragment();
    for (var j = 0; j < adv.offer.features.length; j++) {
      featuresFragment.appendChild(createFeaturesItemNode(adv.offer.features[j]));
    }
    var featuresNode = cardPanel.querySelector('.popup__features');
    eraseNode(featuresNode);
    featuresNode.appendChild(featuresFragment);

    cardPanel.querySelector('.popup__description').textContent = adv.offer.description;

    var photosFragment = document.createDocumentFragment();
    for (j = 0; j < adv.offer.photos.length; j++) {
      photosFragment.appendChild(createPhoto(adv.offer.photos[j]));
    }
    var photosNode = cardPanel.querySelector('.popup__photos');
    eraseNode(photosNode);
    photosNode.appendChild(photosFragment);

    cardPanel.querySelector('.popup__avatar').src = adv.author.avatar;
  };

  var cardEscPressHandler = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeCard();
    }
  };

  /**
   * Заполняет карточку объявления данными и отображает ее
   *
   * @param {number} index Целое число, итератор элемента в массиве js-объектов объявлений advertisements
   */
  var showCard = function (index) {
    window.card.cardPanel.classList.add('hidden');
    window.card.setCard(window.data.adverts[index]);
    window.card.cardPanel.classList.remove('hidden');
  };

  // Скрывает карточку объявления
  var closeCard = function () {
    window.card.cardPanel.classList.add('hidden');

    document.removeEventListener('keydown', cardEscPressHandler);
  };


  // Создаем карточку для объявлений
  window.data.mapNode.insertBefore(cardPanel, window.data.filterFormWrapperNode);

  // Кнопка закрытия карточки
  var pinClose = document.querySelector('.popup__close');


  window.card = {
    cardPanel: cardPanel,
    pinClose: pinClose,
    setCard: setCard,
    showCard: showCard,
    closeCard: closeCard,
    cardEscPressHandler: cardEscPressHandler
  };
})();
