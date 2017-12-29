'use strict';

window.data = (function () {
  return {
    removeChildren: function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    },
    getFeaturesFragment: function (array) {
      var fragment = document.createDocumentFragment();
      array.forEach(function (element) {
        var li = document.createElement('li');
        li.className = 'feature feature--' + element;
        fragment.append(li);
      });
      return fragment;
    }
  };
})();
