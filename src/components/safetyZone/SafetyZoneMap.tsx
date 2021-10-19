import React, { useContext, useEffect, useMemo, useRef } from "react";
import { Animated, Keyboard, StyleSheet } from "react-native";
import NaverMapView, { Circle } from "react-native-nmap";
import { getLeftRightPointsOfCircle } from "~/utils";

import { useDispatch } from "react-redux";
import { store, useAppSelector } from "~/store";

import ViewShot from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";
import { SafetyZoneScreenNavigationProp } from "~/types/navigator";
import { navigatorActions } from "~/store/navigator";
import { deviceSettingActions } from "~/store/deviceSetting";
import { bleActions } from "~/store/ble";
import { DimensionsContext } from "~/context/DimensionsContext";
import Map from "../common/Map";
import palette from "~/styles/palette";
import CameraRoll from "@react-native-community/cameraroll";
import { getAddressByCoord } from "~/api/place";

interface IProps {
  value: Animated.AnimatedInterpolation;
  mapPadding: {
    top: number;
    bottom: number;
  };
}

const SafetyZoneMap = ({ value, mapPadding }: IProps) => {
  const navigation = useNavigation<SafetyZoneScreenNavigationProp>();
  const { rpWidth } = useContext(DimensionsContext);

  const {
    step2,
    draft: { coord, radius },
    animateCamera,
    isSubmitting,
  } = useAppSelector(state => state.deviceSetting.safetyZone);
  const status = useAppSelector(state => state.ble.status);
  const dispatch = useDispatch();

  const mapRef = useRef<NaverMapView>(null);
  const viewShotRef = useRef<ViewShot>(null);

  useEffect(() => {
    if (animateCamera && coord.latitude && coord.longitude) {
      mapRef.current?.animateToCoordinate(coord);
      dispatch(
        deviceSettingActions.setSafetyZone({
          animateCamera: false,
        }),
      );
    }
  }, [coord]);

  const coordsArr = useMemo(() => {
    if (coord.latitude && coord.longitude) {
      return getLeftRightPointsOfCircle(
        coord.latitude,
        coord.longitude,
        radius,
      );
    }
  }, [radius, step2]);

  useEffect(() => {
    if (!mapRef.current || !radius || !coordsArr) return;
    mapRef.current.animateToTwoCoordinates(coordsArr[0], coordsArr[1]);
  }, [mapRef, radius, step2]);

  useEffect(() => {
    if (!isSubmitting || !viewShotRef.current) return;
    const submit = async () => {
      const uri = await viewShotRef.current?.capture();
      if (uri) {
        await CameraRoll.save(uri, { album: "어디개" });
      }
      const {
        draft: { name, address },
        fromDeviceSetting,
      } = store.getState().deviceSetting.safetyZone;

      let addr = "";
      if (!address) {
        const data = await getAddressByCoord(coord.latitude, coord.longitude);
        if (data) {
          addr = data;
        } else {
          addr = "주소 없음";
        }
      }

      if (fromDeviceSetting) {
        dispatch(
          deviceSettingActions.updateSafetyZoneResult({
            name,
            address: address || addr,
            image: uri || "",
            coord: { latitude: coord.latitude, longitude: coord.longitude },
            radius,
          }),
        );
        navigation.goBack();
      } else {
        dispatch(bleActions.setStatus("sendingSafetyZone"));
        dispatch(
          navigatorActions.setInitialRoute({
            initialBleWithHeaderStackNavRouteName: "RegisterProfileFirst",
          }),
        );
        navigation.replace("BleWithHeaderStackNav");
      }
    };
    submit();
  }, [isSubmitting, viewShotRef.current]);

  useEffect(() => {
    if (status === "safetyZoneSuccess") {
      /* api 리퀘스트 with device에 적용 x */
    }
    if (status === "safetyZoneFail") {
      /* api 리퀘스트 with device에 적용 o */
    }
  }, [status]);

  return (
    <Animated.View
      style={{
        ...(StyleSheet.absoluteFill as object),
        zIndex: 0,
        transform: [{ translateY: value }],
      }}>
      <ViewShot ref={viewShotRef} style={StyleSheet.absoluteFill as object}>
        <Map
          ref={mapRef}
          onCameraChange={({ latitude, longitude }) => {
            dispatch(
              deviceSettingActions.setSafetyZone({
                draft: {
                  coord: {
                    latitude: parseFloat(latitude.toFixed(4)),
                    longitude: parseFloat(longitude.toFixed(4)),
                  },
                },
              }),
            );
          }}
          onMapClick={Keyboard.dismiss}
          mapPadding={mapPadding}
          rotateGesturesEnabled={false}
          zoomGesturesEnabled={!step2}>
          {coord.latitude && coord.longitude && radius ? (
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

export default SafetyZoneMap;
