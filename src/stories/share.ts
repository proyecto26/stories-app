import { base64StringToBlob } from "blob-util";
import { Application, Matrix, RenderTexture } from "pixi.js";

export const SHARE_EXTENSION = "png";
export const SHARE_FORMAT = `image/${SHARE_EXTENSION}`;

const downloadImage = (filename: string, imageBlob: Blob) => {
  const anchorElement = document.createElement("a");
  const fileUrl = URL.createObjectURL(imageBlob);
  anchorElement.href = fileUrl;
  anchorElement.download = filename;
  anchorElement.click();
  anchorElement.remove();
  URL.revokeObjectURL(fileUrl);
};

export const shareOrDownloadImage = async (
  filename: string,
  imageBlob: Blob
) => {
  if (navigator.canShare) {
    const file = new File([imageBlob], filename, { type: imageBlob.type });
    const filesArray = [file];
    if (navigator.canShare({ files: filesArray })) {
      try {
        return await navigator.share({
          files: filesArray,
        });
      } catch (error) {
        console.error(`shareOrDownloadImage(${error})`);
        downloadImage(filename, imageBlob);
      }
    }
  }
  downloadImage(filename, imageBlob);
};

const createTextureWithResolution = (width: number, height: number) =>
  RenderTexture.create({
    width,
    height,
    resolution: window.devicePixelRatio || 1,
  });

const createTranslationMatrix = (centerX: number, centerY: number) => {
  const matrix = new Matrix();
  matrix.translate(-centerX, -centerY);
  return matrix;
};

export const renderAndShareCanvasImage = async (
  app: Application,
  filename: string,
  imageWidth: number,
  imageHeight: number,
  centerX: number,
  centerY: number
) => {
  const renderTexture = createTextureWithResolution(imageWidth, imageHeight);
  const transformMatrix = createTranslationMatrix(centerX, centerY);

  app.renderer.render(app.stage, {
    renderTexture,
    transform: transformMatrix,
  });

  const base64 = await app.renderer.extract.base64(
    renderTexture,
    SHARE_FORMAT,
    1
  );
  const blob = base64StringToBlob(
    base64.replace(`data:${SHARE_FORMAT};base64,`, ""),
    SHARE_FORMAT
  );
  await shareOrDownloadImage(`${filename}.${SHARE_EXTENSION}`, blob);
};
