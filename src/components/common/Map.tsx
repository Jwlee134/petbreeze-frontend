import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import { StyleSheet } from "react-native";
import NaverMapView, { NaverMapViewProps } from "react-native-nmap";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface IMapProps extends NaverMapViewProps {
  children?: ReactNode;
}

const Map = forwardRef(
  ({ children, ...props }: IMapProps, ref: ForwardedRef<NaverMapView>) => {
    const { top } = useSafeAreaInsets();

    return (
      <NaverMapView
        ref={ref}
        style={StyleSheet.absoluteFill}
        zoomControl={false}
        tiltGesturesEnabled={false}
        useTextureView
        mapPadding={{ top }}
        {...props}>
        {children ? children : null}
      </NaverMapView>
    );
  },
);

export default Map;
