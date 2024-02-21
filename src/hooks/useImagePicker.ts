import { Camera } from "@capacitor/camera";

import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../stories/resize";

export function useImagePicker() {
  const pickImage = async () => {
    const { photos: [photo] } = await Camera.pickImages({
      quality: 90,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      presentationStyle: "fullscreen",
      limit: 1,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image
    return photo.webPath;
  };

  return {
    pickImage,
  };
}
