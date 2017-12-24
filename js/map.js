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

  var mapPin = document.querySelector('.map__pin--main');
  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      mapPin.style.zIndex = 1000;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';

      if (mapPin.offsetTop - shift.y > 650) {
        mapPin.style.top = 650 + 'px';
      }
      if (mapPin.offsetTop - shift.y < 100) {
        mapPin.style.top = 100 + 'px';
      }
      if (mapPin.offsetLeft - shift.x > 1200) {
        mapPin.style.left = 1200 + 'px';
      }
      if (mapPin.offsetLeft - shift.x < 0) {
        mapPin.style.left = 0 + 'px';
      }

      document.querySelector('#address').value = mapPin.style.left + ' ' + mapPin.style.top;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
