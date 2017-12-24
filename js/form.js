'use strict';

window.form = (function () {
  var selectToSync = document.querySelector('#timein');
  selectToSync.addEventListener('change', function syncTime() {
    document.getElementById(selectToSync.dataset.syncwith).options[selectToSync.selectedIndex].selected = true;
  });

  var selectToSync2 = document.querySelector('#timeout');
  selectToSync2.addEventListener('change', function syncTime() {
    document.getElementById(selectToSync2.dataset.syncwith).options[selectToSync2.selectedIndex].selected = true;
  });

  var elementPrice = document.querySelector('#type');
  var price = document.querySelector('#price');
  var selectToSync = document.querySelector('#timein');
  var selectToSync2 = document.querySelector('#timeout');
  var elementGuests = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');
  var rooms1 = new Option('для 1 гостя', '1');
  var rooms2 = new Option('для 2 гостей', '2');
  var rooms3 = new Option('для 3 гостей', '3');
  var rooms100 = new Option('не для гостей', '0');
  function syncValue(element1, array1, element2, array2) {
    switch (element1.value) {
      case array1[0]:
        element2.value = array2[0];
        break;
      case array1[1]:
        element2.value = array2[1];
        break;
      case array1[2]:
        element2.value = array2[2];
        break;
      case array1[3]:
        element2.value = array2[3];
        break;
    }
  }
  function syncGuests(element1, array1, element2, array2) {
    function removeChilds() {
      while (element2.lastChild) {
        element2.removeChild(element2.lastChild);
      }
    }
    switch (element1.value) {
      case array1[0]:
        removeChilds();
        element2.appendChild(array2[0]);
        break;
      case array1[1]:
        removeChilds();
        element2.appendChild(array2[0]);
        element2.appendChild(array2[1]);
        break;
      case array1[2]:
        removeChilds();
        element2.appendChild(array2[0]);
        element2.appendChild(array2[1]);
        element2.appendChild(array2[2]);
        break;
      case array1[3]:
        removeChilds();
        element2.appendChild(array2[3]);
        break;
    }
  }

  selectToSync.addEventListener('change', function () {
    window.synchronizeFields(selectToSync, ['12:00', '13:00', '14:00'], selectToSync2, ['12:00', '13:00', '14:00'], syncValue);
  });
  selectToSync2.addEventListener('change', function () {
    window.synchronizeFields(selectToSync2, ['12:00', '13:00', '14:00'], selectToSync, ['12:00', '13:00', '14:00'], syncValue);
  });
  elementPrice.addEventListener('change', function () {
    window.synchronizeFields(elementPrice, ['flat', 'bungalo', 'house', 'palace'], price, ['1000', '0', '5000', '10000'], syncValue);
  });
  elementGuests.addEventListener('change', function () {
    window.synchronizeFields(elementGuests, ['1', '2', '3', '100'], guests, [rooms1, rooms2, rooms3, rooms100], syncGuests);
  });
})();
