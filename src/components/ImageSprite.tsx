import { ComponentProps, memo, useMemo } from "react";
import { Sprite } from "@pixi/react";

import { useImageTexture } from "../hooks/useImageTexture";
import { Application } from "pixi.js";
import { calculateSize } from "../stories/resize";

type ImageSpriteProps = ComponentProps<typeof Sprite> & {
  app?: Application;
  imageSrc: string;
};

const ImageSprite: React.FC<ImageSpriteProps> = ({ imageSrc, ...rest }) => {
  const texture = useImageTexture(imageSrc);
  // const texture = useDrawRectangleTexture({
  //   width: 300,
  //   height: 600,
  //   app: rest.app,
  // });
  const { height, width } = useMemo(
    () => calculateSize(texture?.width || 0, texture?.height || 0),
    [texture]
  );

  return !!texture && (
    <Sprite
      {...rest}
      // tint={0x000}
      texture={texture}
      width={width}
      height={height}
    />
  );
};

export default memo(ImageSprite);
