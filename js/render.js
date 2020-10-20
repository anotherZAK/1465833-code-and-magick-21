'use strict';

(function () {
  const NUMBER_OF_WIZARDS = 4;

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;
  const similarWizardItem = similarWizardTemplate.querySelector(`.setup-similar-item`);
  const characterSetupWindow = document.querySelector(`.setup`);

  /**
   * формирует разметку с данными волшебников
   * @param {Object} wizard - исходный объект с данными волшебника
   * @return {Object} - объект html-разметки с модифицированными данными волшебников
   */
  const makeHtmlWizard = function (wizard) {
    const wizardElement = similarWizardItem.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardElement;
  };

  /**
   * отрисовывает и обновляет волшебников на странице
   * @param {Object} wizards - исходный объект с данными волшебников
   */
  const renderWizard = function (wizards) {
    const fragment = document.createDocumentFragment();
    const characterList = document.querySelector(`.setup-similar-list`);
    const takeNumber = wizards.length > NUMBER_OF_WIZARDS
      ? NUMBER_OF_WIZARDS
      : wizards.length;

    characterList.textContent = ``;

    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(makeHtmlWizard(wizards[i]));
    }
    characterList.appendChild(fragment);

    characterSetupWindow.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  window.render = {
    renderWizard: renderWizard
  };
}());
