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

  window.addEventListener(
    'wheel',
    e => {
      e.preventDefault();

      if (e.ctrlKey) {
        scale -= e.deltaY * 0.01;
        // scale -= Math.sign(e.deltaY) * 0.01;
        // console.log(e.deltaY);

        scale = Math.max(MIN_SCALE, scale);
        scale = Math.min(MAX_SCALE, scale);
      } else {
        posX -= e.deltaX * 2;
        posY -= e.deltaY * 2;
      }

      render();
    },
    { passive: false },
  );

  window.addEventListener(
    'gesturestart',
    e => {
      e.preventDefault();
      startX = e.pageX - posX;
      startY = e.pageY - posY;

      gestureStartScale = scale;
    },
    { passive: false },
  );

  window.addEventListener(
    'gesturechange',
    e => {
      e.preventDefault();

      scale = gestureStartScale * e.scale;

      posX = e.pageX - startX;
      posY = e.pageY - startY;

      render();
    },
    { passive: false },
  );

  window.addEventListener(
    'gestureend',
    e => {
      e.preventDefault();
    },
    { passive: false },
  );

  console.log('zoom init done');
}
