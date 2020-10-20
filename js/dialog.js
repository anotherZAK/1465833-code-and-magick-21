'use strict';

(function () {
  const characterSetupWindow = document.querySelector(`.setup`);
  const characterSimilarMenu = characterSetupWindow.querySelector(`.setup-similar`);
  characterSimilarMenu.classList.remove(`hidden`);

  const setupOpen = document.querySelector(`.setup-open`);
  const setupUserName = characterSetupWindow.querySelector(`.setup-user-name`);
  const setupClose = characterSetupWindow.querySelector(`.setup-close`);

  const setupPlayer = characterSetupWindow.querySelector(`.setup-player`);

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

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupPlayer.addEventListener(`click`, function (evt) {
    window.setup.changeColor(evt);
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

