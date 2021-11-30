import React, { useCallback, useEffect, useRef, useState } from "react";
import NaverMapView, { Marker } from "react-native-nmap";
import Geolocation from "react-native-geolocation-service";
import { delta } from "~/constants";
import useAppState from "~/hooks/useAppState";
import { useIsFocused } from "@react-navigation/native";
import Map from "../common/Map";
import { store, useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import { getAddressByCoord } from "~/api/place";
import MyLocationButton from "./MyLocationButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isAndroid } from "~/utils";
import useDevice from "~/hooks/useDevice";
import { storageActions } from "~/store/storage";
import permissionCheck from "~/utils/permissionCheck";
import Toast from "react-native-toast-message";

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

  const [isMyLocationMoved, setIsMyLocationMoved] = useState(true);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const animateToRegion = (type: "myLocation" | "device") => {
    mapRef.current?.animateToRegion({
      latitude: (type === "myLocation" ? coords : deviceCoord).latitude,
      longitude: (type === "myLocation" ? coords : deviceCoord).longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
    if (type === "myLocation") {
      setIsMyLocationMoved(true);
    } else {
      dispatch(commonActions.setHome({ isDeviceMoved: true }));
    }
  };

  const handleMyLocation = useCallback(() => {
    permissionCheck.location().then(() => {
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
            Toast.show({ type: "error", text1: "위치를 불러올 수 없습니다." });
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 5,
          },
        );
      }
    });
  }, [trackingId.current, coords]);

  useEffect(() => {
    if (!isMyLocationMoved && coords.latitude) animateToRegion("myLocation");
  }, [coords]);

  useEffect(() => {
    if (!isDeviceMoved && deviceCoord.latitude) animateToRegion("device");
  }, [deviceCoord]);

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
        dispatch(
          commonActions.setHome({
            deviceCoord: { latitude: 0, longitude: 0 },
            pressedID: 0,
          }),
        );
      }
      dispatch(commonActions.setHome({ isPressed: false }));
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

  const onMapClick = () => dispatch(commonActions.setHome({ address: "" }));

  const onMarkerClick = async () => {
    const address = await getAddressByCoord(
      deviceCoord.latitude,
      deviceCoord.longitude,
    );
    if (address) {
      dispatch(commonActions.setHome({ address }));
    }
  };

  return (
    <>
      <Map
        ref={mapRef}
        mapPadding={{ top: isAndroid ? top : 0 }}
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
        {deviceCoord.latitude && deviceList && pressedID ? (
          <Marker
            coordinate={{
              latitude: deviceCoord.latitude,
              longitude: deviceCoord.longitude,
            }}
            onClick={onMarkerClick}
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
      </Map>
      <MyLocationButton handleMyLocation={handleMyLocation} />
    </>
  );
};

export default HomeMap;
