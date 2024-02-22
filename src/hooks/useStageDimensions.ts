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
  parentWidth?: number;
  parentHeight?: number;
};

export const useStageDimensions = ({
  app,
  parentWidth = 0,
  parentHeight = 0,
}: UseStageDimensionsProps) => {
  const width = calculateWidth(parentWidth, parentHeight);
  const height = calculateHeight(parentWidth, parentHeight);
  const screenWidth = app?.screen?.width || parentWidth;
  const screenHeight = app?.screen?.height || parentHeight;
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
