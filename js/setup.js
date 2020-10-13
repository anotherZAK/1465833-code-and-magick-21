'use strict';

(function () {
  const NUMBER_OF_WIZARDS = 4;

  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;
  const similarWizardItem = similarWizardTemplate.querySelector(`.setup-similar-item`);
  const characterSetupWindow = document.querySelector(`.setup`);

  const renderWizard = function (wizard) {
    const wizardElement = similarWizardItem.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;

    return wizardElement;
  };

  /**
   * настраивает стиль информационного сообщения
   * @param {String} message - сообщение
   * @param {String} color - цвет заливки блока сообщения
   * @return {Object} node - блок с сообщением
   */
  const configureMessageStyle = function (message, color) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: ${color};`;
    node.style.position = `fixed`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = message;

    return node;
  };

  /**
   * отображает сообщение при успешной отправке данных и скрывает окно настройки персонажа
   * @param {*} message - сообщение
   */
  const successHandlerSubmit = function (message) {
    document.body.insertAdjacentElement(`afterbegin`, configureMessageStyle(message, `green`));
    characterSetupWindow.classList.add(`hidden`);
  };

  /**
   * отображает загруженные данные (похожих персонажей)
   * @param {Object} characters - загруженные данные
   */
  const successHandlerLoad = function (characters) {
    const fragment = document.createDocumentFragment();
    const characterList = document.querySelector(`.setup-similar-list`);
    const shuffleCharacters = window.util.shuffleArray(characters);

    for (let i = 0; i < NUMBER_OF_WIZARDS; i++) {
      fragment.appendChild(renderWizard(shuffleCharacters[i]));
    }
    characterList.appendChild(fragment);

    characterSetupWindow.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  /**
   * отображает сообщение при неуспешной загрузке данных
   * @param {String} errorMessage - сообщение
   * @return {String} node - блок с сообщением
   */
  const errorHandlerLoad = function (errorMessage) {
    const node = document.querySelector(`.setup-similar-list`);
    node.style = `z-index: 100; margin: 0 auto; justify-content: center; background-color: tomato; border-width: 3px; border-style: solid; border-color: red;`;
    node.style.fontSize = `22px`;
    node.style.fontWeight = `bold`;
    node.textContent = errorMessage;

    return node;
  };

  /**
   * отображает сообщение при неуспешной отправке данных
   * @param {*} errorMessage - сообщение
   */
  const errorHandlerSubmit = function (errorMessage) {
    document.body.insertAdjacentElement(`afterbegin`, configureMessageStyle(errorMessage, `red`));
  };

  window.backend.load(successHandlerLoad, errorHandlerLoad);

  const wizardForm = characterSetupWindow.querySelector(`.setup-wizard-form`);
  wizardForm.addEventListener(`submit`, function (evt) {
    window.backend.save(new FormData(wizardForm), successHandlerSubmit, errorHandlerSubmit);
    evt.preventDefault();
  });
})();
