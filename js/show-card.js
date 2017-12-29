'use strict';

(function () {
  var map = document.querySelector('.map');
  var pin = map.querySelector('.map__pin');
  pin.addEventListener('click', window.showCard = function () {
    var mapPins = Array.prototype.slice.call(map.querySelectorAll('.map__pin:not(.map__pin--main)'));
    mapPins.forEach(function (item, index) {
      item.addEventListener('click', function () {
        if (map.querySelector('button.map__pin--active')) {
          map.querySelector('button.map__pin--active').classList.remove('map__pin--active');
        }
        item.classList.add('map__pin--active');
        window.card.getPopupNode(window.points[index]);
      });
    });
  });
})();
