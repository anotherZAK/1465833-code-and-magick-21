'use strict';

(function () {
  const characterSetupWindow = document.querySelector(`.setup`);
  const characterSimilarMenu = characterSetupWindow.querySelector(`.setup-similar`);
  characterSimilarMenu.classList.remove(`hidden`);

  const setupOpen = document.querySelector(`.setup-open`);
  const setupUserName = characterSetupWindow.querySelector(`.setup-user-name`);
  const setupClose = characterSetupWindow.querySelector(`.setup-close`);

  const setupPlayer = characterSetupWindow.querySelector(`.setup-player`);
  const fireballInput = characterSetupWindow.querySelector(`input[name="fireball-color"]`);
  const coatInput = characterSetupWindow.querySelector(`input[name="coat-color"]`);
  const eyesInput = characterSetupWindow.querySelector(`input[name="eyes-color"]`);

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
   * @param {Objest} evt - объект-событие
   */
  const changeColor = function (evt) {
    switch (evt.target.classList.value) {
      case `setup-fireball`:
        evt.target.style.backgroundColor = window.util.getRandomElementFromArray(window.util.wizardData.FIREBALL_COLORS);
        fireballInput.value = evt.target.style.backgroundColor;
        break;
      case `wizard-coat`:
        evt.target.style.fill = window.util.getRandomElementFromArray(window.util.wizardData.COAT_COLORS);
        coatInput.value = evt.target.style.fill;
        break;
      case `wizard-eyes`:
        evt.target.style.fill = window.util.getRandomElementFromArray(window.util.wizardData.EYES_COLORS);
        eyesInput.value = evt.target.style.fill;
        break;
    }
  };

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupPlayer.addEventListener(`click`, function (evt) {
    changeColor(evt);
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
})();

