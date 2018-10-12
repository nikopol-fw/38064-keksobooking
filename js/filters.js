'use strict';

(function () {
  var filterType = window.data.filterFormNode.querySelector('#housing-type');
  var filterPrice = window.data.filterFormNode.querySelector('#housing-price');
  var filterRooms = window.data.filterFormNode.querySelector('#housing-rooms');
  var filterGuests = window.data.filterFormNode.querySelector('#housing-guests');
  var filterFeatures = window.data.filterFormNode.querySelector('#housing-features');

  var filterAdverts = function () {
    var priceToValue = {
      'low': {
        min: 0,
        max: 9999
      },
      'middle': {
        min: 10000,
        max: 50000
      },
      'high': {
        min: 50001,
        max: Infinity
      }
    };

    var featuresChecked = filterFeatures.querySelectorAll('input[name=features]:checked');

    var advFiltered = window.data.adverts.filter(function (advert) {
      var type = false;
      if (filterType.value === 'any' || advert.offer.type === filterType.value) {
        type = true;
      }

      var price = false;
      if (filterPrice.value === 'any' || (advert.offer.price >= priceToValue[filterPrice.value].min && advert.offer.price <= priceToValue[filterPrice.value].max)) {
        price = true;
      }

      var rooms = false;
      if (filterRooms.value === 'any' || advert.offer.rooms === +filterRooms.value) {
        rooms = true;
      }

      var guests = false;
      if (filterGuests.value === 'any' || advert.offer.guests === +filterGuests.value) {
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
    window.card.closeCard();
  }, 500);


  window.data.filterFormNode.addEventListener('change', function () {
    if (window.data.adverts) {
      filterPins();
    }
  });
})();
