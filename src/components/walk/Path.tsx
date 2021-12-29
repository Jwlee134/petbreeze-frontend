import React, { useContext, useEffect } from "react";
import { Path as Polyline, Marker } from "react-native-nmap";
import { WalkContext } from "~/context/WalkContext";
import { DELTA } from "~/constants";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";

const Path = ({ isStopped }: { isStopped: boolean }) => {
  const coords = useAppSelector(state => state.storage.walk.coords);
  const { mapRef } = useContext(WalkContext);

  useEffect(() => {
    if (!mapRef.current) return;
    // 다른 거 하다가 들어올 시 현재 위치로 화면 이동
    if (coords.length !== 0) {
      // map initialCamera 프로퍼티와 겹치지 않기 위해 setTimeout
      setTimeout(() => {
        mapRef.current?.animateToRegion({
          latitude: coords[coords.length - 1][1],
          longitude: coords[coords.length - 1][0],
          latitudeDelta: DELTA,
          longitudeDelta: DELTA,
        });
      }, 500);
    }
  }, [mapRef]);

  useEffect(() => {
    if (!mapRef.current) return;
    // 시작 후 최초 좌표 받을 시 그 좌표로 화면 이동
    if (coords.length === 1) {
      mapRef.current.animateToRegion({
        latitude: coords[0][1],
        longitude: coords[0][0],
        latitudeDelta: DELTA,
        longitudeDelta: DELTA,
      });
    }
  }, [mapRef, coords]);

  if (coords.length) {
    return (
      <>
        {!isStopped ? (
          <Marker
            coordinate={{
              latitude: coords[coords.length - 1][1],
              longitude: coords[coords.length - 1][0],
            }}
            image={require("~/assets/image/footprint-marker.png")}
            width={41}
            height={57}
            anchor={{ x: 0.5, y: 0.96 }}
          />
        ) : (
          <>
            {coords.length > 1 ? (
              <Marker
                coordinate={{ latitude: coords[0][1], longitude: coords[0][0] }}
                image={require("~/assets/image/walk-end.png")}
                width={22}
                height={22}
                anchor={{ x: 0.5, y: 0.5 }}
              />
            ) : null}
            <Marker
              coordinate={{
                latitude: coords[coords.length - 1][1],
                longitude: coords[coords.length - 1][0],
              }}
              image={require("~/assets/image/walk-end.png")}
              width={22}
              height={22}
              anchor={{ x: 0.5, y: 0.5 }}
            />
          </>
        )}
        {coords.length > 1 && (
          <Polyline
            coordinates={coords.map(coord => ({
              latitude: coord[1],
              longitude: coord[0],
            }))}
            color={palette.blue_86}
            outlineWidth={0}
            width={7}
          />
        )}
      </>
    );
  }

  return null;
};

export default Path;
