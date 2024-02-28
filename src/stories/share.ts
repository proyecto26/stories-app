import { base64StringToBlob } from "blob-util";
import { Application, Matrix, RenderTexture } from "pixi.js";

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

export const renderAndShareCanvasImage = async (
  app: Application,
  filename: string,
  imageWidth: number,
  imageHeight: number,
  centerX: number,
  centerY: number,
  format = "image/png",
  extension = "png"
) => {
  const renderTexture = RenderTexture.create({
    width: imageWidth,
    height: imageHeight,
    resolution: window.devicePixelRatio || 1,
  });
  const transformMatrix = new Matrix().translate(-centerX, -centerY);

  app.renderer.render(app.stage, {
    renderTexture,
    transform: transformMatrix,
  });

  const base64 = await app.renderer.extract.base64(renderTexture, format, 1);
  const blob = base64StringToBlob(
    base64.replace(`data:${format};base64,`, ""),
    format
  );
  await shareOrDownloadImage(`${filename}.${extension}`, blob);
};
