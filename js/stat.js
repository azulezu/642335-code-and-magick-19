'use strict';

(function () {

  var fontStyle = {
    SIZE: '16px',
    FAMILY: 'PT Mono',
    COLOR: '#000',
  };
  var LINE_HEIGHT = Math.round(1.3 * parseInt(fontStyle.SIZE, 10));

  var USERS_TOTAL = 4;
  var PADDING = 20;
  var SHADOW_OFFSET = 10;

  var currentUser = {
    NAME: 'Вы',
    COLOR: 'rgba(255, 0, 0, 1)',
  };

  var cloudParams = {
    X: 100,
    Y: 10,
    WIDTH: 420,
    HEIGHT: 270,
    COLOR: '#fff',
  };

  var shadowParams = {
    X: cloudParams.X + SHADOW_OFFSET,
    Y: cloudParams.Y + SHADOW_OFFSET,
    WIDTH: cloudParams.WIDTH,
    HEIGHT: cloudParams.HEIGHT,
    COLOR: 'rgba(0, 0, 0, 0.7)',
  };

  var TITLE = 'Ура вы победили!\nСписок результатов:';
  var titleParams = {
    X: cloudParams.X + PADDING,
    Y: cloudParams.Y + PADDING,
  };

  var barParams = {
    GAP: 50,
    WIDTH: 40,
    MAX_HEIGHT: 150,
  };

  var ERROR_MESSAGE = 'Нет данных для показа статистики';
  var errorMessageParams = {
    X: cloudParams.WIDTH / 2 - 2 * PADDING,
    Y: barParams.MAX_HEIGHT / 2 + LINE_HEIGHT / 2,
    COLOR: '#f00',
  };

  var renderCloud = function (ctx, cloud) {
    ctx.fillStyle = cloud.COLOR;
    ctx.fillRect(cloud.X, cloud.Y, cloud.WIDTH, cloud.HEIGHT);
  };

  var renderText = function (ctx, txt, x, y, color) {
    ctx.font = fontStyle.SIZE + ' ' + fontStyle.FAMILY;
    ctx.fillStyle = (color) ? color : fontStyle.COLOR;
    ctx.fillText(txt, x, y);
  };

  var renderMultilineText = function (ctx, txt, x, y, color) {
    ctx.textAlign = 'start';
    ctx.textBaseline = 'hanging';
    var lines = txt.split('\n');
    var linesCount = 0;
    lines.forEach(function (line, i) {
      renderText(ctx, line, x, y + i * LINE_HEIGHT, color);
      linesCount = linesCount + 1;
    });
    return linesCount;
  };

  var renderBar = function (ctx, index, chartScale, label, value, color) {
    ctx.textBaseline = 'bottom';
    var barX = index * (barParams.GAP + barParams.WIDTH);
    var barHeight = chartScale * value;
    var barTop = LINE_HEIGHT + barParams.MAX_HEIGHT - barHeight;

    // значение
    ctx.textAlign = 'center';
    renderText(ctx, Math.round(value).toString(), barX + barParams.WIDTH / 2, barTop);

    // столбик диаграммы
    ctx.fillStyle = color;
    ctx.fillRect(barX, barTop, barParams.WIDTH, barHeight);

    // подпись
    ctx.textAlign = 'start';
    renderText(ctx, label, barX, barParams.MAX_HEIGHT + 2 * LINE_HEIGHT);
  };

  var renderChart = function (ctx, labels, values) {
    var maxValue = getMaxElement(values);
    // определить кол-во столбиков для переданных данных
    var barsTotal = (values.length > labels.length) ? labels.length : values.length;
    barsTotal = (barsTotal > USERS_TOTAL) ? USERS_TOTAL : barsTotal;

    if (!isFinite(maxValue) || barsTotal < 1) {
      ctx.textAlign = 'center';
      renderText(ctx, ERROR_MESSAGE, errorMessageParams.X, errorMessageParams.Y, errorMessageParams.COLOR);
      ctx.restore();
      return;
    }

    // определить масштаб диаграммы
    var chartScale = barParams.MAX_HEIGHT / maxValue;
    labels.slice(0, barsTotal).forEach(function (label, index) {
      var barColor = (label === currentUser.NAME) ? currentUser.COLOR : getRandomBlueColor();
      renderBar(ctx, index, chartScale, label, values[index], barColor);
    });
  };

  // вспомогательные функции

  var getMaxElement = function (arr) {
    return arr.reduce(function (max, item) {
      return (max > item) ? max : item;
    }, -Infinity);
  };

  var getRandomNumber = function (max) {
    return Math.floor(Math.random() * max + 1);
  };

  var getRandomBlueColor = function () {
    var MAX_PERCENT = 100;
    var HUE = 240;
    var LIGHTNESS = '50%';
    var Saturate = getRandomNumber(MAX_PERCENT) + '%';
    return 'hsl(' + HUE + ', ' + Saturate + ', ' + LIGHTNESS + ')';
  };


  window.renderStatistics = function (ctx, names, times) {
    // сохранить исходный контекст
    ctx.save();

    // нарисовать облако с тенью
    renderCloud(ctx, shadowParams);
    renderCloud(ctx, cloudParams);

    // вывести заголовок
    var linesInTitle = renderMultilineText(ctx, TITLE, titleParams.X, titleParams.Y);

    // перенести начало координат в верхний левый угол диаграммы
    var chartStartX = cloudParams.X + 2 * PADDING;
    var chartStartY = cloudParams.Y + PADDING + linesInTitle * LINE_HEIGHT;
    ctx.translate(chartStartX, chartStartY);

    renderChart(ctx, names, times);

    // вернуть исходный контекст
    ctx.restore();
  };
})();
