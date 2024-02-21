import { Camera, CameraDirection, CameraResultType } from "@capacitor/camera";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../stories/resize";

export function useCamera() {
  const takePhoto = async (webUseInput = false) => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      direction: CameraDirection.Rear,
      resultType: CameraResultType.Uri,
      presentationStyle: "fullscreen",
      webUseInput,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    return image.webPath;
  };

  return {
    takePhoto,
  };
}
