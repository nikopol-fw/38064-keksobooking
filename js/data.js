'use strict';

(function () {
  /*
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

  */

  var Y_BALLOON_CHOORDINATES = [130, 630];

  var ESC_KEYCODE = 27;


  var page = {
    active: false,
    pinLoaded: false
  };

  /**
   * Возвращает итератор случайного элемента массива
   *
   * @param  {array} arr Массив с элементами для выборки
   * @return {number} случайное число от 0 до @arr.length
   */
  /*
  var getRandomIteratorArray = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };
  */

  /**
   * Возвращает массив перемешанный по алгоритму Фишера-Йетса
   * @param  {array} arr Массив, который необходимо перемешать
   * @return {array} Перемешанный массив
   */
  /*
  var shuffleArray = function (arr) {
    for (var j = arr.length - 1; j > 0; j--) {
      var rndm = Math.floor(Math.random() * (j + 1));
      var temp = arr[rndm];
      arr[rndm] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };
  */

  /**
   * Возвращает случайное значение между min и max с равномерным распределением
   *
   * @param  {number} min Целое число, минимальная граница диапазона для выборки случайного числа
   * @param  {number} max Целое число, максимальная граница
   * @return {number} Целое число
   */
  /*
  var getRandomBetweenMinMax = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };
  */

  /**
   * Возвращает url для Аватарки
   *
   * @param  {array} listOfAvatars Массив (перемешанный) с номерами картинок аватаров (будет извлечен последний элемент из массива)
   * @return {string} строка с url'ом аватарка вида 'img/avatars/user01.png'
   */
  /*
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
  */

  /**
   * Возвращает строку-заголовок для объявления из массива заголовков
   *
   * @param  {array} listOfTitles Массив (перемешанный) с названиями (будет извлечен последний элемент из массива)
   * @return {string} Строка с заголовком для объявления
   */
  /*
  var getTitle = function (listOfTitles) {
    if (listOfTitles.length === 0) {
      return -1;
    }

    var newTitle = listOfTitles.pop();
    newTitle.toString();
    return newTitle;
  };
  */

  /**
   * Возвращает случайное значение от 1 до ширины переданного блока (получение x-координаты для balloon)
   *
   * @param  {object} container domElement ширина которого будет приниматься за максимальную x-координату
   * @return {number} Координата X
   */
  /*
  var getBalloonXCoords = function (container) {
    var containerWidth = container.clientWidth;
    var newCoord = getRandomBetweenMinMax(1, containerWidth);
    newCoord -= BALLOON_WIDTH / 2;
    return newCoord;
  };
  */

  /**
   * Возвращает объект с информацией о новом объявлении
   *
   * @param  {array}  listOfAvatars Массив с номерами от 1 до количества картинок с аватарами для генерации url'а картинки (массив будет уменьшаться на извелеченный элемент, splice)
   * @param  {array}  listOfTitles Массив строк с названиями объявлений (массив будет уменьшаться на извелеченный элемент, splice)
   * @param  {object} balloonPlace domElement в котором будут располагаться balloons
   * @param  {array}  balloonCoords Двумерный массив с верхней и нижней y-координатами balloons
   * @return {object} Объект-объявления
   */
  /*
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
  */


  // Создаем список с номерами файлов для аватарок
  /*
  var avatarsList = [];
  for (var i = 1; i <= AVATAR_NUMBER; i++) {
    avatarsList.push(i);
  }
  */

  /*
  // Перемешиваем массив с номерами аватарок
  var avatarsRandomList = shuffleArray(avatarsList);

  // Создаем перемешанную копию массива с названиями
  var titlesRandomList = shuffleArray(REALTY_TITLES.slice());
  */

  // Блок карты
  var map = document.querySelector('.map');
  // Контейнер для pin'ов
  var pinMap = map.querySelector('.map__pins');
  // Основной pin, который перетаскивается
  var mainPin = document.querySelector('.map__pin--main');
  // Начальные координаты основного pin
  var beginCoordsMainPin = [mainPin.offsetTop, mainPin.offsetLeft];
  // Форма объявления

  // Форма фильтров
  var filterForm = document.querySelector('.map__filters');


  // Форма объявления
  var formAdv = document.querySelector('.ad-form');
  // Группы полей формы объявления
  var formAdvFieldsets = formAdv.querySelectorAll('fieldset');
  // Форма с фильтрами объявлений
  // var formFilters = document.querySelector('.map__filters');
  // Фильтры в форме
  // var filters = formFilters.children;
  // Контейнер для формы с фильтрами
  var filterMap = map.querySelector('.map__filters-container');
  // Поле адреса
  var formAdvInputAddress = formAdv.querySelector('#address');

  window.data = {

    filters: filterForm,

    page: page,
    ESC_KEYCODE: ESC_KEYCODE,
    Y_BALLOON_CHOORDINATES: Y_BALLOON_CHOORDINATES,
    map: map,
    pinMap: pinMap,
    mainPin: mainPin,
    beginCoordsMainPin: beginCoordsMainPin,
    formAdv: formAdv,
    formAdvFieldsets: formAdvFieldsets,
    // filters: filters,
    filterMap: filterMap,
    formAdvInputAddress: formAdvInputAddress,
    // Объявления
    adverts: undefined
  };
})();
