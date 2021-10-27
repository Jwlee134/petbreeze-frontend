import React, { useEffect, useMemo, useRef } from "react";
import { Keyboard, StyleSheet } from "react-native";
import NaverMapView, { Circle } from "react-native-nmap";
import { getLeftRightPointsOfCircle } from "~/utils";

import { useDispatch } from "react-redux";
import { store, useAppSelector } from "~/store";

import ViewShot from "react-native-view-shot";
import { useNavigation } from "@react-navigation/native";
import { SafetyZoneScreenNavigationProp } from "~/types/navigator";
import { deviceSettingActions } from "~/store/deviceSetting";
import { bleActions } from "~/store/ble";
import Map from "../common/Map";
import palette from "~/styles/palette";
import { getAddressByCoord } from "~/api/place";
import Animated from "react-native-reanimated";

interface IProps {
  mapPadding: {
    top: number;
    bottom: number;
  };
  style: {
    marginBottom: number;
  };
}

const SafetyZoneMap = ({ mapPadding, style }: IProps) => {
  const navigation = useNavigation<SafetyZoneScreenNavigationProp>();

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
            coord: {
              latitude: parseFloat(coord.latitude.toFixed(4)),
              longitude: parseFloat(coord.longitude.toFixed(4)),
            },
            radius,
          }),
        );
        navigation.goBack();
      } else {
        dispatch(bleActions.setStatus("sendingSafetyZone"));
        navigation.replace("BleWithHeaderStackNav", {
          initialRouteName: "RegisterProfileFirst",
        });
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
      style={[
        {
          ...(StyleSheet.absoluteFill as object),
          zIndex: 0,
        },
        style,
      ]}>
      <ViewShot ref={viewShotRef} style={StyleSheet.absoluteFill as object}>
        <Map
          ref={mapRef}
          onCameraChange={({ latitude, longitude }) => {
            dispatch(
              deviceSettingActions.setSafetyZone({
                draft: {
                  coord: {
                    latitude,
                    longitude,
                  },
                },
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

export default SafetyZoneMap;
