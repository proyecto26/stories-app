let PIXI_DRAGGABLE_INDEX = 1;

export const getDraggableIndex = () => PIXI_DRAGGABLE_INDEX;
export const setDraggableIndex = (updateFunctionOrValue: number | ((prevValue: number) => number)) => {
  if (typeof updateFunctionOrValue === 'function') {
    PIXI_DRAGGABLE_INDEX = updateFunctionOrValue(PIXI_DRAGGABLE_INDEX);
  } else {
    PIXI_DRAGGABLE_INDEX = updateFunctionOrValue;
  }
  return PIXI_DRAGGABLE_INDEX;
};