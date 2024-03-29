// The recommended image size for Facebook Stories is 1080 x 1920 pixels, with an aspect ratio of 9:16.
export const CANVAS_WIDTH = 1080;
export const CANVAS_HEIGHT = 1920;

// Calculate the actual width of the canvas with a 9:16 aspect ratio
export function calculateWidth(width: number, height: number) {
  const isWidthConstrained = width < (height * 9) / 16;
  return isWidthConstrained ? width : (height * 9) / 16;
}

// Calculate the actual height of the canvas with a 9:16 aspect ratio
export function calculateHeight(width: number, height: number) {
  const isHeightConstrained = (width * 16) / 9 > height;
  return isHeightConstrained ? height : (width * 16) / 9;
}

const isValidSize = (size?: number) => typeof size === "number" && size > 0;

export const calculateSize = (originalWidth: number, originalHeight: number) => {
  if (!isValidSize(originalWidth) || !isValidSize(originalHeight)) {
    return { height: 0, width: 0 };
  }

  const fixedAspectRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
  const sourceAspectRatio = originalWidth / originalHeight;
  const isSourceWider = sourceAspectRatio > fixedAspectRatio;

  const width = isSourceWider
    ? CANVAS_WIDTH
    : Math.floor(CANVAS_HEIGHT * sourceAspectRatio);
  const height = isSourceWider
    ? Math.floor(CANVAS_WIDTH / sourceAspectRatio)
    : CANVAS_HEIGHT;

  return { height, width };
};
