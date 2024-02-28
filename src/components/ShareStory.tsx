import { IonAlert, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { shareSocial } from "ionicons/icons";
import { Application } from "pixi.js";
import React, { useId, useState } from "react";

import { renderAndShareCanvasImage } from "../stories/share";

type ShareStoryProps = {
  app?: Application;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};

const ShareStory: React.FC<ShareStoryProps> = ({
  app,
  width,
  height,
  centerX,
  centerY,
}) => {
  const shareAlertId = useId();
  const [fileName, setFileName] = useState<string>();
  const share = async () => {
    if (!app) {
      return alert("No app available");
    }
    await renderAndShareCanvasImage(
      app,
      fileName || "story_" + Date.now(),
      width,
      height,
      centerX,
      centerY
    );
  };
  return (
    <>
      <IonFab className="mr-2 mt-2" slot="fixed" vertical="top" horizontal="end">
        <IonFabButton id={`present-${shareAlertId}`}>
          <IonIcon icon={shareSocial} />
        </IonFabButton>
      </IonFab>
      <IonAlert
        trigger={`present-${shareAlertId}`}
        header="Please enter a name for your story"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Save",
            role: "confirm",
            handler: () => share(),
          },
        ]}
        inputs={[
          {
            value: fileName,
            handler(input) {
              alert(input.value);
              setFileName(input.value);
            },
            placeholder: "Story Name",
            attributes: {
              minlength: 5,
              maxlength: 20,
            },
          },
        ]}
      />
    </>
  );
};

export default ShareStory;
