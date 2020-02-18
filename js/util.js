'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },

    renderErrorMessage: function (errorMessage) {
      var similarContainer = document.querySelector('.setup-similar');
      var element = document.createElement('p');

      element.className = 'setup-similar-error';
      element.style = 'border: 3px solid red; margin: 0 1em; padding: 1em; width: auto;';
      element.textContent = errorMessage;
      similarContainer.append(element);
    },

    removeErrorMessage: function () {
      var similarContainer = document.querySelector('.setup-similar');
      similarContainer.querySelectorAll('.setup-similar-error').forEach(function (element) {
        element.remove();
      });
    }
  };

})();
