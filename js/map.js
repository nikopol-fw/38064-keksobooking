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

var titlesList = REALTY_TITLES;

var map = document.querySelector('.map');
var pinMap = map.querySelector('.map__pins');
var filterMap = map.querySelector('.map__filters-container');


// Возвращает итератор случайного элемента массива
// @array - массив с элементами для выборки
var getIteratorRandomItemArray = function (arrayArg) {
  return Math.floor(Math.random() * arrayArg.length);
};

// Возвращает случайный элемент из массива, удаляя его из массива
// @iterator - целое число, итератор элемента массива для извлечения
// @arrayToSplice - массив из которого будет выбираться случайный элемент
var spliceRandomItem = function(iterator, arrayToSplice) {
  return arrayToSplice.splice(iterator, 1)[0];
};

// Возвращает случайное значение между min и max с равномерным распределением
// @min - целое число, минимальная граница диапазона для выборки случайного числа
// @max - целое число, максимальная граница
var genericNumberBetweenMinMax = function(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};


// Возвращает url для Аватарки
// @listOfAvatars - массив с номерами картинок аватаров (массив будет изменяться функцией)
var genericAvatar = function (listOfAvatars) {
  var iterator = getIteratorRandomItemArray(listOfAvatars);
  var imgUrl = spliceRandomItem(iterator, listOfAvatars);
  imgUrl.toString();

  if ((iterator + 1) < 10) {
    imgUrl = '0' + imgUrl;
  }

  imgUrl = 'img/avatars/user' + imgUrl + '.png';
  return imgUrl;
};

// Возвращает случайную строку-заголовок для объявления из массива заголовков
// @listOfTitles - массив с названиями (массив будет изменяться функцией)
var genericTitle = function (listOfTitles) {
  var iterator = getIteratorRandomItemArray(titlesList);
  var newTitle = spliceRandomItem(iterator, titlesList);

  return newTitle;
};

//var widthPin = document
// Возвращает случайное значение от 1 до ширины переданного блока
// @container - domNode ширина которого будет приниматься за максимальную x-координату
var getBalloonXCoords = function (container) {
  var containerWidth = container.clientWidth;
  var newCoord = genericNumberBetweenMinMax(1, containerWidth);
  newCoord -= BALLOON_WIDTH / 2;
  return newCoord;
};

// Возвращает случайное значение типа недвижимости из массива констант типов недвижимости
var genericRealtyType = function() {
  //return getRandomArrayItem(REALTY_TYPES);
};

// Возвращает новый массив указанной длинны с перемешанными случайным образом элементами переданного массива
// Должно выполняться условие: arrayToSort.length >= number, иначе функция вернет -1
// @arrayToSort - массив для сортировки (меремешивания)
var sortRandomArray = function (arrayToSort, number) {
  if (number > arrayToSort.length) {
    return -1;
  } else {
    var unsortedArray = arrayToSort.slice();

    var sortedArray = [];
    for (var i = 0; i < number; i++) {
      var iterator = getIteratorRandomItemArray(unsortedArray);

      sortedArray.push(unsortedArray.splice(iterator, 1)[0]);
    }

    return sortedArray;
  }
};

// Возвращает новый массив случайного размера от 1 до размера переданного массива со случайным набором неповторяющихся элементов из переданного массива
// @features - массив, из которого нужно сделать случайную выборку случайного размера
var genericFeatures = function (features) {
  //var featuresNumber = genericNumberBetweenMinMax(1, features.length);
  //var newFeatures = sortRandomArray(features, featuresNumber);

  return newFeatures;
};

var createAd = function (listOfAvatars, listOfTitles, balloonPlace, balloonCoords) {
  var newAvatar = genericAvatar(listOfAvatars);
  var newTitle = genericTitle(listOfTitles);
  var xLocation = getBalloonXCoords(balloonPlace);
  var yLocation = genericNumberBetweenMinMax(balloonCoords[0], balloonCoords[1]) - BALLOON_HEIGHT;
  var newAddress = xLocation.toString() + ', ' + yLocation.toString();
  var newPrice = genericNumberBetweenMinMax(MIN_PRICE, MAX_PRICE);
  var newType = REALTY_TYPES[getIteratorRandomItemArray(REALTY_TYPES)];
  var newRooms = genericNumberBetweenMinMax(MIN_ROOMS, MAX_ROOMS);
  var newGuests = genericNumberBetweenMinMax(MIN_GUESTS, MAX_GUESTS);
  var newCheckin = CHECK_IN_OUT[getIteratorRandomItemArray(CHECK_IN_OUT)];
  var newCheckout = CHECK_IN_OUT[getIteratorRandomItemArray(CHECK_IN_OUT)];
  var newFeatures = sortRandomArray(FEATURES, getIteratorRandomItemArray(FEATURES));
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

var advertisements = [];
for (var i = 0; i < AD_NUMBER; i++) {
  advertisements[i] = createAd(avatarsList, titlesList, pinMap, Y_BALLOON_CHOORDINATES);
}


//
var createAdvertisementNode = function (template, advert) {
  var newNode = template.cloneNode(true);
  var newNodeImg = newNode.querySelector('img');

  newNode.style.left = advert.location.x.toString()  + 'px';
  newNode.style.top = advert.location.y.toString() + 'px';

  newNodeImg.src = advert.author.avatar;
  newNodeImg.alt = advert.offer.title;

  return newNode;
};

var balloonTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var balloonFragmen = document.createDocumentFragment();
for (i = 0; i < advertisements.length; i++) {
  balloonFragmen.appendChild(createAdvertisementNode(balloonTemplate, advertisements[i]));
}

pinMap.appendChild(balloonFragmen);


//
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

//
var createPhotoNode = function (photoSrc) {
  var item = document.createElement('img');
  item.src = photoSrc;
  item.classList.add('popup__photo');
  item.alt = 'Фотография жилья';
  item.width = 45;
  item.height = 40;

  return item;
};

//
var eraseNode = function (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  return node;
};

//
var createCardNode = function (template, adv) {
  var newNode = template.cloneNode(true);

  //console.log(newNode.querySelector('.popup__title'));
  newNode.querySelector('.popup__title').textContent = adv.offer.title;

  newNode.querySelector('.popup__text--address').textContent = adv.offer.address;
  newNode.querySelector('.popup__text--price').textContent = adv.offer.price.toString() + ' ₽/ночь';
  switch (adv.offer.type) {
    case 'palace':
      var housingType = 'Дворец';
      break;
    case 'flat':
      var housingType = 'Квартира';
      break;
    case 'house':
      var housingType = 'Дом';
      break;
    case 'bungalo':
      var housingType = 'Бунгало';
      break;
    default:
      var housingType = 'Неизвестно';
      break;
  }
  newNode.querySelector('.popup__type').textContent = housingType;
  newNode.querySelector('.popup__text--capacity').textContent = adv.offer.rooms.toString() + ' комнаты для ' + adv.offer.guests.toString() + ' гостей';
  newNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;

  var featuresFragment = document.createDocumentFragment();
  for (var i = 0; i < adv.offer.features.length; i++) {
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

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var card = createCardNode(cardTemplate, advertisements[0]);
map.insertBefore(card, filterMap);


document.querySelector('.map').classList.remove('map--faded');
