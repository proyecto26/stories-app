import { _ReactPixi } from '@pixi/react';
import { useRef, type ComponentType, useState, forwardRef, useEffect } from 'react';
import { FederatedPointerEvent } from 'pixi.js';
import isArray from 'lodash/isArray';

import { getDraggableIndex, setDraggableIndex } from './utils';

export function withPixiDraggable<T extends _ReactPixi.IContainer>(
  WrappedComponent: ComponentType<T>
) {
  return forwardRef<unknown, T>(function (props, ref) {
    const isDragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const [position, setPosition] = useState({
      x: props.x || (isArray(props.position) ? props.position[0] : 0) || 0,
      y: props.y || (isArray(props.position) ? props.position[1] : 0) || 0,
    });
    const [alpha, setAlpha] = useState(1);
    const [zIndex, setZIndex] = useState(getDraggableIndex());

    useEffect(() => {
      setPosition((position) => ({
        x: props.x || (isArray(props.position) ? props.position[0] : 0) || position.x,
        y: props.y || (isArray(props.position) ? props.position[1] : 0) || position.y,
      }));
    }, [props.x, props.y, props.position]);

    function onStart(e: FederatedPointerEvent) {
      isDragging.current = true;
      offset.current = {
        x: e.global.x - position.x,
        y: e.global.y - position.y,
      };

      setAlpha(0.5);
      const newIndex = setDraggableIndex((curIndex) => ++curIndex);
      setZIndex(newIndex);
    }

    function onEnd() {
      isDragging.current = false;
      setAlpha(1);
    }

    function onMove(e: FederatedPointerEvent) {
      if (isDragging.current) {
        setPosition({
          x: e.global.x - offset.current.x,
          y: e.global.y - offset.current.y,
        });
      }
    }
    return (
      <WrappedComponent
        {...(props as T)}
        ref={ref}
        alpha={alpha}
        position={position}
        zIndex={zIndex}
        eventMode='static'
        cursor='pointer'
        pointerdown={onStart}
        pointerup={onEnd}
        pointerupoutside={onEnd}
        pointermove={onMove}
      />
    );
  });
}
