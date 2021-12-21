import React, { useContext } from "react";
import Path from "~/components/walk/Path";
import { useAppSelector } from "~/store";
import WalkBottomSheet from "~/components/walk/WalkBottomSheet";
import { StyleSheet, View } from "react-native";
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
import { bottomSheetHandleHeight } from "~/styles/constants";

const WalkMap = () => {
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const sheetIndex = useAppSelector(state => state.storage.walk.sheetIndex);
  const { bottom } = useSafeAreaInsets();
  const { Map, ViewShot, stoppedSnapIndex } = useContext(WalkContext);

  const snapPoints = isStopped
    ? [stoppedSnapIndex]
    : [91, isIphoneX() ? 216 + bottom : 250];

  const mapPadding = {
    top: isStopped ? bottomSheetHandleHeight : 0,
    bottom: isStopped
      ? bottomSheetHandleHeight
      : snapPoints[sheetIndex] - bottom,
  };

  const opacity = useDerivedValue(() => (isStopped ? 0.15 : 0));
  const backgroundStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(opacity.value, {
        duration: 200,
      }),
    }),
    [isStopped],
  );
  const marginBottom = useDerivedValue(() =>
    isStopped ? snapPoints[0] - bottomSheetHandleHeight : 0,
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
          <View style={StyleSheet.absoluteFill}>
            <Map mapPadding={mapPadding}>
              <Path isStopped={isStopped} />
            </Map>
            {isStopped && (
              <Animated.View
                style={[
                  {
                    ...(StyleSheet.absoluteFill as object),
                    backgroundColor: "black",
                    zIndex: 100,
                  },
                  backgroundStyle,
                ]}
              />
            )}
          </View>
        </ViewShot>
      </Animated.View>
      <WalkMapHeader />
      <MapButtons />
      <WalkBottomSheet snapPoints={snapPoints} />
    </>
  );
};

export default WalkMap;
