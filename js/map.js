'use strict';

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var fragment = document.createDocumentFragment();
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var chekins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var avas = [1, 2, 3, 4, 5, 6, 7, 8];

function getShuffleArray(array) {
  return array.slice().sort(function () {
    return Math.random() - 0.5;
  });
}

function getNoRepeatNumber(array) {
  var arrayElem = getShuffleArray(array)[getRandom(1, getShuffleArray(array).length)];
  avas = getShuffleArray(array).filter(function (number) {
    return number !== arrayElem;
  });
  return arrayElem;
}

function getNoRepeatTitle(array) {
  var arrayElem = getShuffleArray(array)[getRandom(1, getShuffleArray(array).length)];
  titles = getShuffleArray(array).filter(function (number) {
    return number !== arrayElem;
  });
  return arrayElem;
}

function getRandomLengthArray(array) {
  var randFeatures = [];
  for (var i = 0; i < getRandom(1, array.length); i++) {
    randFeatures.push(array[i]);
  }
  return randFeatures;
}

var randFeatures = getRandomLengthArray(features);
function getList() {
  var list = [];
  for (var i = 0; i < getRandom(1, randFeatures.length); i++) {
    list.push('<li class="feature feature--' + randFeatures[i] + '"></li>');
  }
  return list;
}

function getPoints() {
  var points = [];
  for (var i = 0; i < 8; i++) {
    points.push(
        {
          location: {
            x: getRandom(300, 900),
            y: getRandom(100, 500)
          },
          offer: {
            title: getNoRepeatTitle(titles),
            price: getRandom(999, 100001),
            type: types[getRandom(0, types.length)],
            rooms: getRandom(1, 6),
            guests: getRandom(1, 1000),
            checkin: chekins[getRandom(0, chekins.length)],
            checkout: checkouts[getRandom(0, checkouts.length)],
            features: getList(),
            description: '',
            photos: []
          },
          author: {
            avatar: 'img/avatars/user' + '0' + getNoRepeatNumber(avas) + '.png'
          }
        });
  }
  return points;
}

var points = getPoints();
var similarListPins = document.querySelector('.map__pins');
var similarPinTemplate = document.getElementsByTagName('template')[0].content.querySelector('.map__pin');
function renderPins(point) {
  var pinElement = similarPinTemplate.cloneNode(true);
  similarPinTemplate.style.left = point.location.x + 'px';
  similarPinTemplate.style.top = point.location.y + 'px';
  similarPinTemplate.getElementsByTagName('img')[0].src = point.author.avatar;
  return pinElement;
}

var similarListPopups = document.querySelector('.map');
var similarPopupTemplate = document.getElementsByTagName('template')[0].content.querySelector('article.map__card');
function renderPopup(point) {
  var pointElement = similarPopupTemplate.cloneNode(true);
  similarPopupTemplate.getElementsByTagName('h3')[0].textContent = point.offer.title;
  similarPopupTemplate.getElementsByTagName('small')[0].textContent = point.location.x + 'px' + ', ' + point.location.y + 'px';
  similarPopupTemplate.querySelector('.popup__price').textContent = point.offer.price + ' руб./ночь';
  similarPopupTemplate.getElementsByTagName('h4')[0].textContent = point.offer.type;
  similarPopupTemplate.getElementsByTagName('p')[2].textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей';
  similarPopupTemplate.getElementsByTagName('p')[3].textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout;
  similarPopupTemplate.style.top = point.location.y;
  similarPopupTemplate.querySelector('.popup__features').innerHTML = point.offer.features;
  similarPopupTemplate.getElementsByTagName('p')[4].textContent = point.offer.description;
  similarPopupTemplate.querySelector('.popup__avatar').src = point.author.avatar;
  similarPopupTemplate.getElementsByTagName('img')[1].src = point.author.avatar;
  return pointElement;
}

for (var k = 0; k < points.length; k++) {
  fragment.appendChild(renderPins(points[k]));
}

var map = document.querySelector('.map');
map.insertBefore((renderPopup(points[3])), map.children[1]);

similarListPins.appendChild(fragment);
similarListPopups.appendChild(fragment);
document.querySelector('.map').classList.remove('map--faded');
