import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WalkContext } from "~/context/WalkContext";
import { store, useAppSelector } from "~/store";
import {
  centerModalOutTiming,
  liveModeButtonStyle,
  myLocationButtonStyle,
} from "~/styles/constants";
import Dissolve from "../common/Dissolve";
import LiveModeButton from "../common/LiveModeButton";
import MapButton from "../common/MapButton";
import deviceApi from "~/api/device";
import allSettled from "promise.allsettled";
import { useNavigation } from "@react-navigation/native";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { delay } from "~/utils";

const MapButtons = () => {
  const { top } = useSafeAreaInsets();
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const { mapRef, resume, pause, deviceList } = useContext(WalkContext);
  const selectedID = useAppSelector(
    state => state.storage.walk.selectedDeviceId,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation<WalkMapScreenNavigationProp>();
  const [stopWalking, { isLoading }] = deviceApi.useStopWalkingMutation();

  const animateToMyLocation = () => {
    const { coords } = store.getState().storage.walk;
    if (!coords.length) return;
    mapRef.current?.animateToCoordinate({
      latitude: coords[coords.length - 1][1],
      longitude: coords[coords.length - 1][0],
    });
  };

  const quitWalk = async (close: () => void) => {
    if (isLoading) return;
    await allSettled(selectedID.map(id => stopWalking(id).unwrap()));
    close();
    await delay(centerModalOutTiming);
    navigation.replace("BottomTabNav", {
      initialRouteName: "HomeTab",
    });
    await delay(200);
    dispatch(storageActions.setWalk(null));
  };

  return (
    <>
      <Dissolve style={liveModeButtonStyle(top)} isVisible={!isStopped}>
        <LiveModeButton
          deviceList={deviceList}
          resume={resume}
          pause={pause}
          quitWalk={quitWalk}
          isStoppingWalk={isLoading}
        />
      </Dissolve>
      <Dissolve isVisible={!isStopped} style={myLocationButtonStyle(top)}>
        <MapButton icon="myLocation" onPress={animateToMyLocation} />
      </Dissolve>
    </>
  );
};

export default MapButtons;
