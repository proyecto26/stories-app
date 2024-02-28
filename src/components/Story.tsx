import { useState } from "react";
import { Container, Sprite, Stage } from "@pixi/react";
import { Application } from "@pixi/app";

import { useElementSize } from "../hooks/useElementSize";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../stories/resize";
import ImageSprite from "./ImageSprite";
import { useStageDimensions } from "../hooks/useStageDimensions";
import { withPixiDraggable } from "../hocs/withPixiDraggable";
import ShareStory from "./ShareStory";

interface StoryProps {
  photo?: string;
  stickers?: Array<string>;
}

const DraggableContainer = withPixiDraggable(Container);

const Story: React.FC<StoryProps> = ({ stickers, photo }) => {
  const [app, setApp] = useState<Application>();
  const [parentEl, setParentEl] = useState<HTMLDivElement>();
  const { size: parentSize, resize } = useElementSize<HTMLDivElement>({
    el: parentEl,
  });
  const { width, height, centerX, centerY, ratio } = useStageDimensions({
    app,
    parentWidth: parentSize?.width,
    parentHeight: parentSize?.height,
  });

  const initializeApp = (app: Application) => {
    setApp(app);
    resize();
    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;
  };

  return (
    <div
      ref={(ref) => setParentEl(ref || undefined)}
      className="w-full h-full flex items-center justify-center"
    >
      <Stage
        raf={true}
        options={{
          backgroundColor: 0xffffff,
          resizeTo: parentEl,
          autoDensity: true,
          antialias: true,
        }}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMount={initializeApp}
        className="flex-1 aspect-video object-contain transform-gpu"
      >
        {!!photo && (
          <Sprite
            image={photo}
            scale={ratio}
            anchor={0.5}
            x={CANVAS_WIDTH / 2}
            y={CANVAS_HEIGHT / 2}
          />
        )}
        {stickers?.map((sticker, index) => (
          <DraggableContainer
            key={`${sticker}_${index}`}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            scale={ratio}
            x={centerX}
            y={centerY}
          >
            <ImageSprite
              app={app}
              imageSrc={sticker}
              anchor={0.5}
              x={CANVAS_WIDTH / 2}
              y={CANVAS_HEIGHT / 2}
            />
          </DraggableContainer>
        ))}
      </Stage>
      <ShareStory
        app={app}
        width={width}
        height={height}
        centerX={centerX}
        centerY={centerY}
      />
    </div>
  );
};

export default Story;
