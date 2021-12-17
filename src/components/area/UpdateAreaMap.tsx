import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import NaverMapView, { Circle } from "react-native-nmap";
import ViewShot from "react-native-view-shot";
import { useDispatch } from "react-redux";
import { getAddressByCoord } from "~/api/place";
import { useAppSelector } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import palette from "~/styles/palette";
import { UpdateAreaScreenNavigationProp } from "~/types/navigator";
import { getLeftRightPointsOfCircle } from "~/utils";
import permissionCheck from "~/utils/permissionCheck";
import Map from "../common/Map";
import AreaMarker from "./AreaMarker";
import Geolocation from "react-native-geolocation-service";

const UpdateAreaMap = () => {
  const navigation = useNavigation<UpdateAreaScreenNavigationProp>();

  const animateCamera = useAppSelector(
    state => state.deviceSetting.area.animateCamera,
  );
  const coord = useAppSelector(state => state.deviceSetting.draft.area.coord);
  const radius = useAppSelector(state => state.deviceSetting.draft.area.radius);
  const isSubmitting = useAppSelector(
    state => state.deviceSetting.area.isSubmitting,
  );
  const [capture, setCapture] = useState(false);
  const dispatch = useDispatch();

  const mapRef = useRef<NaverMapView>(null);
  const viewShotRef = useRef<ViewShot>(null);

  const { width } = useWindowDimensions();

  const animateToTwoCoordinates = (
    lat: number,
    lng: number,
    radius: number,
  ) => {
    mapRef.current?.animateToTwoCoordinates(
      getLeftRightPointsOfCircle(lat, lng, radius)[0],
      getLeftRightPointsOfCircle(lat, lng, radius)[1],
    );
  };

  useEffect(() => {
    if (!animateCamera) return;
    animateToTwoCoordinates(coord.latitude, coord.longitude, radius);
    dispatch(deviceSettingActions.setArea({ animateCamera: false }));
  }, [animateCamera]);

  useEffect(() => {
    if (!mapRef.current) return;
    (async () => {
      try {
        await permissionCheck.location();
        Geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            animateToTwoCoordinates(latitude, longitude, radius);
            dispatch(
              deviceSettingActions.setAreaDraft({
                coord: { latitude, longitude },
              }),
            );
          },
          () => {},
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } catch {
        animateToTwoCoordinates(coord.latitude, coord.longitude, radius);
      }
    })();
  }, [mapRef.current]);

  useEffect(() => {
    if (!capture) return;
    (async () => {
      const uri = await viewShotRef.current?.capture();
      const data = await getAddressByCoord(coord.latitude, coord.longitude);
      dispatch(
        deviceSettingActions.updateAreaResult({
          thumbnail: uri || "",
          address: data,
        }),
      );
      navigation.goBack();
    })();
  }, [capture]);

  useEffect(() => {
    if (!isSubmitting || !viewShotRef.current || !mapRef.current) return;
    const edgePoints = getLeftRightPointsOfCircle(
      coord.latitude,
      coord.longitude,
      radius,
    );
    mapRef.current?.animateToTwoCoordinates(edgePoints[0], edgePoints[1]);
    setTimeout(() => {
      setCapture(true);
    }, 500);
  }, [isSubmitting, viewShotRef.current]);

  return (
    <View>
      <ViewShot ref={viewShotRef}>
        <Map
          ref={mapRef}
          onCameraChange={({ latitude, longitude }) => {
            dispatch(
              deviceSettingActions.setAreaDraft({
                coord: { latitude, longitude },
              }),
            );
          }}
          mapPadding={{ top: 67, bottom: 67 }}
          isPositionAbsolute={false}
          rotateGesturesEnabled={false}
          style={{ width, height: width * 1.07 + 67 }}>
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
      <AreaMarker />
    </View>
  );
};

export default UpdateAreaMap;
