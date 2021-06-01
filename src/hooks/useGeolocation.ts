import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

const useGeolocation = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const getCoords = () => {
    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const getPermission = useCallback(async () => {
    if (Platform.OS === "ios") {
      const status = await Geolocation.requestAuthorization("always");
      if (status === "granted") {
        getCoords();
        return;
      }
    }
    getCoords();
  }, []);

  useEffect(() => {
    getPermission();
  }, [getPermission]);

  return { lat, lng };
};

export default useGeolocation;
