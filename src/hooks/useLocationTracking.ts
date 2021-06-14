import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useDispatch } from "react-redux";
import { mapActions } from "~/store/map";

const useLocationTracking = () => {
  const dispatch = useDispatch();

  const [isTracking, setIsTracking] = useState(false);

  let trackingId = 0;

  const startTracking = () => {
    trackingId = Geolocation.watchPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        dispatch(mapActions.setMyLatitude(latitude));
        dispatch(mapActions.setMyLongitude(longitude));
        setIsTracking(true);
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
    return () => {
      clearTracking();
    };
  }, []);

  return {
    isTracking,
    startTracking,
    clearTracking,
  };
};

export default useLocationTracking;
