import React, { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDevice from "~/hooks/useDevice";
import {
  ANIMATION_CONFIGS_ANDROID,
  ANIMATION_CONFIGS_IOS,
  LIVE_MODE_BUTTON_STYLE,
  MY_LOCATION_BUTTON_STYLE,
} from "~/styles/constants";
import permissionCheck from "~/utils/permissionCheck";
import LiveModeButton from "../common/LiveModeButton";
import MapButton from "../common/MapButton";
import Toast from "react-native-toast-message";
import Geolocation from "react-native-geolocation-service";
import { useAppSelector } from "~/store";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { IS_ANDROID, TOAST_TYPE } from "~/constants";

interface Props {
  setIsMyLocationMoved: React.Dispatch<React.SetStateAction<boolean>>;
  animateToRegion: (type: "myLocation" | "device") => void;
  coords: {
    latitude: number;
    longitude: number;
  };
  setCoords: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
  trackingId: React.MutableRefObject<number | null>;
}

const HomeMapButtons = ({
  setIsMyLocationMoved,
  animateToRegion,
  coords,
  setCoords,
  trackingId,
}: Props) => {
  const deviceList = useDevice();
  const { top } = useSafeAreaInsets();
  const showInfoHeader = useAppSelector(
    state => state.common.home.showInfoHeader,
  );
  const value = useDerivedValue(() =>
    showInfoHeader
      ? IS_ANDROID
        ? withTiming(56, ANIMATION_CONFIGS_ANDROID)
        : withSpring(56, ANIMATION_CONFIGS_IOS)
      : IS_ANDROID
      ? withTiming(0, ANIMATION_CONFIGS_ANDROID)
      : withSpring(0, ANIMATION_CONFIGS_IOS),
  );
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: value.value }],
  }));

  const handleMyLocation = useCallback(async () => {
    try {
      await permissionCheck.location();
      setIsMyLocationMoved(false);
      if (trackingId.current !== null) {
        if (!coords.latitude || !coords.longitude) return;
        animateToRegion("myLocation");
      } else {
        trackingId.current = Geolocation.watchPosition(
          ({ coords }) => {
            setCoords(coords);
          },
          () => {
            Toast.show({
              type: TOAST_TYPE.ERROR,
              text1: "위치를 불러올 수 없습니다.",
            });
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 5,
          },
        );
      }
    } catch {}
  }, [trackingId.current, coords]);

  return (
    <>
      <Animated.View style={[LIVE_MODE_BUTTON_STYLE(top, true), animatedStyle]}>
        <LiveModeButton deviceList={deviceList} />
      </Animated.View>
      <Animated.View
        style={[MY_LOCATION_BUTTON_STYLE(top, true), animatedStyle]}>
        <MapButton onPress={handleMyLocation} icon="myLocation" />
      </Animated.View>
    </>
  );
};

export default HomeMapButtons;
