'use strict';

(function () {
  var WIZARD_COUNT = 4;

  var WIZARD_FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];

  var WIZARD_SECOND_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ];

  var WIZARD_COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];

  var WIZARD_EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ];

  var WIZARD_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  var createWizards = function (count) {
    var wizardsData = [];

    for (var i = 0; i < count; i++) {
      var wizard = {};
      var name = [
        window.random.getArrayElement(WIZARD_FIRST_NAMES),
        window.random.getArrayElement(WIZARD_SECOND_NAMES),
      ];
      wizard.name = window.random.getBoolean() ? name.join(' ') : name.reverse().join(' ');
      wizard.coatColor = window.random.getArrayElement(WIZARD_COAT_COLORS);
      wizard.eyesColor = window.random.getArrayElement(WIZARD_EYES_COLORS);
      wizardsData.push(wizard);
    }
    return wizardsData;
  };

  window.data = {
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
    WIZARD_FIREBALL_COLORS: WIZARD_FIREBALL_COLORS,
    wizards: createWizards(WIZARD_COUNT)
  };

})();
