'use strict';

(function () {
  window.util = {
    wizardData: {
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
    },
    /**
     * выбирает случайный индекс массива
     * @param {Array} array - исходный массив
     * @return {number} - случайный индекс
     */
    getRandomNumber(array) {
      const arrayLength = array.length;
      const randomNumber = Math.floor(Math.random() * (arrayLength));

      return randomNumber;
    },

    /**
     * перемешивает массив по алгоритму Фишера-Йетса
     * @param {Array} array - исходный массив
     * @return {Array} - перемешанный массив
     */
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = array[i];
        array[i] = array[j];
        array[j] = k;
      }
      return array;
    },
    /**
     * выбирает случайный элемент из перемешанного массива
     * @param {Array} array - исходный массив
     * @return {*} - случайный элемент массива
     */
    getRandomElementFromArray(array) {
      let mixedArray = this.shuffleArray(array);
      return mixedArray[this.getRandomNumber(array)];
    },
    isEscEvent(evt, action) {
      if (evt.key === `Escape`) {
        action();
      }
    },
    isEnterEvent(evt, action) {
      if (evt.key === `Enter`) {
        action();
      }
    }
  };
})();
