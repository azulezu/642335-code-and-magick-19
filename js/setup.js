'use strict';

(function () {
  var loadedWizards = [];

  // для хранения текущих значений, по которым ищутся похожие
  var similarColors = {
    coat: 'rgb(101, 137, 164)',
    eyes: 'black',
    fireball: '#ee4830'
  };

  // coздает элемент, соотв. данным волшебника
  var renderWizard = function (wizard) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // показывает волшебников на странице
  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    var similarListElement = document.querySelector('.setup-similar-list');
    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);
  };

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.coatColor === similarColors.coat) {
      rank += 2;
    }
    if (wizard.eyesColor === similarColors.eyes) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var wizards = loadedWizards.slice();
    wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
    renderWizards(wizards.slice(0, window.data.WIZARD_COUNT));
  };

  window.colorize.onColorChange = window.debounce(function (part, color) {
    // записывает изменененный цвет
    similarColors[part] = color;
    updateWizards();
  });

  window.backend.load(function onSuccessCase(response) {
    try {
      loadedWizards = Array.from(response).map(function (wizard) {
        return {
          'name': wizard.name,
          'coatColor': wizard.colorCoat,
          'eyesColor': wizard.colorEyes,
          'fireballColor': wizard.colorFireball
        };
      });
      updateWizards();
    } catch (err) {
      window.util.renderErrorMessage('Ошибка преобразования данных: ' + err.message);
    }
  }, function onErrorCase(response) {
    window.util.renderErrorMessage('Ошибка получения данных: ' + response);
  });

})();
