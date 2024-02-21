import { Grid } from "@giphy/react-components";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonModal,
  IonRow,
  IonSearchbar,
} from "@ionic/react";
import { useEffect, useState } from "react";

import "./ChooseSticker.css";
import { useElementSize } from "../../hooks/useElementSize";
import { useGiphySearch } from "../../hooks/useGiphySearch";

type ChooseStickerProps = {
  isOpen: boolean;
  onClosed: () => void;
  onClick: (image: string) => void;
};

const ChooseSticker: React.FC<ChooseStickerProps> = ({
  isOpen,
  onClosed,
  onClick,
}) => {
  const [modal, setModal] = useState<HTMLIonModalElement | null>(null);
  const [contentGrid, setContentGrid] = useState<HTMLIonColElement | null>(
    null
  );
  const { size: parentSize } = useElementSize({
    el: contentGrid!,
  });
  const columns = parentSize
    ? Math.min(Math.round(parentSize?.width / 150), 8)
    : 3;
  const [searchTerm, setSearchTerm] = useState<string>("cats");
  const { searchKey, fetchGifs } = useGiphySearch({ searchTerm });

  useEffect(() => {
    if (isOpen) {
      modal?.present();
    } else {
      modal?.dismiss();
    }
  }, [isOpen]);

  return (
    <IonModal
      ref={setModal}
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75, 0.95]}
      className="fullscreen-modal"
      keepContentsMounted
      onDidDismiss={onClosed}
    >
      <IonContent className="ion-padding">
        <IonSearchbar
          onClick={() => modal?.setCurrentBreakpoint(0.95)}
          placeholder="Search"
          onIonChange={(e) => setSearchTerm(e.detail.value || "")}
        ></IonSearchbar>
        <IonGrid>
          <IonRow>
            <IonCol
              ref={setContentGrid}
              className="flex items-center justify-center"
            >
              <Grid
                key={searchKey}
                width={parentSize.width}
                columns={columns}
                fetchGifs={fetchGifs}
                noLink={true}
                onGifClick={(gif) => onClick(gif.images.original.url)}
              />
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonInfiniteScroll
          onIonInfinite={(ev) => setTimeout(() => ev.target.complete(), 800)}
        >
          <IonInfiniteScrollContent loadingSpinner={null} />
        </IonInfiniteScroll>
      </IonContent>
    </IonModal>
  );
};

export default ChooseSticker;
