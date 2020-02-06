'use strict';

(function () {

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.random = {
    getRandomBoolean: function () {
      return !!(Math.round(Math.random()));
    },

    getRandomArrayElement: function (array) {
      return array[getRandomNumber(0, array.length - 1)];
    }
  };

})();
