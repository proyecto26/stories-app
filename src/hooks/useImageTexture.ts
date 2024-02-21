import { Texture } from "pixi.js";
import { useEffect, useState } from "react";


export const useImageTexture = (imageSrc: string) => {
  const [imgTexture, setImgTexture] = useState<Texture | null>(null);

  useEffect(() => {
    const texture = Texture.from(imageSrc);
    function emitChange() {
      setImgTexture(texture);
    }
    texture.once('update', emitChange);
    texture.once('loaded', emitChange);
    if (texture.valid) {
      emitChange();
    }
  }, [imageSrc]);

  return imgTexture;
};
