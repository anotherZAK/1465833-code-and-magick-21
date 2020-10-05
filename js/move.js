'use strict';

(function () {
  const characterSetupWindow = document.querySelector(`.setup`);
  const dialogHandle = characterSetupWindow.querySelector(`.upload`);

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    /**
     * вычисляет координаты смещения при перетаскивании объекта мышью
     * @param {Object} moveEvt - объект события
     */
    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      characterSetupWindow.style.top = (characterSetupWindow.offsetTop - shift.y) + `px`;
      characterSetupWindow.style.left = (characterSetupWindow.offsetLeft - shift.x) + `px`;
    };

    /**
     * прекращает перетаскивание объекта мышью. Также отменяет вызов контекстного меню при отсутствии перетаскивания объекта
     * @param {*} upEvt - объект события
     */
    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
