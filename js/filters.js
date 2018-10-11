'use strict';

(function () {
  var filterType = window.data.filters.querySelector('#housing-type');
  var filterPrice = window.data.filters.querySelector('#housing-price');
  var filterRooms = window.data.filters.querySelector('#housing-rooms');
  var filterGuests = window.data.filters.querySelector('#housing-guests');
  var filterFeatures = window.data.filters.querySelector('#housing-features');

  var filterAdverts = function () {
    var priceToValue = {
      'low': [0, 9999],
      'middle': [10000, 50000],
      'high': [50001, Infinity]
    };

    var featuresChecked = filterFeatures.querySelectorAll('input[name=features]:checked');

    // var compareField = function () {
    //   return;
    // };

    var advFiltered = window.data.adverts.filter(function (advert) {
      var type = false;
      if (filterType.value === 'any') {
        type = true;
      } else if (advert.offer.type === filterType.value) {
        type = true;
      }

      var price = false;
      if (filterPrice.value === 'any') {
        price = true;
      } else if (advert.offer.price >= priceToValue[filterPrice.value][0] && advert.offer.price <= priceToValue[filterPrice.value][1]) {
        price = true;
      }

      var rooms = false;
      if (filterRooms.value === 'any') {
        rooms = true;
      } else if (advert.offer.rooms === +filterRooms.value) {
        rooms = true;
      }

      var guests = false;
      if (filterGuests.value === 'any') {
        guests = true;
      } else if (advert.offer.guests === +filterGuests.value) {
        guests = true;
      }

      var filters = true;
      for (var i = 0; i < featuresChecked.length; i++) {
        if (advert.offer.features.indexOf(featuresChecked[i].value) === -1) {
          filters = false;
          break;
        }
      }

      return (type && price && rooms && guests && filters);
    });

    return advFiltered;
  };

  var filterPins = window.debounce(function () {
    var filteredAdverts = filterAdverts();
    window.pin.clearPins();
    window.pin.renderPins(filteredAdverts);
  }, 500);


  window.data.filters.addEventListener('change', function () {
    if (window.data.adverts) {
      filterPins();
    }
  });
})();
