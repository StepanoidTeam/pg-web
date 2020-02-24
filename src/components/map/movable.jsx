import React from 'react';
import { noop } from 'lodash';

export default function Movable(props) {
  const {
    children,
    onStart = noop,
    onDrag = noop,
    onDrop = noop,
    ...rest
  } = props;

  const map = window.document.querySelector('.map-content');

  const onMouseDown = event => {
    event.stopPropagation();

    map.addEventListener('mousemove', onMouseMove, {
      passive: false,
    });
    map.addEventListener('mouseup', onMouseUp, {
      passive: false,
    });

    onStart(getEventPos(event));
  };

  const getEventPos = event => {
    const { x: left, y: top } = map.getBoundingClientRect();
    const { x, y } = event;

    const ax = (x - left) / (window.scale || 1);
    const ay = (y - top) / (window.scale || 1);

    return { x: ax, y: ay };
  };

  const onMouseMove = event => {
    event.stopPropagation();

    onDrag(getEventPos(event));
  };

  const onMouseUp = event => {
    event.stopPropagation();

    onDrop(getEventPos(event));

    map.removeEventListener('mousemove', onMouseMove);
    map.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div onMouseDown={onMouseDown} {...rest}>
      {children}
    </div>
  );
}
