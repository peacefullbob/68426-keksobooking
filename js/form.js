'use strict';
(function () {
  var selectToSync = document.querySelector('#timein');
  selectToSync.addEventListener('change', function syncTime() {
    document.getElementById(selectToSync.dataset.syncwith).options[selectToSync.selectedIndex].selected = true;
  });

  var selectToSync2 = document.querySelector('#timeout');
  selectToSync2.addEventListener('change', function syncTime() {
    document.getElementById(selectToSync2.dataset.syncwith).options[selectToSync2.selectedIndex].selected = true;
  });

  var elementPrice = document.querySelector('#type');
  elementPrice.addEventListener('change', function syncPrice() {
    var price = document.querySelector('#price');
    switch (elementPrice.value) {
      case 'bungalo':
        price.value = '0';
        break;
      case 'flat':
        price.value = '1000';
        break;
      case 'house':
        price.value = '5000';
        break;
      case 'palace':
        price.value = '10000';
        break;
    }
  });

  var elementGuests = document.querySelector('#room_number');
  elementGuests.addEventListener('change', function syncGuests() {
    var guests = document.querySelector('#capacity');
    function removeChilds() {
      while (guests.lastChild) {
        guests.removeChild(guests.lastChild);
      }
    }
    var rooms1 = new Option('для 1 гостя', '1');
    var rooms2 = new Option('для 2 гостей', '2');
    var rooms3 = new Option('для 3 гостей', '3');
    var rooms100 = new Option('не для гостей', '0');
    switch (elementGuests.value) {
      case '1':
        removeChilds();
        guests.appendChild(rooms1);
        break;
      case '2':
        removeChilds();
        guests.appendChild(rooms1);
        guests.appendChild(rooms2);
        break;
      case '3':
        removeChilds();
        guests.appendChild(rooms1);
        guests.appendChild(rooms2);
        guests.appendChild(rooms3);
        break;
      case '100':
        removeChilds();
        guests.appendChild(rooms100);
        break;
    }
  });
})();
