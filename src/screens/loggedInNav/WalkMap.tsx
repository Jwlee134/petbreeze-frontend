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
import { isIos } from "~/utils";
import { customHeaderHeight } from "~/styles/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WalkMap = () => {
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const sheetIndex = useAppSelector(state => state.storage.walk.sheetIndex);
  const { top, bottom } = useSafeAreaInsets();
  const { Map, ViewShot, stoppedSnapIndex } = useContext(WalkContext);

  const snapPoints = isStopped ? [stoppedSnapIndex] : [92, 238];

  const mapPadding = {
    top: isStopped ? 0 : (isIos ? 0 : top) + customHeaderHeight,
    bottom: isStopped ? 0 : snapPoints[sheetIndex] - bottom,
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
    marginBottom.value = isStopped ? snapPoints[0] : 0;
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
          <Map mapPadding={mapPadding}>
            <Path isStopped={isStopped} />
          </Map>
        </ViewShot>
      </Animated.View>
      <WalkMapHeader />
      {!isStopped && <MapButtons />}
      {isStopped && (
        <Animated.View
          style={[
            {
              ...(StyleSheet.absoluteFill as object),
              backgroundColor: "black",
            },
            backgroundStyle,
          ]}
        />
      )}
      <WalkBottomSheet snapPoints={snapPoints} />
    </>
  );
};

export default WalkMap;
