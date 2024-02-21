import { Application, Graphics } from "pixi.js";
import { useMemo } from "react";

export type UseDrawRectangleProps = {
  app?: Application;
  width: number;
  height: number;
};

const drawRect = (width: number, height: number) =>
  new Graphics().clear().lineStyle(5, 0x000, 1).drawRect(0, 0, width, height);

export function useDrawRectangle({ width, height }: UseDrawRectangleProps) {
  return useMemo(() => drawRect(width, height), [width, height]);
}

export function useDrawRectangleTexture({
  app,
  width,
  height,
}: UseDrawRectangleProps) {
  return useMemo(() => {
    if (!app) return;
    const g = drawRect(width, height);
    return app.renderer.generateTexture(g);
  }, [app, width, height]);
}
