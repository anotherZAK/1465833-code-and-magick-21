'use strict';

(function () {
  const characterSetupWindow = document.querySelector(`.setup`);
  const characterSimilarMenu = characterSetupWindow.querySelector(`.setup-similar`);
  characterSimilarMenu.classList.remove(`hidden`);

  const setupOpen = document.querySelector(`.setup-open`);
  const setupUserName = characterSetupWindow.querySelector(`.setup-user-name`);
  const setupClose = characterSetupWindow.querySelector(`.setup-close`);

  const wizardFireball = document.querySelector(`.setup-fireball-wrap`);
  const fireballInput = wizardFireball.querySelector(`input`);

  const wizardCoat = document.querySelector(`.wizard-coat`);
  const coatInput = document.querySelector(`input[name="coat-color"]`);

  const wizardEyes = document.querySelector(`.wizard-eyes`);
  const eyesInput = document.querySelector(`input[name="eyes-color"]`);

  /**
   * скрывает окно настройки персонажа при нажатии клавиши Escape
   * @param {Object} evt - объект события
   */
  const onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  /**
   * открывает окно настройки персонажа
   */
  const openPopup = function () {
    characterSetupWindow.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  /**
   * скрывает окно настройки персонажа
   */
  const closePopup = function () {
    characterSetupWindow.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  /**
   * перезаписывает свойства переданного объекта
   * @param {Objest} selector - исходный объект
   */
  const changeColor = function (selector) {
    switch (selector) {
      case wizardFireball:
        wizardFireball.style.backgroundColor = window.util.getRandomElementFromArray(window.util.wizardData.FIREBALL_COLORS);
        fireballInput.value = wizardFireball.style.backgroundColor;
        break;
      case wizardCoat:
        wizardCoat.style.fill = window.util.getRandomElementFromArray(window.util.wizardData.COAT_COLORS);
        coatInput.value = wizardCoat.style.fill;
        break;
      case wizardEyes:
        wizardEyes.style.fill = window.util.getRandomElementFromArray(window.util.wizardData.EYES_COLORS);
        eyesInput.value = wizardEyes.style.fill;
        break;
    }
  };

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupUserName.addEventListener(`focus`, function () {
    document.removeEventListener(`keydown`, onPopupEscPress);
  });

  setupUserName.addEventListener(`blur`, function () {
    document.addEventListener(`keydown`, onPopupEscPress);
  });

  setupClose.addEventListener(`click`, function () {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  wizardFireball.addEventListener(`click`, function () {
    changeColor(wizardFireball);
  });

  wizardCoat.addEventListener(`click`, function () {
    changeColor(wizardCoat);
  });

  wizardEyes.addEventListener(`click`, function () {
    changeColor(wizardEyes);
  });
})();

