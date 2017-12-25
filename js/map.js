'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.removeAttribute('hidden');
  mapPinMain.addEventListener('click', function firstClick() {
    var noticeForm = document.querySelector('.notice__form');
    var formInputs = Array.prototype.slice.call(noticeForm.querySelectorAll('fieldset'));

    map.classList.remove('map--faded');
    map.classList.remove('map--active');
    noticeForm.classList.remove('notice__form--disabled');
    window.pin.getPinNode();
    formInputs.forEach(function (item) {
      item.disabled = false;
    });
    mapPinMain.removeEventListener('click', firstClick);
  });

  function closePopup() {
    var popup = document.querySelector('.popup');
    var activePin = map.querySelector('button.map__pin--active');
    if (popup && activePin) {
      map.removeChild(popup);
      activePin.classList.remove('map__pin--active');
    }
  }
  return {
    closePopup: closePopup
  };
})();
