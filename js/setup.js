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
  ]
};

const characterSetupWindow = document.querySelector(`.setup`);
characterSetupWindow.classList.remove(`hidden`);

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
