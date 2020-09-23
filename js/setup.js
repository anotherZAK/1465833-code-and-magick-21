'use strict';

const numberOfCharacters = 4;
const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;
const similarWizardItem = similarWizardTemplate.querySelector(`.setup-similar-item`);

const characterSetupWindow = document.querySelector(`.setup`);
characterSetupWindow.classList.remove(`hidden`);

const getRandomNumber = function (array) {
  const arrayLength = array.length;
  const randomNumber = Math.floor(Math.random() * (arrayLength));

  return randomNumber;
};

const setCharacterData = function (names, surnames, coatColors, eyesColors) {
  let characterData = {};
  const indices = [names[getRandomNumber(names)], surnames[getRandomNumber(surnames)], coatColors[getRandomNumber(coatColors)], eyesColors[getRandomNumber(eyesColors)]];
  characterData.name = indices[0] + ` ` + indices[1];
  characterData.coatColor = indices[2];
  characterData.eyesColor = indices[3];

  return characterData;
};

const generateCharacter = function (character) {
  const characterElement = similarWizardItem.cloneNode(true);
  const characterName = characterElement.querySelector(`.setup-similar-label`);
  const characterCoat = characterElement.querySelector(`.wizard-coat`);
  const characterEyes = characterElement.querySelector(`.wizard-eyes`);

  characterName.textContent = character.name;
  characterCoat.style.fill = character.coatColor;
  characterEyes.style.fill = character.eyesColor;

  return characterElement;
};

const incarnateCharacters = function (characters) {
  const characterList = document.querySelector(`.setup-similar-list`);
  const charactersContainer = document.createDocumentFragment();

  for (let i = 0; i < numberOfCharacters; i++) {
    charactersContainer.appendChild(generateCharacter(characters[i]));
  }

  return characterList.appendChild(charactersContainer);
};

let wizardsData = [];
for (let i = 0; i < numberOfCharacters; i++) {
  wizardsData[i] = setCharacterData(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);
}

incarnateCharacters(wizardsData);

const characterSimilarMenu = characterSetupWindow.querySelector(`.setup-similar`);
characterSimilarMenu.classList.remove(`hidden`);
