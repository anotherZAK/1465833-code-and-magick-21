'use strict';

(function () {
  const NUMBER_OF_WIZARDS = 4;

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
      name: `${window.util.getRandomElementFromArray(names)} ${window.util.getRandomElementFromArray(surnames)}`,
      coatColor: window.util.getRandomElementFromArray(coatColors),
      eyesColor: window.util.getRandomElementFromArray(eyesColors)
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

  const wizards = generateCharacters(NUMBER_OF_WIZARDS, window.util.wizardData);

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
})();
