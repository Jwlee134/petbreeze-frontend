import { useRef, useState } from "react";
import { Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useDispatch } from "react-redux";
import { store } from "~/store";
import { mapActions } from "~/store/map";
import { storageActions } from "~/store/storage";

const useMyLocation = ({ isWalking = false }: { isWalking?: boolean } = {}) => {
  const trackingId = useRef<number | null>(null);
  const dispatch = useDispatch();

  const [isTracking, setIsTracking] = useState(false);

  const startTracking = () => {
    setCoords().then(() => {
      setIsTracking(true);
    });
  };

  const clearTracking = () => {
    setIsTracking(false);
    if (trackingId.current !== null) {
      Geolocation.clearWatch(trackingId.current);
      trackingId.current = null;
    } else {
      const trackingId = store.getState().storage.walk.trackingId;
      if (trackingId !== null) {
        Geolocation.clearWatch(trackingId);
      }
    }
  };

  const setCoords = () => {
    return new Promise<number>((resolve, reject) => {
      trackingId.current = Geolocation.watchPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          if (!isWalking) {
            dispatch(
              mapActions.setMyCoords({
                latitude,
                longitude,
              }),
            );
            resolve(0);
          } else {
            console.log(latitude, longitude);
            dispatch(
              storageActions.setCoords({
                latitude: Number(latitude.toFixed(6)),
                longitude: Number(longitude.toFixed(6)),
              }),
            );
            resolve(trackingId.current as number);
          }
        },
        error => {
          Alert.alert("위치를 불러올 수 없습니다.");
          reject();
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
        },
      );
    });
  };

  return {
    trackingId,
    isTracking,
    startTracking,
    clearTracking,
    setCoords,
  };
};

export default useMyLocation;
