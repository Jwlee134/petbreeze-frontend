import React, { useContext } from "react";
import Path from "~/components/walk/Path";
import { useAppSelector } from "~/store";
import WalkBottomSheet from "~/components/walk/WalkBottomSheet";
import { StyleSheet } from "react-native";
import MapButtons from "~/components/walk/MapButtons";
import WalkMapHeader from "~/components/walk/WalkMapHeader";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { WalkContext } from "~/context/WalkContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isIphoneX } from "react-native-iphone-x-helper";
import { BOTTOM_SHEET_HANDLE_HEIGHT } from "~/styles/constants";

const WalkMap = () => {
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const sheetIndex = useAppSelector(state => state.storage.walk.sheetIndex);
  const { bottom } = useSafeAreaInsets();
  const { Map, ViewShot, stoppedSnapIndex } = useContext(WalkContext);

  const snapPoints = isStopped
    ? [stoppedSnapIndex]
    : [91, isIphoneX() ? 216 + bottom : 250];

  const mapPadding = {
    top: isStopped ? BOTTOM_SHEET_HANDLE_HEIGHT : 0,
    bottom: isStopped
      ? BOTTOM_SHEET_HANDLE_HEIGHT
      : snapPoints[sheetIndex] - bottom,
  };

  const marginBottom = useDerivedValue(() =>
    isStopped ? snapPoints[0] - BOTTOM_SHEET_HANDLE_HEIGHT : 0,
  );
  const mapStyle = useAnimatedStyle(
    () => ({
      marginBottom: withTiming(marginBottom.value, {
        duration: 200,
      }),
    }),
    [isStopped],
  );

  return (
    <>
      <Animated.View
        style={[
          {
            ...(StyleSheet.absoluteFill as object),
          },
          mapStyle,
        ]}>
        <ViewShot>
          <Map
            scrollGesturesEnabled={!isStopped}
            tiltGesturesEnabled={!isStopped}
            rotateGesturesEnabled={!isStopped}
            mapPadding={mapPadding}>
            <Path isStopped={isStopped} />
          </Map>
        </ViewShot>
      </Animated.View>
      <WalkMapHeader />
      <MapButtons />
      <WalkBottomSheet snapPoints={snapPoints} />
    </>
  );
};

export default WalkMap;
