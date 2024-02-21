import { IonContent, IonPage, IonIcon, IonFabButton } from "@ionic/react";
import { camera, imageOutline, sparklesOutline } from "ionicons/icons";
import { useState } from "react";

import { useCamera } from "../../hooks/useCamera";
import Story from "../../components/Story";
import ChooseSticker from "../../components/ChooseSticker/ChooseSticker";
import { useImagePicker } from "../../hooks/useImagePicker";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const [photoImage, setPhotoImage] = useState<string>();
  const [stickers, setStickers] = useState<string[]>([]);
  const [showStickerModal, setShowStickerModal] = useState(false);
  const { takePhoto } = useCamera();
  const { pickImage } = useImagePicker();
  const onTakePhoto = async () => {
    const photo = await takePhoto();
    setPhotoImage(photo);
  };
  const onChooseSticker = (image: string) => {
    setStickers((stickers) => [...stickers, image]);
    setShowStickerModal(false);
  };
  const onPickImage = async () => {
    const photo = await pickImage();
    setPhotoImage(photo);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Story photo={photoImage} stickers={stickers} />
        <div className="absolute bottom-10 left-0 w-full flex items-center justify-around">
          <IonFabButton className="circle small" onClick={() => setShowStickerModal(true)}>
            <IonIcon
              className="text-3xl text-black"
              icon={sparklesOutline}
            />
          </IonFabButton>
          <IonFabButton className="circle" onClick={onTakePhoto}>
            <IonIcon
              className="text-4xl"
              icon={camera}
            />
          </IonFabButton>
          <IonFabButton className="circle small" onClick={onPickImage}>
            <IonIcon
              className="text-3xl"
              icon={imageOutline}
            />
          </IonFabButton>
        </div>
        <ChooseSticker
          isOpen={showStickerModal}
          onClosed={() => setShowStickerModal(false)}
          onClick={onChooseSticker}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
