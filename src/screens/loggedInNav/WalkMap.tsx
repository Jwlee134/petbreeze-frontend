import React, { useContext, useEffect, useMemo, useState } from "react";
import Path from "~/components/walk/Path";
import { store, useAppSelector } from "~/store";
import WalkBottomSheet from "~/components/walk/WalkBottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DimensionsContext } from "~/context/DimensionsContext";
import { StyleSheet } from "react-native";
import MapButtons from "~/components/walk/MapButtons";
import {
  bottomSheetHandleHeight,
  customHeaderHeight,
} from "~/styles/constants";
import WalkMapHeader from "~/components/walk/WalkMapHeader";
import { getDistanceBetween2Points, isIos } from "~/utils";
import { delta } from "~/constants";
import { WalkContext } from "~/context/WalkContext";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const WalkMap = () => {
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const { top, bottom } = useSafeAreaInsets();
  const { rpWidth } = useContext(DimensionsContext);

  const { Map, ViewShot, mapRef } = useContext(WalkContext);

  const [index, setIndex] = useState(1);

  const handleBottomSheetChange = (i: number) => setIndex(i);

  const snapPoints = useMemo(() => {
    if (isStopped) {
      return [rpWidth(316) + bottom - bottomSheetHandleHeight];
    }
    return [
      rpWidth(92 - bottomSheetHandleHeight),
      rpWidth(238 - bottomSheetHandleHeight),
    ];
  }, [isStopped]);

  const mapPadding = useMemo(
    () => ({
      top: isStopped
        ? bottomSheetHandleHeight
        : (isIos ? 0 : top) + rpWidth(customHeaderHeight),
      bottom: isStopped
        ? bottomSheetHandleHeight
        : snapPoints[index] + (!bottom ? rpWidth(34) : 0),
    }),
    [isStopped, index],
  );

  useEffect(() => {
    if (isStopped) {
      const { coords } = store.getState().storage.walk;

      const maxLat = Math.max(...coords.map(coord => coord[0]));
      const maxLng = Math.max(...coords.map(coord => coord[1]));
      const minLat = Math.min(...coords.map(coord => coord[0]));
      const minLng = Math.min(...coords.map(coord => coord[1]));

      const distance = getDistanceBetween2Points(
        maxLat,
        maxLng,
        minLat,
        minLng,
      );

      if (coords.length === 1) {
        mapRef.current?.animateToRegion({
          latitude: coords[0][0],
          longitude: coords[0][1],
          latitudeDelta: delta,
          longitudeDelta: delta,
        });
      } else {
        mapRef.current?.animateToTwoCoordinates(
          { latitude: maxLat, longitude: maxLng + distance / 100000 },
          { latitude: minLat, longitude: minLng - distance / 100000 },
        );
      }
    }
  }, [isStopped]);

  const opacity = useSharedValue(0);

  const backgroundStyle = useAnimatedStyle(() => {
    opacity.value = isStopped ? 0.15 : 0;
    return {
      opacity: withTiming(opacity.value, {
        duration: 400,
      }),
    };
  }, [isStopped]);

  const marginBottom = useSharedValue(0);

  const mapStyle = useAnimatedStyle(() => {
    marginBottom.value = isStopped ? snapPoints[0] : 0;
    return {
      marginBottom: withTiming(marginBottom.value, {
        duration: 400,
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
      <WalkBottomSheet
        snapPoints={snapPoints}
        handleChange={handleBottomSheetChange}
      />
    </>
  );
};

export default WalkMap;
