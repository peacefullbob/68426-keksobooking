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
function getList() {
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var randFeatures = getRandomLengthArray(features);
  var list = [];
  for (var i = 0; i < getRandom(1, randFeatures.length); i++) {
    list.push('<li class="feature feature--' + randFeatures[i] + '"></li>');
  }
  return list;
}

function getPoints() {
  var points = [];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var houses = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var flat = houses.flat;
  var house = houses.house;
  var bungalo = houses.bungalo;
  var types = [flat, house, bungalo];
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
        features: getList(),
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
  pinElement.getElementsByTagName('img')[0].src = point.author.avatar;
  pinElement.setAttribute('data-id', point.offer.id);
  return pinElement;
}

var similarListPopups = document.querySelector('.map');
function renderPopup(point) {
  var similarPopupTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var pointElement = similarPopupTemplate.cloneNode(true);
  pointElement.getElementsByTagName('h3')[0].textContent = point.offer.title;
  pointElement.getElementsByTagName('small')[0].textContent = point.location.x + 'px' + ', ' + point.location.y + 'px';
  pointElement.querySelector('.popup__price').textContent = point.offer.price + ' руб./ночь';
  pointElement.getElementsByTagName('h4')[0].textContent = point.offer.type;
  pointElement.getElementsByTagName('p')[2].textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей';
  pointElement.getElementsByTagName('p')[3].textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout;
  pointElement.style.top = point.location.y;
  pointElement.querySelector('.popup__features').innerHTML = point.offer.features;
  pointElement.getElementsByTagName('p')[4].textContent = point.offer.description;
  pointElement.querySelector('.popup__avatar').src = point.author.avatar;
  pointElement.getElementsByTagName('img')[1].src = point.author.avatar;
  return pointElement;
}

var map = document.querySelector('.map');

var fragment = document.createDocumentFragment();
function insertPinsOnPage() {
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
function insertPopupOnPage(numberElement) {
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
  insertPinsOnPage();
  formInputs.forEach(function (thisItem) {
    thisItem.removeAttribute('disabled');
  });
});
pin.addEventListener('click', function () {
  var mapPins = Array.prototype.slice.call(map.querySelectorAll('.map__pin:nth-child(n+2)'));
  mapPins.forEach(function (item) {
    item.addEventListener('click', function () {
      if (map.querySelector('button.map__pin--active')) {
        map.querySelector('button.map__pin--active').classList.remove('map__pin--active');
      }
      item.classList.add('map__pin--active');
      for (var i = 0; i < points.length; i++) {
        if (points[i].offer.id === +item.dataset.id) {
          var indexElement = i;
        }
      }
      insertPopupOnPage(points[indexElement]);
    });
  });
});
