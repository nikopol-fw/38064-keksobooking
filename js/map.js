'use strict';

var REALTY_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var REALTY_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};

var CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var Y_BALLOON_CHOORDINATES = [130, 630];
var BALLOON_WIDTH = 50;
var BALLOON_HEIGHT = 70;

var AD_NUMBER = 8;
var AVATAR_NUMBER = 8;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_GUESTS = 1;
var MAX_GUESTS = 100;


var ESC_KEYCODE = 27;

/**
 * Возвращает итератор случайного элемента массива
 *
 * @arr    {array} Массив с элементами для выборки
 * @return {number} случайное число от 0 до @arr.length
 */
var getRandomIteratorArray = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

/**
 * Возвращает массив перемешанный по алгоритму Фишера-Йетса
 *
 * @arr    {array} Массив, который необходимо перемешать
 * @return {array} Перемешанный массив
 */
var shuffleArray = function (arr) {
  for (var j = arr.length - 1; j > 0; j--) {
    var rndm = Math.floor(Math.random() * (j + 1));
    var temp = arr[rndm];
    arr[rndm] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

/**
 * Возвращает случайное значение между min и max с равномерным распределением
 *
 * @min    {number} Целое число, минимальная граница диапазона для выборки случайного числа
 * @max    {number} Целое число, максимальная граница
 * @return {number} Целое число
 */
var getRandomBetweenMinMax = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

/**
 * Возвращает url для Аватарки
 *
 * @listOfAvatars {array} Массив (перемешанный) с номерами картинок аватаров (будет извлечен последний элемент из массива)
 * @return        {string} строка с url'ом аватарка вида 'img/avatars/user01.png'
 */
// Возвращает url для Аватарки
// @listOfAvatars - массив (перемешанный) с номерами картинок аватаров (будет извлечен последний элемент из массива)
var getAvatar = function (listOfAvatars) {
  if (listOfAvatars.length === 0) {
    return -1;
  }

  var imgNumber = listOfAvatars.pop();
  var imgUrl = imgNumber.toString();

  if (imgNumber < 10) {
    imgUrl = '0' + imgUrl;
  }

  imgUrl = 'img/avatars/user' + imgUrl + '.png';
  return imgUrl;
};

/**
 * Возвращает строку-заголовок для объявления из массива заголовков
 *
 * @listOfTitles {array} Массив (перемешанный) с названиями (будет извлечен последний элемент из массива)
 * @return       {string} Строка с заголовком для объявления
 */
var getTitle = function (listOfTitles) {
  if (listOfTitles.length === 0) {
    return -1;
  }

  var newTitle = listOfTitles.pop();
  newTitle.toString();
  return newTitle;
};

/**
 * Возвращает случайное значение от 1 до ширины переданного блока (получение x-координаты для balloon)
 *
 * @container {object} domElement ширина которого будет приниматься за максимальную x-координату
 * @return    {number} Координата X
 */
var getBalloonXCoords = function (container) {
  var containerWidth = container.clientWidth;
  var newCoord = getRandomBetweenMinMax(1, containerWidth);
  newCoord -= BALLOON_WIDTH / 2;
  return newCoord;
};

/**
 * Возвращает объект с информацией о новом объявлении
 *
 * @listOfAvatars {array} Массив с номерами от 1 до количества картинок с аватарами для генерации url'а картинки (массив будет уменьшаться на извелеченный элемент, splice)
 * @listOfTitles  {array} Массив строк с названиями объявлений (массив будет уменьшаться на извелеченный элемент, splice)
 * @balloonPlace  {object} domElement в котором будут располагаться balloons
 * @balloonCoords {array} Двумерный массив с верхней и нижней y-координатами balloons
 * @return        {object} Объект-объявления
 */
var createAd = function (listOfAvatars, listOfTitles, balloonPlace, balloonCoords) {
  var xLocation = getBalloonXCoords(balloonPlace);
  var yLocation = getRandomBetweenMinMax(balloonCoords[0], balloonCoords[1]) - BALLOON_HEIGHT;
  var newAddress = xLocation.toString() + ', ' + yLocation.toString();

  var newFeatures = shuffleArray(FEATURES.slice()).slice(0, getRandomBetweenMinMax(1, FEATURES.length));

  var realtyTypes = Object.keys(REALTY_TYPES);

  var newAd = {
    'author': {
      'avatar': getAvatar(listOfAvatars)
    },
    'offer': {
      'title': getTitle(listOfTitles),
      'address': newAddress,
      'price': getRandomBetweenMinMax(MIN_PRICE, MAX_PRICE),
      'type': REALTY_TYPES[realtyTypes[getRandomIteratorArray(realtyTypes)]],
      'rooms': getRandomBetweenMinMax(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomBetweenMinMax(MIN_GUESTS, MAX_GUESTS),
      'checkin': CHECK_IN_OUT[getRandomIteratorArray(CHECK_IN_OUT)],
      'checkout': CHECK_IN_OUT[getRandomIteratorArray(CHECK_IN_OUT)],
      'features': newFeatures,
      'description': '',
      'photos': shuffleArray(PHOTOS.slice())
    },
    'location': {
      'x': xLocation,
      'y': yLocation
    }
  };

  return newAd;
};

/**
 * Возвразает domElement balloon'а
 *
 * @template {object} node (разметка balloon'а)
 * @advert   {object} Объект типа объявление, созданный функцией createAd
 * @index    {number} Индекс-номер balloon'а
 * @return   {object} domElement balloon'а
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

/**
 * Возвращаем domElement <li> с соответствующим удобству css-классом
 *
 * @feature {strung} Строка, название удобства из списка FEATURES
 * @return  {object} domElement <li>
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
 * @photoSrc {string} Строка, url картинки
 * @return   {object} domElement img
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
 * node   {object} domElement, у которого необходимо удалить все дочерние элементы
 * return {object} domElement
 */
var eraseNode = function (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  return node;
};


// Получаем шаблон карточки объявления
// Создаем карточку на основе шаблона и скрываем ее
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var card = cardTemplate.cloneNode(true);
card.classList.add('hidden');

/**
 * Заполняет данные в блок объявления .card
 *
 * @adv {object} Объект, содержащий информацию объявления, созданный функцией createAd
 */
var setCard = function (adv) {
  card.querySelector('.popup__title').textContent = adv.offer.title;
  card.querySelector('.popup__text--address').textContent = adv.offer.address;
  card.querySelector('.popup__text--price').textContent = adv.offer.price.toString() + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = adv.offer.type;
  card.querySelector('.popup__text--capacity').textContent = adv.offer.rooms.toString() + ' комнаты для ' + adv.offer.guests.toString() + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;

  var featuresFragment = document.createDocumentFragment();
  for (i = 0; i < adv.offer.features.length; i++) {
    featuresFragment.appendChild(createFeaturesItemNode(adv.offer.features[i]));
  }
  var featuresNode = card.querySelector('.popup__features');
  eraseNode(featuresNode);
  featuresNode.appendChild(featuresFragment);

  card.querySelector('.popup__description').textContent = adv.offer.description;

  var photosFragment = document.createDocumentFragment();
  for (i = 0; i < adv.offer.photos.length; i++) {
    photosFragment.appendChild(createPhoto(adv.offer.photos[i]));
  }
  var photosNode = card.querySelector('.popup__photos');
  eraseNode(photosNode);
  photosNode.appendChild(photosFragment);

  card.querySelector('.popup__avatar').src = adv.author.avatar;
};


var mapMainPin = document.querySelector('.map__pin');
/**
 * Заполняет поле адреса
 * Использует координаты .map__pin
 */
var setAddress = function () {
  var xCoords = mapMainPin.offsetLeft + mapMainPin.offsetWidth / 2;
  var yCoords = mapMainPin.offsetTop + mapMainPin.offsetHeight / 2;
  var coordsText = xCoords.toString() + ', ' + yCoords.toString();
  inputAddress.value = coordsText;
};


// Блок карты
var map = document.querySelector('.map');
// Форма объявления
var formAd = document.querySelector('.ad-form');
// Группы полей формы объявления
var fieldsetsFormAd = formAd.querySelectorAll('fieldset');
// Форма с фильтрами объявлений
var formFilterMap = document.querySelector('.map__filters');
// Фильтры в форме
var filtersMap = formFilterMap.children;

// Активирует страницу
var activatePage = function () {
  map.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');

  fieldsetsFormAd.forEach(function (item) {
    item.disabled = false;
  });

  for (var j = 0; j < filtersMap.length; j++) {
    filtersMap[j].disabled = false;
  }
};


// Выгружает pin'ы
var renderPins = function () {
  pinMap.appendChild(balloonFragmen);
};


/**
 * Заполняет карточку объявления данными и отображает ее
 *
 * @index - целое число, итератор элемента в массиве js-объектов объявлений advertisements
 */
var showAdCard = function (index) {
  card.classList.add('hidden');
  setCard(advertisements[index]);
  card.classList.remove('hidden');
};


// Контейнер для pin'ов
var pinMap = map.querySelector('.map__pins');

// Контейнер для формы с фильтрами
var filterMap = map.querySelector('.map__filters-container');

// Поле адреса
var inputAddress = formAd.querySelector('#address');


// Создаем карточку для объявлений
map.insertBefore(card, filterMap);

// Кнопка закрытия карточки
var pinClose = document.querySelector('.popup__close');


// Создаем список с номерами файлов для аватарок
var avatarsList = [];
for (var i = 1; i <= AVATAR_NUMBER; i++) {
  avatarsList.push(i);
}
// Перемешиваем массив с номерами аватарок
var avatarsRandomList = shuffleArray(avatarsList);

// Создаем перемешанную копию массива с названиями
var titlesRandomList = shuffleArray(REALTY_TITLES.slice());


// Создаем массив объявлений
var advertisements = [];
for (i = 0; i < AD_NUMBER; i++) {
  advertisements.push(createAd(avatarsRandomList, titlesRandomList, pinMap, Y_BALLOON_CHOORDINATES));
}


// Получаем шаблон balloon'а
// Создаем фрагмент. Наполняем его элементами и размещаем в контейнере
var balloonTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var balloonFragmen = document.createDocumentFragment();
for (i = 0; i < advertisements.length; i++) {
  balloonFragmen.appendChild(createPin(balloonTemplate, advertisements[i], i));
}


// Задать начальный адрес в input address
setAddress();


// Скрывает карточку объявления
var closeCard = function () {
  card.classList.add('hidden');

  document.removeEventListener('keydown', cardEscPressHandler);
};

var cardEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
};


mapMainPin.addEventListener('mouseup', function () {
  activatePage();
  setAddress();
  renderPins();

  pinMap.addEventListener('click', function (evt) {
    var obj = evt.currentTarget;
    var item = evt.target;

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
});

pinClose.addEventListener('click', function () {
  closeCard();
});
