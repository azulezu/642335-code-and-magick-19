'use strict';

(function () {

  getPosition = function (element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  };

  setPosition = function (element, position) {
    // спросить про сравнение, если 0
    if ((position.left || position.left === 0)
    && (position.top || position.top === 0)) {
      element.style.top = position.top + 'px';
      element.style.left = position.left + 'px';
    }
  };

  window.dnd = {

    getPosition: getPosition,

    setPosition: setPosition,

    makeMovable: function (element, handler) {
      handler.addEventListener('mousedown', function (evt) {
        evt.preventDefault();
        var dragged = false;
        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          dragged = true;

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          setPosition(element, {
            top: element.offsetTop - shift.y,
            left: element.offsetLeft - shift.x
          });
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);

          if (dragged) {
            var onClickPreventDefault = function (clickEvt) {
              clickEvt.preventDefault();
              handler.removeEventListener('click', onClickPreventDefault);
            };
            handler.addEventListener('click', onClickPreventDefault);
          }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  };
})();
