import React, { useCallback, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDevice from "~/hooks/useDevice";
import { liveModeButtonStyle, myLocationButtonStyle } from "~/styles/constants";
import permissionCheck from "~/utils/permissionCheck";
import LiveModeButton from "../common/LiveModeButton";
import MapButton from "../common/MapButton";
import Toast from "react-native-toast-message";
import { ToastType } from "~/styles/toast";
import Geolocation from "react-native-geolocation-service";
import { useAppSelector } from "~/store";

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
  const value = useRef(new Animated.Value(0)).current;
  const deviceList = useDevice();
  const { top } = useSafeAreaInsets();
  const showInfoHeader = useAppSelector(
    state => state.common.home.showInfoHeader,
  );

  useEffect(() => {
    Animated.timing(value, {
      toValue: showInfoHeader ? 56 : 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }, [showInfoHeader]);

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
              type: ToastType.Error,
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
      <Animated.View
        style={{
          ...(liveModeButtonStyle(top, true) as object),
          transform: [{ translateY: value }],
        }}>
        <LiveModeButton deviceList={deviceList} />
      </Animated.View>
      <Animated.View
        style={{
          ...(myLocationButtonStyle(top, true) as object),
          transform: [{ translateY: value }],
        }}>
        <MapButton onPress={handleMyLocation} icon="myLocation" />
      </Animated.View>
    </>
  );
};

export default HomeMapButtons;
