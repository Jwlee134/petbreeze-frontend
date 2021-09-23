import React, { useContext, useMemo } from "react";
import useMap from "~/hooks/useMap";
import { WalkMapScreenNavigationProp } from "~/types/navigator";
import { StyleSheet } from "react-native";
import Path from "~/components/walk/Path";
import { store, useAppSelector } from "~/store";
import WalkBottomSheet from "~/components/walk/WalkBottomSheet";
import MapFloatingCircle from "~/components/common/MapFloatingCircle";
import walkApi from "~/api/walk";
import { storageActions } from "~/store/storage";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { navigatorActions } from "~/store/navigator";
import { DimensionsContext } from "~/context/DimensionsContext";

const WalkMap = ({
  navigation,
}: {
  navigation: WalkMapScreenNavigationProp;
}) => {
  const { Map, mapRef } = useMap();
  const [trigger] = walkApi.usePostWalkMutation();
  const dispatch = useDispatch();
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const { bottom } = useSafeAreaInsets();
  const { rpWidth } = useContext(DimensionsContext);

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
    dispatch(storageActions.setWalk(null));
    dispatch(
      navigatorActions.setInitialRoute({
        initialBottomTabNavRouteName: "WalkTab",
      }),
    );
    navigation.replace("BottomTabNav");
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

  const snapPoints = useMemo(() => {
    if (isStopped) {
      return [rpWidth(262 + bottom), rpWidth(262 + bottom)];
    } else {
      // index 0은 원래 높이 89 - 핸들 높이 36, 1은 원래 높이 238 - 핸들 높이 36
      return [rpWidth(54), rpWidth(202)];
    }
  }, [isStopped]);

  const [index, setIndex] = useState(1);

  const handleBottomSheetChange = (index: number) => setIndex(index);

  return (
    <>
      <Map
        style={StyleSheet.absoluteFill}
        mapPadding={{
          bottom: snapPoints[index] + (!bottom ? rpWidth(34) : 0),
        }}>
        <Path mapRef={mapRef} /* deviceIds={deviceId} */ />
      </Map>
      {!isStopped && (
        <>
          <MapFloatingCircle
            style={{
              position: "absolute",
              top: rpWidth(26),
              right: rpWidth(16),
            }}
            icon="footprint"
          />
          <MapFloatingCircle
            style={{
              position: "absolute",
              top: rpWidth(86),
              right: rpWidth(16),
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
