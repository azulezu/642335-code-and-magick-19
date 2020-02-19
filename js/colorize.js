'use strict';

(function () {

  var onColorChange = function () {};

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

  var setOnElement = function (element, name) {
    element.addEventListener('click', function () {
      var color = getRandomColor(name);
      var inputElement = document.querySelector('input[name="' + name + '"]');
      inputElement.value = color;
      element.style[element.tagName === 'DIV' ? 'backgroundColor' : 'fill'] = color;

      // код для вызова поиска похожих
      var part = name.split('-')[0];
      window.colorize.onColorChange(part, color);
    });
  };

  window.colorize = {
    onColorChange: onColorChange,
    setOnElement: setOnElement
  };

})();
