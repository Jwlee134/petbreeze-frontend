import React from "react";
import useMap from "~/hooks/useMap";
import {
  WalkMapScreenNavigationProp,
  WalkMapScreenRouteProp,
} from "~/types/navigator";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackgroundService from "react-native-background-actions";
import { StyleSheet } from "react-native";
import Timer from "~/components/walk/Timer";
import Distance from "~/components/walk/Distance";
import Path from "~/components/walk/Path";
import Toggle from "~/components/walk/Toggle";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import useMyLocation from "~/hooks/useMyLocation";
import walkApi from "~/api/walk";
import { store } from "~/store";

const Controller = styled.View<{ bottom: number }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ bottom }) => bottom + 145}px;
  padding-bottom: ${({ bottom }) => bottom}px;
  background-color: rgba(110, 65, 226, 0.87);
  justify-content: space-evenly;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const TextContainer = styled.View`
  width: 50%;
  align-items: center;
`;

const WalkMap = ({
  navigation,
  route,
}: {
  navigation: WalkMapScreenNavigationProp;
  route: WalkMapScreenRouteProp;
}) => {
  const { bottom } = useSafeAreaInsets();
  const { Map, mapRef } = useMap();
  const dispatch = useDispatch();
  const { clearTracking, setCoords } = useMyLocation({
    isWalking: true,
  });
  const [trigger] = walkApi.usePostWalkMutation();

  //  const { deviceId } = route.params;

  const handleFinish = async () => {
    const { startTime, duration, meter, coords } =
      store.getState().storage.walk;
    if (BackgroundService.isRunning()) {
      await BackgroundService.stop();
      clearTracking();
    }
    dispatch(storageActions.clearWalk());
    navigation.replace("Walk");
    // const promise = deviceId.map(id =>
    //   trigger({
    //     deviceId: id,
    //     start_date_time: new Date(startTime),
    //     walking_time: duration,
    //     distance: meter,
    //     coordinates: coords,
    //   }),
    // );
    // Promise.all(promise).then(() => {
    //   dispatch(storageActions.clearWalk());
    //   navigation.replace("Walk");
    // });
  };

  return (
    <>
      <Map style={StyleSheet.absoluteFill}>
        <Path mapRef={mapRef} /* deviceId={deviceId} */ />
      </Map>
      <Controller bottom={bottom}>
        <RowContainer>
          <TextContainer>
            <Distance />
          </TextContainer>
          <TextContainer>
            <Timer />
          </TextContainer>
        </RowContainer>
        <RowContainer>
          <Toggle
            clearTracking={clearTracking}
            setCoords={setCoords}
            mapRef={mapRef}
            handleFinish={handleFinish}
          />
        </RowContainer>
      </Controller>
      {/* <Modal {...modalProps}>
        <CenterModalComponent>
          <SimpleToggleModal
            onConfirm={handleFinish}
            onConfirmButtonText="종료"
            onConfirmText="산책을 종료하시겠습니까?"
            onAbort={close}
          />
        </CenterModalComponent>
      </Modal> */}
    </>
  );
};

export default WalkMap;
