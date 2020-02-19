// https://stackoverflow.com/a/36028053/662368

const MIN_SCALE = 0.3;
const MAX_SCALE = 2;
let scale = MIN_SCALE;

let offsetX = 0;
let offsetY = 0;

export default function initZoom() {
  const $content = document.querySelector('.map-content');
  const $overlay = document.querySelector('.map-overlay');

  const areaWidth = $overlay.getBoundingClientRect().width;
  const areaHeight = $overlay.getBoundingClientRect().height;

  $overlay.addEventListener('wheel', event => {
    if (event.butt) {
      event.preventDefault();
    }
    const clientX = event.pageX - $overlay.getBoundingClientRect().left;
    const clientY = event.pageY - $overlay.getBoundingClientRect().top;

    const nextScale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, scale - event.deltaY / 100),
    );

    const percentXInCurrentBox = clientX / areaWidth;
    const percentYInCurrentBox = clientY / areaHeight;

    const currentBoxWidth = areaWidth / scale;
    const currentBoxHeight = areaHeight / scale;

    const nextBoxWidth = areaWidth / nextScale;
    const nextBoxHeight = areaHeight / nextScale;

    const deltaX =
      (nextBoxWidth - currentBoxWidth) * (percentXInCurrentBox - 0.5);
    const deltaY =
      (nextBoxHeight - currentBoxHeight) * (percentYInCurrentBox - 0.5);

    const nextOffsetX = offsetX - deltaX;
    const nextOffsetY = offsetY - deltaY;

    $content.style.transform = `scale(${nextScale})`;
    $content.style.left = -1 * nextOffsetX * nextScale;
    $content.style.right = nextOffsetX * nextScale;
    $content.style.top = -1 * nextOffsetY * nextScale;
    $content.style.bottom = nextOffsetY * nextScale;

    offsetX = nextOffsetX;
    offsetY = nextOffsetY;
    scale = nextScale;
  });
}
