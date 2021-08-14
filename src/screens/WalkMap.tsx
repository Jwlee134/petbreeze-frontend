import React, { useMemo } from "react";
import useMap from "~/hooks/useMap";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import { StyleSheet } from "react-native";
import Path from "~/components/walk/Path";
import { store, useAppSelector } from "~/store";
import WalkBottomSheet from "~/components/walk/WalkBottomSheet";
import MapFloatingCircle from "~/components/common/MapFloatingCircle";
import { rpHeight, rpWidth } from "~/styles";
import walkApi from "~/api/walk";
import { storageActions } from "~/store/storage";
import { useDispatch } from "react-redux";
import { isIos } from "~/utils";
import { useState } from "react";

const WalkMap = ({
  navigation,
}: {
  navigation: WalkMapScreenNavigationProp;
}) => {
  const { Map, mapRef } = useMap();
  const [trigger] = walkApi.usePostWalkMutation();
  const dispatch = useDispatch();
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);

  const animateToMyLocation = () => {
    const coords = store.getState().storage.walk.coords;
    if (!coords.length) return;
    mapRef.current?.animateToCoordinate({
      latitude: coords[coords.length - 1][0],
      longitude: coords[coords.length - 1][1],
    });
  };

  const handleFinish = async () => {
    const { startTime, duration, meter, coords, selectedDeviceId } =
      store.getState().storage.walk;
    dispatch(storageActions.clearWalk());
    navigation.replace("BottomTabNav", {
      initialTab: "WalkRecord",
    });
    // const promise = selectedDeviceId.map(id =>
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
    //   navigation.replace("BottomTabNav", {
    //     initialRoute: "WalkTab",
    //   });
    // });
  };

  // index 0은 원래 높이 89 - 핸들 높이 36, 1은 ios: 원래 높이 238 - 핸들 높이 36
  // android: 원래 높이 238 - 핸들 높이 36 - ios 하단 바 높이 34
  const snapPoints = useMemo(() => {
    if (isStopped) {
      return [rpHeight(isIos ? 296 : 262), rpHeight(isIos ? 296 : 262)];
    } else {
      return [rpHeight(54), rpHeight(isIos ? 202 : 168)];
    }
  }, [isStopped]);

  const [index, setIndex] = useState(1);

  const handleBottomSheetChange = (index: number) => setIndex(index);

  return (
    <>
      <Map
        style={StyleSheet.absoluteFill}
        mapPadding={{
          bottom: isIos ? snapPoints[index] : snapPoints[index] + rpHeight(34),
        }}>
        <Path mapRef={mapRef} /* deviceIds={deviceId} */ />
      </Map>
      {!isStopped && (
        <>
          <MapFloatingCircle
            style={{
              position: "absolute",
              top: rpHeight(33),
              right: rpWidth(17),
            }}
            icon="footprint"
          />
          <MapFloatingCircle
            style={{
              position: "absolute",
              top: rpHeight(93),
              right: rpWidth(17),
            }}
            icon="myLocation"
            onPress={animateToMyLocation}
          />
        </>
      )}
      <WalkBottomSheet
        snapPoints={snapPoints}
        handleChange={handleBottomSheetChange}
        handleFinish={handleFinish}
      />
    </>
  );
};

export default WalkMap;
