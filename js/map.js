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

var REALTY_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

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

var avatarsList = [];
for (var i = 1; i <= AVATAR_NUMBER; i++) {
  avatarsList.push(i);
}

var titlesList = REALTY_TITLES.slice();

var map = document.querySelector('.map');
var pinMap = map.querySelector('.map__pins');
var filterMap = map.querySelector('.map__filters-container');


// Возвращает итератор случайного элемента массива
// @arrayArg - массив с элементами для выборки
var getRandomIteratorArray = function (arrayArg) {
  return Math.floor(Math.random() * arrayArg.length);
};

// Возвращает случайный элемент из массива, удаляя его из массива
// @iterator - целое число, итератор элемента массива для извлечения
// @arrayToSplice - массив из которого будет выбираться случайный элемент
var spliceItemArray = function (iterator, arrayToSplice) {
  return arrayToSplice.splice(iterator, 1)[0];
};

// Возвращает случайное значение между min и max с равномерным распределением
// @min - целое число, минимальная граница диапазона для выборки случайного числа
// @max - целое число, максимальная граница
var getRandomBetweenMinMax = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

// Возвращает url для Аватарки
// @listOfAvatars - массив с номерами картинок аватаров (массив будет изменяться функцией, splice)
var getAvatar = function (listOfAvatars) {
  var iterator = getRandomIteratorArray(listOfAvatars);
  var imgUrl = spliceItemArray(iterator, listOfAvatars);
  imgUrl.toString();

  if ((iterator + 1) < 10) {
    imgUrl = '0' + imgUrl;
  }

  imgUrl = 'img/avatars/user' + imgUrl + '.png';
  return imgUrl;
};

// Возвращает случайную строку-заголовок для объявления из массива заголовков
// @listOfTitles - массив с названиями (массив будет изменяться функцией, splice)
var getTitle = function (listOfTitles) {
  var iterator = getRandomIteratorArray(listOfTitles);
  var newTitle = spliceItemArray(iterator, listOfTitles);

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

// Возвращает новый массив указанной длинны с перемешанными случайным образом элементами переданного массива
// Должно выполняться условие: arrayToSort.length >= number, иначе функция вернет -1
// @arrayToSort - массив для сортировки (меремешивания)
// @number - число, количество элементов в новом массиве
var sortRandomArray = function (arrayToSort, number) {
  if (number > arrayToSort.length) {
    return -1;
  } else {
    var unsortedArray = arrayToSort.slice();
    var sortedArray = [];
    for (var j = 0; j < number; j++) {
      var iterator = getRandomIteratorArray(unsortedArray);
      sortedArray.push(unsortedArray.splice(iterator, 1)[0]);
    }

    return sortedArray;
  }
};

// Возвращает объект с информацией о новом объявлении
// @listOfAvatars - массив с номерами от 1 до количества картинок с аватарами для генерации url'а картинки (массив будет уменьшаться на извелеченный элемент, splice)
// @listOfTitles - массив строк с названиями объявлений (массив будет уменьшаться на извелеченный элемент, splice)
// @balloonPlace - domElement в котором будут располагаться balloons
// @balloonCoords - двумерный массив с верхней и нижней y-координатами balloons
var createAd = function (listOfAvatars, listOfTitles, balloonPlace, balloonCoords) {
  var newAvatar = getAvatar(listOfAvatars);
  var newTitle = getTitle(listOfTitles);
  var xLocation = getBalloonXCoords(balloonPlace);
  var yLocation = getRandomBetweenMinMax(balloonCoords[0], balloonCoords[1]) - BALLOON_HEIGHT;
  var newAddress = xLocation.toString() + ', ' + yLocation.toString();
  var newPrice = getRandomBetweenMinMax(MIN_PRICE, MAX_PRICE);
  var newType = REALTY_TYPES[getRandomIteratorArray(REALTY_TYPES)];
  var newRooms = getRandomBetweenMinMax(MIN_ROOMS, MAX_ROOMS);
  var newGuests = getRandomBetweenMinMax(MIN_GUESTS, MAX_GUESTS);
  var newCheckin = CHECK_IN_OUT[getRandomIteratorArray(CHECK_IN_OUT)];
  var newCheckout = CHECK_IN_OUT[getRandomIteratorArray(CHECK_IN_OUT)];
  var newFeatures = sortRandomArray(FEATURES, getRandomIteratorArray(FEATURES));
  var newDescription = '';
  var newPhotos = sortRandomArray(PHOTOS, PHOTOS.length);

  var newAd = {
    'author': {
      'avatar': newAvatar
    },
    'offer': {
      'title': newTitle,
      'address': newAddress,
      'price': newPrice,
      'type': newType,
      'rooms': newRooms,
      'guests': newGuests,
      'checkin': newCheckin,
      'checkout': newCheckout,
      'features': newFeatures,
      'description': newDescription,
      'photos': newPhotos
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
  advertisements.push(createAd(avatarsList, titlesList, pinMap, Y_BALLOON_CHOORDINATES));
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
pinMap.appendChild(balloonFragmen);


// Возвращаем domElement <li> с соответствующим удобству css-классом
// @feature - строка, название удобства из списка FEATURES
var createFeaturesItemNode = function (feature) {
  var item = document.createElement('li');
  item.classList.add('popup__feature');

  var classModify = 'popup__feature--';
  switch (feature) {
    case 'wifi':
      classModify += 'wifi';
      break;
    case 'dishwasher':
      classModify += 'dishwasher';
      break;
    case 'parking':
      classModify += 'parking';
      break;
    case 'washer':
      classModify += 'washer';
      break;
    case 'elevator':
      classModify += 'elevator';
      break;
    case 'conditioner':
      classModify += 'conditioner';
      break;
    default:
      break;
  }
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
  switch (adv.offer.type) {
    case 'palace':
      var housingType = 'Дворец';
      break;
    case 'flat':
      housingType = 'Квартира';
      break;
    case 'house':
      housingType = 'Дом';
      break;
    case 'bungalo':
      housingType = 'Бунгало';
      break;
    default:
      housingType = 'Неизвестно';
      break;
  }
  newNode.querySelector('.popup__type').textContent = housingType;
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
map.insertBefore(card, filterMap);

// Отображаем карту
document.querySelector('.map').classList.remove('map--faded');
