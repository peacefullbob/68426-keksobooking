'use strict';

var ESC_KEYCODE = 27;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getShuffleArray(array) {
  return array.slice().sort(function () {
    return Math.random() - 0.5;
  });
}

function getRandomLengthArray(array) {
  var randFeatures = [];
  for (var i = 0; i < getRandom(1, array.length); i++) {
    randFeatures.push(array[i]);
  }
  return randFeatures;
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
  var chekins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  var shuffleTitles = getShuffleArray(titles);
  var shuffleAvas = getShuffleArray(numbers);
  var shuffleId = getShuffleArray(numbers);
  for (var i = 0; i < 8; i++) {
    points.push({
      location: {
        x: getRandom(300, 900),
        y: getRandom(100, 500)
      },
      offer: {
        title: shuffleTitles.pop(),
        price: getRandom(999, 100001),
        type: types[getRandom(0, types.length)],
        rooms: getRandom(1, 6),
        guests: getRandom(1, 1000),
        checkin: chekins[getRandom(0, chekins.length)],
        checkout: checkouts[getRandom(0, checkouts.length)],
        features: getRandomLengthArray(features),
        description: '',
        photos: [],
        id: shuffleId.pop()
      },
      author: {
        avatar: 'img/avatars/user' + '0' + shuffleAvas.pop() + '.png'
      }
    });
  }
  return points;
}

var points = getPoints();
var similarListPins = document.querySelector('.map__pins');
function renderPins(point) {
  var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = point.location.x + 'px';
  pinElement.style.top = point.location.y + 'px';
  pinElement.querySelector('img:nth-child(1)').src = point.author.avatar;
  pinElement.dataset.id = point.offer.id;
  return pinElement;
}

var similarListPopups = document.querySelector('.map');
function renderPopup(point) {
  var similarPopupTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var pointElement = similarPopupTemplate.cloneNode(true);
  pointElement.querySelector('h3').textContent = point.offer.title;
  pointElement.querySelector('small').textContent = point.location.x + 'px' + ', ' + point.location.y + 'px';
  pointElement.querySelector('.popup__price').textContent = point.offer.price + ' руб./ночь';
  pointElement.querySelector('h4').textContent = point.offer.type;
  pointElement.querySelector('p:nth-of-type(3)').textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей';
  pointElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout;
  pointElement.style.top = point.location.y;
  removeChildren(pointElement.querySelector('.popup__features'));
  pointElement.querySelector('.popup__features').appendChild(getFeaturesFragment(point.offer.features));
  pointElement.querySelector('p:nth-of-type(5)').textContent = point.offer.description;
  pointElement.querySelector('.popup__avatar').src = point.author.avatar;
  pointElement.querySelector('.popup__pictures img').src = point.author.avatar;
  return pointElement;
}

var map = document.querySelector('.map');

function getPinNode() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < points.length; i++) {
    fragment.appendChild(renderPins(points[i]));
  }
  similarListPins.appendChild(fragment);
}
function closePopup() {
  var popup = document.querySelector('.popup');
  var activePin = map.querySelector('button.map__pin--active');
  if (popup && activePin) {
    similarListPopups.removeChild(popup);
    activePin.classList.remove('map__pin--active');
  }
}
function getPopupNode(numberElement) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderPopup(numberElement));
  if (document.querySelector('.popup')) {
    similarListPopups.replaceChild(fragment, document.querySelector('.popup'));
  } else {
    similarListPopups.appendChild(fragment, map.children[1]);
    var closeButton = map.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    });
  }
}

var pin = map.querySelector('.map__pin');
var mapPinMain = map.querySelector('.map__pin--main');

mapPinMain.removeAttribute('hidden');
mapPinMain.addEventListener('click', function startMapUse() {

  var noticeForm = document.querySelector('.notice__form');
  var formInputs = Array.prototype.slice.call(noticeForm.querySelectorAll('fieldset'));

  map.classList.remove('map--faded');
  map.classList.remove('map--active');
  noticeForm.classList.remove('notice__form--disabled');
  getPinNode();
  formInputs.forEach(function (item) {
    item.disabled = false;
  });
});
function findById(element) {
  for (var i = 0; i < points.length; i++) {
    if (points[i].offer.id === +element.dataset.id) {
      var indexElement = i;
    }
  }
  return indexElement;
}
pin.addEventListener('click', function () {
  var mapPins = Array.prototype.slice.call(map.querySelectorAll('.map__pin:not(.map__pin--main)'));
  mapPins.forEach(function (item) {
    item.addEventListener('click', function () {
      if (map.querySelector('button.map__pin--active')) {
        map.querySelector('button.map__pin--active').classList.remove('map__pin--active');
      }
      item.classList.add('map__pin--active');
      var indexElement = findById(item);
      getPopupNode(points[indexElement]);
    });
  });
});
