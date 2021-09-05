import React, { ReactNode, useCallback, useRef } from "react";
import NaverMapView, { NaverMapViewProps } from "react-native-nmap";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { isAndroid } from "~/utils";

export interface IMapProps extends NaverMapViewProps {
  children?: ReactNode;
}

const useMap = () => {
  const mapRef = useRef<NaverMapView>(null);
  const { top } = useSafeAreaInsets();

  const Map = useCallback(
    ({ children, ...props }: IMapProps) => (
      <NaverMapView
        ref={mapRef}
        zoomControl={false}
        tiltGesturesEnabled={false}
        useTextureView={isAndroid ? true : undefined}
        mapPadding={{ top }}
        {...props}>
        {children ? children : null}
      </NaverMapView>
    ),
    [],
  );

  return { Map, mapRef };
};

export default useMap;
