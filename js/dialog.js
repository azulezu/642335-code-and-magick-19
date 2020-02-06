'use strict';

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var userDialog = document.querySelector('.setup');

  // -------------------------------------------------
  // обработчики и функции для окна
  // -------------------------------------------------

  var showUserDialog = function () {
    userDialog.classList.remove('hidden');
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscKeydown);
  };

  var hideUserDialog = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscKeydown);
  };

  var onSetupEscKeydown = function (evt) {
    if (!evt.target.classList.contains('setup-user-name')) {
      window.util.isEscEvent(evt, hideUserDialog);
    }
  };

  var onSetupOpenIconEnterKeydown = function (evt) {
    window.util.isEnterEvent(evt, function () {
      evt.target.removeEventListener('focus', onSetupOpenIconFocus);
      showUserDialog();
    });
  };

  var onSetupOpenIconFocus = function (evt) {
    evt.target.addEventListener('keydown', onSetupOpenIconEnterKeydown);
  };

  // основная функция для начальной настройки открытия-закрытия окна
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
      window.util.isEnterEvent(evt, hideUserDialog);
    });
  };

  // -------------------------------------------------
  // обработчики и функции для формы
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

  var colorizeWizard = function (colors, element, name) {
    var color = window.random.getRandomArrayElement(colors);
    var inputElement = document.querySelector('input[name="' + name + '"]');
    inputElement.value = color;
    element.style[element.tagName === 'DIV' ? 'backgroundColor' : 'fill'] = color;
  };

  // основная функция для обработки действий в форме
  var addUserDialogProcessing = function () {
    var userNameInput = userDialog.querySelector('.setup-user-name');
    var wizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
    var wizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
    var wizardFireballElement = document.querySelector('.setup-fireball-wrap');

    userDialog.querySelector('.setup-wizard-form').action = 'https://js.dump.academy/code-and-magick';

    userNameInput.required = true;
    userNameInput.minLength = MIN_NAME_LENGTH;
    userNameInput.maxLength = MAX_NAME_LENGTH;

    userNameInput.addEventListener('invalid', onUserNameInputInvalid);

    wizardCoatElement.addEventListener('click', function (evt) {
      colorizeWizard(window.data.WIZARD_COAT_COLORS, evt.target, 'coat-color');
    });
    wizardEyesElement.addEventListener('click', function (evt) {
      colorizeWizard(window.data.WIZARD_EYES_COLORS, evt.target, 'eyes-color');
    });
    wizardFireballElement.addEventListener('click', function (evt) {
      colorizeWizard(window.data.WIZARD_FIREBALL_COLORS, evt.target, 'fireball-color');
    });
    userNameInput.addEventListener('input', function (evt) {
      var target = evt.target;
      if (target.value.length < MIN_NAME_LENGTH) {
        target.setCustomValidity('');
      }
    });
  };

  // -------------------------
  addSetupWindowProcessing();
  addUserDialogProcessing();
})();