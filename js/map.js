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


// Возвращает итератор случайного элемента массива
// @arr - массив с элементами для выборки
var getRandomIteratorArray = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Возвращает массив перемешанный по алгоритму Фишера-Йетса
// @arr - массив, который необходимо перемешать
var shuffleArray = function (arr) {
  for (var j = arr.length - 1; j > 0; j--) {
    var rndm = Math.floor(Math.random() * (j + 1));
    var temp = arr[rndm];
    arr[rndm] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

// Возвращает случайное значение между min и max с равномерным распределением
// @min - целое число, минимальная граница диапазона для выборки случайного числа
// @max - целое число, максимальная граница
var getRandomBetweenMinMax = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

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

// Возвращает строку-заголовок для объявления из массива заголовков
// @listOfTitles - массив (перемешанный) с названиями (будет извлечен последний элемент из массива)
var getTitle = function (listOfTitles) {
  if (listOfTitles.length === 0) {
    return -1;
  }

  var newTitle = listOfTitles.pop();
  return newTitle;
};

// Возвращает случайное значение от 1 до ширины переданного блока (получение x-координаты для balloon)
// @container - domElement ширина которого будет приниматься за максимальную x-координату
var getBalloonXCoords = function (container) {
  var containerWidth = container.clientWidth;
  var newCoord = getRandomBetweenMinMax(1, containerWidth);
  newCoord -= BALLOON_WIDTH / 2;
  return newCoord;
};


var avatarsList = [];
for (var i = 1; i <= AVATAR_NUMBER; i++) {
  avatarsList.push(i);
}

var avatarsRandomList = shuffleArray(avatarsList);
var titlesRandomList = shuffleArray(REALTY_TITLES.slice());

var map = document.querySelector('.map');
var pinMap = map.querySelector('.map__pins');
var filterMap = map.querySelector('.map__filters-container');

// Возвращает объект с информацией о новом объявлении
// @listOfAvatars - массив с номерами от 1 до количества картинок с аватарами для генерации url'а картинки (массив будет уменьшаться на извелеченный элемент, splice)
// @listOfTitles - массив строк с названиями объявлений (массив будет уменьшаться на извелеченный элемент, splice)
// @balloonPlace - domElement в котором будут располагаться balloons
// @balloonCoords - двумерный массив с верхней и нижней y-координатами balloons
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


// Создаем массив объявлений
var advertisements = [];
for (i = 0; i < AD_NUMBER; i++) {
  advertisements.push(createAd(avatarsRandomList, titlesRandomList, pinMap, Y_BALLOON_CHOORDINATES));


}


// Возвразает domElement balloon'а
// @template - node (разметка balloon'а)
// @advert - объект типа объявление, созданный функцией createAd
var createAdvertisementNode = function (template, advert) {
  var newNode = template.cloneNode(true);
  var newNodeImg = newNode.querySelector('img');

  newNode.style.left = advert.location.x.toString() + 'px';
  newNode.style.top = advert.location.y.toString() + 'px';

  newNodeImg.src = advert.author.avatar;
  newNodeImg.alt = advert.offer.title;

  return newNode;
};


// Получаем шаблон balloon'а
// Создаем фрагмент. Наполняем его элементами и размещаем в контейнере
var balloonTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var balloonFragmen = document.createDocumentFragment();
for (i = 0; i < advertisements.length; i++) {
  balloonFragmen.appendChild(createAdvertisementNode(balloonTemplate, advertisements[i]));
}
// pinMap.appendChild(balloonFragmen);


// Возвращаем domElement <li> с соответствующим удобству css-классом
// @feature - строка, название удобства из списка FEATURES
var createFeaturesItemNode = function (feature) {
  var item = document.createElement('li');
  item.classList.add('popup__feature');

  var classModify = 'popup__feature--' + feature;

  item.classList.add(classModify);

  return item;
};

// Возвращает domElement <img>, фотография жилья с необходимым scr
// @photoSrc - строка, url картинки
var createPhotoNode = function (photoSrc) {
  var item = document.createElement('img');
  item.src = photoSrc;
  item.classList.add('popup__photo');
  item.alt = 'Фотография жилья';
  item.width = 45;
  item.height = 40;

  return item;
};

// Возвращает очищенный (без дочерних элементов) domElement
// node - domElement, у которого необходимо удалить все дочерние элементы
var eraseNode = function (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  return node;
};

// Возвращает domElement блок объявления
// @template - domElement (разметка объявления)
// @adv - объект, содержащий информацию объявления, созданный функцией createAd
var createCardNode = function (template, adv) {
  var newNode = template.cloneNode(true);

  newNode.querySelector('.popup__title').textContent = adv.offer.title;
  newNode.querySelector('.popup__text--address').textContent = adv.offer.address;
  newNode.querySelector('.popup__text--price').textContent = adv.offer.price.toString() + ' ₽/ночь';
  newNode.querySelector('.popup__type').textContent = adv.offer.type;

  newNode.querySelector('.popup__text--capacity').textContent = adv.offer.rooms.toString() + ' комнаты для ' + adv.offer.guests.toString() + ' гостей';
  newNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;

  var featuresFragment = document.createDocumentFragment();
  for (i = 0; i < adv.offer.features.length; i++) {
    featuresFragment.appendChild(createFeaturesItemNode(adv.offer.features[i]));
  }
  var featuresNode = newNode.querySelector('.popup__features');
  eraseNode(featuresNode);
  featuresNode.appendChild(featuresFragment);

  newNode.querySelector('.popup__description').textContent = adv.offer.description;

  var photosFragment = document.createDocumentFragment();
  for (i = 0; i < adv.offer.photos.length; i++) {
    photosFragment.appendChild(createPhotoNode(adv.offer.photos[i]));
  }
  var photosNode = newNode.querySelector('.popup__photos');
  eraseNode(photosNode);
  photosNode.appendChild(photosFragment);

  newNode.querySelector('.popup__avatar').src = adv.author.avatar;

  return newNode;
};


// Получаем шаблон карточки объявления
// Создаем карточку с информацией из первого элемента из списка объявлений
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var card = createCardNode(cardTemplate, advertisements[0]);
// map.insertBefore(card, filterMap);


var mapMainPin = document.querySelector('.map__pin');
var formAd = document.querySelector('.ad-form');
var fieldsetsFormAd = formAd.querySelectorAll('fieldset');
var filtersFormMap = document.querySelector('.map__filters');
var filtersMap = filtersFormMap.children;

var coordsMainPinBegin = (mapMainPin.offsetLeft + mapMainPin.offsetWidth / 2).toString() + ', ' + (mapMainPin.offsetTop + mapMainPin.offsetHeight / 2).toString();

var inputAddress = formAd.querySelector('#address');
inputAddress.value = coordsMainPinBegin;

// Активация форм
var activatePage = function () {
  map.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  for (var j = 0; j < fieldsetsFormAd.length; j++) {
    fieldsetsFormAd[j].disabled = false;
  }

  for (j = 0; j < filtersMap.length; j++) {
    filtersMap[j].disabled = false;
  }
};

//


mapMainPin.addEventListener('mouseup', function () {
  activatePage();

});
