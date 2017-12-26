'use strict';

window.data = (function () {
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function getRandomLengthArray(array) {
    var randFeatures = [];
    for (var i = 0; i < window.data.getRandom(1, array.length); i++) {
      randFeatures.push(array[i]);
    }
    return randFeatures;
  }
  function removeChildren(elem) {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }
  function getPoints() {
    var points = [];
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var houses = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };
    var types = [houses.flat, houses.house, houses.bungalo];
    var checkins = ['12:00', '13:00', '14:00'];
    var checkouts = ['12:00', '13:00', '14:00'];
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8];
    var ids = [1, 2, 3, 4, 5, 6, 7, 8];
    for (var i = 0; i < 8; i++) {
      points.push({
        location: {
          x: window.data.getRandom(300, 900),
          y: window.data.getRandom(100, 500)
        },
        offer: {
          title: titles.pop(),
          price: window.data.getRandom(999, 100001),
          type: types[window.data.getRandom(0, types.length)],
          rooms: window.data.getRandom(1, 6),
          guests: window.data.getRandom(1, 1000),
          checkin: checkins[window.data.getRandom(0, checkins.length)],
          checkout: checkouts[window.data.getRandom(0, checkouts.length)],
          features: window.data.getRandomLengthArray(features),
          description: '',
          photos: [],
          id: ids.pop()
        },
        author: {
          avatar: 'img/avatars/user' + '0' + numbers.pop() + '.png'
        }
      });
    }
    return points;
  }
  function getFeaturesFragment(array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (element) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + element;
      fragment.append(li);
    });
    return fragment;
  }
  function findById(array, element) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].offer.id === +element.dataset.id) {
        var indexElement = i;
      }
    }
    return indexElement;
  }
  return {
    getRandom: getRandom,
    getRandomLengthArray: getRandomLengthArray,
    removeChildren: removeChildren,
    getPoints: getPoints,
    getFeaturesFragment: getFeaturesFragment,
    findById: findById
  };
})();
