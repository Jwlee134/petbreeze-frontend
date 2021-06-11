import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import MapView from "react-native-maps";

const useLocationTracking = ({
  mapRef,
}: {
  mapRef: React.RefObject<MapView>;
}) => {
  const [isTracking, setIsTracking] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  let trackingId = 0;

  const startTracking = () => {
    trackingId = Geolocation.watchPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setIsTracking(true);
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error);
        if (error.code === 1) {
          PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION");
        }
        if (error.code === 5) {
          Alert.alert("위치 정보를 가져올 수 없습니다.");
        }
        startTracking();
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };

  const clearTracking = () => {
    Geolocation.clearWatch(trackingId);
    setIsTracking(false);
  };

  useEffect(() => {
    if (!mapRef?.current || !latitude || !longitude || !isTracking) return;
    mapRef.current.animateCamera({
      center: { latitude, longitude },
      zoom: 15,
    });
  }, [mapRef, latitude, longitude, isTracking]);

  useEffect(() => {
    return () => {
      clearTracking();
    };
  }, []);

  return {
    isTracking,
    latitude,
    longitude,
    startTracking,
    clearTracking,
  };
};

export default useLocationTracking;
