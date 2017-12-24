'use strict';

window.pin = (function () {
  function renderPins(point) {
    var similarPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = point.location.x + 'px';
    pinElement.style.top = point.location.y + 'px';
    pinElement.querySelector('img').src = point.author.avatar;
    pinElement.dataset.id = point.offer.id;
    return pinElement;
  }
  function getPinNode() {
    var similarListPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.getPoints().length; i++) {
      fragment.appendChild(window.pin.renderPins(window.data.getPoints()[i]));
    }
    similarListPins.appendChild(fragment);
  }
  return {
    renderPins: renderPins,
    getPinNode: getPinNode
  };
})();
