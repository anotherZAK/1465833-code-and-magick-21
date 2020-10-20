'use strict';

(function () {
  const characterSetupWindow = document.querySelector(`.setup`);

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
   * @param {String} message - сообщение
   */
  const successHandlerSubmit = function (message) {
    document.body.insertAdjacentElement(`afterbegin`, configureMessageStyle(message, `green`));
    characterSetupWindow.classList.add(`hidden`);
  };

  let coatColor = window.util.wizardData.COAT_COLORS[1];
  let eyesColor = window.util.wizardData.EYES_COLORS[1];
  let wizards = [];

  /**
   * ранжирует похожих волшебников по совпадению цветов плаща и глаз
   * @param {Object} wizard - объект с данными волшебника
   * @return {Number} - весовой коэффициент
   */
  const getRank = function (wizard) {
    let rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  /**
   * сортирует данные в алфавитном порядке по возрастанию
   * @param {*} left - очередной элемент массива данных
   * @param {*} right - следующий элемент массива данных
   * @return {Number} - номер, определяющий направление сортировки
   */
  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  /**
   * фильтрует массив похожих волшебников
   */
  const updateWizards = function () {
    window.render.renderWizard(wizards.sort(function (left, right) {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  const fireballInput = characterSetupWindow.querySelector(`input[name="fireball-color"]`);
  const coatInput = characterSetupWindow.querySelector(`input[name="coat-color"]`);
  const eyesInput = characterSetupWindow.querySelector(`input[name="eyes-color"]`);

  /**
   * перезаписывает свойства переданного объекта
   * @param {Objest} evt - объект-событие
   */
  const changeColor = function (evt) {
    switch (evt.target.classList.value) {
      case `setup-fireball`:
        fireballInput.value = window.util.getRandomElementFromArray(window.util.wizardData.FIREBALL_COLORS);
        evt.target.style.backgroundColor = fireballInput.value;
        break;
      case `wizard-coat`:
        coatInput.value = window.util.getRandomElementFromArray(window.util.wizardData.COAT_COLORS);
        evt.target.style.fill = coatInput.value;
        coatColor = coatInput.value;
        window.debounce.debounce(updateWizards);
        break;
      case `wizard-eyes`:
        eyesInput.value = window.util.getRandomElementFromArray(window.util.wizardData.EYES_COLORS);
        evt.target.style.fill = eyesInput.value;
        eyesColor = eyesInput.value;
        window.debounce.debounce(updateWizards);
        break;
    }
  };

  /**
   * отображает загруженные данные (похожих персонажей)
   * @param {Object} characters - загруженные данные
   */
  const successHandlerLoad = function (characters) {
    wizards = characters;
    window.render.renderWizard(characters);
  };

  /**
   * отображает сообщение при неуспешной загрузке данных
   * @param {String} errorMessage - сообщение
   * @return {String} - блок с сообщением
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
   * @param {String} errorMessage - сообщение
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

  window.setup = {
    changeColor: changeColor
  };
})();
