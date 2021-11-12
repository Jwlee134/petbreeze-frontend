import React, { useEffect, useMemo, useRef, useState } from "react";
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
import deviceApi from "~/api/device";
import imageHandler from "~/utils/imageHandler";

interface Props {
  mapPadding: {
    top: number;
    bottom: number;
  };
  style: {
    marginBottom: number;
  };
}

const SafetyZoneMap = ({ mapPadding, style }: Props) => {
  const navigation = useNavigation<SafetyZoneScreenNavigationProp>();
  const [updateDeviceSetting] = deviceApi.useUpdateDeviceSettingMutation();
  const [updateAreaThumbnail] =
    deviceApi.useUpdateSafetyZoneThumbnailMutation();
  const deviceID = useAppSelector(state => state.ble.deviceID);
  const {
    step2,
    draft: { coord, radius },
    animateCamera,
    isSubmitting,
  } = useAppSelector(state => state.deviceSetting.safetyZone);
  const status = useAppSelector(state => state.ble.status);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [thumbnail, setThumbnail] = useState("");

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
      if (uri) setThumbnail(uri);
      const {
        draft: { name },
        fromDeviceSetting,
      } = store.getState().deviceSetting.safetyZone;

      let address = "";
      const data = await getAddressByCoord(coord.latitude, coord.longitude);
      if (data) {
        address = data;
      } else {
        address = "주소 없음";
      }
      setAddress(address);

      if (fromDeviceSetting) {
        dispatch(
          deviceSettingActions.updateSafetyZoneResult({
            name,
            address,
            thumbnail: uri || "",
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
      }
    };
    submit();
  }, [isSubmitting, viewShotRef.current]);

  useEffect(() => {
    if (status !== "safetyZoneDone") return;
    const {
      safetyZone: {
        draft: { name },
      },
      wifi: {
        draft: { ssid, pw },
      },
    } = store.getState().deviceSetting;
    const sendData = async () => {
      await updateDeviceSetting({
        deviceID,
        body: {
          Area: [
            {
              safety_area_id: 0,
              name,
              address,
              coordinate: {
                type: "Point",
                coordinates: [
                  parseFloat(coord.longitude.toFixed(4)),
                  parseFloat(coord.latitude.toFixed(4)),
                ],
              },
              radius,
            },
          ],
          WiFi: [{ wifi_id: 0, ssid, pw }],
        },
      }).unwrap();
      const body = imageHandler.handleFormData(
        thumbnail,
        "safety_area_0_thumbnail",
      );
      await updateAreaThumbnail({ deviceID, body }).unwrap();

      navigation.replace("BleWithHeaderStackNav", {
        initialRouteName: "RegisterProfileFirst",
      });
    };
    sendData();
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
