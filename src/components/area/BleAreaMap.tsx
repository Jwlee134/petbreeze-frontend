import React, { useEffect, useRef } from "react";
import { Keyboard, StyleSheet } from "react-native";
import NaverMapView, { Circle } from "react-native-nmap";
import { getLeftRightPointsOfCircle } from "~/utils";

import { useDispatch } from "react-redux";
import { useAppSelector } from "~/store";

import ViewShot from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";
import { AreaScreenNavigationProp } from "~/types/navigator";
import { deviceSettingActions } from "~/store/deviceSetting";
import Map from "../common/Map";
import palette from "~/styles/palette";
import { getAddressByCoord } from "~/api/place";
import Animated from "react-native-reanimated";

interface Props {
  mapPadding: {
    top: number;
    bottom: number;
  };
  style: {
    marginBottom: number;
  };
}

const BleAreaMap = ({ mapPadding, style }: Props) => {
  const navigation = useNavigation<AreaScreenNavigationProp>();
  const coord = useAppSelector(state => state.deviceSetting.draft.area.coord);
  const radius = useAppSelector(state => state.deviceSetting.draft.area.radius);
  const { step2, animateCamera, isSubmitting } = useAppSelector(
    state => state.deviceSetting.area,
  );
  const dispatch = useDispatch();
  const mapRef = useRef<NaverMapView>(null);
  const viewShotRef = useRef<ViewShot>(null);

  useEffect(() => {
    if (animateCamera && coord.latitude && coord.longitude) {
      mapRef.current?.animateToCoordinate(coord);
      dispatch(deviceSettingActions.setArea({ animateCamera: false }));
    }
  }, [coord]);

  useEffect(() => {
    if (!mapRef.current || !step2) return;
    mapRef.current?.animateToTwoCoordinates(
      getLeftRightPointsOfCircle(coord.latitude, coord.longitude, radius)[0],
      getLeftRightPointsOfCircle(coord.latitude, coord.longitude, radius)[1],
    );
  }, [mapRef.current, radius, step2]);

  useEffect(() => {
    if (!isSubmitting || !viewShotRef.current) return;
    const submit = async () => {
      const uri = await viewShotRef.current?.capture();
      const data = await getAddressByCoord(coord.latitude, coord.longitude);
      dispatch(
        deviceSettingActions.updateAreaResult({
          thumbnail: uri || "",
          address: data,
        }),
      );
      setTimeout(() => {
        dispatch(deviceSettingActions.setArea({ isSubmitting: false }));
      }, 200);
      navigation.push("BleWithHeaderStackNav", {
        initialRouteName: "PreWiFiForm",
      });
    };
    submit();
  }, [isSubmitting, viewShotRef.current]);

  return (
    <Animated.View
      style={[{ ...(StyleSheet.absoluteFill as object), zIndex: 0 }, style]}>
      <ViewShot ref={viewShotRef} style={StyleSheet.absoluteFill as object}>
        <Map
          ref={mapRef}
          onCameraChange={({ latitude, longitude }) => {
            dispatch(
              deviceSettingActions.setAreaDraft({
                coord: { latitude, longitude },
              }),
            );
          }}
          onMapClick={Keyboard.dismiss}
          mapPadding={mapPadding}
          rotateGesturesEnabled={false}
          zoomGesturesEnabled={!step2}>
          {coord.latitude && coord.longitude && radius && step2 ? (
            <Circle
              coordinate={{
                latitude: coord.latitude,
                longitude: coord.longitude,
              }}
              radius={radius}
              color={palette.blue_6e_20}
              outlineColor={palette.blue_6e_50}
              outlineWidth={1}
            />
          ) : null}
        </Map>
      </ViewShot>
    </Animated.View>
  );
};

export default BleAreaMap;
