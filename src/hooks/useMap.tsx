import React, { ReactNode, useCallback, useRef } from "react";
import MapView, { MapViewProps, PROVIDER_GOOGLE } from "react-native-maps";
import { useAppSelector } from "~/store";

interface IProps extends MapViewProps {
  children?: ReactNode;
}

const useMap = () => {
  const mapRef = useRef<MapView>(null);
  const camera = useAppSelector(state => state.storage.camera);

  const Map = useCallback(
    ({ children, ...props }: IProps) => (
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider={PROVIDER_GOOGLE}
        initialCamera={camera}
        {...props}>
        {children ? children : null}
      </MapView>
    ),
    [],
  );

  return { Map, mapRef };
};

export default useMap;
