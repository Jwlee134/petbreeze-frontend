import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Path from "~/components/walk/Path";
import { store, useAppSelector } from "~/store";
import WalkBottomSheet from "~/components/walk/WalkBottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DimensionsContext } from "~/context/DimensionsContext";
import { Animated, StyleSheet } from "react-native";
import MapButtons from "~/components/walk/MapButtons";
import {
  bottomSheetHandleHeight,
  customHeaderHeight,
} from "~/styles/constants";
import WalkMapHeader from "~/components/walk/WalkMapHeader";
import { getDistanceBetween2Points, isIos } from "~/utils";
import { delta } from "~/constants";
import { WalkContext } from "~/context/WalkContext";

const WalkMap = () => {
  const isStopped = useAppSelector(state => state.storage.walk.isStopped);
  const { top, bottom } = useSafeAreaInsets();
  const { rpWidth } = useContext(DimensionsContext);

  const { Map, ViewShot, mapRef } = useContext(WalkContext);

  const [index, setIndex] = useState(1);
  const [showEntirePath, setShowEntirePath] = useState(false);
  const marginBottom = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

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

  const marginBottomInterpolate = marginBottom.interpolate({
    inputRange: [0, 1],
    outputRange: [0, snapPoints[0]],
  });

  useEffect(() => {
    if (isStopped) {
      Animated.timing(marginBottom, {
        toValue: 1,
        useNativeDriver: false,
        duration: 400,
      }).start(() => {
        setShowEntirePath(true);
      });
    }
  }, [isStopped]);

  useEffect(() => {
    if (showEntirePath) {
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
      Animated.timing(opacity, {
        toValue: 0.15,
        useNativeDriver: true,
        duration: 400,
      }).start();
    }
  }, [showEntirePath]);

  return (
    <>
      <Animated.View
        style={{
          ...(StyleSheet.absoluteFill as object),
          marginBottom: marginBottomInterpolate,
        }}>
        <ViewShot>
          <Map mapPadding={mapPadding}>
            <Path showEntirePath={showEntirePath} />
          </Map>
        </ViewShot>
      </Animated.View>
      <WalkMapHeader />
      {!isStopped && <MapButtons />}
      {isStopped && (
        <Animated.View
          style={{
            opacity,
            ...(StyleSheet.absoluteFill as object),
            backgroundColor: "black",
          }}
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
