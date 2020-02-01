'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

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
  if (evt.key === ESC_KEY) {
    if (!evt.target.classList.contains('setup-user-name')) {
      hideUserDialog();
    }
  }
};

var onSetupOpenIconEnterKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
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
    if (evt.key === ENTER_KEY) {
      hideUserDialog();
    }
  });
};

// -------------------------------------------------
// добавляет обработчики для формы
// -------------------------------------------------
var onUserNameInputInvalid = function (evt) {
  var userNameElement = evt.target;
  if (userNameElement.validity.tooShort) {
    userNameElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameElement.validity.tooLong) {
    userNameElement.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameElement.validity.valueMissing) {
    userNameElement.setCustomValidity('Обязательное поле');
  } else {
    userNameElement.setCustomValidity('');
  }
};

var colorizeWizard = function (targetElement) {
  var wizardElement = document.querySelector('.setup-wizard-appearance');
  var wizardPart = '';
  var color = '';
  switch (targetElement.classList[0]) {
    case 'wizard-coat':
      wizardPart = 'coat';
      color = getRandomArrayElement(WIZARD_COAT_COLORS);
      break;
    case 'wizard-eyes':
      wizardPart = 'eyes';
      color = getRandomArrayElement(WIZARD_EYES_COLORS);
      break;
    default:
      return;
  }
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

// обработка действий в форме
var addUserDialogProcessing = function () {
  var userDialogElement = document.querySelector('.setup');
  var userNameInput = userDialogElement.querySelector('.setup-user-name');
  var wizardElement = userDialogElement.querySelector('.setup-wizard');
  var wizardFireballElement = userDialogElement.querySelector('.setup-fireball-wrap');

  userDialogElement.querySelector('.setup-wizard-form')
    .setAttribute('action', 'https://js.dump.academy/code-and-magick');

  userNameInput.setAttribute('required', '');
  userNameInput.setAttribute('minlength', MIN_NAME_LENGTH);
  userNameInput.setAttribute('maxlength', MAX_NAME_LENGTH);

  userNameInput.addEventListener('invalid', onUserNameInputInvalid);

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_NAME_LENGTH) {
      // не работает сообщение?
      target.setCustomValidity('Имя должно состоять минимум из '
      + MIN_NAME_LENGTH + '-х символов!');
    } else {
      target.setCustomValidity('');
    }
  });

  wizardElement.addEventListener('click', function (evt) {
    colorizeWizard(evt.target);
  });

  wizardFireballElement.addEventListener('click', function (evt) {
    colorizeFireball(evt.currentTarget);
  });
};

// основной блок
var wizards = createWizards();
renderWizards(wizards);
addSetupWindowProcessing();
addUserDialogProcessing();
