import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useDispatch } from "react-redux";
import { mapActions } from "~/store/map";

const useMyLocation = () => {
  const dispatch = useDispatch();

  const [isTracking, setIsTracking] = useState(false);

  let trackingId = 0;

  const startTracking = () => setIsTracking(true);

  const clearTracking = () => setIsTracking(false);

  const setCoords = () => {
    trackingId = Geolocation.watchPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        dispatch(
          mapActions.setMyCoords({
            latitude,
            longitude,
          }),
        );
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

  useEffect(() => {
    if (isTracking) {
      setCoords();
    } else {
      Geolocation.clearWatch(trackingId);
    }
  }, [isTracking]);

  return {
    isTracking,
    startTracking,
    clearTracking,
  };
};

export default useMyLocation;
