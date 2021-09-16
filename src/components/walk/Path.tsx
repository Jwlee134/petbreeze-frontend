import React from "react";
import { useEffect } from "react";
import NaverMapView, { Path as Polyline, Marker } from "react-native-nmap";
import { useDispatch } from "react-redux";
import { delta } from "~/staticData";
import { store, useAppSelector } from "~/store";
import { storageActions } from "~/store/storage";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";

const Path = ({
  mapRef,
}: //   deviceIds,
{
  mapRef: React.RefObject<NaverMapView>;
  //   deviceIds: string[];
}) => {
  const coords = useAppSelector(state => state.storage.walk.coords);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mapRef.current) return;
    // 다른 거 하다가 들어올 시 현재 위치로 화면 이동
    if (coords.length !== 0) {
      // map initialCamera 프로퍼티와 겹치지 않기 위해 setTimeout
      setTimeout(() => {
        mapRef.current?.animateToRegion({
          latitude: coords[coords.length - 1][0],
          longitude: coords[coords.length - 1][1],
          latitudeDelta: delta,
          longitudeDelta: delta,
        });
      }, 500);
    }
  }, [mapRef]);

  useEffect(() => {
    if (!mapRef.current) return;
    // 시작 후 최초 좌표 받을 시 그 좌표로 화면 이동
    if (coords.length === 1) {
      mapRef.current.animateToRegion({
        latitude: coords[0][0],
        longitude: coords[0][1],
        latitudeDelta: delta,
        longitudeDelta: delta,
      });
      // dispatch(storageActions.setSelectedDeviceId(deviceIds));
    }
  }, [mapRef, coords]);

  if (coords.length) {
    return (
      <>
        <Marker
          coordinate={{
            latitude: coords[coords.length - 1][0],
            longitude: coords[coords.length - 1][1],
          }}
          image={require("~/assets/image/walk/my-location.png")}
          width={rpWidth(38)}
          height={rpWidth(38)}
          anchor={{
            x: 0.5,
            y: 0.5,
          }}
        />
        {coords.length > 1 && (
          <Polyline
            coordinates={coords.map(coord => ({
              latitude: coord[0],
              longitude: coord[1],
            }))}
            color={`${palette.blue_7b}B3`}
            outlineWidth={0}
            width={5}
          />
        )}
      </>
    );
  }

  return null;
};

export default Path;
