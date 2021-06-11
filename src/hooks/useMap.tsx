import React, { ReactNode, useCallback, useRef } from "react";
import MapView, { MapViewProps, PROVIDER_GOOGLE } from "react-native-maps";

interface IProps extends MapViewProps {
  children?: ReactNode;
}

const useMap = () => {
  const mapRef = useRef<MapView>(null);

  const Map = useCallback(
    ({ children, ...props }: IProps) => (
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.5666805,
          longitude: 126.9784147,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        {...props}>
        {children ? children : null}
      </MapView>
    ),
    [],
  );

  return { Map, mapRef };
};

export default useMap;
