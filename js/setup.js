'use strict';

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

// -------------------------------------------------
// вспомогательные функции
// -------------------------------------------------
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomBoolean = function () {
  return !!(Math.round(Math.random()));
};

var getRandomArrayElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

// -------------------------------------------------
// coздает массив с данными волшебников
// -------------------------------------------------
var createWizards = function () {
  var wizardsData = [];

  for (var i = 0; i < WIZARD_COUNT; i++) {
    var wizard = {};
    var name = [
      getRandomArrayElement(WIZARD_FIRST_NAMES),
      getRandomArrayElement(WIZARD_SECOND_NAMES),
    ];
    wizard.name = getRandomBoolean() ? name.join(' ') : name.reverse().join(' ');
    wizard.coatColor = getRandomArrayElement(WIZARD_COAT_COLORS);
    wizard.eyesColor = getRandomArrayElement(WIZARD_EYES_COLORS);
    wizardsData.push(wizard);
  }
  return wizardsData;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
createWizards();
