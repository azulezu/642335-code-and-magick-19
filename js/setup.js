'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

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

// -------------------------------------------------
// coздает элемент, соотв. данным волшебника
// -------------------------------------------------
var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// -------------------------------------------------
// показывает волшебников на странице
// -------------------------------------------------
var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(fragment);
};

var showUserDialog = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscKeydown);
};

var hideUserDialog = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscKeydown);
};

// -------------------------------------------------
// добавляет обработчики для окна
// -------------------------------------------------
var onSetupEscKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (!evt.target.classList.contains('setup-user-name')) {
      hideUserDialog();
    }
  }
};

var onSetupOpenIconEnterKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.target.removeEventListener('focus', onSetupOpenIconFocus);
    showUserDialog();
  }
};

var onSetupOpenIconFocus = function (evt) {
  evt.target.addEventListener('keydown', onSetupOpenIconEnterKeydown);
};

// открытие-закрытие окна
var addSetupWindowProcessing = function () {
  var setupOpenElement = document.querySelector('.setup-open');
  var setupOpenIconElement = document.querySelector('.setup-open-icon');
  var setupCloseElement = document.querySelector('.setup-close');

  setupOpenElement.addEventListener('click', function () {
    showUserDialog();
  });

  setupOpenIconElement.tabIndex = '0';
  // добавить aria
  setupOpenIconElement.addEventListener('focus', onSetupOpenIconFocus);
  setupOpenIconElement.addEventListener('blur', function () {
    setupOpenIconElement.removeEventListener('focus', onSetupOpenIconFocus);
  });

  setupCloseElement.tabIndex = '0';
  setupCloseElement.addEventListener('click', function () {
    hideUserDialog();
  });
  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      hideUserDialog();
    }
  });
};

// -------------------------------------------------
// добавляет обработчики для формы
// -------------------------------------------------
var colorizeWizard = function (targetElement) {
  var wizardElement = document.querySelector('.setup-wizard-appearance');
  var wizardPart = '';
  switch (targetElement.classList[0]) {
    case 'wizard-coat':
      wizardPart = 'coat';
      break;
    case 'wizard-eyes':
      wizardPart = 'eyes';
      break;
    default:
      return;
  }
  var color = getRandomArrayElement(WIZARD_FIREBALL_COLORS);
  var inputElement = wizardElement.querySelector('input[name="' + wizardPart + '-color"]');
  inputElement.value = color;
  targetElement.style.fill = color;
};

var colorizeFireball = function (wrapElement) {
  var color = getRandomArrayElement(WIZARD_FIREBALL_COLORS);
  var inputElement = wrapElement.querySelector('input[name="fireball-color"]');
  inputElement.value = color;
  wrapElement.style.backgroundColor = color;
};

var addUserDialogProcessing = function () {
  var userDialogElement = document.querySelector('.setup');
  var wizardElement = userDialogElement.querySelector('.setup-wizard');
  var wizardFireballElement = userDialogElement.querySelector('.setup-fireball-wrap');

  wizardElement.addEventListener('click', function (evt) {
    colorizeWizard(evt.target);
  });

  wizardFireballElement.addEventListener('click', function (evt) {
    colorizeFireball(evt.currentTarget);
  });
};

var wizards = createWizards();
renderWizards(wizards);
addSetupWindowProcessing();
addUserDialogProcessing();
