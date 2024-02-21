import { Application } from "@pixi/app";
import { useMemo } from "react";

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  calculateHeight,
  calculateWidth,
} from "../stories/resize";

export type UseStageDimensionsProps = {
  app?: Application;
  rendererSize?: DOMRect;
};

export const useStageDimensions = (props: UseStageDimensionsProps) => {
  const { app, rendererSize } = props;
  const width = calculateWidth(rendererSize);
  const height = calculateHeight(rendererSize);
  const screenWidth = app?.screen?.width || rendererSize?.width || 0;
  const screenHeight = app?.screen?.height || rendererSize?.height || 0;
  const centerX = useMemo(
    () => screenWidth / 2 - width / 2,
    [screenWidth, width]
  );
  const centerY = useMemo(
    () => screenHeight / 2 - height / 2,
    [screenHeight, height]
  );

  const ratio: [number, number] = useMemo(
    () => [width / CANVAS_WIDTH, height / CANVAS_HEIGHT],
    [height, width]
  );

  return {
    width,
    height,
    screenWidth,
    screenHeight,
    centerX,
    centerY,
    ratio,
  };
};
