import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import NaverMapView, { Marker, Path as Polyline } from "react-native-nmap";
import { DimensionsContext } from "~/context/DimensionsContext";
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
import { isAndroid, showLocationError } from "~/utils";
import useDevice from "~/hooks/useDevice";
import palette from "~/styles/palette";

const HomeMap = () => {
  const mapRef = useRef<NaverMapView>(null);
  const { rpWidth } = useContext(DimensionsContext);
  const { top } = useSafeAreaInsets();
  const trackingId = useRef<number | null>(null);
  const appState = useAppState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const clickedID = useAppSelector(state => state.common.home.clickedID);
  const deviceList = useDevice();

  const deviceCoord = useAppSelector(state => state.common.home.deviceCoord);
  const isDeviceMoved = useAppSelector(
    state => state.common.home.isDeviceMoved,
  );

  const [isMyLocationMoved, setIsMyLocationMoved] = useState(true);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [polyline, setPolyline] = useState<
    { latitude: number; longitude: number }[]
  >([]);

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

  const handleMyLocation = useCallback(() => {
    setIsMyLocationMoved(false);
    if (trackingId.current !== null) {
      animateToRegion("myLocation");
    } else {
      trackingId.current = Geolocation.watchPosition(
        ({ coords }) => {
          setCoords(coords);
        },
        () => {
          showLocationError();
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 5,
        },
      );
    }
  }, [trackingId.current, coords]);

  useEffect(() => {
    if (!isMyLocationMoved && coords.latitude) animateToRegion("myLocation");
  }, [coords]);

  useEffect(() => {
    if (!isDeviceMoved && deviceCoord.latitude) animateToRegion("device");
    if (deviceCoord.latitude) {
      if (
        polyline.length &&
        polyline[0].latitude === deviceCoord.latitude &&
        polyline[0].longitude === deviceCoord.longitude
      ) {
        return;
      }
      const polylineCopy = [...polyline];
      if (polyline.length > 4) {
        polylineCopy.pop();
      }
      setPolyline([
        { latitude: deviceCoord.latitude, longitude: deviceCoord.longitude },
        ...polylineCopy,
      ]);
    }
  }, [deviceCoord]);

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
      if (polyline.length) {
        setPolyline([]);
      }
    }
  }, [isFocused, appState]);

  return (
    <>
      <Map
        ref={mapRef}
        center={(() => {
          const { latitude, longitude } = store.getState().storage.lastCoord;
          if (latitude) {
            return { latitude, longitude, zoom: 15 };
          }
          return { latitude: 37.479314, longitude: 126.952792, zoom: 15 };
        })()}
        mapPadding={{ top: isAndroid ? top : 0 }}
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
        {polyline.length > 1 ? (
          <Polyline
            coordinates={polyline}
            color={palette.red_f0}
            outlineWidth={0}
            width={5}
          />
        ) : null}
        {deviceCoord.latitude && deviceList && clickedID ? (
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
            image={
              deviceList[
                deviceList.findIndex(device => device.id === clickedID)
              ].is_missed
                ? require("~/assets/image/footprint-marker-red.png")
                : require("~/assets/image/footprint-marker.png")
            }
            width={rpWidth(41)}
            height={rpWidth(57)}
            anchor={{
              x: 0.5,
              y: 0.96,
            }}
          />
        ) : null}
      </Map>
      <MyLocationButton handleMyLocation={handleMyLocation} />
    </>
  );
};

export default HomeMap;
