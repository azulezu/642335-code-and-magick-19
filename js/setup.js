'use strict';

(function () {
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
    // throw {message: 'Это фигня какая-то'};
    var fragment = document.createDocumentFragment();
    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });
    var similarListElement = document.querySelector('.setup-similar-list');
    similarListElement.appendChild(fragment);
  };

  var getSimilarWizards = function (wizards) {
    if (wizards.length < window.data.WIZARD_COUNT) {
      return wizards.slice(0);
    }
    var start = window.random.getNumber(0, wizards.length - window.data.WIZARD_COUNT);
    return wizards.slice(start, start + 4);
  };

  // -------------------------
  window.backend.load(function onSuccessCase(response) {
    var loadedWizards = [];
    try {
      loadedWizards = Array.from(response).map(function (wizard) {
        return {
          'name': wizard.name,
          'coatColor': wizard.colorCoat,
          'eyesColor': wizard.colorEyes,
          'fireballColor': wizard.colorFireball
        };
      });
      renderWizards(getSimilarWizards(loadedWizards));
    } catch (err) {
      window.util.renderErrorMessage('Ошибка преобразования данных: ' + err.message);
    }
  }, function onErrorCase(response) {
    window.util.renderErrorMessage('Ошибка получения данных: ' + response);
  });

})();
