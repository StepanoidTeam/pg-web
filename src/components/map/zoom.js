// https://stackoverflow.com/a/36028053/662368

var MIN_SCALE = 0.3;
var MAX_SCALE = 2;
var scale = MIN_SCALE;

var offsetX = 0;
var offsetY = 0;

export default function initZoom() {
  var $content = document.querySelector('.map-content');
  var $overlay = document.querySelector('.map-overlay');

  var areaWidth = $overlay.getBoundingClientRect().width;
  var areaHeight = $overlay.getBoundingClientRect().height;

  $overlay.addEventListener('wheel', function(event) {
    if (event.butt) event.preventDefault();
    var clientX = event.pageX - $overlay.getBoundingClientRect().left;
    var clientY = event.pageY - $overlay.getBoundingClientRect().top;

    var nextScale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, scale - event.deltaY / 100),
    );

    var percentXInCurrentBox = clientX / areaWidth;
    var percentYInCurrentBox = clientY / areaHeight;

    var currentBoxWidth = areaWidth / scale;
    var currentBoxHeight = areaHeight / scale;

    var nextBoxWidth = areaWidth / nextScale;
    var nextBoxHeight = areaHeight / nextScale;

    var deltaX =
      (nextBoxWidth - currentBoxWidth) * (percentXInCurrentBox - 0.5);
    var deltaY =
      (nextBoxHeight - currentBoxHeight) * (percentYInCurrentBox - 0.5);

    var nextOffsetX = offsetX - deltaX;
    var nextOffsetY = offsetY - deltaY;

    $content.style.transform = 'scale(' + nextScale + ')';
    $content.style.left = -1 * nextOffsetX * nextScale;
    $content.style.right = nextOffsetX * nextScale;
    $content.style.top = -1 * nextOffsetY * nextScale;
    $content.style.bottom = nextOffsetY * nextScale;

    offsetX = nextOffsetX;
    offsetY = nextOffsetY;
    scale = nextScale;
  });
}
