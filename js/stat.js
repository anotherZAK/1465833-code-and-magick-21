'use strict';

(function () {
  const CLOUD_X = 100;
  const CLOUD_Y = 10;
  const TEXT_X = 140;
  const TEXT_Y = 40;
  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;
  const GAP = 10;
  const BAR_WIDTH = 40;
  const BAR_HEIGHT_MAX = 150;
  const BAR_GAP = 50;
  const SHIFT_BAR_Y = 250;
  const SHIFT_TIMES_Y = 240;
  const SHIFT_NAMES_Y = 270;
  const ROW_GAP = 20;

  const renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  const getMaxElement = function (array) {
    let maxElement = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return maxElement;
  };

  const renderResults = function (ctx, x, y, color, duration) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, BAR_WIDTH, duration);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, `#ffffff`);
    ctx.font = `16px PT Mono`;
    let maxTime = getMaxElement(times);

    for (let i = 0; i < names.length; i++) {
      let saturation = Math.round(Math.random() * 100);
      let currentHeight = BAR_HEIGHT_MAX * times[i] / maxTime;
      ctx.fillStyle = `#000000`;
      ctx.fillText(names[i], TEXT_X + (BAR_GAP + BAR_WIDTH) * i, SHIFT_NAMES_Y);
      ctx.fillText(Math.round(times[i]), TEXT_X + (BAR_GAP + BAR_WIDTH) * i, SHIFT_TIMES_Y - currentHeight);

      if (names[i] === `Вы`) {
        renderResults(ctx, TEXT_X + (BAR_GAP + BAR_WIDTH) * i, SHIFT_BAR_Y, `rgba(255, 0, 0, 1)`, -currentHeight);
      } else {
        renderResults(ctx, TEXT_X + (BAR_GAP + BAR_WIDTH) * i, SHIFT_BAR_Y, `hsl(240, ${saturation}%, 50%)`, -currentHeight);
      }
    }
    ctx.fillStyle = `#000000`;
    ctx.fillText(`Ура вы победили!`, TEXT_X, TEXT_Y);
    ctx.fillText(`Список результатов:`, TEXT_X, TEXT_Y + ROW_GAP);
  };
})();


