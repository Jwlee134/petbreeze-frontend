import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Keyboard, StyleSheet } from "react-native";
import { Circle } from "react-native-nmap";
import useMap from "~/hooks/useMap";
import { rpWidth } from "~/styles";
import { getLeftRightPointsOfCircle } from "~/utils";

import { useDispatch } from "react-redux";
import { store, useAppSelector } from "~/store";

import ViewShot from "react-native-view-shot";
import { useNavigation } from "@react-navigation/core";
import { SafetyZoneScreenNavigationProp } from "~/types/navigator";
import { navigatorActions } from "~/store/navigator";
import { deviceSettingActions } from "~/store/deviceSetting";
import { bleActions } from "~/store/ble";
import { storageActions } from "~/store/storage";

interface IProps {
  snapPoints: number[];
  mapPadding: {
    top: number;
    bottom: number;
  };
}

const SafetyZoneMap = ({ snapPoints, mapPadding }: IProps) => {
  const navigation = useNavigation<SafetyZoneScreenNavigationProp>();
  const circleRef = useRef<Circle>(null);
  const { Map, mapRef } = useMap();
  const value = useRef(new Animated.Value(0)).current;
  const viewShotRef = useRef<ViewShot>(null);

  const step2 = useAppSelector(state => state.deviceSetting.safetyZone.step2);
  const coord = useAppSelector(
    state => state.deviceSetting.safetyZone.draft.coord,
  );
  const radius = useAppSelector(
    state => state.deviceSetting.safetyZone.draft.radius,
  );
  const animateCamera = useAppSelector(
    state => state.deviceSetting.safetyZone.animateCamera,
  );
  const isSubmitting = useAppSelector(
    state => state.deviceSetting.safetyZone.isSubmitting,
  );
  const status = useAppSelector(state => state.ble.status);
  const dispatch = useDispatch();

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

  const exp = (t: number) => {
    return Math.min(Math.max(0, Math.pow(2, 10 * (t - 1))), 1);
  };

  const marginBottom = value.interpolate({
    inputRange: [0, 1],
    outputRange: [0, snapPoints[0] - rpWidth(46)],
  });

  useEffect(() => {
    Animated.timing(value, {
      toValue: !step2 ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.out(exp),
    }).start();
  }, [step2, snapPoints]);

  useEffect(() => {
    if (isSubmitting && viewShotRef.current) {
      viewShotRef.current?.capture().then(uri => {
        const {
          draft: { name, addr },
          fromDeviceSetting,
        } = store.getState().deviceSetting.safetyZone;
        if (fromDeviceSetting) {
          dispatch(
            deviceSettingActions.updateSafetyZoneResult({
              name,
              addr,
              image: uri,
              coord: { latitude: coord.latitude, longitude: coord.longitude },
              radius,
            }),
          );
          navigation.goBack();
        } else {
          const {
            draft: { name },
          } = store.getState().deviceSetting.safetyZone;
          dispatch(bleActions.setStatus("sendingSafetyZone"));
          /* dispatch(
            storageActions.setDevice({
              isSafetyZoneRegistered: true,
              safetyZoneName: name,
            }),
          ); */
          /* dispatch(
            navigatorActions.setInitialRoute({
              initialBleWithHeaderStackNavRouteName: "RegisterProfileFirst",
            }),
          );
          navigation.replace("BleWithHeaderStackNav"); */
        }
      });
    }
  }, [isSubmitting, viewShotRef.current]);

  useEffect(() => {
    if (status === "safetyZoneSuccess") {
      /* api 리퀘스트 */
    }
    if (status === "safetyZoneFail") {
      /* api 리퀘스트 */
    }
  }, [status]);

  return (
    <Animated.View
      style={{
        ...(StyleSheet.absoluteFill as object),
        zIndex: 0,
        marginTop: -rpWidth(46),
        marginBottom,
      }}>
      <ViewShot ref={viewShotRef} style={StyleSheet.absoluteFill as object}>
        <Map
          style={StyleSheet.absoluteFill}
          onCameraChange={({ latitude, longitude }) => {
            dispatch(
              deviceSettingActions.setSafetyZone({
                draft: { coord: { latitude, longitude } },
              }),
            );
          }}
          onMapClick={Keyboard.dismiss}
          mapPadding={mapPadding}
          rotateGesturesEnabled={false}
          zoomGesturesEnabled={!step2}>
          {coord.latitude && coord.longitude && radius ? (
            <>
              <Circle
                ref={circleRef}
                coordinate={{
                  latitude: coord.latitude,
                  longitude: coord.longitude,
                }}
                radius={radius}
                color="rgba(255,0,0,0.3)"
              />
            </>
          ) : null}
        </Map>
      </ViewShot>
    </Animated.View>
  );
};

export default SafetyZoneMap;
