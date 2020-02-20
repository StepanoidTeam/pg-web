import { clamp } from 'lodash';

// https://multi-touch-trackpad-gesture.stackblitz.io/

const MIN_SCALE = 0.2;
const MAX_SCALE = 1.5;

export default function initZoom() {
  let gestureStartScale = null;
  let scale = 1;
  let posX = 0;
  let posY = 0;
  let startX;
  let startY;

  const mapOverlay = document.querySelector('.map-overlay');
  const mapContent = document.querySelector('.map-content');

  const render = () => {
    window.requestAnimationFrame(() => {
      const {
        offsetWidth: overlayWidth,
        offsetHeight: overlayHeight,
      } = mapOverlay;
      const {
        width: contentWidth,
        height: contentHeight,
      } = mapContent.getBoundingClientRect();

      posX = clamp(
        posX,
        Math.min(0, overlayWidth - contentWidth),
        Math.max(0, overlayWidth - contentWidth),
      );

      posY = clamp(
        posY,
        Math.min(0, overlayHeight - contentHeight),
        Math.max(0, overlayHeight - contentHeight),
      );

      mapContent.style.transform = `translate3D(${posX}px, ${posY}px, 0px) scale(${scale})`;

      // const statusHolder = document.querySelector('.status-holder');
      // statusHolder.innerHTML = `x:${posX}, y:${posY}, <br/>
      // scale:${scale.toFixed(2)}<br/>
      // overlay:${overlayWidth.toFixed(2)},${overlayHeight.toFixed(2)}<br/>
      // content:${contentWidth.toFixed(2)},${contentHeight.toFixed(2)}<br/>
      // `;
    });
  };

  function zoom(e) {
    e.preventDefault();

    if (e.ctrlKey) {
      scale -= e.deltaY * 0.01;

      scale = Math.max(MIN_SCALE, scale);
      scale = Math.min(MAX_SCALE, scale);
    } else {
      posX -= e.deltaX * 2;
      posY -= e.deltaY * 2;
    }

    render();
  }

  let isMoving = false;

  function startMove(e) {
    e.preventDefault();
    isMoving = true;
    document.body.classList.add('cursor-move');

    startX = e.pageX - posX;
    startY = e.pageY - posY;

    gestureStartScale = scale;
  }

  function move(e) {
    e.preventDefault();

    if (!isMoving) return;

    scale = gestureStartScale * (e.scale || 1);

    posX = e.pageX - startX;
    posY = e.pageY - startY;

    render();
  }

  function endMove(e) {
    e.preventDefault();
    isMoving = false;
    document.body.classList.remove('cursor-move');
  }

  const noop = () => 0;

  //android phone touch-screen

  function testEvent(e) {
    e.preventDefault();
    alert(JSON.stringify(e));
  }
  // todo(vmyshko): make mobile touch work
  window.addEventListener('touchstart', move, { passive: false });
  window.addEventListener('touchend', endMove, { passive: false });
  window.addEventListener('touchcancel', endMove, { passive: false });
  window.addEventListener('touchmove', testEvent, { passive: false });

  //mouse wheel / macbook touch-pad zoom gesture
  window.addEventListener('wheel', zoom, { passive: false });

  //macbook touch-pad
  window.addEventListener('gesturestart', startMove, { passive: false });
  window.addEventListener('gesturechange', move, { passive: false });
  window.addEventListener('gestureend', endMove, { passive: false });

  //pc mouse events
  window.addEventListener('mousedown', startMove, { passive: false });
  window.addEventListener('mousemove', move, { passive: false });
  window.addEventListener('mouseup', endMove, { passive: false });

  console.log('zoom init done');
}
