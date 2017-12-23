'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var pin = document.querySelector('.map__pin');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.removeAttribute('hidden');
  mapPinMain.addEventListener('click', function startMapUse() {

    var noticeForm = document.querySelector('.notice__form');
    var formInputs = Array.prototype.slice.call(noticeForm.querySelectorAll('fieldset'));

    map.classList.remove('map--faded');
    map.classList.remove('map--active');
    noticeForm.classList.remove('notice__form--disabled');
    window.pin.getPinNode();
    pin.addEventListener('click', function () {
      if (map.querySelector('button.map__pin--active')) {
        map.querySelector('button.map__pin--active').classList.remove('map__pin--active');
      }
      map.querySelector('.map__pin').classList.add('map__pin--active');
      var indexElement = window.data.findById(window.data.points(), map.querySelector('.map__pin'));
      window.card.getPopupNode(window.data.points()[indexElement]);
    });
    formInputs.forEach(function (item) {
      item.disabled = false;
    });
  });

  return {
    closePopup: function () {
      var popup = document.querySelector('.popup');
      var activePin = map.querySelector('button.map__pin--active');
      if (popup && activePin) {
        map.removeChild(popup);
        activePin.classList.remove('map__pin--active');
      }
    }
  };
})();
