import React, { useEffect, useRef, useState } from "react";
import NaverMapView, { Circle, Marker, Path } from "react-native-nmap";
import Geolocation from "react-native-geolocation-service";
import { DELTA, IS_ANDROID } from "~/constants";
import useAppState from "~/hooks/useAppState";
import { useIsFocused } from "@react-navigation/native";
import Map from "../common/Map";
import { store, useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useDevice from "~/hooks/useDevice";
import { storageActions } from "~/store/storage";
import HomeInfoHeader from "./HomeInfoHeader";
import palette from "~/styles/palette";
import HomeMapButtons from "./HomeMapButtons";
import { HOME_BOTTOM_SHEET_HEIGHT } from "~/styles/constants";

const HomeMap = () => {
  const mapRef = useRef<NaverMapView>(null);
  const { top } = useSafeAreaInsets();
  const trackingId = useRef<number | null>(null);
  const appState = useAppState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const deviceList = useDevice();

  const pressedID = useAppSelector(state => state.common.home.pressedID);
  const deviceCoord = useAppSelector(state => state.common.home.deviceCoord);
  const isDeviceMoved = useAppSelector(
    state => state.common.home.isDeviceMoved,
  );
  const showInfoHeader = useAppSelector(
    state => state.common.home.showInfoHeader,
  );
  const showMarker = useAppSelector(state => state.common.home.showMarker);
  const areaRadius = useAppSelector(state => state.common.home.areaRadius);
  const showPath = useAppSelector(state => state.common.home.showPath);
  const path = useAppSelector(state => state.common.home.path);

  const [isMyLocationMoved, setIsMyLocationMoved] = useState(true);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const animateToRegion = (type: "myLocation" | "device") => {
    mapRef.current?.animateToRegion({
      latitude: (type === "myLocation" ? coords : deviceCoord).latitude,
      longitude: (type === "myLocation" ? coords : deviceCoord).longitude,
      latitudeDelta: DELTA,
      longitudeDelta: DELTA,
    });
    if (type === "myLocation") {
      setIsMyLocationMoved(true);
    } else {
      dispatch(commonActions.setHome({ isDeviceMoved: true }));
    }
  };

  useEffect(() => {
    if (!isMyLocationMoved && coords.latitude) animateToRegion("myLocation");
  }, [coords]);

  useEffect(() => {
    if (!isDeviceMoved && deviceCoord.latitude && showMarker)
      animateToRegion("device");
  }, [deviceCoord, showMarker]);

  // home tab unmount
  useEffect(() => {
    if (!isFocused || appState === "background") {
      if (trackingId.current !== null) {
        Geolocation.clearWatch(trackingId.current);
        trackingId.current = null;
      }
      if (deviceCoord.latitude) {
        dispatch(
          storageActions.setLastCoord({
            latitude: deviceCoord.latitude,
            longitude: deviceCoord.longitude,
          }),
        );
      }
      dispatch(commonActions.setHome(null));
      setCoords({ latitude: 0, longitude: 0 });
    }
  }, [isFocused, appState, trackingId.current]);

  // home initial coord
  useEffect(() => {
    if (!mapRef.current) return;
    const { latitude, longitude } = store.getState().storage.lastCoord;
    mapRef.current.animateToRegion({
      latitude: latitude || 37.479314,
      longitude: longitude || 126.952792,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  }, [mapRef.current]);

  const onMapClick = () => {
    dispatch(commonActions.setHome({ isMapClicked: true }));
  };

  const defaultPadding = IS_ANDROID ? top : 0;

  return (
    <>
      <Map
        ref={mapRef}
        mapPadding={{
          top: showInfoHeader ? defaultPadding + 56 : defaultPadding,
          bottom: showPath ? HOME_BOTTOM_SHEET_HEIGHT : 0,
        }}
        onMapClick={onMapClick}>
        {coords.latitude ? (
          <Marker
            coordinate={coords}
            image={require("~/assets/image/my-location-marker.png")}
            width={100}
            height={100}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        ) : null}
        {deviceCoord.latitude && pressedID && showMarker ? (
          <Marker
            coordinate={{
              latitude: deviceCoord.latitude,
              longitude: deviceCoord.longitude,
            }}
            image={
              deviceList[
                deviceList.findIndex(device => device.id === pressedID)
              ].is_missed
                ? require("~/assets/image/footprint-marker-red.png")
                : require("~/assets/image/footprint-marker.png")
            }
            width={41}
            height={57}
            anchor={{ x: 0.5, y: 0.96 }}
          />
        ) : null}
        {deviceCoord.latitude && areaRadius && showMarker ? (
          <Circle
            coordinate={{
              latitude: deviceCoord.latitude,
              longitude: deviceCoord.longitude,
            }}
            radius={areaRadius}
            color={palette.blue_6e_20}
            outlineColor={palette.blue_6e_50}
            outlineWidth={1}
          />
        ) : null}
        {path.length && showMarker ? (
          <>
            <Path
              coordinates={path.map(coord => ({
                latitude: coord[1],
                longitude: coord[0],
              }))}
              color="#D9D9D9"
              outlineWidth={0}
              width={7}
            />
            {path
              .filter(
                coord =>
                  coord[1] !== deviceCoord.latitude &&
                  coord[0] !== deviceCoord.longitude,
              )
              .map((coord, i) => (
                <Marker
                  key={i}
                  image={require("~/assets/image/home-path-marker.png")}
                  width={22}
                  height={22}
                  coordinate={{ latitude: coord[1], longitude: coord[0] }}
                  anchor={{ x: 0.5, y: 0.5 }}
                />
              ))}
          </>
        ) : null}
      </Map>
      <HomeInfoHeader />
      <HomeMapButtons
        setIsMyLocationMoved={setIsMyLocationMoved}
        animateToRegion={animateToRegion}
        coords={coords}
        setCoords={setCoords}
        trackingId={trackingId}
      />
    </>
  );
};

export default HomeMap;
