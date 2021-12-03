import React, { useContext } from "react";
import Path from "~/components/walk/Path";
import { useAppSelector } from "~/store";
import WalkBottomSheet from "~/components/walk/WalkBottomSheet";
import { StyleSheet } from "react-native";
import MapButtons from "~/components/walk/MapButtons";
import WalkMapHeader from "~/components/walk/WalkMapHeader";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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

  const opacity = useSharedValue(0);

  const backgroundStyle = useAnimatedStyle(() => {
    opacity.value = isStopped ? 0.15 : 0;
    return {
      opacity: withTiming(opacity.value, {
        duration: 200,
      }),
    };
  }, [isStopped]);

  const marginBottom = useSharedValue(0);

  const mapStyle = useAnimatedStyle(() => {
    marginBottom.value = isStopped
      ? snapPoints[0] - bottomSheetHandleHeight
      : 0;
    return {
      marginBottom: withTiming(marginBottom.value, {
        duration: 200,
      }),
    };
  }, [isStopped]);

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
          {isStopped && (
            <Animated.View
              style={[
                {
                  ...(StyleSheet.absoluteFill as object),
                  backgroundColor: "black",
                  zIndex: 10,
                },
                backgroundStyle,
              ]}
            />
          )}
          <Map mapPadding={mapPadding}>
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
