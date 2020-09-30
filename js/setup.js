'use strict';

const NUMBER_OF_WIZARDS = 4;
const WIZARD_DATA = {
  NAMES: [
    `Иван`,
    `Хуан Себастьян`,
    `Мария`,
    `Кристоф`,
    `Виктор`,
    `Юлия`,
    `Люпита`,
    `Вашингтон`
  ],
  SURNAMES: [
    `да Марья`,
    `Верон`,
    `Мирабелла`,
    `Вальц`,
    `Онопко`,
    `Топольницкая`,
    `Нионго`,
    `Ирвинг`
  ],
  COAT_COLORS: [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`
  ],
  EYES_COLORS: [
    `black`,
    `red`,
    `blue`,
    `yellow`,
    `green`
  ],
  FIREBALL_COLORS: [
    `#ee4830`,
    `#30a8ee`,
    `#5ce6c0`,
    `#e848d5`,
    `#e6e848`
  ]
};

const characterSetupWindow = document.querySelector(`.setup`);
// characterSetupWindow.classList.remove(`hidden`);

/**
 * выбирает случайный индекс массива
 * @param {Array} array - исходный массив
 * @return {number} - случайный индекс
 */

const getRandomNumber = function (array) {
  const arrayLength = array.length;
  const randomNumber = Math.floor(Math.random() * (arrayLength));

  return randomNumber;
};

/**
 * выбирает случайный элемент из массива
 * @param {Array} array - исходный массив
 * @return {string} - случайный элемент массива
 */

const getRandomElementFromArray = function (array) {
  return array[getRandomNumber(array)];
};

/**
 * создаёт объект со случайно выбранными свойствами персонажа
 * @param {Array} names - исходный массив имён
 * @param {Array} surnames - исходный массив фамилий
 * @param {Array} coatColors - исходный массив цветов плащей
 * @param {Array} eyesColors - исходный массив цветов глаз
 * @return {Object} - объект со свойствами персонажа
 */

const generateCharacterData = function (names, surnames, coatColors, eyesColors) {
  return {
    name: `${getRandomElementFromArray(names)} ${getRandomElementFromArray(surnames)}`,
    coatColor: getRandomElementFromArray(coatColors),
    eyesColor: getRandomElementFromArray(eyesColors)
  };
};

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;
const similarWizardItem = similarWizardTemplate.querySelector(`.setup-similar-item`);

/**
 * формирует разметку со свойствами персонажа
 * @param {Object} character - исходный объект со свойствами персонажа
 * @return {Object} - объект html-разметки с записанными свойствами персонажа
 */

const makeHtmlCharacter = function (character) {
  const characterElement = similarWizardItem.cloneNode(true);
  const characterName = characterElement.querySelector(`.setup-similar-label`);
  const characterCoat = characterElement.querySelector(`.wizard-coat`);
  const characterEyes = characterElement.querySelector(`.wizard-eyes`);

  characterName.textContent = character.name;
  characterCoat.style.fill = character.coatColor;
  characterEyes.style.fill = character.eyesColor;
  return characterElement;
};

/**
 * создаёт массив объектов с персонажами
 * @param {number} numberOfCharacters - количество персонажей
 * @param {Object} charectersData - данные персонажей
 * @return {Array} - массив с объектами - персонажами
 */

const generateCharacters = function (numberOfCharacters, charectersData) {
  let characters = [];
  for (let i = 0; i < numberOfCharacters; i++) {
    characters[i] = generateCharacterData(
        charectersData.NAMES,
        charectersData.SURNAMES,
        charectersData.COAT_COLORS,
        charectersData.EYES_COLORS);
  }

  return characters;
};

const wizards = generateCharacters(NUMBER_OF_WIZARDS, WIZARD_DATA);

/**
 * Добавляет песонажей в разметку документа
 * @param {Array} characters - исходный массив с объектами - персонажами
 * @return {Object} - объект-список с новой разметкой, содержащей разметку объектов - персонажей
 */

const incarnateCharacters = function (characters) {
  const characterList = document.querySelector(`.setup-similar-list`);
  const charactersContainer = document.createDocumentFragment();

  for (let i = 0; i < characters.length; i++) {
    charactersContainer.appendChild(makeHtmlCharacter(characters[i]));
  }

  return characterList.appendChild(charactersContainer);
};

incarnateCharacters(wizards);

const characterSimilarMenu = characterSetupWindow.querySelector(`.setup-similar`);
characterSimilarMenu.classList.remove(`hidden`);

const setup = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setup.querySelector(`.setup-close`);

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
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};


/**
 * открывает окно настройки персонажа
 */

const openPopup = function () {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

/**
 * скрывает окно настройки персонажа
 */

const closePopup = function () {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

const changeColor = function (selector) {
  switch (selector) {
    case wizardFireball:
      wizardFireball.style.backgroundColor = getRandomElementFromArray(WIZARD_DATA.FIREBALL_COLORS);
      fireballInput.value = wizardFireball.style.backgroundColor;
      break;
    case wizardCoat:
      wizardCoat.style.fill = getRandomElementFromArray(WIZARD_DATA.COAT_COLORS);
      coatInput.value = wizardCoat.style.fill;
      break;
    case wizardEyes:
      wizardEyes.style.fill = getRandomElementFromArray(WIZARD_DATA.EYES_COLORS);
      eyesInput.value = wizardEyes.style.fill;
      break;
  }
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});


setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
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
