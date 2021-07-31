import React, { ReactNode, useCallback, useRef } from "react";
import NaverMapView, { NaverMapViewProps } from "react-native-nmap";
import { isAndroid } from "~/utils";

export interface IMapProps extends NaverMapViewProps {
  children?: ReactNode;
}

const useMap = () => {
  const mapRef = useRef<NaverMapView>(null);

  const Map = useCallback(
    ({ children, ...props }: IMapProps) => (
      <NaverMapView
        ref={mapRef}
        zoomControl={false}
        useTextureView={isAndroid ? true : undefined}
        onCameraChange={e => console.log(e)}
        {...props}>
        {children ? children : null}
      </NaverMapView>
    ),
    [],
  );

  return { Map, mapRef };
};

export default useMap;
