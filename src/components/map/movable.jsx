import React, { useState } from 'react';

export default function Movable(props) {
  const { children, onDrag, onDrop, ...rest } = props;

  const [startPos, setStartPos] = useState(null);
  const [currentPos, setCurrentPos] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  const map = window.document.querySelector('.map-content');

  const onMouseDown = event => {
    event.stopPropagation();
    const { screenX, screenY } = event;
    console.log('mouse down', screenX, screenY);

    setStartPos({ x: screenX, y: screenY });
    setIsMoving(true);

    map.addEventListener('mousemove', onMouseMove, {
      passive: false,
    });
    map.addEventListener('mouseup', onMouseUp, {
      passive: false,
    });
  };

  const onMouseMove = event => {
    //if (!isMoving) return;

    event.stopPropagation();

    const { x: left, y: top } = map.getBoundingClientRect();
    const { x, y } = event;

    setCurrentPos({ x: x - left, y: y - top });
    onDrag({ x: x - left, y: y - top });

    // console.log('mouse move', isMoving, clientX, clientY);
  };

  const onMouseUp = event => {
    event.stopPropagation();
    // console.log('mouse up', event);

    onDrop(currentPos);

    setIsMoving(false);
    // console.log('otpiska');
    map.removeEventListener('mousemove', onMouseMove);
    map.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div onMouseDown={onMouseDown} {...rest}>
      {children}
    </div>
  );
}
