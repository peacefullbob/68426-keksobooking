'use strict';

window.pin = (function () {
  return {
    renderPins: function (point) {
      var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
      var pinElement = similarPinTemplate.cloneNode(true);
      pinElement.style.left = point.location.x + 'px';
      pinElement.style.top = point.location.y + 'px';
      pinElement.querySelector('img').src = point.author.avatar;
      pinElement.hidden = true;
      return pinElement;
    },
    getPinNode: function () {
      window.backend.load(function (points) {
        var similarListPins = document.querySelector('.map__pins');
        var fragment = document.createDocumentFragment();
        var takeNumber = points.length > 5 ? 5 : points.length;
        for (var i = 0; i < takeNumber; i++) {
          fragment.appendChild(window.pin.renderPins(points[i]));
        }
        similarListPins.appendChild(fragment);
      });
    }
  };
})();
