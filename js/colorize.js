'use strict';

(function () {

  var getRandomColor = function (name) {
    switch (name) {
      case 'coat-color':
        return window.random.getArrayElement(window.data.WIZARD_COAT_COLORS);
      case 'eyes-color':
        return window.random.getArrayElement(window.data.WIZARD_EYES_COLORS);
      case 'fireball-color':
        return window.random.getArrayElement(window.data.WIZARD_FIREBALL_COLORS);
    }
    return '';
  };

  window.colorize = function (element, name) {
    element.addEventListener('click', function () {
      var color = getRandomColor(name);
      var inputElement = document.querySelector('input[name="' + name + '"]');
      inputElement.value = color;
      element.style[element.tagName === 'DIV' ? 'backgroundColor' : 'fill'] = color;

      // код для вызова поиска похожих
      var part = name.split('-')[0];
      window.setup.updateWizards(part, color);
    });
  };

})();
