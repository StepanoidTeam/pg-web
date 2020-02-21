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
      const transform = `translate3D(${posX}px, ${posY}px, 0px) scale(${scale})`;

      // console.log(transform);
      mapContent.style.transform = transform;

      // const statusHolder = document.querySelector('.status-holder');
      // statusHolder.innerHTML = `x:${posX}, y:${posY}, <br/>
      // scale:${scale.toFixed(2)}<br/>
      // overlay:${overlayWidth.toFixed(2)},${overlayHeight.toFixed(2)}<br/>
      // content:${contentWidth.toFixed(2)},${contentHeight.toFixed(2)}<br/>
      // `;
    });
  };

  // todo(vmyshko): use this as common endpoint for any type of events?
  function zoom(e) {
    e.preventDefault();

    if (e.ctrlKey) {
      scale -= e.deltaY * 0.01;
      // console.log(e.deltaY);

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

    if (e instanceof TouchEvent) {
      const [touch] = e.touches;

      startX = touch.pageX - posX;
      startY = touch.pageY - posY;
      // console.log('start', startX, startY);
    } else {
      //mouse

      startX = e.pageX - posX;
      startY = e.pageY - posY;
    }

    gestureStartScale = scale;
  }

  function move(e) {
    e.preventDefault();

    if (!isMoving) return;

    if (e instanceof TouchEvent) {
      const [touch] = e.touches;

      // todo(vmyshko): if 2 touches - get zoom gesture?
      console.log(e.touches);

      scale = gestureStartScale * (touch.scale || 1);

      posX = touch.pageX - startX;
      posY = touch.pageY - startY;
      // console.log('move', posX, posY);
    } else {
      //MouseEvent
      scale = gestureStartScale * (e.scale || 1);

      posX = e.pageX - startX;
      posY = e.pageY - startY;
    }

    render();
  }

  function endMove(e) {
    e.preventDefault();
    isMoving = false;
    document.body.classList.remove('cursor-move');
  }

  const noop = () => 0;

  // todo(vmyshko): make mobile touch work
  //android phone touch-screen
  // window.addEventListener('touchstart', startMove, { passive: false });
  // window.addEventListener('touchend', endMove, { passive: false });
  // window.addEventListener('touchcancel', endMove, { passive: false });
  // window.addEventListener('touchmove', move, { passive: false });

  //mouse wheel / macbook touch-pad zoom gesture
  // mac touchpad scroll map also works just based on wheel
  window.addEventListener('wheel', zoom, { passive: false });

  // mac doesn't use these at all, do we need them then?
  window.addEventListener('gesturestart', startMove, { passive: false });
  window.addEventListener('gesturechange', move, { passive: false });
  window.addEventListener('gestureend', endMove, { passive: false });

  //pc mouse events
  window.addEventListener('mousedown', startMove, { passive: false });
  window.addEventListener('mousemove', move, { passive: false });
  window.addEventListener('mouseup', endMove, { passive: false });

  // scale approoach for mobile
  // (function onScale(el, callback) {
  //   let hypo = undefined;

  //   console.log('on scale init');

  //   el.addEventListener(
  //     'touchmove',
  //     function(event) {
  //       event.stopPropagation();
  //       if (event.touches.length === 2) {
  //         let hypo1 = Math.hypot(
  //           event.touches[0].pageX - event.touches[1].pageX,
  //           event.touches[0].pageY - event.touches[1].pageY,
  //         );
  //         if (hypo === undefined) {
  //           hypo = hypo1;
  //         }
  //         callback(hypo1 / hypo);
  //       }
  //     },
  //     { passive: false },
  //   );

  //   el.addEventListener(
  //     'touchend',
  //     function(event) {
  //       hypo = undefined;
  //     },
  //     { passive: false },
  //   );
  // })(window, delta => {
  //   console.log(delta);
  //   scale -= delta * 0.1;

  //   scale = Math.max(MIN_SCALE, scale);
  //   scale = Math.min(MAX_SCALE, scale);

  //   render();
  // });

  console.log('zoom init done');
}
