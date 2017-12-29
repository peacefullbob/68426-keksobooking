'use strict';

window.card = (function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  return {
    renderPopup: function (point) {
      var similarPopupTemplate = document.querySelector('template').content.querySelector('article.map__card');
      var pointElement = similarPopupTemplate.cloneNode(true);
      pointElement.querySelector('h3').textContent = point.offer.title;
      pointElement.querySelector('small').textContent = point.offer.address;
      pointElement.querySelector('.popup__price').textContent = point.offer.price + ' руб./ночь';
      function showType() {
        switch (point.offer.type) {
          case 'flat':
            pointElement.querySelector('h4').textContent = 'Квартира';
            break;
          case 'bungalo':
            pointElement.querySelector('h4').textContent = 'Лачуга';
            break;
          case 'house':
            pointElement.querySelector('h4').textContent = 'Дом';
            break;
        }
        return pointElement.querySelector('h4').textContent;
      }
      pointElement.querySelector('h4').textContent = showType();
      pointElement.querySelector('p:nth-of-type(3)').textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей';
      pointElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout;
      pointElement.style.top = point.location.y;
      window.data.removeChildren(pointElement.querySelector('.popup__features'));
      pointElement.querySelector('.popup__features').appendChild(window.data.getFeaturesFragment(point.offer.features));
      pointElement.querySelector('p:nth-of-type(5)').textContent = point.offer.description;
      pointElement.querySelector('.popup__avatar').src = point.author.avatar;
      pointElement.querySelector('.popup__pictures img').src = point.author.avatar;
      return pointElement;
    },
    getPopupNode: function (numberElement) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.renderPopup(numberElement));
      if (document.querySelector('.popup')) {
        map.replaceChild(fragment, document.querySelector('.popup'));
      } else {
        map.insertBefore(fragment, map.children[1]);
        var closeButton = map.querySelector('.popup__close');
        closeButton.addEventListener('click', function () {
          window.map.closePopup();
        });
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === ESC_KEYCODE) {
            window.map.closePopup();
          }
        });
      }
    }
  };
})();
