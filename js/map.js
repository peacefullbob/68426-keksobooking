'use strict';
(function () {
  var map = document.querySelector('.map');
  window.map = {
    closePopup: function () {
      var popup = document.querySelector('.popup');
      var activePin = map.querySelector('button.map__pin--active');
      if (popup && activePin) {
        map.removeChild(popup);
        activePin.classList.remove('map__pin--active');
      }
    }
  };

  var pin = map.querySelector('.map__pin');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.removeAttribute('hidden');
  mapPinMain.addEventListener('click', function startMapUse() {

    var noticeForm = document.querySelector('.notice__form');
    var formInputs = Array.prototype.slice.call(noticeForm.querySelectorAll('fieldset'));

    map.classList.remove('map--faded');
    map.classList.remove('map--active');
    noticeForm.classList.remove('notice__form--disabled');
    window.pin.getPinNode();
    formInputs.forEach(function (item) {
      item.disabled = false;
    });
  });

  pin.addEventListener('click', function () {
    var mapPins = Array.prototype.slice.call(map.querySelectorAll('.map__pin:not(.map__pin--main)'));
    mapPins.forEach(function (item) {
      item.addEventListener('click', function () {
        if (map.querySelector('button.map__pin--active')) {
          map.querySelector('button.map__pin--active').classList.remove('map__pin--active');
        }
        item.classList.add('map__pin--active');
        var indexElement = window.data.findById(window.points, item);
        window.card.getPopupNode(window.points[indexElement]);
      });
    });
  });
})();
