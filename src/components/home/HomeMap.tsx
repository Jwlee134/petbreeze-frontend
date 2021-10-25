import React, { useContext, useEffect, useRef, useState } from "react";
import NaverMapView, { Marker } from "react-native-nmap";
import { DimensionsContext } from "~/context/DimensionsContext";
import Geolocation from "react-native-geolocation-service";
import { delta } from "~/constants";
import useAppState from "~/hooks/useAppState";
import { useIsFocused } from "@react-navigation/native";
import Map from "../common/Map";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { commonActions } from "~/store/common";
import { getAddressByCoord } from "~/api/place";
import MyLocationButton from "./MyLocationButton";

const HomeMap = () => {
  const mapRef = useRef<NaverMapView>(null);
  const { rpWidth } = useContext(DimensionsContext);
  const trackingId = useRef<number | null>(null);
  const appState = useAppState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

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
      dispatch(commonActions.setIsDeviceMoved(true));
    }
  };

  const handleMyLocation = () => {
    setIsMyLocationMoved(false);
    if (trackingId.current !== null) {
      animateToRegion("myLocation");
    } else {
      trackingId.current = Geolocation.watchPosition(
        ({ coords }) => {
          setCoords(coords);
        },
        err => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
        },
      );
    }
  };

  useEffect(() => {
    if (!isMyLocationMoved && coords.latitude) animateToRegion("myLocation");
  }, [coords, isMyLocationMoved]);

  useEffect(() => {
    if (!isDeviceMoved && deviceCoord.latitude) animateToRegion("device");
  }, [deviceCoord, isDeviceMoved]);

  // home tab unmount
  useEffect(() => {
    if (!isFocused || appState === "background") {
      if (trackingId.current !== null) {
        Geolocation.clearWatch(trackingId.current);
        trackingId.current = null;
        setCoords({ latitude: 0, longitude: 0 });
      }
      if (deviceCoord.latitude) {
        dispatch(commonActions.setDeviceCoord({ latitude: 0, longitude: 0 }));
      }
    }
  }, [isFocused, appState]);

  return (
    <>
      <Map
        ref={mapRef}
        onMapClick={() => {
          dispatch(commonActions.setAddress(""));
        }}>
        {coords.latitude ? (
          <Marker
            coordinate={coords}
            image={require("~/assets/image/my-location-marker.png")}
            width={rpWidth(100)}
            height={rpWidth(100)}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        ) : null}
        {deviceCoord.latitude ? (
          <Marker
            coordinate={{
              latitude: deviceCoord.latitude,
              longitude: deviceCoord.longitude,
            }}
            onClick={async () => {
              const addr = await getAddressByCoord(
                deviceCoord.latitude,
                deviceCoord.longitude,
              );
              if (addr) {
                dispatch(commonActions.setAddress(addr));
              }
            }}
            image={require("~/assets/image/footprint-marker.png")}
            width={rpWidth(41)}
            height={rpWidth(57)}
            anchor={{
              x: 0.5,
              y: 1,
            }}
          />
        ) : null}
      </Map>
      <MyLocationButton handleMyLocation={handleMyLocation} />
    </>
  );
};

export default HomeMap;
